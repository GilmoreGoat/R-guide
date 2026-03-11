import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function measureMemory(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Wait for a little bit
  await new Promise(r => setTimeout(r, 1000));

  const metrics = await page.metrics();
  console.log(`${url}: JSHeapUsedSize = ${metrics.JSHeapUsedSize / 1024 / 1024} MB`);

  await browser.close();
}

(async () => {
  await measureMemory(`file://${process.cwd()}/tests/perf_copy_buttons.html`);
  await measureMemory(`file://${process.cwd()}/tests/perf_copy_buttons_opt.html`);
})();
