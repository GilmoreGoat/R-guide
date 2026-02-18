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
- **Pre-loaded Data**:
    - `menu`, `orders`, `customers` (Luke's Diner datasets)
    - `townies`, `kitchen`, `long_data`
    - `pumpkins` (Generated dataset for stats)
    - `students`, `penguins`, `lizards`
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

## Deployment

Since this is a static site, it can be deployed easily to any static hosting provider.

### GitHub Pages
1.  Go to your repository settings.
2.  Navigate to "Pages".
3.  Select the branch (e.g., `main`) and folder (`/` root).
4.  Save.

### Netlify / Vercel
1.  Connect your GitHub repository.
2.  Set the build command to empty (or `npm install` if needed for tests).
3.  Set the publish directory to the root (`.`).

## Troubleshooting

- **"R Engine not loading"**:
    - Ensure you are serving the file via a server (`http://localhost`), not opening it directly (`file://`).
    - Check your internet connection (WebR downloads ~10MB of data).
    - Check the browser console (F12) for CORS errors.
- **"Code works but marked wrong"**:
    - The answer checking is strict about the final value but flexible about whitespace. Ensure your code produces the exact expected output value.
- **Blank Plots**:
    - Ensure your code explicitly prints the plot (e.g., `print(ggplot(...))`) if it's inside a block, although the wrapper handles most cases.

## Browser Compatibility

This project relies on **WebAssembly** and **SharedArrayBuffer** (for WebR).
- **Supported Browsers**: Chrome (89+), Firefox (79+), Safari (15.2+), Edge (89+).
- **Mobile**: Recent iOS and Android devices should work, but performance may vary.

## License & Credits

Created for **BILD 5**.

> Oy with the poodles already!
