import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getRequiredPackages, DEFAULT_PACKAGES } from '../js/logic.js';

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
        // functional.html -> ['purrr', 'dplyr']
        assert.deepStrictEqual(getRequiredPackages('functional.html'), ['purrr', 'dplyr']);
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
