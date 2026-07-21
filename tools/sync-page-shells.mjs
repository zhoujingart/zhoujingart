#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderRootHeader, rootShellPages } from './root-page-shells.mjs';

const root = resolve(import.meta.dirname, '..');
const checkOnly = process.argv.includes('--check');
const headerPattern = /\s*<!-- BEGIN:ROOT_HEADER[\s\S]*?<!-- END:ROOT_HEADER -->|\s*<header class="header">[\s\S]*?<\/header>/;
const outOfSync = [];

for (const [fileName, page] of Object.entries(rootShellPages)) {
    const file = resolve(root, fileName);
    const source = readFileSync(file, 'utf8');
    const header = renderRootHeader(page);
    if (!headerPattern.test(source)) throw new Error(`${fileName}: root header not found`);
    const updated = source.replace(headerPattern, `\n${header}`);
    if (updated === source) continue;
    if (checkOnly) outOfSync.push(fileName);
    else writeFileSync(file, updated);
}

if (outOfSync.length) {
    console.error(`Root page shells are out of sync: ${outOfSync.join(', ')}. Run npm run sync:shells.`);
    process.exitCode = 1;
}
