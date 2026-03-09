import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Assuming a local server is running on port 8000
  await page.goto('http://localhost:8000/modules/basics.html');

  // Set current user in localStorage
  await page.evaluate(() => {
    localStorage.setItem('r_gilmore_currentUser', 'testuser');
  });
  await page.reload();

  // Type into the first code input
  await page.fill('.input-code', 'test code 123');

  // Check localStorage
  const keys = await page.evaluate(() => {
    return Object.keys(localStorage);
  });

  console.log("LocalStorage Keys:", keys);

  const savedVal = await page.evaluate(() => {
    return localStorage.getItem('r_gilmore_testuser_basics.html_input_0');
  });
  console.log("Saved value:", savedVal);

  await browser.close();
})();
