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
- **Master Projects (Tier 4)**: 20 downloadable Capstone projects (`.zip` files containing `.Rmd` and `.csv` files) for comprehensive real-world scenarios.
- **User Authentication & Progress Sync**: Login system using JWT and bcrypt, with code progress synced to a PostgreSQL database and cached in `localStorage`.
- **Pre-loaded Data**: extensive datasets available for practice (see "Available Data" below).
- **Instant Feedback**: Visual cues (Success/Warning/Error) and console output.
- **Cheat Menu**: Quick access to common R functions and package loading.
- **"Sunday Night Panic" Starter Kit**: A handy copy-paste block for standard R setup (libraries, settings) to avoid common errors.
- **Paris Geller's Master Reference**: A complete, searchable reference guide (`reference.html`) covering every function used in the course.
- **Strict Linting**: Encourages best practices (e.g., using `<-` for assignment, proper naming conventions).

## Available Data 📊

The R environment comes pre-loaded with several datasets for you to practice with, grouped by module:

### Module 1: Chilton Basics
- **`students`**: Data on students from Chilton, Yale, and Stars Hollow High (Name, GPA, Club).

### Module 2: Luke's Diner (Wrangling)
- **`menu`**: Items, prices, and calories at Luke's Diner.
- **`customers`**: Customer names and VIP status.
- **`orders`**: Customer orders and tips.

### Module 3: The Dragonfly Inn (Tidying)
- **`kitchen`**: Weekly dish counts (Wide format).
- **`long_data`**: Dish counts by day (Long format).

### Module 4: Festival of Living Art (Visualization)
- **`art_entries`**: Contestants, paintings, and pose times.
- **`paint_tubes`**: Volume and brand of paint tubes (Generated dataset).

### Module 5: Yale Statistics
- **`yale_students`**: Students, majors, and hours studied.
- **`stunt_heights`**: Height data for outlier detection.

### Module 6: Town Meeting (ANOVA)
- **`dinner_courses`**: Ratings for different courses by Emily and Lorelai.
- **`maids`**: Tenure of various maids at the Gilmore residence.
- **`dinner_ratings`**: Generated ratings for soup, salad, and main courses.

### Module 7: Richard's Investments (Regression)
- **`investments`**: Company risk and ROI data.
- **`market_data`**: Simulated market index data over 100 days.

### Module 8: Miss Patty's Studio (Categorical)
- **`dancers`**: Dancers, age groups, and styles.

### Research Skills (Tier 2)
- **Skill A (Joining)**: `guests` (Party guests), `society_list` (LDB members).
- **Skill B (Dates)**: `festivals` (Town events), `marathon` (Dance marathon times).
- **Skill C (Strings)**: `gazette_bylines` (Article counts/typos), `rumors` (Gossip text).

### Professional Certification (Tier 3)
- **Skill D (Functional)**: `antiques` (Items/Periods/Prices), `bills`.
- **Skill E (OOP)**: `dar_members` (Rank/Name), `band_gigs` (Venue/Pay).

### Global / Misc
- **`townies`**: Roles of residents.
- **`lizards`**: Horn length and survival status.

## Getting Started

