#!/usr/bin/env node

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:8000';
const pages = [
    'index.html', 'gallery.html', 'exhibitions.html', 'exhibition-detail.html',
    'about.html', 'press.html', 'studio.html', 'contact.html',
    'v2/index.html', 'v2/gallery.html', 'v2/exhibitions.html', 'v2/exhibition-detail.html',
    'v2/about.html', 'v2/press.html', 'v2/studio.html', 'v2/contact.html'
];

const failures = [];
for (const page of pages) {
    try {
        const response = await fetch(`${baseUrl}/${page}`);
        if (!response.ok) failures.push(`${page}: HTTP ${response.status}`);
    } catch (error) {
        failures.push(`${page}: ${error.message}`);
    }
}

if (failures.length) {
    console.error('Page smoke test failed:');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
} else {
    console.log(`Page smoke test passed: ${pages.length} entry pages returned HTTP 2xx.`);
}
