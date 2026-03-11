import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8005;
let server;

test.beforeAll(async () => {
    try {
      const { execSync } = await import('child_process');
      execSync(`lsof -t -i :${PORT} | xargs kill -9`, { stdio: 'ignore' });
    } catch (e) {
    }
    server = spawn('python3', ['-m', 'http.server', String(PORT)]);
    await new Promise(resolve => setTimeout(resolve, 2000));
});

test.afterAll(() => {
    if (server) server.kill();
});

test('Benchmark DOM Queries in Click Handler', async ({ page }) => {
    test.setTimeout(120000);

    // Mock WebR so we are only benchmarking the DOM and JS logic, not actual WebR execution
    await page.addInitScript(() => {
        window.mockWebR = {
            init: async () => {},
            installPackages: async () => {},
            evalR: async () => {},
            Shelter: function() {
                this.captureR = async () => {
                    return {
                        output: [{ type: 'stdout', data: 'Mock output' }],
                        images: []
                    };
                };
                this.purge = () => {};
            }
        };
    });

    await page.route('https://webr.r-wasm.org/v0.5.8/webr.mjs', async route => {
        await route.fulfill({
            contentType: 'application/javascript',
            body: `
                export class WebR {
                    constructor() {
                        return window.mockWebR;
                    }
                }
            `
        });
    });

    await page.goto(`http://localhost:${PORT}/modules/basics.html`);

    // Wait for "R is Ready!"
    await expect(page.locator('.loading-banner.is-success')).toBeVisible({ timeout: 15000 });

    const input = page.locator('.input-code').first();
    const btn = page.locator('.check-btn').first();

    // Fill the input once
    const answer = await btn.getAttribute('data-answer');
    await input.fill(answer);

    // Click once to make sure it's working
    await btn.click();
    await expect(page.locator('.console-output').first()).toContainText('Mock output');

    // Benchmark the clicks
    const ITERATIONS = 1000;
    let totalDuration = 0;

    console.log(`--- Starting DOM Queries Benchmark (${ITERATIONS} iterations) ---`);

    // Use evaluate to run the clicks inside the browser to avoid Playwright RPC overhead
    const duration = await page.evaluate(async (iterations) => {
        const btn = document.querySelector('.check-btn');
        const startTime = performance.now();

        for (let i = 0; i < iterations; i++) {
            btn.click();
        }

        // Let event loop catch up just in case (though clicks are sync dispatch in this context)
        await new Promise(r => setTimeout(r, 0));

        return performance.now() - startTime;
    }, ITERATIONS);

    console.log(`Total Time for ${ITERATIONS} clicks: ${duration.toFixed(2)} ms`);
    console.log(`Average Time per click: ${(duration / ITERATIONS).toFixed(4)} ms`);
    console.log('--- Benchmark Complete ---');
});
