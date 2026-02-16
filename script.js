import { WebR } from 'https://webr.r-wasm.org/latest/webr.mjs';

const COLORS = {
    // Theme Colors
    lukeYellow: 'var(--luke-yellow)',
    coffeeDark: 'var(--coffee-dark)',
    yaleBlue: 'var(--yale-blue)',

    // Status Colors
    success: '#2ecc71',
    error: '#e74c3c',
    warning: '#e67e22',

    // UI Colors
    lightBlueBg: '#e8f4f8',
    muted: '#ccc',
    subtle: '#888',
    borderDark: '#333'
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
        <div class="cheat-item" id="btn-load-pkg" style="background:${COLORS.lightBlueBg}; cursor:pointer; border:1px solid ${COLORS.yaleBlue};">
            <strong>📦 Load Tidyverse</strong><br><span style="font-size:0.8em">Click to install packages</span>
        </div>
        <hr style="border:0; border-top:1px dashed ${COLORS.muted}; margin:5px 0;">
        <div class="cheat-item"><strong>filter()</strong>: Pick Rows</div>
        <div class="cheat-item"><strong>select()</strong>: Pick Columns</div>
        <div class="cheat-item"><strong>mutate()</strong>: New Column</div>
        <div class="cheat-item"><strong>ggplot()</strong>: Start Plot</div>
    `;
    document.body.appendChild(menu);

    const loadingBanner = document.createElement('div');
    loadingBanner.style.cssText = `position:fixed; top:0; left:0; width:100%; background:${COLORS.lukeYellow}; color:${COLORS.coffeeDark}; text-align:center; padding:5px; font-weight:bold; z-index:1000; transition: top 0.5s;`;
    loadingBanner.innerText = "☕ Brewing R Engine...";
    document.body.appendChild(loadingBanner);

    // --- 2. INITIALIZE WEBR ---
    const webR = new WebR();
    await webR.init();

    // --- 3. AUTO-LOAD PACKAGES & DATA ---
    loadingBanner.innerText = "📦 Downloading Packages (ggplot2, dplyr)... This takes ~20s";

    try {
        await webR.installPackages(['dplyr', 'ggplot2', 'tidyr', 'stringr', 'lubridate']);

        await webR.evalR(`
            library(dplyr)
            library(ggplot2)
            library(tidyr)
            library(stringr)
            library(lubridate)

            # --- PRE-LOAD DATA ---
            menu <- data.frame(
                item = c("Burger", "Fries", "Coffee", "Pie", "Salad"),
                price = c(12.00, 6.50, 3.00, 5.00, 9.00),
                calories = c(800, 400, 5, 450, 300)
            )
            orders <- data.frame(id = 1:5, tips = c(2.00, 5.00, 0.00, 1.50, 10.00))
            customers <- data.frame(
                name = c("Lorelai", "Rory", "Taylor", "Kirk", "Luke"),
                status = c("VIP", "VIP", "Banned", "Odd", "Owner")
            )
            townies <- data.frame(role = c("Owner", "Mechanic", "Selectman"))
            kitchen <- data.frame(Dish = c("Omelette", "Pancakes"), Monday = c(50, 30), Tuesday = c(40, 35))
            long_data <- data.frame(Dish = c("Omelette", "Omelette", "Pancakes", "Pancakes"), Day = c("Monday", "Tuesday", "Monday", "Tuesday"), Eggs = c(50, 45, 30, 35))
            set.seed(42)
            pumpkins <- data.frame(weight = round(rnorm(200, mean=15, sd=5), 1), type = sample(c("A","B"), 200, replace=TRUE))
            students <- data.frame(house = c("Yale", "Harvard", "Yale", "Yale", "Harvard"), school = c("Chilton","Chilton","StarsHollow","Chilton","StarsHollow"), hours = c(5, 2, 6, 8, 1))
            data <- data.frame(coffee = c(1, 2, 3, 4, 5), jitters = c(1, 3, 4, 7, 9))
            mass <- c(4500, 3200, 5100, 2900, 120000) 
            penguins <- data.frame(mass_kg = mass)
            sodium_vector <- c(145, 150, 138, 142, 160, 155)
            Cream_A <- c(10, 12, 11, 14, 9)
            Cream_B <- c(15, 18, 16, 19, 14)
            lizards <- data.frame(horn_length = c(10, 12, 11, 14, 9, 22, 24, 21, 25, 20), survival = c(rep("Died", 5), rep("Lived", 5)))
        `);

        loadingBanner.style.backgroundColor = COLORS.success;
        loadingBanner.innerText = "R is Ready! 🚀";
        setTimeout(() => { loadingBanner.style.top = '-50px'; }, 2000);

    } catch (e) {
        loadingBanner.style.backgroundColor = COLORS.error;
        loadingBanner.innerText = "Error loading packages. Refresh page.";
        console.error(e);
    }

    // --- 4. EXECUTION LOGIC ---
    const checkBtns = document.querySelectorAll('.check-btn');

    checkBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            const container = this.closest('.editor-container') || this.closest('.question-box');
            const input = container.querySelector('.input-code');
            const consoleDiv = container.querySelector('.console-output');

            let userCode = input.value;
            if (!userCode || userCode.trim() === "") return;

            const expectedAnswer = this.dataset.answer;
            const cleanUser = userCode.replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
            const cleanAnswer = expectedAnswer.replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
            const isCorrect = (cleanUser === cleanAnswer);

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

            consoleDiv.style.display = "block";
            consoleDiv.innerHTML = `<span style="color: ${COLORS.muted};">> ${userCode}</span><br><span style="color: ${COLORS.lukeYellow};">Running...</span>`;

            try {
                const shelter = await new webR.Shelter();

                // Use captureR to handle everything (including plots)
                const result = await shelter.captureR(wrappedCode, {
                    withAutoprint: false,
                    captureStreams: true,
                    captureConditions: true
                });

                // Process Text
                let outputHTML = result.output.map(line => {
                    let data = line.data;
                    if (typeof data === 'string') return data;
                    if (data && typeof data === 'object') {
                        if (data.message) return data.message;
                        // Avoid printing empty objects (often condition objects with non-enumerable props)
                        if (Object.keys(data).length === 0) return '';
                        try {
                            const str = JSON.stringify(data);
                            return str === '{}' ? '' : str;
                        } catch (e) {
                            return '';
                        }
                    }
                    return String(data);
                }).join('<br>');

                // Process Plots (from result.images)
                if (result.images.length > 0) {
                    const img = result.images[0];
                    if (img instanceof ImageBitmap) {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        outputHTML += '<br><img src="' + canvas.toDataURL() + '" style="max-width:100%; border:1px solid ' + COLORS.borderDark + ';">';
                    }
                }

                shelter.purge();

                if (!outputHTML && !result.images.length) {
                    outputHTML = `<span style="color:${COLORS.subtle}; font-style:italic;">(Value saved)</span>`;
                }

                // Grading
                if (isCorrect) {
                    consoleDiv.innerHTML = `<span style="color: ${COLORS.success};">> ${userCode}</span><br>${outputHTML}`;
                    input.style.borderBottom = `2px solid ${COLORS.success}`;
                } else {
                    consoleDiv.innerHTML = `<span style="color: ${COLORS.warning};">> ${userCode}</span><br>${outputHTML}<br><br><span style="color: ${COLORS.warning}; font-weight:bold;">⚠️ Paris says: "The code works, but that's not what I asked for."</span>`;
                    input.style.borderBottom = `2px solid ${COLORS.warning}`;
                }

            } catch (e) {
                let errorMsg = e.message;
                if (errorMsg.includes("could not find function")) {
                    errorMsg += `<br><br><strong>Tip:</strong> Packages might still be loading. Wait for the green banner!`;
                }
                consoleDiv.innerHTML = `<span style="color: ${COLORS.muted};">> ${userCode}</span><br><span style="color: ${COLORS.error};">${errorMsg}</span>`;
                input.style.borderBottom = `2px solid ${COLORS.error}`;
            }
        });
    });

    // --- 5. COPY BUTTONS ---
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.innerText = 'Copy';
        button.className = 'copy-btn';
        button.addEventListener('click', () => {
            const codeText = block.querySelector('code').innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = button.innerText;
                button.innerText = 'Copied!';
                setTimeout(() => { button.innerText = originalText; }, 2000);
            });
        });
        block.appendChild(button);
    });
});
