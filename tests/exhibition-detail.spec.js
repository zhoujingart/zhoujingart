const { test, expect } = require('@playwright/test');

const exhibitionUrl = '/exhibition-detail.html?id=2025-05-fractured-horizons-new-york';

test.describe('exhibition detail', () => {
    test('renders exhibition content without runtime errors', async ({ page }) => {
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));

        await page.goto(exhibitionUrl);

        const content = page.locator('#exhibitionDetailContent');
        await expect(content.locator('.exhibition-title')).toBeVisible();
        await expect(content.locator('[data-viewer-type="artwork"]')).toHaveCount(2);
        await expect(content.locator('[data-viewer-type="document"]')).toHaveCount(3);
        expect(errors).toEqual([]);
    });

    test('opens artwork and document viewers through mouse and keyboard', async ({ page }) => {
        await page.goto(exhibitionUrl);

        const artwork = page.locator('[data-viewer-type="artwork"]').first();
        await artwork.click();
        const artworkViewer = page.locator('.artwork-viewer-modal');
        await expect(artworkViewer).toBeVisible();
        await expect(artworkViewer).toHaveAttribute('role', 'dialog');
        await page.keyboard.press('Escape');
        await expect(artworkViewer).toHaveCount(0);

        const documentCard = page.locator('[data-viewer-type="document"]').first();
        await documentCard.focus();
        await page.keyboard.press('Enter');
        const documentViewer = page.locator('.certificate-viewer-modal');
        await expect(documentViewer).toBeVisible();
        await expect(documentViewer.getByRole('button', { name: 'Close image viewer' })).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(documentViewer).toHaveCount(0);
        await expect(documentCard).toBeFocused();
    });
});
