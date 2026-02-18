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

const pages = [
    { name: 'basics.html', packages: ['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate'] }, // Uses default
    { name: 'wrangling.html', packages: ['dplyr'] },
    { name: 'tidying.html', packages: ['tidyr', 'dplyr'] },
    { name: 'visualization.html', packages: ['ggplot2', 'dplyr'] },
    { name: 'statistics.html', packages: ['dplyr'] },
    { name: 'anova.html', packages: ['ggplot2', 'dplyr'] },
    { name: 'regression.html', packages: ['ggplot2', 'dplyr'] },
    { name: 'categorical.html', packages: ['ggplot2', 'dplyr'] },
    { name: 'module6.html', packages: ['dplyr'] },
    { name: 'skill_b.html', packages: ['lubridate', 'dplyr'] },
    { name: 'skill_c.html', packages: ['stringr', 'tidyr', 'dplyr'] },
];

for (const { name, packages } of pages) {
    test(`Verify ${name} loads correctly`, async ({ page }) => {
        // Capture console errors
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto(`http://localhost:${PORT}/${name}`);

        // Wait for R is Ready
        const banner = page.locator('text=R is Ready! 🚀');
        await expect(banner).toBeVisible({ timeout: 60000 });

        // Check for no critical errors
        const criticalErrors = errors.filter(e =>
            (e.includes('TypeError') || e.includes('SyntaxError') || e.includes('404')) &&
            !e.includes('favicon') // Ignore favicon errors
        );
        expect(criticalErrors).toEqual([]);
    });
}
