/**
 * SMART NAVIGATION SCRIPT for reference.html
 */

/**
 * Opens a specific section in reference.html
 * @param {string} id - The ID of the details element to open.
 */
export function openSection(id) {
    // 1. Close all other sections
    document.querySelectorAll('details').forEach((el) => {
        el.removeAttribute('open');
    });
    // 2. Open target
    const target = document.getElementById(id);
    if (target) {
        target.setAttribute('open', '');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach click handlers to all .toc-btn elements
    document.querySelectorAll('.toc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            if (sectionId) {
                openSection(sectionId);
            }
        });
    });
});
