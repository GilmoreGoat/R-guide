import { test, expect } from '@playwright/test';

test('Measure redundant DOM query vs cached array', async ({ page }) => {
  await page.goto('http://localhost:8000/modules/basics.html');

  // Measure querySelectorAll
  const queryTime = await page.evaluate(() => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      const allCodeInputs = Array.from(document.querySelectorAll('.input-code'));
      const index = allCodeInputs.indexOf(document.querySelector('.input-code'));
    }
    const end = performance.now();
    return end - start;
  });

  // Measure cached array
  const cachedTime = await page.evaluate(() => {
    const codeInputsArray = Array.from(document.querySelectorAll('.input-code'));
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      const index = codeInputsArray.indexOf(document.querySelector('.input-code'));
    }
    const end = performance.now();
    return end - start;
  });

  console.log(`Querying DOM 10,000 times took: ${queryTime}ms`);
  console.log(`Using cached array 10,000 times took: ${cachedTime}ms`);
  console.log(`Improvement: ${((queryTime - cachedTime) / queryTime * 100).toFixed(2)}%`);
});
