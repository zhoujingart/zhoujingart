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

test('V2 exhibition detail keeps the shared menu translated', async ({ page }) => {
    await page.goto('/v2/exhibition-detail.html?id=2025-05-fractured-horizons-new-york');

    await page.locator('.lang-toggle').click();

    await expect(page.locator('#primary-navigation [data-i18n="nav.home"]')).toHaveText('首页');
    await expect(page.locator('#primary-navigation [data-i18n="nav.exhibitions"]')).toHaveText('展览');
});

test('V1 mobile navigation manages ARIA state and keyboard focus', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/index.html');

    const menuToggle = page.locator('.mobile-menu-toggle');
    const navigation = page.locator('#primary-navigation');
    const firstLink = navigation.locator('.nav-link').first();

    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toHaveAttribute('aria-hidden', 'true');

    await menuToggle.focus();
    await page.keyboard.press('Enter');

    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation).toHaveAttribute('aria-hidden', 'false');
    await expect(firstLink).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toHaveAttribute('aria-hidden', 'true');
    await expect(menuToggle).toBeFocused();
});
