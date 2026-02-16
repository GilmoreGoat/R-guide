import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8000;
let server;

test.beforeAll(async () => {
    // Check if port is in use and kill process if so
    try {
      const { execSync } = await import('child_process');
      execSync(`lsof -t -i :${PORT} | xargs kill -9`, { stdio: 'ignore' });
    } catch (e) {
      // ignore errors if no process found
    }

    server = spawn('python3', ['-m', 'http.server', String(PORT)]);

    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
});

test.afterAll(() => {
    if (server) server.kill();
});

test('WebR loads with pinned version', async ({ page }) => {
    let requestedWebR = false;

    // Intercept network requests to check if the specific version is requested
    await page.route('**', route => {
        const url = route.request().url();
        if (url.includes('webr.r-wasm.org/v0.5.8/webr.mjs')) {
            requestedWebR = true;
        }
        route.continue();
    });

    // Check for console errors
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    await page.goto(`http://localhost:${PORT}/basics.html`);

    // The page initially shows "Brewing R Engine..."
    const banner = page.locator('text=Brewing R Engine...');
    await expect(banner).toBeVisible({ timeout: 10000 });

    // Verify correct URL was requested
    expect(requestedWebR).toBe(true);

    // Check for critical errors (excluding benign ones if any)
    const criticalErrors = errors.filter(e => e.includes('TypeError') || e.includes('SyntaxError') || e.includes('404'));
    expect(criticalErrors).toEqual([]);
});

test('WebR does NOT load on static page (index.html)', async ({ page }) => {
    let requestedWebR = false;

    // Intercept network requests to check if WebR is requested
    await page.route('**', route => {
        const url = route.request().url();
        if (url.includes('webr.r-wasm.org/v0.5.8/webr.mjs')) {
            requestedWebR = true;
        }
        route.continue();
    });

    await page.goto(`http://localhost:${PORT}/index.html`);

    // The page should NOT show "Brewing R Engine..."
    const banner = page.locator('text=Brewing R Engine...');
    await expect(banner).not.toBeVisible({ timeout: 5000 });

    // Verify WebR was NOT requested
    expect(requestedWebR).toBe(false);
});
