import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { PAGE_PACKAGES, getRequiredPackages, DEFAULT_PACKAGES } from '../logic.js';

describe('Package Configuration Validation', () => {
    it('should have all keys in PAGE_PACKAGES corresponding to existing HTML files', () => {
        const files = fs.readdirSync('.');
        const htmlFiles = files.filter(f => f.endsWith('.html'));

        for (const pageName in PAGE_PACKAGES) {
            assert.ok(htmlFiles.includes(pageName), `PAGE_PACKAGES key "${pageName}" should correspond to an existing HTML file in the repository.`);
        }
    });

    it('should have only strings in package lists', () => {
        for (const pageName in PAGE_PACKAGES) {
            const pkgs = PAGE_PACKAGES[pageName];
            assert.ok(Array.isArray(pkgs), `Packages for ${pageName} should be an array.`);
            pkgs.forEach(pkg => {
                assert.strictEqual(typeof pkg, 'string', `Package name in ${pageName} should be a string.`);
            });
        }
    });
});

describe('getRequiredPackages', () => {
    it('should return DEFAULT_PACKAGES for empty or null path', () => {
        const expected = [...new Set(DEFAULT_PACKAGES)];
        assert.deepStrictEqual(getRequiredPackages(null), expected);
        assert.deepStrictEqual(getRequiredPackages(''), expected);
    });

    it('should return correct packages for a known page', () => {
        // wrangling.html -> ['dplyr']
        assert.deepStrictEqual(getRequiredPackages('wrangling.html'), ['dplyr']);
        assert.deepStrictEqual(getRequiredPackages('/path/to/wrangling.html'), ['dplyr']);
    });

    it('should return DEFAULT_PACKAGES for an unknown page', () => {
        const expected = [...new Set(DEFAULT_PACKAGES)];
        assert.deepStrictEqual(getRequiredPackages('unknown.html'), expected);
    });

    it('should handle paths with no extension or different extensions', () => {
        const expected = [...new Set(DEFAULT_PACKAGES)];
        assert.deepStrictEqual(getRequiredPackages('/some/path/'), expected);
        assert.deepStrictEqual(getRequiredPackages('/some/file.txt'), expected);
    });
});
