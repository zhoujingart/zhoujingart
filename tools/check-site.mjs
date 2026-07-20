#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const ignoredDirectories = new Set(['.git', 'node_modules', '.codegraph']);
const htmlFiles = [];
const jsFiles = [];
const pythonFiles = [];
const textFiles = [];
const errors = [];

function walk(directory) {
    for (const entry of readdirSync(directory)) {
        if (ignoredDirectories.has(entry)) continue;

        const fullPath = resolve(directory, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (entry.endsWith('.html')) {
            htmlFiles.push(fullPath);
            textFiles.push(fullPath);
        } else if (entry.endsWith('.js') || entry.endsWith('.mjs')) {
            jsFiles.push(fullPath);
            textFiles.push(fullPath);
        } else if (entry.endsWith('.py')) {
            pythonFiles.push(fullPath);
        } else if (entry.endsWith('.css')) {
            textFiles.push(fullPath);
        }
    }
}

function displayPath(file) {
    return relative(root, file).split(sep).join('/');
}

function report(file, message) {
    errors.push(`${displayPath(file)}: ${message}`);
}

function isExternalReference(value) {
    return /^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(value);
}

function normalizeReference(value) {
    return value.trim().replace(/^['"]|['"]$/g, '').split(/[?#]/, 1)[0];
}

function checkReference(file, rawReference) {
    const reference = normalizeReference(rawReference);
    if (!reference || reference.includes('${') || isExternalReference(reference) || reference.startsWith('/')) return;

    const target = /^(?:images|assets)\//.test(reference)
        ? resolve(root, reference)
        : resolve(file, '..', reference);
    if (!existsSync(target)) {
        report(file, `missing local reference: ${reference}`);
    }
}

function checkHtml(file, source) {
    if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(source)) {
        report(file, 'missing document language');
    }
    if (!/<meta\b[^>]*name=["']viewport["']/i.test(source)) {
        report(file, 'missing viewport metadata');
    }
    if (!/<title\b[^>]*>[^<]+<\/title>/i.test(source)) {
        report(file, 'missing page title');
    }

    const ids = [...source.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    for (const id of new Set(duplicateIds)) {
        report(file, `duplicate id: ${id}`);
    }

    for (const match of source.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)) {
        checkReference(file, match[1]);
    }
}

function checkTextReferences(file, source) {
    if (/<[^>]*\bonclick\s*=/i.test(source)) {
        report(file, 'inline onclick handlers are not allowed; use event listeners instead');
    }

    for (const match of source.matchAll(/(?:images|assets)\/[A-Za-z0-9_./@() -]+\.(?:avif|gif|ico|jpe?g|png|svg|webp|pdf)/gi)) {
        if (match[0].includes('${')) continue;
        checkReference(file, match[0]);
    }

    if (file.endsWith('.css')) {
        for (const match of source.matchAll(/url\(([^)]+)\)/gi)) {
            checkReference(file, match[1]);
        }
    }
}

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function checkBilingualField(file, value, fieldName, recordName) {
    if (!value || typeof value !== 'object' || !isNonEmptyString(value.zh) || !isNonEmptyString(value.en)) {
        report(file, `${recordName}: ${fieldName} must contain non-empty zh and en values`);
    }
}

function checkDataImage(file, imagePath, recordName) {
    if (!isNonEmptyString(imagePath)) {
        report(file, `${recordName}: missing image path`);
        return;
    }

    if (!isExternalReference(imagePath)) {
        const target = imagePath.startsWith('/')
            ? resolve(root, imagePath.slice(1))
            : resolve(root, imagePath);
        if (!existsSync(target)) report(file, `${recordName}: missing image: ${imagePath}`);
    }
}

function checkOptimizedImage(file, imagePath, recordName, profile = 'card') {
    if (!isNonEmptyString(imagePath) || isExternalReference(imagePath) || !imagePath.startsWith('images/')) return;

    const profileDirectory = {
        card: 'card',
        hero: 'card',
        preview: 'card',
        pressThumb: 'press-thumb',
        pressPreview: 'press-preview'
    }[profile] || 'card';
    const optimizedPath = resolve(root, 'images', 'optimized', profileDirectory, imagePath.slice('images/'.length));
    if (!existsSync(optimizedPath)) {
        report(file, `${recordName}: missing optimized ${profile} image: ${imagePath}`);
    }
}

function loadPageData(file, variableName) {
    const source = readFileSync(file, 'utf8');
    const context = {
        console,
        document: { addEventListener() {} },
        window: {},
        localStorage: { getItem() { return null; }, setItem() {} }
    };

    try {
        vm.runInNewContext(`${source}\n;globalThis.__siteData = ${variableName};`, context, { filename: file });
        return context.__siteData;
    } catch (error) {
        report(file, `could not load ${variableName} for validation: ${error.message}`);
        return null;
    }
}

function checkGalleryData() {
    const file = resolve(root, 'js/gallery.js');
    const artworks = loadPageData(file, 'artworksData');
    if (!Array.isArray(artworks)) {
        report(file, 'artworksData must be an array');
        return;
    }

    const ids = new Set();
    for (const artwork of artworks) {
        const recordName = `artwork ${artwork?.id || '(missing id)'}`;
        if (!isNonEmptyString(artwork?.id)) {
            report(file, `${recordName}: id must be a non-empty string`);
        } else if (ids.has(artwork.id)) {
            report(file, `${recordName}: duplicate id`);
        } else {
            ids.add(artwork.id);
        }
        for (const field of ['title', 'medium', 'description']) {
            checkBilingualField(file, artwork?.[field], field, recordName);
        }
        for (const field of ['size', 'year', 'category', 'status']) {
            if (!isNonEmptyString(artwork?.[field])) report(file, `${recordName}: missing ${field}`);
        }
        checkDataImage(file, artwork?.image, recordName);
        checkOptimizedImage(file, artwork?.image, recordName);
    }
}

function checkExhibitionData() {
    const file = resolve(root, 'js/exhibitions.js');
    const exhibitionsByYear = loadPageData(file, 'exhibitionsData');
    if (!exhibitionsByYear || typeof exhibitionsByYear !== 'object' || Array.isArray(exhibitionsByYear)) {
        report(file, 'exhibitionsData must be an object grouped by year');
        return;
    }

    const ids = new Set();
    for (const [year, exhibitions] of Object.entries(exhibitionsByYear)) {
        if (!/^\d{4}$/.test(year) || !Array.isArray(exhibitions)) {
            report(file, `invalid exhibition year group: ${year}`);
            continue;
        }
        for (const exhibition of exhibitions) {
            const recordName = `exhibition ${exhibition?.id || '(missing id)'}`;
            if (!isNonEmptyString(exhibition?.id)) {
                report(file, `${recordName}: id must be a non-empty string`);
            } else if (ids.has(exhibition.id)) {
                report(file, `${recordName}: duplicate id`);
            } else {
                ids.add(exhibition.id);
            }
            for (const field of ['title', 'location', 'country', 'description']) {
                checkBilingualField(file, exhibition?.[field], field, recordName);
            }
            if (!isNonEmptyString(exhibition?.date)) report(file, `${recordName}: missing date`);
            if (!Array.isArray(exhibition?.images) || exhibition.images.length === 0) {
                report(file, `${recordName}: requires at least one image`);
            }
            for (const image of exhibition?.images || []) {
                checkDataImage(file, image?.src, recordName);
                checkOptimizedImage(file, image?.src, recordName);
                checkBilingualField(file, image?.title, 'image title', recordName);
                checkBilingualField(file, image?.description, 'image description', recordName);
            }
            for (const artwork of exhibition?.artworks || []) {
                checkDataImage(file, artwork?.image, recordName);
                checkOptimizedImage(file, artwork?.image, recordName);
            }
            for (const document of exhibition?.documents || []) {
                checkDataImage(file, document?.image, recordName);
                checkOptimizedImage(file, document?.image, recordName);
            }
        }
    }
}

function checkSharedContentConsumers() {
    const consumers = [
        ['v2/js/render-gallery.js', ['artworksData']],
        ['v2/js/render-exhibitions.js', ['exhibitionsData']],
        ['v2/js/render-exhibition-detail.js', ['exhibitionsData']],
        ['v2/js/render-press.js', ['pressData', 'exhibitionsData']]
    ];

    for (const [path, legacyGlobals] of consumers) {
        const file = resolve(root, path);
        const source = readFileSync(file, 'utf8');
        if (!source.includes('window.siteContent')) {
            report(file, 'must read content through window.siteContent');
        }
        for (const globalName of legacyGlobals) {
            if (new RegExp(`\\b${globalName}\\b`).test(source)) {
                report(file, `must not read legacy global ${globalName} directly`);
            }
        }
    }
}

walk(root);

for (const file of jsFiles) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) {
        report(file, result.stderr.trim() || 'JavaScript syntax check failed');
    }
}

for (const file of pythonFiles) {
    const result = spawnSync('python3', ['-c', 'import ast, pathlib, sys; ast.parse(pathlib.Path(sys.argv[1]).read_text())', file], { encoding: 'utf8' });
    if (result.status !== 0) {
        report(file, result.stderr.trim() || 'Python syntax check failed');
    }
}

for (const file of htmlFiles) {
    const source = readFileSync(file, 'utf8');
    checkHtml(file, source);
}

for (const file of textFiles) {
    checkTextReferences(file, readFileSync(file, 'utf8'));
}

checkGalleryData();
checkExhibitionData();
checkSharedContentConsumers();

if (errors.length) {
    console.error(`Site checks failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`Site checks passed: ${htmlFiles.length} HTML files, ${jsFiles.length} JavaScript files, ${pythonFiles.length} Python files, ${textFiles.length} scanned files.`);
}
