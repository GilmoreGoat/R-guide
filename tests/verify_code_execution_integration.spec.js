import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8003;
let server;

test.beforeAll(async () => {
    try {
      const { execSync } = await import('child_process');
      execSync(`lsof -t -i :${PORT} | xargs kill -9`, { stdio: 'ignore' });
    } catch (e) {
      // ignore
    }

    server = spawn('python3', ['-m', 'http.server', String(PORT)]);
    await new Promise(resolve => setTimeout(resolve, 2000));
});

test.afterAll(() => {
    if (server) server.kill();
});

const rPages = [
    { name: 'modules/basics.html' },
    { name: 'modules/wrangling.html' },
    { name: 'modules/tidying.html' },
    { name: 'modules/visualization.html' },
    { name: 'modules/statistics.html' },
    { name: 'modules/anova.html' },
    { name: 'modules/regression.html' },
    { name: 'modules/categorical.html' },
    { name: 'modules/module6.html' },
    { name: 'modules/skill_b.html' },
    { name: 'modules/skill_c.html' },
    { name: 'modules/functional.html' },
    { name: 'modules/oop.html' },
    { name: 'modules/debugging.html' },
    { name: 'modules/metaprogramming.html' },
];

for (const { name } of rPages) {
    test(`Verify all code executions on ${name}`, async ({ page }) => {
        test.setTimeout(180000); // Allow more time for multiple inputs

        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });

        await page.goto(`http://localhost:${PORT}/${name}`);

        // Wait for R is Ready
        const banner = page.locator('text=R is Ready');
        await expect(banner).toBeVisible({ timeout: 60000 });

        const checkBtns = page.locator('.check-btn');
        const count = await checkBtns.count();

        console.log(`Found ${count} check buttons on ${name}`);

        if (count === 0) {
             console.log(`No input code found on ${name}, skipping execution test.`);
             return;
        }

        for (let i = 0; i < count; i++) {
            const btn = checkBtns.nth(i);

            // Assume input is the i-th input field
            const inputField = page.locator('.input-code').nth(i);
            const outputDiv = page.locator('.console-output').nth(i);

            // Safety check if input field exists at index i
            if (await inputField.count() === 0) {
                 console.log(`Warning: Mismatch in input vs button count at index ${i} on ${name}`);
                 continue;
            }

            // Scroll into view
            await btn.scrollIntoViewIfNeeded();

            await inputField.fill('1 + 1');
            await btn.click();

            await expect(outputDiv).toContainText('[1] 2', { timeout: 30000 });
        }

        const criticalErrors = errors.filter(e =>
            (e.includes('TypeError') || e.includes('SyntaxError') || e.includes('404')) &&
            !e.includes('favicon')
        );
        expect(criticalErrors).toEqual([]);
    });
}
