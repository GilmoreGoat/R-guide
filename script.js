import { compareCode, escapeHTML, processWebROutput, processWebRImages, getRequiredPackages } from './logic.js';
import { R_DATA_INIT } from './r_data.js';

// Utility functions (escapeHTML, compareCode, processWebROutput, getRequiredPackages) are consolidated in logic.js
// Note: Ensure utility functions are not redefined locally.

// --- GILMORE-ISMS & ANIMATIONS ---
const GILMORE_QUOTES = [
    "☕ Pouring the first cup...",
    "📖 Reading Rory's entire reading list...",
    "🗣️ Talking faster than a speeding bullet...",
    "❄️ I smell snow...",
    "🍔 Ordering everything at Luke's...",
    "🎬 Movie night at the Black-White-Read...",
    "🏫 Late for Chilton...",
    "📰 Printing the Gazette...",
    "🚜 Kirk is doing something weird...",
    "🕺 Miss Patty is leading warm-ups..."
];

function createFallingLeaves() {
    const style = document.createElement('style');
    style.innerHTML = `
        .falling-leaf {
            position: fixed;
            top: -10%;
            font-size: 20px;
            user-select: none;
            pointer-events: none;
            z-index: 0; /* Behind content if possible, or very low z-index */
            animation: fall linear forwards;
        }
        @keyframes fall {
            to { transform: translateY(110vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    const leaves = ['🍂', '🍁', '🍃', '🌰'];

    // Create a leaf every few seconds
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.innerText = leaves[Math.floor(Math.random() * leaves.length)];

        // Randomize position and speed
        const startLeft = Math.random() * 100;
        const duration = Math.random() * 5 + 5; // 5-10s
        const size = Math.random() * 1.5 + 0.5; // 0.5x - 2x

        leaf.style.left = `${startLeft}vw`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.fontSize = `${size}em`;
        leaf.style.opacity = Math.random() * 0.5 + 0.2; // Subtle opacity

        document.body.appendChild(leaf);

        // Cleanup
        setTimeout(() => { leaf.remove(); }, duration * 1000);
    }, 2000); // New leaf every 2s
}

document.addEventListener('DOMContentLoaded', async () => {
    // Start the autumn vibes
    createFallingLeaves();

    // --- 1. UI SETUP ---
    const fab = document.createElement('div');
    fab.className = 'cheat-fab';
    fab.innerText = '?'; // Or a coffee cup icon via CSS content
    fab.setAttribute('title', 'Cheat Sheet');
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

        // Cycle quotes
        let quoteInterval = setInterval(() => {
            if (loadingBanner.classList.contains('is-success') || loadingBanner.classList.contains('is-error')) {
                clearInterval(quoteInterval);
            } else {
                loadingBanner.innerText = GILMORE_QUOTES[Math.floor(Math.random() * GILMORE_QUOTES.length)];
            }
        }, 3000);

        // --- 2. INITIALIZE WEBR ---
        const { WebR } = await import('https://webr.r-wasm.org/v0.5.8/webr.mjs');
        const webR = new WebR();
        await webR.init();

        // --- 3. AUTO-LOAD PACKAGES & DATA ---
        // Determine required packages based on the current page
        const requiredPackages = getRequiredPackages(window.location.pathname);

        try {
            await webR.installPackages(requiredPackages);

            const libraryCalls = requiredPackages.map(pkg => `library(${pkg})`).join('\n');

            await webR.evalR(`
                ${libraryCalls}
                ${R_DATA_INIT}
            `);

            loadingBanner.classList.add('is-success');
            loadingBanner.innerText = "R is Ready! Oy with the poodles already! 🐩";
            setTimeout(() => { loadingBanner.classList.add('is-hidden'); }, 3000);

        } catch (e) {
            loadingBanner.classList.add('is-error');
            loadingBanner.innerText = "Error loading packages. Paris is not pleased.";
            console.error(e);
        }

        // --- 4. EXECUTION LOGIC ---
        document.addEventListener('click', async (event) => {
            const btn = event.target.closest('.check-btn');
            if (!btn) return;

            const container = btn.closest('.editor-container') || btn.closest('.question-box');
            if (!container) return;

            const input = container.querySelector('.input-code');
            const consoleDiv = container.querySelector('.console-output');

            let userCode = input.value;
            if (!userCode || userCode.trim() === "") return;

            const expectedAnswer = btn.dataset.answer;
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
                consoleDiv.innerHTML = `<span class="console-user-code">> ${escapeHTML(userCode)}</span><br><span class="console-status-running">Running... (Faster! Faster!)</span>`;

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
                    outputHTML += processWebRImages(result.images);

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
    }

});
