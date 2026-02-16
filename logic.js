export function normalizeCode(code) {
    if (code === undefined || code === null) {
        return "";
    }
    return String(code).replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
}

export function compareCode(userCode, expectedAnswer) {
    return normalizeCode(userCode) === normalizeCode(expectedAnswer);
}

export const escapeHTML = (str) => {
    if (!str) return str;
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[m]);
};
