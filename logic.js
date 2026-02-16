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
    return String(code).replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
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
