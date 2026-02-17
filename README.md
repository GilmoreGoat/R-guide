# The R Gilmore Study Guide ☕ 🍂 📚

> "Life's short. Talk fast. Code faster."

A Gilmore Girls-themed interactive study guide for R programming, built with [WebR](https://docs.r-wasm.org/webr/latest/). This project provides a static website where students can learn R concepts, run code directly in the browser, and receive immediate feedback.

## Features

-   **WebR Integration**: Runs R code entirely in the browser using WebAssembly—no server-side R required.
-   **Interactive Exercises**: "Missions" with code editors that check student answers against expected solutions.
-   **Instant Feedback**: Visual cues (Success/Warning/Error) and console output.
-   **Cheat Menu**: Quick access to common R functions and package loading.
-   **Strict Linting**: Encourages best practices (e.g., using `<-` for assignment, proper naming conventions).
-   **Pre-loaded Data**: Explore R with fun, themed datasets available instantly in the console.

## Getting Started

Since this project uses ES modules and WebAssembly, it must be served via a local web server to function correctly. **Opening `index.html` directly as a file won't work due to browser CORS policies.**

### Prerequisites

-   **Python 3** (pre-installed on most macOS/Linux systems)
-   *OR* **Node.js** (if you prefer using `http-server`)
-   *OR* A modern code editor like VS Code with the "Live Server" extension.

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/r-gilmore-study-guide.git
    cd r-gilmore-study-guide
    ```

2.  **Start a local server:**

    *   **Option A: Python (Recommended)**
        ```bash
        python3 -m http.server
        ```

    *   **Option B: Node.js**
        ```bash
        npx http-server .
        ```

3.  **Open in Browser:**
    Go to `http://localhost:8000` (or the port shown in your terminal).

4.  **Wait for Initialization:**
    When you first load a page with exercises, you'll see a banner: **"☕ Brewing R Engine..."**. Wait for it to turn green (**"R is Ready! 🚀"**) before running code. This usually takes ~10-20 seconds as it downloads WebR and packages.

## Curriculum

The guide is divided into three tiers of difficulty:

### 🎓 Tier 1: The BILD 5 Syllabus (Fundamental Skills)
Follows a standard introductory R course structure.
-   **Module 1: Chilton Basics** (`basics.html`) - Objects, Vectors, Types.
-   **Module 2: Luke's Diner** (`wrangling.html`) - Data Frames, `select`, `filter`, `mutate`.
-   **Module 3: The Dragonfly Inn** (`tidying.html`) - `pivot_longer`, `pivot_wider`.
-   **Module 4: The Gazette** (`visualization.html`) - `ggplot2` basics (histograms, boxplots, scatterplots).
-   **Module 5: Yale Daily News** (`statistics.html`) - T-Tests, Normality, Power Analysis.
-   **Module 6: Town Meeting** (`anova.html`) - ANOVA, Tukey's HSD.
-   **Module 7: Dance Marathon** (`regression.html`) - Correlation, Linear Regression (`lm`).
-   **Module 8: The DAR Tea** (`categorical.html`) - Chi-Squared Tests.

### 🔬 Tier 2: Research Skills (The Life & Death Brigade)
Essential skills for real-world data analysis.
-   **Skill A: The Secret Society** (`module6.html`) - Logic, `left_join`, `case_when`.
-   **Skill B: The Festival Calendar** (`skill_b.html`) - Dates & Times with `lubridate`.
-   **Skill C: The Rumor Mill** (`skill_c.html`) - String manipulation with `stringr`.

### ⚙️ Tier 3: Professional Certification
-   **The Future Syllabus** (`syllabus.html`) - Functional Programming, Package Dev, Machine Learning.

## Data & Packages

The environment comes pre-loaded with the **Tidyverse** and several custom datasets to help you practice.

### Pre-installed Packages
-   `dplyr`
-   `ggplot2`
-   `tidyr`
-   `stringr`
-   `lubridate`

### Available Datasets
Type these names into the console to see the data:
-   `menu`: Items, prices, and calories at Luke's Diner.
-   `orders`: Customer orders and tips.
-   `customers`: Customer names and VIP status.
-   `townies`: Roles of Stars Hollow residents.
-   `kitchen` & `long_data`: Example datasets for reshaping.
-   `pumpkins`: Weights of pumpkins (perfect for t-tests!).
-   `students`: Yale vs. Harvard student data.
-   `penguins`: Simplified penguin mass data.

## Development

### Project Structure
-   `index.html`: Main landing page.
-   `script.js`: Core logic. Handles WebR initialization, UI interaction, and code execution.
-   `logic.js`: Pure utility functions (`normalizeCode`, `compareCode`, `escapeHTML`) that are unit-tested.
-   `style.css`: Global styles using CSS variables for theming.
-   `tests/`: Contains Unit and End-to-End tests.

### Running Tests

1.  **Unit Tests** (Logic verification):
    Uses Node.js native test runner.
    ```bash
    npm test
    ```

2.  **End-to-End Tests** (Browser interaction):
    Uses Playwright to test WebR loading and code execution.
    ```bash
    npx playwright test
    ```

## Contributing

Contributions are welcome! If you want to add a new module:
1.  Create a new HTML file (e.g., `my_module.html`).
2.  Link `style.css` and `script.js`.
3.  Add `<div class="editor-container">` blocks with `.check-btn` buttons.
4.  Add your expected answer in the `data-answer` attribute of the button.

## License & Credits

Created for **BILD 5**.

> "Oy with the poodles already!"
