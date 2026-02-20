import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8001; // Different port to avoid conflict
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

test('Benchmark WebR load time on wrangling.html', async ({ page }) => {
    // Navigate to the page
    const startTime = Date.now();
    await page.goto(`http://localhost:${PORT}/wrangling.html`);

    // The page initially shows "Brewing R Engine..."
    // Wait for "R is Ready!" banner
    const banner = page.locator('text=R is Ready!');
    await expect(banner).toBeVisible({ timeout: 60000 }); // Give it enough time

    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`WebR Load Time: ${duration} ms`);
});
