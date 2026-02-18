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

/**
 * Escapes special characters to prevent HTML injection (XSS).
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string safe for HTML insertion.
 */
export const escapeHTML = (str) => {
    if (str === null || str === undefined) return str;
    return String(str).replace(/[&<>"']/g, (m) => HTML_ESCAPES[m]);
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
