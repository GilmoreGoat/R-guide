import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 8002;
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
    { name: 'basics.html' },
    { name: 'wrangling.html' },
    { name: 'tidying.html' },
    { name: 'visualization.html' },
    { name: 'statistics.html' },
    { name: 'anova.html' },
    { name: 'regression.html' },
    { name: 'categorical.html' },
    { name: 'module6.html' },
    { name: 'skill_b.html' },
    { name: 'skill_c.html' },
    { name: 'oop.html' },
];

const staticPages = [
    'index.html',
    'about.html',
    'reference.html',
    'syllabus.html'
];

for (const { name } of rPages) {
    test(`Verify R page ${name} loads correctly`, async ({ page }) => {
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });

        await page.goto(`http://localhost:${PORT}/${name}`);

        // Wait for R is Ready
        const banner = page.locator('text=R is Ready!');
        await expect(banner).toBeVisible({ timeout: 60000 });

        const criticalErrors = errors.filter(e =>
            (e.includes('TypeError') || e.includes('SyntaxError') || e.includes('404')) &&
            !e.includes('favicon')
        );
        expect(criticalErrors).toEqual([]);
    });
}

for (const name of staticPages) {
    test(`Verify static page ${name} loads correctly`, async ({ page }) => {
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });

        await page.goto(`http://localhost:${PORT}/${name}`);
        await expect(page).toHaveTitle(/.+/);

        const criticalErrors = errors.filter(e =>
            (e.includes('TypeError') || e.includes('SyntaxError') || e.includes('404')) &&
            !e.includes('favicon')
        );
        expect(criticalErrors).toEqual([]);
    });
}

test('Verify reference.html navigation works', async ({ page }) => {
    await page.goto(`http://localhost:${PORT}/reference.html`);
    const setupBtn = page.locator('button[data-section="setup"]');
    await setupBtn.click();
    const setupSection = page.locator('details#setup');
    await expect(setupSection).toHaveAttribute('open', '');

    const basicsBtn = page.locator('button[data-section="basics"]');
    await basicsBtn.click();
    const basicsSection = page.locator('details#basics');
    await expect(basicsSection).toHaveAttribute('open', '');
    await expect(setupSection).not.toHaveAttribute('open');
});
