import { test, expect } from '@playwright/test';

test('verify copy button delegation', async ({ page, context }) => {
  await page.goto('http://localhost:8000/modules/tidying.html');

  // Print the number of pre blocks found.
  const preCount = await page.locator('pre').count();
  console.log('Number of <pre> blocks on page:', preCount);

  // We noticed the previous code block only selects `<pre>` containing `<code>`.
  // Wait for at least one `<pre>` element with `<code>` to ensure DOM is ready.
  await page.waitForSelector('pre code', { timeout: 30000 });

  const copyBtnCount = await page.locator('.copy-btn').count();
  console.log('Number of .copy-btn found:', copyBtnCount);

  // Grant clipboard permissions
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  // Find the first copy button
  const copyBtn = page.locator('.copy-btn').first();
  await copyBtn.scrollIntoViewIfNeeded();

  // Click it
  await copyBtn.click();

  // Wait for text to change to "Copied!"
  await expect(copyBtn).toHaveText('Copied!');

  // Capture screenshot of the whole block area
  const preBlock = page.locator('pre').first();
  await preBlock.screenshot({ path: '/home/jules/verification/copy-btn-copied.png' });
});
