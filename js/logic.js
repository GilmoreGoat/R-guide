/**
 * Normalizes code by removing whitespace and quotes, and converting to lowercase.
 * This helps in fuzzy comparison of user code.
 * @param {string} code - The code to normalize.
 * @returns {string} The normalized code string.
 */
export function normalizeCode(code) {
    if (code === undefined || code === null) {
        return "";
    }
    return String(code).toLowerCase().replace(/\s+/g, '').replace(/'/g, '"');
}

/**
 * Compares user code with the expected answer using normalized strings.
 * @param {string} userCode - The code provided by the user.
 * @param {string} expectedAnswer - The correct answer to compare against.
 * @returns {boolean} True if the codes match after normalization.
 */
export function compareCode(userCode, expectedAnswer) {
    return normalizeCode(userCode) === normalizeCode(expectedAnswer);
}

const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const HTML_ESCAPE_REGEX = /[&<>"']/g;

/**
 * Escapes special characters to prevent HTML injection (XSS).
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string safe for HTML insertion.
 */
export const escapeHTML = (str) => {
    if (str === null || str === undefined) return str;
    return String(str).replace(HTML_ESCAPE_REGEX, (m) => HTML_ESCAPES[m]);
};

/**
 * Processes the output from WebR into an HTML string.
 * @param {Array<Object>} output - The output array from WebR.
 * @returns {string} The processed HTML string joined by <br>.
 */
export function processWebROutput(output) {
    if (!output || !Array.isArray(output)) return '';
    return output.map(line => {
        let data = line.data;
        let text = '';
        if (typeof data === 'string') {
            text = data;
        } else if (data === null || data === undefined) {
            text = '';
        } else if (data && typeof data === 'object') {
            if (data.message) {
                text = data.message;
            } else if (Object.keys(data).length === 0) {
                text = '';
            } else {
                try {
                    const str = JSON.stringify(data);
                    text = str === '{}' ? '' : str;
                } catch (e) {
                    text = '';
                }
            }
        } else {
            text = String(data);
        }
        return escapeHTML(text);
    }).join('<br>');
}

/**
 * Processes WebR images (ImageBitmap) into HTML img tags.
 * @param {Array<ImageBitmap>} images - The images from WebR.
 * @returns {string} The HTML string for the images.
 */
export function processWebRImages(images) {
    if (!images || !Array.isArray(images) || images.length === 0) return '';

    // Check if we are in a browser environment with canvas support
    if (typeof document === 'undefined' || typeof ImageBitmap === 'undefined') {
        return '';
    }

    let html = '';
    images.forEach(img => {
        if (img instanceof ImageBitmap) {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            html += `<br><img src="${canvas.toDataURL()}" class="console-img">`;
        }
    });
    return html;
}

export const DEFAULT_PACKAGES = ['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate'];

export const PAGE_PACKAGES = {
    'basics.html': DEFAULT_PACKAGES,
    'wrangling.html': ['dplyr'],
    'tidying.html': ['tidyr', 'dplyr'],
    'visualization.html': ['ggplot2', 'dplyr'],
    'statistics.html': ['dplyr'],
    'anova.html': ['ggplot2', 'dplyr'],
    'regression.html': ['ggplot2', 'dplyr'],
    'categorical.html': ['ggplot2', 'dplyr'],
    'module6.html': ['dplyr'],
    'skill_b.html': ['lubridate', 'dplyr'],
    'skill_c.html': ['stringr', 'tidyr', 'dplyr'],
    'functional.html': ['purrr', 'dplyr'],
    'oop.html': ['R6', 'dplyr']
};

/**
 * Determines the required R packages based on the current page path.
 * @param {string} pagePath - The window.location.pathname.
 * @returns {Array<string>} An array of unique package names.
 */
export function getRequiredPackages(pagePath) {
    const pageName = pagePath ? pagePath.split('/').pop() : '';
    let requiredPackages = PAGE_PACKAGES[pageName] || DEFAULT_PACKAGES;
    // Remove duplicates
    return [...new Set(requiredPackages)];
}
