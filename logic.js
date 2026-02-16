export function normalizeCode(code) {
    if (code === undefined || code === null) {
        return "";
    }
    return String(code).replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
}

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

export const escapeHTML = (str) => {
    if (str === null || str === undefined) return str;
    return String(str).replace(/[&<>"']/g, (m) => HTML_ESCAPES[m]);
};
