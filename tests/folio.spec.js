const { test, expect } = require('@playwright/test');

async function captureFolio(page, path) {
    for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path, fullPage: true });
}

test('artist folio shows canonical works and switches their captions', async ({ page }) => {
    await page.goto('/v2/index.html');
    await expect(page.locator('.folio-work')).toHaveCount(5);
    const image = page.locator('#folio-feature img');
    await expect(image).toHaveAttribute('loading', 'eager');
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    const before = await image.getAttribute('alt');
    await page.locator('.lang-toggle').click();
    await expect(image).not.toHaveAttribute('alt', before);
    await expect(page.locator('.folio-name')).toContainText('Zhou Jing');
    await captureFolio(page, 'test-results/folio-desktop.png');
    await page.locator('#folio-feature a').click();
    await expect(page).toHaveURL(/gallery.html#gallery-painting-38$/);
    await expect(page.locator('#gallery-painting-38')).toBeVisible();
});

test('mobile folio fits viewport and navigation remains usable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/v2/index.html');
    await expect(page.locator('.folio-work')).toHaveCount(5);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await captureFolio(page, 'test-results/folio-mobile.png');
    await page.locator('.menu-toggle').click();
    await expect(page.locator('.menu-overlay')).toHaveAttribute('aria-hidden', 'false');
    await page.locator('.menu-link[href="gallery.html"]').click();
    await expect(page).toHaveURL(/gallery.html$/);
});

test('V2 inner pages fit mobile and desktop layouts', async ({ page }) => {
    for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of ['gallery', 'exhibitions', 'about', 'press', 'studio', 'contact', 'exhibition-detail?id=2025-05-fractured-horizons-new-york']) {
            const [name, query] = route.split('?');
            await page.goto(`/v2/${name}.html${query ? '?' + query : ''}`);
            await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            await page.screenshot({ path: `test-results/folio-${name}-${width}.png` });
        }
    }
});
