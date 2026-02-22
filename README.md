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
    - **Module 4: Festival of Living Art**: Visualization (`ggplot2`).
    - **Module 5: Yale Statistics**: Statistics (T-Tests, Normality, Power Analysis).
    - **Module 6: Friday Night Dinner**: ANOVA & Tukey's HSD.
    - **Module 7: Richard's Investments**: Correlation & Linear Regression.
    - **Module 8: Miss Patty's Studio**: Categorical Data (`chisq.test`).
- **Research Skills (Tier 2)**:
    - **Skill A: The Life & Death Brigade**: Logic & Joining Data.
    - **Skill B: Town Festivals**: Dates & Time (`lubridate`).
    - **Skill C: Stars Hollow Gazette**: Strings & Text (`stringr`).
- **Professional Certification (Tier 3)**:
    - **Skill D: Mrs. Kim's Antiques**: Functional Programming (`purrr`).
    - **Skill E: The DAR & Hep Alien**: Object-Oriented Programming (OOP) - S3, S4, R6.
    - **Skill F: The Troubadour**: Metaprogramming (Tidy Eval & `rlang`).
    - **Skill G: Paris Geller's Bunker**: Debugging (`browser()`, `traceback()`).
    - **Future Syllabus**: A roadmap for advanced R skills (`syllabus.html`).
- **Pre-loaded Data**: Extensive datasets from Stars Hollow pre-loaded into the R environment.
- **Instant Feedback**: Visual cues (Success/Warning/Error) and console output.
- **Cheat Menu**: Quick access to common R functions and package loading.
- **"Sunday Night Panic" Starter Kit**: A handy copy-paste block for standard R setup (libraries, settings) to avoid common errors.
- **Paris Geller's Master Reference**: A complete, searchable reference guide (`reference.html`) covering every function used in the course.
- **Strict Linting**: Encourages best practices (e.g., using `<-` for assignment, proper naming conventions).

## Available Data 📊

The R environment comes pre-loaded with several datasets for you to practice with:

### Module 1: Chilton Basics
- **`students`**: Data on students from Chilton (Paris, Rory, Louise, etc.) with GPA and club.

### Module 2: Luke's Diner
- **`menu`**: Items, prices, and calories at Luke's Diner.
- **`customers`**: Customer names and VIP status (Lorelai, Rory, Jess, etc.).
- **`orders`**: Customer orders and tips.

### Module 3: The Dragonfly Inn
- **`kitchen`**: Dish counts by day (wide format).
- **`long_data`**: Dish counts by day (long format) for tidying exercises.

### Module 4: Festival of Living Art
- **`art_entries`**: Contestants, paintings, and pose times.
- **`paint_tubes`**: Generated dataset of paint tube volumes and brands.

### Module 5: Yale Statistics
- **`yale_students`**: Students (Logan, Colin, Finn, etc.) with majors and study hours.
- **`stunt_heights`**: Height data for outlier detection.

### Module 6: Friday Night Dinner (ANOVA)
- **`dinner_courses`**: Course ratings by Emily and Lorelai.
- **`maids`**: Maid names and tenure days.

### Module 7: Richard's Investments (Regression)
- **`investments`**: Company risk and ROI data.
- **`market_data`**: Simulated market index data over time.

### Module 8: Miss Patty's Studio (Categorical)
- **`dancers`**: Dancers with age group and style (Ballet, Tap, etc.).

### Skills & Misc
- **`guests`, `society_list`**: Life & Death Brigade (Skill A).
- **`festivals`, `marathon`**: Town Festivals (Skill B).
- **`gazette_bylines`, `rumors`**: Stars Hollow Gazette (Skill C).
- **`antiques`, `bills`**: Mrs. Kim's Antiques (Skill D).
- **`dar_members`, `band_gigs`**: The DAR & Hep Alien (Skill E).
- **`townies`**: Roles of various Stars Hollow residents.
- **`lizards`**: Horn length and survival status.
- **`dinner_ratings`**: Ratings for dinner courses.

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
- `r_data.js`: Contains the R code string (`R_DATA_INIT`) that initializes all datasets.
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
- `r_data.js`: Pre-loaded R datasets.
- `style.css`: Global styles and theming (CSS Variables).
- `reference.js`: Handles navigation logic for the Reference Guide.
- `basics.html`: Module 1 (Chilton Basics).
- `wrangling.html`: Module 2 (Luke's Diner).
- `tidying.html`: Module 3 (The Dragonfly Inn).
- `visualization.html`: Module 4 (Festival of Living Art).
- `statistics.html`: Module 5 (Yale Statistics).
- `anova.html`: Module 6 (Friday Night Dinner).
- `regression.html`: Module 7 (Richard's Investments).
- `categorical.html`: Module 8 (Miss Patty's Studio).
- `module6.html`: Skill A (The Life & Death Brigade). *Note: filename is `module6.html`, but conceptually Skill A.*
- `skill_b.html`: Skill B (Town Festivals).
- `skill_c.html`: Skill C (Stars Hollow Gazette).
- `functional.html`: Skill D (Mrs. Kim's Antiques).
- `oop.html`: Skill E (The DAR & Hep Alien).
- `metaprogramming.html`: Skill F (The Troubadour).
- `debugging.html`: Skill G (Paris Geller's Bunker).
- `syllabus.html`: Future Syllabus (Tier 3 Roadmap).
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
