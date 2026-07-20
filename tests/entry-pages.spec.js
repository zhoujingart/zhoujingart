const { test, expect } = require('@playwright/test');

const entryPages = [
    '/',
    '/gallery.html',
    '/exhibitions.html',
    '/exhibition-detail.html?id=2025-05-fractured-horizons-new-york',
    '/about.html',
    '/press.html',
    '/studio.html',
    '/contact.html',
    '/v2/index.html',
    '/v2/gallery.html',
    '/v2/exhibitions.html',
    '/v2/exhibition-detail.html?id=2025-05-fractured-horizons-new-york',
    '/v2/about.html',
    '/v2/press.html',
    '/v2/studio.html',
    '/v2/contact.html'
];

for (const path of entryPages) {
    test(`loads ${path} without a page runtime error`, async ({ page }) => {
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));

        const response = await page.goto(path);
        expect(response?.ok()).toBeTruthy();
        await expect(page.locator('body')).toBeVisible();
        expect(errors).toEqual([]);
    });
}

test('V2 navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/v2/index.html');

    const menuToggle = page.locator('.menu-toggle');
    const menuOverlay = page.locator('#primary-navigation');
    const menuClose = page.locator('.menu-close');

    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menuOverlay).toHaveAttribute('aria-hidden', 'true');

    await menuToggle.focus();
    await page.keyboard.press('Enter');

    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menuOverlay).toHaveAttribute('aria-hidden', 'false');
    await expect(menuClose).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menuOverlay).toHaveAttribute('aria-hidden', 'true');
    await expect(menuToggle).toBeFocused();
});
