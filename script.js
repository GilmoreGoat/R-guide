import { compareCode, escapeHTML, processWebROutput } from './logic.js';
import { R_DATA_INIT } from './r_data.js';

// Utility functions (escapeHTML, compareCode, processWebROutput) are consolidated in logic.js
// Note: Ensure utility functions are not redefined locally.
const COLORS = {
    // Theme Colors
    lukeYellow: 'var(--luke-yellow)',
    coffeeDark: 'var(--coffee-dark)',
    yaleBlue: 'var(--yale-blue)',

    // Status Colors
    success: 'var(--success-color)',
    error: 'var(--error-color)',
    warning: 'var(--warning-color)',

    // UI Colors
    lightBlueBg: 'var(--light-blue-bg)',
    muted: 'var(--muted-color)',
    subtle: 'var(--subtle-color)',
    borderDark: 'var(--border-dark)'
};

const DEFAULT_PACKAGES = ['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate'];

const PAGE_PACKAGES = {
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
    'skill_c.html': ['stringr', 'tidyr', 'dplyr']
};


document.addEventListener('DOMContentLoaded', async () => {
    // --- 1. UI SETUP ---
    const fab = document.createElement('div');
    fab.className = 'cheat-fab';
    fab.innerText = '?';
    document.body.appendChild(fab);

    const menu = document.createElement('div');
    menu.className = 'cheat-menu';
    menu.innerHTML = `
        <div class="cheat-item cheat-item-pkg-btn" id="btn-load-pkg">
            <strong>📦 Load Tidyverse</strong><br><span class="cheat-item-subtext">Click to install packages</span>
        </div>
        <hr class="cheat-menu-hr">
        <div class="cheat-item"><strong>filter()</strong>: Pick Rows</div>
        <div class="cheat-item"><strong>select()</strong>: Pick Columns</div>
        <div class="cheat-item"><strong>mutate()</strong>: New Column</div>
        <div class="cheat-item"><strong>ggplot()</strong>: Start Plot</div>
    `;
    document.body.appendChild(menu);

    // --- 5. COPY BUTTONS ---
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const codeElement = block.querySelector('code');
        if (!codeElement) return;

        const button = document.createElement('button');
        button.innerText = 'Copy';
        button.className = 'copy-btn';
        button.addEventListener('click', () => {
            const codeText = codeElement.innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = button.innerText;
                button.innerText = 'Copied!';
                setTimeout(() => { button.innerText = originalText; }, 2000);
            });
        });
        block.appendChild(button);
    });

    const checkBtns = document.querySelectorAll('.check-btn');

    if (checkBtns.length > 0) {
        const loadingBanner = document.createElement('div');
        loadingBanner.className = 'loading-banner';
        loadingBanner.innerText = "☕ Brewing R Engine...";
        document.body.appendChild(loadingBanner);

        // --- 2. INITIALIZE WEBR ---
        const { WebR } = await import('https://webr.r-wasm.org/v0.5.8/webr.mjs');
        const webR = new WebR();
        await webR.init();

        // --- 3. AUTO-LOAD PACKAGES & DATA ---
        loadingBanner.innerText = "📦 Downloading Packages... This takes ~20s";

        // Determine required packages based on the current page
        const pagePath = window.location.pathname;
        const pageName = pagePath.split('/').pop();
        let requiredPackages = PAGE_PACKAGES[pageName] || DEFAULT_PACKAGES;

        // Remove duplicates
        requiredPackages = [...new Set(requiredPackages)];

        try {
            await webR.installPackages(requiredPackages);

            const libraryCalls = requiredPackages.map(pkg => `library(${pkg})`).join('\n');

            await webR.evalR(`
                ${libraryCalls}
                ${R_DATA_INIT}
            `);

            loadingBanner.classList.add('is-success');
            loadingBanner.innerText = "R is Ready! 🚀";
            setTimeout(() => { loadingBanner.classList.add('is-hidden'); }, 2000);

        } catch (e) {
            loadingBanner.classList.add('is-error');
            loadingBanner.innerText = "Error loading packages. Refresh page.";
            console.error(e);
        }

        // --- 4. EXECUTION LOGIC ---
        checkBtns.forEach(btn => {
            const container = btn.closest('.editor-container') || btn.closest('.question-box');
            const input = container.querySelector('.input-code');
            const consoleDiv = container.querySelector('.console-output');

            btn.addEventListener('click', async function() {
                let userCode = input.value;
                if (!userCode || userCode.trim() === "") return;

                const expectedAnswer = this.dataset.answer;
                const isCorrect = compareCode(userCode, expectedAnswer);

                // THE WRAPPER:
                // 1. val <- { code } -> Runs user code in a block.
                // 2. print(val) -> Prints the result. If it's a plot, webR captures it.
                const wrappedCode = `
                    val <- {
                        ${userCode}
                    }
                    print(val)
                    invisible(NULL)
                `;

                consoleDiv.classList.add('is-visible');
                consoleDiv.innerHTML = `<span class="console-user-code">> ${escapeHTML(userCode)}</span><br><span class="console-status-running">Running...</span>`;

                try {
                    const shelter = await new webR.Shelter();

                    // Use captureR to handle everything (including plots)
                    const result = await shelter.captureR(wrappedCode, {
                        withAutoprint: false,
                        captureStreams: true,
                        captureConditions: true
                    });

                    // Process Text
                    let outputHTML = processWebROutput(result.output);

                    // Process Plots (from result.images)
                    if (result.images.length > 0) {
                        const img = result.images[0];
                        if (img instanceof ImageBitmap) {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            outputHTML += '<br><img src="' + canvas.toDataURL() + '" class="console-img">';
                        }
                    }

                    shelter.purge();

                    if (!outputHTML && !result.images.length) {
                        outputHTML = `<span class="console-status-info">(Value saved)</span>`;
                    }

                    // Grading
                    input.classList.remove('is-success', 'is-warning', 'is-error');
                    if (isCorrect) {
                        consoleDiv.innerHTML = `<span class="console-status-success">> ${escapeHTML(userCode)}</span><br>${outputHTML}`;
                        input.classList.add('is-success');
                    } else {
                        consoleDiv.innerHTML = `<span class="console-status-warning">> ${escapeHTML(userCode)}</span><br>${outputHTML}<br><br><span class="console-status-warning console-bold">⚠️ Paris says: "The code works, but that's not what I asked for."</span>`;
                        input.classList.add('is-warning');
                    }

                } catch (e) {
                    input.classList.remove('is-success', 'is-warning', 'is-error');
                    let errorMsg = escapeHTML(e.message);
                    if (errorMsg.includes("could not find function")) {
                        errorMsg += `<br><br><strong>Tip:</strong> Packages might still be loading. Wait for the green banner!`;
                    }
                    consoleDiv.innerHTML = `<span class="console-user-code">> ${escapeHTML(userCode)}</span><br><span class="console-status-error">${errorMsg}</span>`;
                    input.classList.add('is-error');
                }
            });
        });
    }

});
