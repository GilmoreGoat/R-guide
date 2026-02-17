# The R Gilmore Study Guide ☕ 🍂 📚

> "Life's short. Talk fast. Code faster."

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
- **Instant Feedback**: Visual cues (Success/Warning/Error) and console output.
- **Cheat Menu**: Quick access to common R functions and package loading.
- **Strict Linting**: Encourages best practices (e.g., using `<-` for assignment, proper naming conventions).

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
    ```
5.  Open your browser and go to `http://localhost:8000`.

## Testing

### Unit Tests
The project uses the Node.js native test runner for verifying the logic in `logic.js`.

```bash
npm test
```
(Runs `tests/logic.test.js`)

### End-to-End Tests
Playwright is used to verify WebR loading and page interactions.

```bash
npx playwright test
```
(Runs tests in `tests/verify_webr_load.spec.js`)

## Project Structure

- `index.html`: Main landing page / Table of Contents.
- `script.js`: Core application logic, WebR initialization, and UI handling.
- `logic.js`: Pure utility functions for code normalization and comparison (testable).
- `style.css`: Global styles and theming (CSS Variables).
- `basics.html`: Module 1 (Basics).
- `wrangling.html`: Module 2 (Data Frames).
- `tidying.html`: Module 3 (Tidying).
- `visualization.html`: Module 4 (Graphing).
- `statistics.html`: Module 5 (T-Tests).
- `anova.html`: Module 6 (ANOVA).
- `regression.html`: Module 7 (Regression).
- `categorical.html`: Module 8 (Categorical).
- `module6.html`: Skill A (Joining).
- `skill_b.html`: Skill B (Dates).
- `skill_c.html`: Skill C (Strings).
- `syllabus.html`: Future Syllabus (Tier 3).
- `reference.html`: Paris Geller's Master Reference.
- `about.html`: About page.
- `tests/`: Unit and E2E tests.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES Modules).
- **R Engine**: [WebR](https://docs.r-wasm.org/webr/latest/) (WASM).
- **Testing**: Node.js Test Runner, Playwright.

## License & Credits

Created for **BILD 5**.

> Oy with the poodles already!
