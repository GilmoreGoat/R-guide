import { test } from 'node:test';
import assert from 'node:assert';
import { normalizeCode, compareCode } from '../logic.js';

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

test('compareCode should compare correctly', () => {
    assert.strictEqual(compareCode('A', 'a'), true);
    assert.strictEqual(compareCode('A ', 'a'), true);
    assert.strictEqual(compareCode('print("hi")', "print('hi')"), true);
});

test('compareCode should handle missing expected answer', () => {
    assert.strictEqual(compareCode('some code', undefined), false);
    assert.strictEqual(compareCode(undefined, undefined), true);
});
