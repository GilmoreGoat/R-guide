# The R Gilmore Study Guide ☕ 🍂 📚

> "Life's short. Talk fast. Code faster."

![The R Gilmore Study Guide](IMG_9881.PNG)

A Gilmore Girls-themed interactive study guide for R programming, built with [WebR](https://docs.r-wasm.org/webr/latest/). This project provides a static website where students can learn R concepts, run code directly in the browser, and receive immediate feedback.

## Features

- **WebR Integration**: Runs R code entirely in the browser using WebAssembly—no server-side R required.
- **Interactive Exercises**: "Missions" with code editors that check student answers against expected solutions.
- **Themed Modules**:
    - **Module 1: Chilton Basics**: Objects, Vectors, and Types.
    - **Module 2: Luke's Diner**: Data Frames & Wrangling (`dplyr`).
    - **Module 3: The Dragonfly Inn**: Tidying Data (`tidyr`).
    - **Module 4: The Gazette**: Visualization (`ggplot2`).
    - **Module 5: Yale Daily News**: Statistics (T-Tests, Normality, Power Analysis).
    - **Module 6: Town Meeting**: ANOVA & Tukey's HSD.
    - **Module 7: Dance Marathon**: Correlation & Linear Regression.
    - **Module 8: The DAR Tea**: Categorical Data (`chisq.test`).
- **Research Skills (Tier 2)**:
    - **Skill A: The Secret Society**: Logic & Joining Data.
    - **Skill B: The Festival Calendar**: Dates & Time (`lubridate`).
    - **Skill C: The Rumor Mill**: Strings & Text (`stringr`).
- **Professional Certification (Tier 3)**:
    - **Future Syllabus**: A roadmap for advanced R skills (`syllabus.html`).
- **Pre-loaded Data**:
    - `menu`, `orders`, `customers` (Luke's Diner datasets)
    - `townies`, `kitchen`, `long_data`
    - `pumpkins` (Generated dataset for stats)
    - `students`, `penguins`, `lizards`
- **Instant Feedback**: Visual cues (Success/Warning/Error) and console output.
- **Cheat Menu**: Quick access to common R functions and package loading.
- **"Sunday Night Panic" Starter Kit**: A handy copy-paste block for standard R setup (libraries, settings) to avoid common errors.
- **Paris Geller's Master Reference**: A complete, searchable reference guide (`reference.html`) covering every function used in the course.
- **Strict Linting**: Encourages best practices (e.g., using `<-` for assignment, proper naming conventions).

## Available Data 📊

The R environment comes pre-loaded with several datasets for you to practice with:

- **`menu`**: Items, prices, and calories at Luke's Diner.
- **`orders`**: Customer orders and tips.
- **`customers`**: Customer names and VIP status.
- **`townies`**: Roles of various Stars Hollow residents.
- **`pumpkins`**: A generated dataset of 200 pumpkins with weights and types.
- **`students`**: Data on students from Chilton, Yale, and Stars Hollow High.
- **`penguins`**: Simplified penguin mass data.
- **`lizards`**: Horn length and survival status.
- **`kitchen`** & **`long_data`**: Used for tidying exercises.
- **`data`**: Coffee consumption vs. Jitters.

## Getting Started

Since this project uses ES modules and WebAssembly, it must be served via a local web server (opening `index.html` directly as a file won't work due to CORS policies).

### Prerequisites

- Python 3 (for the simple HTTP server) or any other static site server (e.g., `http-server`, `Live Server` in VS Code).
- Node.js (for running tests).

### Running the Project

1.  Clone the repository.
2.  Navigate to the project root.
3.  Install dependencies (optional, for testing):
    ```bash
    npm install
    ```
4.  Start a local server:
    ```bash
    python3 -m http.server
    # OR
    npx http-server
    ```
5.  Open your browser and go to `http://localhost:8000` (or the port shown in your terminal).

## Architecture & Developer Guide

The project is designed to be simple and maintainable.

### Key Files

- `index.html`: Main landing page.
- `script.js`: Core application logic. Handles WebR initialization, UI interactions (Cheat Menu, Copy Buttons), and code execution using `webR.Shelter` and `captureR`.
- `logic.js`: Pure utility functions for code verification and output processing.
    - `normalizeCode(code)`: Standardizes user input (removes whitespace, lowers case) for fuzzy matching.
    - `compareCode(user, expected)`: Checks if the user's answer matches the solution.
    - `escapeHTML(str)`: Prevents XSS attacks by escaping special characters.
    - `processWebROutput(output)`: Formats WebR output arrays into HTML.
- `style.css`: Global styles using CSS Variables for theming.

### Testing

#### Unit Tests
Verifies the logic in `logic.js` using Node.js native test runner.

```bash
npm test
```

#### End-to-End Tests
Verifies WebR loading and page interactions using Playwright.

```bash
npx playwright test
```
(Runs tests in `tests/verify_webr_load.spec.js`)

## Project Structure

- `index.html`: Main landing page / Table of Contents.
- `script.js`: Core application logic, WebR initialization, and UI handling.
- `logic.js`: Pure utility functions for code normalization and comparison (testable).
- `style.css`: Global styles and theming (CSS Variables).
- `reference.js`: Handles navigation logic for the Reference Guide.
- `basics.html`: Module 1 (Basics).
- `wrangling.html`: Module 2 (Data Frames).
- `tidying.html`: Module 3 (Tidying).
- `visualization.html`: Module 4 (Graphing).
- `statistics.html`: Module 5 (T-Tests).
- `anova.html`: Module 6 (ANOVA).
- `regression.html`: Module 7 (Regression).
- `categorical.html`: Module 8 (Categorical).
- `module6.html`: Skill A (The Secret Society - Joining). *Note: `module6.html` corresponds to Skill A, while `anova.html` is Module 6.*
- `skill_b.html`: Skill B (The Festival Calendar - Dates).
- `skill_c.html`: Skill C (The Rumor Mill - Strings).
- `syllabus.html`: Future Syllabus (Tier 3).
- `reference.html`: Paris Geller's Master Reference.
- `about.html`: About page.
- `tests/`: Unit and E2E tests.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES Modules).
- **R Engine**: [WebR](https://docs.r-wasm.org/webr/latest/) (WASM).
- **Testing**: Node.js Test Runner, Playwright.

## Troubleshooting 🔧

- **R Engine Stuck Loading?**
  - Ensure you are serving the file via a web server (http://localhost:8000), not opening it directly (`file://`).
  - Check your browser console (F12) for errors.
  - Refresh the page (sometimes the WASM fetch times out).
- **Plots Not Showing?**
  - Make sure you run code that produces a plot object (e.g., `print(plot)`).

## License & Credits

Created for **BILD 5**.

> Oy with the poodles already!
