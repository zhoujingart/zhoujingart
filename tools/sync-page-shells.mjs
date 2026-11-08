#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderArtistNavigation, sitePages } from './root-page-shells.mjs';

const root = resolve(import.meta.dirname, '..');
const checkOnly = process.argv.includes('--check');
const siteNavigationPattern = /\s*<!-- BEGIN:SITE_NAVIGATION[\s\S]*?<!-- END:SITE_NAVIGATION -->|\s*<nav class="navbar">[\s\S]*?<\/nav>/;
const outOfSync = [];

for (const [fileName, page] of Object.entries(sitePages)) {
    const file = resolve(root, fileName);
    const source = readFileSync(file, 'utf8');
    const navigation = renderArtistNavigation(page);
    if (!siteNavigationPattern.test(source)) throw new Error(`${fileName}: site navigation not found`);
    const updated = source.replace(siteNavigationPattern, `\n${navigation}`);
    if (updated === source) continue;
    if (checkOnly) outOfSync.push(fileName);
    else writeFileSync(file, updated);
}

if (outOfSync.length) {
    console.error(`Root page shells are out of sync: ${outOfSync.join(', ')}. Run npm run sync:shells.`);
    process.exitCode = 1;
}