Since this project uses ES modules and WebAssembly, it must be served via a local web server (opening `index.html` directly as a file won't work due to CORS policies). The application relies on a Node.js Express server to serve files and provide a backend API with PostgreSQL for user progress.

### Prerequisites

- Node.js (required for running the server and tests).
- PostgreSQL database (for local development and storing user progress).

### Installation & Running the Project

1.  Clone the repository and navigate to the project root.
2.  Install all dependencies:
    ```bash
    npm install
    ```
3.  Set up your local environment. You need to configure the `DATABASE_URL` for PostgreSQL:
    ```bash
    export DATABASE_URL=postgresql://localhost/gilmore_db
    ```
4.  Start the Node.js Express server:
    ```bash
    npm start
    ```
5.  Open your browser and navigate to `http://localhost:8000`.

*Note for Deployment: The application is configured for deployment to PaaS platforms like Render or Railway, utilizing PostgreSQL via the `pg` package.*

## Testing

Project testing is split into Unit Tests and End-to-End (E2E) Tests.

### Unit Tests
Verifies utility functions (e.g., `js/logic.js`) using the native Node.js test runner.
```bash
npm test
```
*(Executes `node --test tests/*.test.js` under the hood).*

### End-to-End Tests
Verifies WebR loading, page interactions, and functional UI elements using Playwright.

Before running E2E tests for the first time, you must install the Playwright browser binaries:
```bash
npx playwright install
```

Then you can run the tests:
```bash
npx playwright test
```

*Note: Visual frontend verification can also be run independently using the Python script `verify_frontend.py` (requires `pip install playwright` and the app running locally on port 8000).*

## Adding a New Module

To add a new learning module to the educational platform, follow these steps to ensure it integrates correctly with the WebR environment, checking system, and test suites:

1. **Create the HTML File:** Create a new HTML file in the `modules/` directory. Use an existing module as a template.
2. **Add WebR Preload Tags:** Ensure the WebR module is preloaded for performance by including `<link rel="modulepreload">` tags in the `<head>` of your new HTML file.
3. **Configure Interactive Elements:** Use `<textarea rows="3" class="editor-input input-code">` for user input and `.check-btn` for the Run buttons. Set the expected literal R vector/value in the `data-answer` attribute of the button (e.g., `data-answer="c(1, 4, 9)"`) for validation.
4. **Register Required Packages:** Add your new HTML file and its required R packages to the `PAGE_PACKAGES` mapping in `js/logic.js`.
5. **Update Test Coverage:** Add the filename to the `staticPages` array inside `tests/verify_pages_load.spec.js` so Playwright will automatically verify it loads correctly.
6. **Link from Navigation:** Add a new `.concept-card` in `index.html` pointing to your new module.

## Architecture & Developer Guide

The project is designed to be simple and maintainable, following a defined directory structure:
- `js/` for scripts (`script.js`, `logic.js`, `r_data.js`, `login.js`, `reference.js`).
- `css/` for styles (`style.css`).
- `modules/` for HTML content files representing individual lessons.
- `tests/` for automated unit and end-to-end tests.
- `images/` for assets.

### Key Files

- `index.html`: Main landing page with a sticky navigation bar and anchor links to different tiers.
- `js/script.js`: Core application logic. Handles WebR initialization, UI interactions, error handling, and code execution using `webR.Shelter` and `captureR`. Multi-line input formatting is done safely to simulate an R terminal.
- `js/logic.js`: Pure utility functions for code verification, R package resolution (`getRequiredPackages`), and output processing.
- `css/style.css`: Global styles using a thematic color palette (Coffee, Autumn Orange, Yale Blue) and Google Fonts.
- `server.js`: Node.js Express server that serves static frontend files and handles API routes (including security middleware blocking public access to sensitive files).

## Troubleshooting 🔧

- **R Engine Stuck Loading?**
  - Ensure you are serving the file via a web server (`http://localhost:8000`), not opening it directly (`file://`). The frontend checks against the `file://` protocol to prevent generic network errors.
  - Check your browser console (F12) for errors.
  - Refresh the page (sometimes the WASM fetch times out).
- **Plots Not Showing?**
  - Make sure you run code that produces a plot object (e.g., `print(plot)`).
- **Login/Network Errors?**
  - If you encounter errors logging in, ensure `npm start` is running to launch the Express backend, not just a static server.

## The Mission

**Welcome to Stars Hollow.**

This is not your standard, boring statistics textbook. This is a survival guide. I built this because learning R should be as fast-paced as a town meeting and as comforting as a warm cup of coffee.

Whether you are a prep school student striving for Valedictorian or a university editor trying to impress the press, this guide covers everything from basic vectors to complex power analysis.

## House Rules

- **Rule 1:** No cell phones. (The Diner Rules apply).
- **Rule 2:** Coffee is mandatory while coding.
- **Rule 3:** If your code errors, do not panic. Channel your inner intensity and force the data to submit to your will.
- **Rule 4:** Always check your assumptions. (Trouble might be hiding in your data).

## About the Author

Hi, I'm **Parthiv (Pav) Nair** and I'm a pre-med student at UCSD. I created this site to learn and survive **BILD 5**. However, after someone close recently professed immense fear in learning R, I built this to help out maybe a little bit.

My goal is to take the "scary" out of statistics and replace it with references to 2000s pop culture. If I can learn to use `pivot_longer()` without crying, so can you.

*Note from the Editor:*
- This site was built with 100% organic, shade-grown code.
- No actual penguins were harmed in the making of the T-Tests.

## Credits & License

- **Professor:** Yang Mingyu
- **Inspiration:** The Gilmore Girls (Amy Sherman-Palladino).
- **Caffeine:** The fuel for this entire project.

Created for **BILD 5**.

> Oy with the poodles already!
