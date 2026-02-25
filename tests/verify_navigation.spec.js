import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('navigation bar exists and links to correct sections', async ({ page }) => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');
  await page.goto(indexPath);

  // check nav
  const nav = page.locator('.tier-nav');
  await expect(nav).toBeVisible();

  // check links
  await expect(nav.locator('a[href="#tier-1"]')).toBeVisible();
  await expect(nav.locator('a[href="#tier-2"]')).toBeVisible();
  await expect(nav.locator('a[href="#tier-3"]')).toBeVisible();

  // check targets
  // Use .first() or just expect count if strict mode complains about visibility of multiple
  // IDs should be unique so count should be 1.
  await expect(page.locator('#tier-1')).toHaveCount(1);
  await expect(page.locator('#tier-2')).toHaveCount(1);
  await expect(page.locator('#tier-3')).toHaveCount(1);
});
