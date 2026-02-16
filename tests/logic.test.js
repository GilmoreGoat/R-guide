import { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizeCode, compareCode, escapeHTML } from '../logic.js';

describe('escapeHTML', () => {
    it('should escape dangerous characters', () => {
        assert.strictEqual(escapeHTML('<script>'), '&lt;script&gt;');
        assert.strictEqual(escapeHTML('hello & world'), 'hello &amp; world');
        assert.strictEqual(escapeHTML('"quote"'), '&quot;quote&quot;');
        assert.strictEqual(escapeHTML("'single'"), '&#39;single&#39;');
        assert.strictEqual(escapeHTML('>'), '&gt;');
    });

    it('should handle empty or null input', () => {
        assert.strictEqual(escapeHTML(''), '');
        assert.strictEqual(escapeHTML(null), null);
        assert.strictEqual(escapeHTML(undefined), undefined);
    });
});

describe('normalizeCode', () => {
    it('should handle standard input', () => {
        assert.strictEqual(normalizeCode('  ggplot2  '), 'ggplot2');
        assert.strictEqual(normalizeCode('filter(df, x == 1)'), 'filter(df,x==1)');
    });

    it('should handle quotes', () => {
        assert.strictEqual(normalizeCode("print('hello')"), 'print("hello")');
    });

    it('should handle undefined', () => {
        assert.strictEqual(normalizeCode(undefined), '');
    });

    it('should handle null', () => {
        assert.strictEqual(normalizeCode(null), '');
    });

    it('should handle non-string inputs', () => {
        assert.strictEqual(normalizeCode(123), '123');
        assert.strictEqual(normalizeCode(true), 'true');
        assert.strictEqual(normalizeCode({}), '[objectobject]');
        assert.strictEqual(normalizeCode([]), '');
    });

    it('should handle different whitespace characters', () => {
        assert.strictEqual(normalizeCode('a\tb\nc'), 'abc');
        assert.strictEqual(normalizeCode(' a   b '), 'ab');
        assert.strictEqual(normalizeCode('\n\t\r'), '');
    });

    it('should handle mixed and nested quotes', () => {
        assert.strictEqual(normalizeCode('print("say \'hi\'")'), 'print("say"hi"")');
        assert.strictEqual(normalizeCode("print('say \"hi\"')"), 'print("say"hi"")');
    });

    it('should handle empty and whitespace-only strings', () => {
        assert.strictEqual(normalizeCode(''), '');
        assert.strictEqual(normalizeCode('   '), '');
        assert.strictEqual(normalizeCode('\t\n'), '');
    });
});

describe('compareCode', () => {
    it('should compare correctly', () => {
        assert.strictEqual(compareCode('A', 'a'), true);
        assert.strictEqual(compareCode('A ', 'a'), true);
        assert.strictEqual(compareCode('print("hi")', "print('hi')"), true);
    });

    it('should handle missing expected answer', () => {
        assert.strictEqual(compareCode('some code', undefined), false);
        assert.strictEqual(compareCode(undefined, undefined), true);
    });

    it('should handle formatting differences', () => {
        assert.strictEqual(compareCode('x <- 5', 'x<-5'), true);
        assert.strictEqual(compareCode('x  <-  5', 'x<-5'), true);
        assert.strictEqual(compareCode('x\n<-\n5', 'x<-5'), true);
    });

    it('should handle quote style differences', () => {
        assert.strictEqual(compareCode('print("hello")', "print('hello')"), true);
        assert.strictEqual(compareCode("print('hello')", 'print("hello")'), true);
    });
});
