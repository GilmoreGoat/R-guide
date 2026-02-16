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

test('escapeHTML should handle numeric input', () => {
    assert.strictEqual(escapeHTML(123), '123');
    assert.strictEqual(escapeHTML(0), '0');
    assert.strictEqual(escapeHTML(123.45), '123.45');
});

test('escapeHTML should handle object input', () => {
    assert.strictEqual(escapeHTML({}), '[object Object]');
    assert.strictEqual(escapeHTML([]), '');
});

test('escapeHTML should handle mixed special characters', () => {
    assert.strictEqual(escapeHTML('<div class="test">'), '&lt;div class=&quot;test&quot;&gt;');
    assert.strictEqual(escapeHTML("O'Reilly & Co."), "O&#39;Reilly &amp; Co.");
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

test('normalizeCode should handle different whitespace characters', () => {
    assert.strictEqual(normalizeCode('a\tb\nc'), 'abc');
    assert.strictEqual(normalizeCode(' a   b '), 'ab');
    assert.strictEqual(normalizeCode('\n\t\r'), '');
});

test('normalizeCode should handle mixed and nested quotes', () => {
    assert.strictEqual(normalizeCode('print("say \'hi\'")'), 'print("say"hi"")');
    assert.strictEqual(normalizeCode("print('say \"hi\"')"), 'print("say"hi"")');
});

test('normalizeCode should handle empty and whitespace-only strings', () => {
    assert.strictEqual(normalizeCode(''), '');
    assert.strictEqual(normalizeCode('   '), '');
    assert.strictEqual(normalizeCode('\t\n'), '');
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

test('compareCode should handle formatting differences', () => {
    assert.strictEqual(compareCode('x <- 5', 'x<-5'), true);
    assert.strictEqual(compareCode('x  <-  5', 'x<-5'), true);
    assert.strictEqual(compareCode('x\n<-\n5', 'x<-5'), true);
});

test('compareCode should handle quote style differences', () => {
    assert.strictEqual(compareCode('print("hello")', "print('hello')"), true);
    assert.strictEqual(compareCode("print('hello')", 'print("hello")'), true);
});
