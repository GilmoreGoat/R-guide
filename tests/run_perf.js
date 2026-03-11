import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log(msg.text()));

  await page.goto(`file://${process.cwd()}/tests/perf_copy_buttons.html`);
  await page.goto(`file://${process.cwd()}/tests/perf_copy_buttons_opt.html`);

  await browser.close();
})();
