import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8003;
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

test('Check buttons work correctly with event delegation', async ({ page }) => {
    // Mock WebR
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
    const consoleDiv = page.locator('.console-output').first();

    const answer = await btn.getAttribute('data-answer');
    await input.fill(answer);
    await btn.click();

    await expect(consoleDiv).toContainText('Mock output');
    await expect(input).toHaveClass(/is-success/);
});
