#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

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

if (errors.length) {
    console.error(`Site checks failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`Site checks passed: ${htmlFiles.length} HTML files, ${jsFiles.length} JavaScript files, ${pythonFiles.length} Python files, ${textFiles.length} scanned files.`);
}
