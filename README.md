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
- **Pre-loaded Data**: extensive datasets available for practice (see "Available Data" below).
- **Instant Feedback**: Visual cues (Success/Warning/Error) and console output.
- **Cheat Menu**: Quick access to common R functions and package loading.
- **"Sunday Night Panic" Starter Kit**: A handy copy-paste block for standard R setup (libraries, settings) to avoid common errors.
- **Paris Geller's Master Reference**: A complete, searchable reference guide (`reference.html`) covering every function used in the course.
- **Strict Linting**: Encourages best practices (e.g., using `<-` for assignment, proper naming conventions).
- **Security**: Hardened Content Security Policy (CSP) enforcing strict `self` and specific `webr` domains, and disallowing `unsafe-inline` styles.

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

Since this project uses ES modules and WebAssembly, it must be served via a local web server (opening `index.html` directly as a file won't work due to CORS policies).

### Prerequisites

- Node.js (for running tests, Playwright, and `http-server`).
- Python 3 (Alternative for running a simple HTTP server).

### Running the Project

1.  Clone the repository.
2.  Navigate to the project root.
3.  Install dependencies for testing and local server:
    ```bash
    npm install
    npx playwright install
    ```
4.  Start a local server:
    ```bash
    npx http-server
    # OR using Python
    python3 -m http.server 8000
    ```
5.  Open your browser and go to `http://localhost:8080` (or the port shown in your terminal).

## Architecture & Developer Guide

The project is designed to be simple, maintainable, and secure.

### Key Files

- `index.html`: Main landing page with Tier navigation.
- `js/script.js`: Core application logic. Handles WebR initialization, UI interactions (Cheat Menu, Copy Buttons), and code execution using `webR.Shelter` and `captureR`.
- `js/logic.js`: Pure utility functions for code verification, output processing, and package resolution.
    - `normalizeCode(code)`: Standardizes user input (removes whitespace, lowers case) for fuzzy matching.
    - `compareCode(user, expected)`: Checks if the user's answer matches the solution.
    - `escapeHTML(str)`: Prevents XSS attacks by escaping special characters.
    - `processWebROutput(output)`: Formats WebR output arrays into HTML.
    - `processWebRImages(...)`: Safely handles rendering R plot outputs.
    - `getRequiredPackages(...)`: Dynamically determines the required R packages based on the loaded module.
- `js/r_data.js`: Definitions of pre-loaded mock datasets provided to the WebR environment.
- `css/style.css`: Global styles using CSS Variables for theming (Gilmore Girls aesthetic).

### Testing

The project uses a mix of unit tests via the native Node.js test runner and integration/e2e tests using Playwright.

#### Unit Tests
Verifies the logic in `js/logic.js` and other pure functions. Also checks code health (like static analysis rules).

```bash
npm test
```
*Runs tests in `tests/*.test.js` using Node.js `--test` runner.*

#### End-to-End & Integration Tests
Verifies WebR loading, page interactions, code execution, and navigation using Playwright.

```bash
# First, ensure Playwright browsers are installed
npx playwright install

# Run the Playwright test suite
npx playwright test
```
*Playwright tests are defined in `tests/*.spec.js`.*

#### Manual Visual Verification
A separate python script is provided for taking screenshots of specific interactions, primarily used to manually verify UI changes.

```bash
# Ensure local server is running on port 8080
pip install playwright
python3 verify_frontend.py
```

## Project Structure

- `index.html`: Main landing page / Table of Contents.
- `js/`: Core JavaScript files (`script.js`, `logic.js`, `r_data.js`).
- `css/`: Stylesheets (`style.css`).
- `modules/`: HTML content files for each module/skill.
    - `basics.html`: Module 1 (Basics).
    - `wrangling.html`: Module 2 (Data Frames).
    - `tidying.html`: Module 3 (Tidying).
    - `visualization.html`: Module 4 (Graphing).
    - `statistics.html`: Module 5 (T-Tests).
    - `anova.html`: Module 6 (ANOVA).
    - `regression.html`: Module 7 (Regression).
    - `categorical.html`: Module 8 (Categorical).
    - `module6.html`: Skill A (The Life & Death Brigade - Joining).
    - `skill_b.html`: Skill B (Town Festivals - Dates).
    - `skill_c.html`: Skill C (Stars Hollow Gazette - Strings).
    - `functional.html`: Skill D (Mrs. Kim's Antiques - Functional Programming).
    - `oop.html`: Skill E (The DAR & Hep Alien - OOP).
    - `metaprogramming.html`: Skill F (The Troubadour - Metaprogramming).
    - `debugging.html`: Skill G (Paris Geller's Bunker - Debugging).
- `reference.html`: Paris Geller's Master Reference.
- `syllabus.html`: Future Syllabus (Tier 3).
- `about.html`: About page.
- `tests/`: Automated test specifications (Playwright & Node.js test runner).
- `images/`: Asset images.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES Modules).
- **R Engine**: [WebR](https://docs.r-wasm.org/webr/latest/) (WASM).
- **R Packages**: `tidyverse`, `skimr`, `rstatix`, `lubridate`, `stringr`, `purrr`, `rlang`.
- **Testing**: Node.js Test Runner, Playwright.

## Troubleshooting 🔧

- **R Engine Stuck Loading?**
  - Ensure you are serving the file via a web server (http://localhost:8080), not opening it directly (`file://`).
  - Check your browser console (F12) for errors.
  - Refresh the page (sometimes the WASM fetch times out).
- **Plots Not Showing?**
  - Make sure you run code that produces a plot object (e.g., `print(plot)`).

## The Mission

**Welcome to Stars Hollow.**

This is not your standard, boring statistics textbook. This is a survival guide. I built this because learning R should be as fast-paced as a town meeting and as comforting as a warm cup of coffee.

Whether you are a prep school student striving for Valedictorian or a university editor trying to impress the press, this guide covers everything from basic vectors to complex power analysis.

## House Rules

- **Rule 1:** No cell phones. (The Diner Rules apply).
- **Rule 2:** Coffee is mandatory while coding.
- **Rule 3:** If your code errors, do not panic. Channel your inner intensity and force the data to submit to your will.
- **Rule 4:** Always check your assumptions. (Trouble might be hiding in your data).
- **Rule 5:** Code cleanly. Refrain from inline styling and respect Content Security Policies.

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
