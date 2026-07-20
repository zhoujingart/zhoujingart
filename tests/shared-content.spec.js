const { test, expect } = require('@playwright/test');

test.describe('shared content layer', () => {
    test('drives the same exhibition records in both themes', async ({ browser }) => {
        const classic = await browser.newPage();
        await classic.goto('/exhibitions.html');
        await expect(classic.locator('.exhibition-item').first()).toBeVisible();
        const expectedIds = await classic.evaluate(() => window.siteContent.getExhibitions().map((item) => item.id));
        await expect(classic.locator('.exhibition-item')).toHaveCount(expectedIds.length);
        const classicIds = await classic.locator('.exhibition-item').evaluateAll((items) => items.map((item) => item.dataset.exhibitionId));
        expect(classicIds).toEqual(expectedIds);

        const modern = await browser.newPage();
        await modern.goto('/v2/exhibitions.html');
        await expect(modern.locator('.exhibition-item-row').first()).toBeVisible();
        await expect(modern.locator('.exhibition-item-row')).toHaveCount(expectedIds.length);
        const modernIds = await modern.locator('.exhibition-item-row').evaluateAll((items) => items.map((item) => item.dataset.exhibitionId));
        expect(modernIds).toEqual(expectedIds);
    });

    test('renders V2 gallery from shared artwork data', async ({ page }) => {
        await page.goto('/v2/gallery.html');
        await expect(page.locator('.gallery-item').first()).toBeVisible();

        const contentCount = await page.evaluate(() => window.siteContent.artworks.length);
        await expect(page.locator('.gallery-item')).toHaveCount(contentCount);
    });

    test('uses shared exhibition lookup in V2 detail', async ({ page }) => {
        await page.goto('/v2/exhibition-detail.html?id=2025-05-fractured-horizons-new-york');
        await expect(page.locator('.ex-title')).toBeVisible();

        const expectedTitle = await page.evaluate(() => {
            const exhibition = window.siteContent.findExhibition('2025-05-fractured-horizons-new-york');
            return window.siteI18n.text(exhibition.title, window.siteI18n.getLanguage('en'));
        });
        await expect(page.locator('.ex-title')).toHaveText(expectedTitle);
    });

    test('renders the shared media feed in both themes', async ({ browser }) => {
        const classic = await browser.newPage();
        await classic.goto('/press.html');
        await expect(classic.locator('.press-item').first()).toBeVisible();
        const contentCount = await classic.evaluate(() => window.siteContent.getPressItems().length);
        await expect(classic.locator('.press-item')).toHaveCount(contentCount);

        const modern = await browser.newPage();
        await modern.goto('/v2/press.html');
        await expect(modern.locator('.press-item').first()).toBeVisible();
        await expect(modern.locator('.press-item')).toHaveCount(contentCount);
    });
});
