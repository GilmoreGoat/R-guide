import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

test('script.js code health', (t) => {
    const content = fs.readFileSync('script.js', 'utf8');

    // Ensure escapeHTML is not redefined locally
    assert.ok(!content.includes('const escapeHTML = (str) => {'), 'script.js should not redefine escapeHTML locally');
    assert.ok(!content.includes('function escapeHTML(str) {'), 'script.js should not redefine escapeHTML locally');

    // Ensure escapeHTML is imported from logic.js
    assert.match(content, /import { .*escapeHTML.* } from '\.\/logic\.js'/, 'script.js should import escapeHTML from ./logic.js');

    // Ensure getRequiredPackages is imported from logic.js
    assert.match(content, /import { .*getRequiredPackages.* } from '\.\/logic\.js'/, 'script.js should import getRequiredPackages from ./logic.js');

    // Ensure package constants are removed from script.js
    assert.ok(!content.includes('const PAGE_PACKAGES = {'), 'script.js should not define PAGE_PACKAGES locally');
    assert.ok(!content.includes('const DEFAULT_PACKAGES = ['), 'script.js should not define DEFAULT_PACKAGES locally');
});
