# The R Gilmore Study Guide ☕ 🍂 📚

> "Life's short. Talk fast. Code faster."

A Gilmore Girls-themed interactive study guide for R programming, built with [WebR](https://docs.r-wasm.org/webr/latest/). This project provides a static website where students can learn R concepts, run code directly in the browser, and receive immediate feedback.

## Features

- **WebR Integration**: Runs R code entirely in the browser using WebAssembly—no server-side R required.
- **Interactive Exercises**: "Missions" with code editors that check student answers against expected solutions.
- **Themed Modules**:
    - **Chilton Basics**: Objects, Vectors, Types.
    - **Luke's Diner**: Data Frames & Wrangling (`dplyr`).
    - **The Dragonfly Inn**: Tidying Data (`tidyr`).
    - **The Gazette**: Visualization (`ggplot2`).
    - **Town Meeting**: Statistics (ANOVA, T-Tests).
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
- `*.html`: Individual module pages (e.g., `basics.html`, `wrangling.html`).
- `tests/`: Unit and E2E tests.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES Modules).
- **R Engine**: [WebR](https://docs.r-wasm.org/webr/latest/) (WASM).
- **Testing**: Node.js Test Runner, Playwright.

## License & Credits

Created for **BILD 5**.

> Oy with the poodles already!
