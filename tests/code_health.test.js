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
});
