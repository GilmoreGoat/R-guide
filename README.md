# The R Gilmore Study Guide ☕ 🍂 📚

> "Life's short. Talk fast. Code faster."

![The R Gilmore Study Guide](IMG_9881.PNG)

[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)](#testing)
[![WebR](https://img.shields.io/badge/Powered_by-WebR-blue.svg)](https://docs.r-wasm.org/webr/latest/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A Gilmore Girls-themed interactive study guide for R programming, built with [WebR](https://docs.r-wasm.org/webr/latest/). This project provides a completely static website where students can learn R concepts, run code directly in the browser, and receive immediate feedback without needing an R backend server.

---

## 🌟 Features in Depth

- **Browser-Based Execution (WebR)**: Runs real R code entirely in your browser using WebAssembly.
- **Interactive Missions**: Built-in code editors and "check answer" validations, comparing user logic against expected solutions via fuzzy matching.
- **Pre-loaded Stars Hollow Data**: extensive themed datasets available instantly in the R environment.
- **Instant Feedback Loop**: Visual cues (Success/Warning/Error) combined with a robust R console output capture.
- **The "Sunday Night Panic" Starter Kit**: A handy copy-paste block of standard R library and setting setups to save students from debugging environment issues.
- **Paris Geller's Master Reference**: A complete, searchable reference guide (`reference.html`) covering every function used in the course.

## 🎓 The Syllabus (Themed Modules)

Follows the BILD 5 course calendar.

### Tier 1: Core Fundamentals
- **Module 1: Chilton Basics** - Objects, Vectors, and Types.
- **Module 2: Luke's Diner** - Data Frames & Wrangling (`dplyr`).
- **Module 3: The Dragonfly Inn** - Tidying Data (`tidyr`).
- **Module 4: Festival of Living Art** - Visualization (`ggplot2`).
- **Module 5: Yale Statistics** - Statistics (T-Tests, Normality, Power Analysis).
- **Module 6: Friday Night Dinner** - ANOVA & Tukey's HSD.
- **Module 7: Richard's Investments** - Correlation & Linear Regression (`cor.test`, `lm`).
- **Module 8: Miss Patty's Studio** - Categorical Data (`chisq.test`).

### Tier 2: Research Skills (The Life & Death Brigade)
- **Skill A**: Logic & Joining Data (`left_join`, `case_when`).
- **Skill B**: Dates & Time (`lubridate`).
- **Skill C**: Strings & Text (`stringr`).

### Tier 3: Professional Certification
- **Skill D**: Functional Programming (`purrr`).
- **Skill E**: Object-Oriented Programming (OOP) - S3, S4, R6.
- **Skill F**: Metaprogramming (Tidy Eval & `rlang`).
- **Skill G**: Debugging (`browser()`, `traceback()`).

---

## 📊 Available Data Dictionaries

The R environment comes pre-loaded with several datasets for practice. The data is instantiated in `js/r_data.js`.

**Tier 1 Data**
- **Module 1**: `students` (Name, GPA, Club).
- **Module 2**: `menu`, `customers`, `orders` (Luke's Diner pricing and VIP status).
- **Module 3**: `kitchen`, `long_data` (Wide and long format dish counts).
- **Module 4**: `art_entries`, `paint_tubes` (Contestants, pose times, paint volume).
- **Module 5**: `yale_students`, `stunt_heights` (Outlier detection).
- **Module 6 (ANOVA)**: `dinner_courses`, `maids`, `dinner_ratings` (Gilmore residence courses).
- **Module 7**: `investments`, `market_data` (Company risk and simulated ROI).
- **Module 8**: `dancers` (Age groups and styles).

**Tier 2 & 3 Data**
- **Skill A (Joining)**: `guests`, `society_list`.
- **Skill B (Dates)**: `festivals`, `marathon`.
- **Skill C (Strings)**: `gazette_bylines`, `rumors`.
- **Skill D (Functional)**: `antiques`, `bills`.
- **Skill E (OOP)**: `dar_members`, `band_gigs`.

**Global/Misc**
- `townies`, `lizards`

---

## 🚀 Quick Start Guide

Since this project uses ES modules and WebAssembly to run R, it **must** be served via a local web server to bypass CORS and worker restrictions.

### Prerequisites

- **Python 3** (or any static site server like `http-server`)
- **Node.js 18+** (for running the automated test suite)

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url> r-gilmore-study-guide
   cd r-gilmore-study-guide
   ```

2. **Install Node dependencies (required for tests and Playwright):**
   ```bash
   npm install
   npx playwright install # Needed for visual E2E verification
   ```

3. **Start the local development server:**
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Or using Node
   npx http-server -p 8000
   ```

4. **Launch the app:**
   Open your browser and navigate to `http://localhost:8000`

---

## 🛠 Architecture & Tech Stack

This project is purposefully designed as a simple static frontend that heavily utilizes modern Web APIs.

- **Frontend**: HTML5, CSS3 (using CSS Variables for theming), Vanilla JavaScript (ES Modules). No heavy frameworks like React or Vue are needed.
- **Execution Engine**: [WebR](https://docs.r-wasm.org/webr/latest/) (Compiled R to WebAssembly).
- **Security**: Strict Content Security Policy (CSP) blocking inline styles and limiting executable scripts to prevent XSS.
- **R Packages Pre-configured**: `tidyverse`, `skimr`, `rstatix`, `lubridate`, `stringr`, `purrr`, `rlang`.

### Core Files

- `script.js`: Handles WebR initialization, the R Shelter execution environment, and DOM manipulation (loading spinners, run buttons).
- `logic.js`: Pure functions isolated for unit testing. Handles fuzzy code matching (`normalizeCode`, `compareCode`), escaping output (`escapeHTML`), and processing WebR output arrays/plots.
- `js/r_data.js`: The R script string injected into WebR upon initialization to pre-load all the datasets.

---

## 📝 How to Add a New Module

1. **Create the HTML File:** Copy an existing module (e.g., `modules/basics.html`) to maintain the CSS layout and "index card" styling.
2. **Add Content:** Write the lesson in standard HTML. Use `<pre><code>` tags for static code examples.
3. **Add Interactive Elements:**
   Create an `.editor-container` with a `<textarea class="code-editor">` and a `<button class="check-btn">`.
4. **Set the Solution:** Add a `data-answer="expected logic"` attribute to the check button. The fuzzy matcher will validate user input against this.
5. **Update Navigation:** Link your new module on the `index.html` grid.

---

## 🧪 Testing

We employ a dual-testing strategy to ensure both the JavaScript utilities and the WebR engine behave correctly.

### 1. Unit Tests (Node.js Native Test Runner)
Tests the pure functions in `logic.js` (like string normalizers, security escape functions, and output formatters).

```bash
npm test
```

### 2. End-to-End & Integration Tests (Playwright)
Spins up a headless browser, starts a local server, and fully tests the WebR lifecycle, navigating modules and asserting actual R execution works correctly.

```bash
# Run all Playwright tests
npx playwright test

# Verify specific frontend visuals
python3 verify_frontend.py
```

---

## 🔧 Troubleshooting

- **R Engine Stuck on "Loading R Environment..."?**
  - Ensure you are not opening the file via `file://`. It must be served over `http://`.
  - Check the browser Console (F12) for missing file errors.
- **"Object not found" when typing a column name?**
  - Remember to refer to the dataframes listed above, or ensure you aren't capitalizing where you shouldn't.

## House Rules

- **Rule 1:** No cell phones. (The Diner Rules apply).
- **Rule 2:** Coffee is mandatory while coding.
- **Rule 3:** If your code errors, do not panic. Channel your inner intensity and force the data to submit to your will.
- **Rule 4:** Always check your assumptions.

> "Oy with the poodles already!"
