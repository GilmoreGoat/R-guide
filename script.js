document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AUTO-GENERATE CHEAT SHEET ---
    const fab = document.createElement('div');
    fab.className = 'cheat-fab';
    fab.innerText = '?';
    document.body.appendChild(fab);

    const menu = document.createElement('div');
    menu.className = 'cheat-menu';
    menu.innerHTML = `
        <div class="cheat-item"><strong>filter()</strong>: Pick Rows</div>
        <div class="cheat-item"><strong>select()</strong>: Pick Columns</div>
        <div class="cheat-item"><strong>mutate()</strong>: New Column</div>
        <div class="cheat-item"><strong>c()</strong>: Create Vector</div>
        <div class="cheat-item"><strong>ggplot()</strong>: Start Plot</div>
        <div style="text-align:center; margin-top:10px; font-size:0.8em; color:#888;">
            <em>"Copper Boom!"</em>
        </div>
    `;
    document.body.appendChild(menu);

    // --- 2. EDITOR LOGIC (THE FIX) ---
    const checkBtns = document.querySelectorAll('.check-btn');
    checkBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find parent container
            const container = this.closest('.editor-container') || this.closest('.question-box');
            const input = container.querySelector('.input-code');
            const consoleDiv = container.querySelector('.console-output'); // The black box

            // Get expected values
            const expectedAnswer = this.dataset.answer;
            const realOutput = this.dataset.output; // The R output text

            // Clean up user input
            const cleanUser = input.value.replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();
            const cleanAnswer = expectedAnswer.replace(/\s/g, '').replace(/['"]/g, '"').toLowerCase();

            // Show the console box
            consoleDiv.style.display = "block";

            if (cleanUser === cleanAnswer) {
                // SUCCESS: Show the actual R output in green/white
                consoleDiv.innerHTML = `<span style="color: #2ecc71;">> ${input.value}</span><br>${realOutput}`;
                input.style.borderBottom = "2px solid #2ecc71"; // Green line
            } else {
                // FAILURE: Show a fake R error
                consoleDiv.innerHTML = `<span style="color: #e74c3c;">Error: unexpected symbol in "${input.value}"</span>`;
                input.style.borderBottom = "2px solid #e74c3c"; // Red line
            }
        });
    });

    // --- 3. COPY BUTTONS ---
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