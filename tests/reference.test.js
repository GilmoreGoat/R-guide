import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';

// Mocking DOM
class MockElement {
    constructor(id = '', tagName = '') {
        this.id = id;
        this.tagName = tagName.toUpperCase();
        this.attributes = new Map();
        this.scrollIntoViewCalled = false;
        this.scrollIntoViewOptions = null;
    }

    setAttribute(name, value) {
        this.attributes.set(name, value);
    }

    removeAttribute(name) {
        this.attributes.delete(name);
    }

    hasAttribute(name) {
        return this.attributes.has(name);
    }

    getAttribute(name) {
        return this.attributes.get(name);
    }

    scrollIntoView(options) {
        this.scrollIntoViewCalled = true;
        this.scrollIntoViewOptions = options;
    }
}

const mockDetails = [
    new MockElement('setup', 'details'),
    new MockElement('basics', 'details'),
    new MockElement('math', 'details'),
];

global.document = {
    querySelectorAll: (selector) => {
        if (selector === 'details') return mockDetails;
        if (selector === '.toc-btn') return [];
        return [];
    },
    getElementById: (id) => mockDetails.find(el => el.id === id) || null,
    addEventListener: (event, cb) => {
        // We can trigger this manually if needed, but for now we just want to avoid errors on import
    }
};

// Now import the function
const { openSection } = await import('../js/reference.js');

describe('openSection', () => {
    beforeEach(() => {
        mockDetails.forEach(el => {
            el.removeAttribute('open');
            el.scrollIntoViewCalled = false;
            el.scrollIntoViewOptions = null;
        });
    });

    it('should close all other sections and open the target', () => {
        mockDetails[1].setAttribute('open', ''); // Start with one open

        openSection('setup');

        assert.strictEqual(mockDetails[0].hasAttribute('open'), true, 'Target section should be open');
        assert.strictEqual(mockDetails[1].hasAttribute('open'), false, 'Previously open section should be closed');
        assert.strictEqual(mockDetails[2].hasAttribute('open'), false, 'Other section should remain closed');
    });

    it('should call scrollIntoView on the target', () => {
        openSection('basics');
        assert.strictEqual(mockDetails[1].scrollIntoViewCalled, true, 'scrollIntoView should be called');
        assert.deepStrictEqual(mockDetails[1].scrollIntoViewOptions, { behavior: 'smooth', block: 'start' }, 'scrollIntoView options should match');
    });

    it('should close existing sections even if target is not found', () => {
        mockDetails[0].setAttribute('open', '');

        openSection('non-existent');

        assert.strictEqual(mockDetails[0].hasAttribute('open'), false, 'Existing sections should be closed even if target not found');
    });

    it('should handle non-existent target gracefully', () => {
        // This test ensures no error is thrown when getElementById returns null
        assert.doesNotThrow(() => openSection('non-existent'));
    });
});
