import { test } from 'node:test';
import assert from 'node:assert';
import { normalizeCode, compareCode, escapeHTML } from '../logic.js';

test('escapeHTML should escape dangerous characters', () => {
    assert.strictEqual(escapeHTML('<script>'), '&lt;script&gt;');
    assert.strictEqual(escapeHTML('hello & world'), 'hello &amp; world');
    assert.strictEqual(escapeHTML('"quote"'), '&quot;quote&quot;');
    assert.strictEqual(escapeHTML("'single'"), '&#39;single&#39;');
});

test('escapeHTML should handle empty or null input', () => {
    assert.strictEqual(escapeHTML(''), '');
    assert.strictEqual(escapeHTML(null), null);
    assert.strictEqual(escapeHTML(undefined), undefined);
});

test('normalizeCode should handle standard input', () => {
    assert.strictEqual(normalizeCode('  ggplot2  '), 'ggplot2');
    assert.strictEqual(normalizeCode('filter(df, x == 1)'), 'filter(df,x==1)');
});

test('normalizeCode should handle quotes', () => {
    assert.strictEqual(normalizeCode("print('hello')"), 'print("hello")');
});

test('normalizeCode should handle undefined', () => {
    assert.strictEqual(normalizeCode(undefined), '');
});

test('normalizeCode should handle null', () => {
    assert.strictEqual(normalizeCode(null), '');
});

test('normalizeCode should handle non-string inputs', () => {
    assert.strictEqual(normalizeCode(123), '123');
    assert.strictEqual(normalizeCode(true), 'true');
    assert.strictEqual(normalizeCode({}), '[objectobject]');
    assert.strictEqual(normalizeCode([]), '');
});

test('compareCode should compare correctly', () => {
    assert.strictEqual(compareCode('A', 'a'), true);
    assert.strictEqual(compareCode('A ', 'a'), true);
    assert.strictEqual(compareCode('print("hi")', "print('hi')"), true);
});

test('compareCode should handle missing expected answer', () => {
    assert.strictEqual(compareCode('some code', undefined), false);
    assert.strictEqual(compareCode(undefined, undefined), true);
});
