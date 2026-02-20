import { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizeCode, compareCode, escapeHTML, processWebROutput, getRequiredPackages } from '../logic.js';

describe('getRequiredPackages', () => {
    it('should return default packages for unknown page', () => {
        const result = getRequiredPackages('/unknown.html');
        assert.deepStrictEqual(result, ['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate']);
    });

    it('should return specific packages for known page', () => {
        const result = getRequiredPackages('/wrangling.html');
        assert.deepStrictEqual(result, ['dplyr']);
    });

    it('should return multiple packages for some pages', () => {
        const result = getRequiredPackages('/tidying.html');
        assert.deepStrictEqual(result, ['tidyr', 'dplyr']);
    });

    it('should handle paths with directories', () => {
        const result = getRequiredPackages('/subdir/wrangling.html');
        assert.deepStrictEqual(result, ['dplyr']);
    });

    it('should handle root path', () => {
         const result = getRequiredPackages('/');
         assert.deepStrictEqual(result, ['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate']);
    });

    it('should handle empty path', () => {
         const result = getRequiredPackages('');
         assert.deepStrictEqual(result, ['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate']);
    });

    it('should ensure uniqueness of returned packages', () => {
        const result = getRequiredPackages('/visualization.html');
        const unique = [...new Set(result)];
        assert.strictEqual(result.length, unique.length);
    });
});

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

    it('should handle numeric input', () => {
        assert.strictEqual(escapeHTML(123), '123');
        assert.strictEqual(escapeHTML(0), '0');
        assert.strictEqual(escapeHTML(123.45), '123.45');
    });

    it('should handle object input', () => {
        assert.strictEqual(escapeHTML({}), '[object Object]');
        assert.strictEqual(escapeHTML([]), '');
    });

    it('should handle mixed special characters', () => {
        assert.strictEqual(escapeHTML('<div class="test">'), '&lt;div class=&quot;test&quot;&gt;');
        assert.strictEqual(escapeHTML("O'Reilly & Co."), "O&#39;Reilly &amp; Co.");
    });

    it('should handle complex XSS vector', () => {
        const input = `<script>alert("XSS") & 'boo'</script>`;
        const expected = '&lt;script&gt;alert(&quot;XSS&quot;) &amp; &#39;boo&#39;&lt;/script&gt;';
        assert.strictEqual(escapeHTML(input), expected);
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

describe('processWebROutput', () => {
    it('should handle simple string output', () => {
        const output = [{ data: 'Hello' }];
        assert.strictEqual(processWebROutput(output), 'Hello');
    });

    it('should join multiple lines with <br>', () => {
        const output = [{ data: 'Hello' }, { data: 'World' }];
        assert.strictEqual(processWebROutput(output), 'Hello<br>World');
    });

    it('should handle object output with message (e.g. conditions)', () => {
        const output = [{ data: { message: 'Warning' } }];
        assert.strictEqual(processWebROutput(output), 'Warning');
    });

    it('should handle empty objects', () => {
        const output = [{ data: {} }];
        assert.strictEqual(processWebROutput(output), '');
    });

    it('should JSON stringify other objects and escape HTML', () => {
         const output = [{ data: { foo: 'bar' } }];
         // JSON.stringify({foo:'bar'}) -> '{"foo":"bar"}'
         // escapeHTML('{"foo":"bar"}') -> '{&quot;foo&quot;:&quot;bar&quot;}'
         assert.strictEqual(processWebROutput(output), '{&quot;foo&quot;:&quot;bar&quot;}');
    });

    it('should handle non-string, non-object data', () => {
        const output = [{ data: 123 }, { data: true }];
        assert.strictEqual(processWebROutput(output), '123<br>true');
    });

    it('should handle mixed content types', () => {
        const output = [
            { data: 'Line 1' },
            { data: { message: 'Line 2' } },
            { data: 123 }
        ];
        assert.strictEqual(processWebROutput(output), 'Line 1<br>Line 2<br>123');
    });

    it('should escape HTML in string data', () => {
        const output = [{ data: '<script>' }];
        assert.strictEqual(processWebROutput(output), '&lt;script&gt;');
    });

    it('should handle empty input array', () => {
        assert.strictEqual(processWebROutput([]), '');
    });

    it('should handle null/undefined input', () => {
        assert.strictEqual(processWebROutput(null), '');
        assert.strictEqual(processWebROutput(undefined), '');
    });

    it('should handle null/undefined data in the output array gracefully', () => {
        assert.strictEqual(processWebROutput([{ data: null }]), '');
        assert.strictEqual(processWebROutput([{ data: undefined }]), '');
    });

     it('should handle circular objects gracefully', () => {
        const circular = {};
        circular.self = circular;
        const output = [{ data: circular }];
        assert.strictEqual(processWebROutput(output), '');
    });
});

describe('processWebRImages', () => {
    it('should return empty string if no images', () => {
        assert.strictEqual(processWebRImages([]), '');
        assert.strictEqual(processWebRImages(null), '');
        assert.strictEqual(processWebRImages(undefined), '');
    });

    it('should return empty string if environment not supported (Node.js)', () => {
        // In Node.js environment, document is undefined
        assert.strictEqual(processWebRImages([{}]), '');
    });

    it('should process image if environment supports it', () => {
        // Mock environment
        const originalDocument = global.document;
        const originalImageBitmap = global.ImageBitmap;

        class MockImageBitmap {
            constructor() { this.width = 100; this.height = 100; }
        }
        global.ImageBitmap = MockImageBitmap;

        global.document = {
            createElement: (tag) => {
                if (tag === 'canvas') return {
                    width: 0, height: 0,
                    getContext: () => ({ drawImage: () => {} }),
                    toDataURL: () => 'data:image/png;base64,fake'
                };
            }
        };

        const img = new MockImageBitmap();
        const result = processWebRImages([img]);
        assert.strictEqual(result, '<br><img src="data:image/png;base64,fake" class="console-img">');

        // Restore
        global.document = originalDocument;
        global.ImageBitmap = originalImageBitmap;
    });
});
