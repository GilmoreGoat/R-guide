import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8002;
let server;

test.beforeAll(async () => {
    try {
      const { execSync } = await import('child_process');
      execSync(`lsof -t -i :${PORT} | xargs kill -9`, { stdio: 'ignore' });
    } catch (e) { }

    server = spawn('python3', ['-m', 'http.server', String(PORT)]);
    await new Promise(resolve => setTimeout(resolve, 2000));
});

test.afterAll(() => {
    if (server) server.kill();
});

test('Benchmark WebR load time (average of 5 runs)', async ({ page }) => {
    test.setTimeout(120000);
    const iterations = 5;
    let totalTime = 0;

    console.log('--- Starting WebR Load Time Benchmark ---');

    for (let i = 0; i < iterations; i++) {
        const startTime = Date.now();
        await page.goto(`http://localhost:${PORT}/modules/wrangling.html`);

        // Wait for the "R is Ready" message in the banner
        const banner = page.locator('text=R is Ready');
        await expect(banner).toBeVisible({ timeout: 60000 });

        const duration = Date.now() - startTime;
        console.log(`Run ${i+1}: ${duration} ms`);
        totalTime += duration;
    }

    const avgTime = totalTime / iterations;
    console.log(`Average Load Time: ${avgTime} ms`);
    console.log('--- Benchmark Complete ---');
});
