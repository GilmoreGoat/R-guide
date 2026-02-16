export function normalizeCode(code) {
    if (code === undefined || code === null) {
        return "";
    }
    return code.replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
}

export function compareCode(userCode, expectedAnswer) {
    return normalizeCode(userCode) === normalizeCode(expectedAnswer);
}
