# ☕ The R Gilmore Study Guide

*"Life's short. Talk fast. Code faster."*

A **Gilmore Girls-themed** interactive study guide for learning R programming. This project combines the charm of Stars Hollow with the power of data science, covering everything from basic R syntax to advanced statistical analysis.

## 🍂 Features

- **Interactive R Console:** Run R code directly in your browser using [WebR](https://docs.r-wasm.org/webr/latest/).
- **Themed Modules:** Learn data wrangling at *Luke's Diner*, tidying at *The Dragonfly Inn*, and visualization with *The Gazette*.
- **Instant Feedback:** Get real-time validation on your code exercises.
- **Cheat Sheets:** Quick access to essential `tidyverse` functions and a "Sunday Night Panic" starter kit.
- **Visualizations:** Create plots using `ggplot2` right in the browser.

## 🎓 Curriculum

The guide is divided into three tiers:

### **Tier 1: The BILD 5 Syllabus**
- **Module 1 (Chilton Basics):** Objects, Vectors, and Types.
- **Module 2 (Luke's Diner):** Data Frames, Selecting, Filtering, Mutating.
- **Module 3 (The Dragonfly Inn):** Tidying Data (Pivoting).
- **Module 4 (The Gazette):** Visualization with `ggplot2`.
- **Module 5 (Yale Daily News):** T-Tests, Normality, Power Analysis.
- **Module 6 (Town Meeting):** ANOVA and Tukey's HSD.
- **Module 7 (Dance Marathon):** Correlation and Linear Regression.
- **Module 8 (The DAR Tea):** Categorical Data (Chi-Square).

### **Tier 2: Research Skills (The Life & Death Brigade)**
- **Skill A:** Logic & Joining Data.
- **Skill B:** Dates & Time (`lubridate`).
- **Skill C:** Strings & Text (`stringr`).

### **Tier 3: Professional Certification**
- Advanced topics like Functional Programming and Machine Learning (Coming Soon).

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules)
- **R Engine:** WebR (WebAssembly R)
- **Styling:** Custom CSS with a Stars Hollow color palette (`--luke-yellow`, `--yale-blue`, `--coffee-dark`)

## 🚀 How to Run

Since this project uses ES Modules and WebAssembly, you need to serve it via a local HTTP server.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd r-gilmore-study-guide
    ```

2.  **Start a local server:**
    Using Python (pre-installed on most systems):
    ```bash
    python3 -m http.server
    ```
    Or using Node.js `http-server`:
    ```bash
    npx http-server .
    ```

3.  **Open in Browser:**
    Navigate to `http://localhost:8000` (or the port shown in your terminal).

## 🧪 Testing

The project uses Node.js native test runner and Playwright for end-to-end testing.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Tests:**
    ```bash
    npm test
    ```

## 📦 Data

The environment comes pre-loaded with several datasets for practice:
- `menu`: Items at Luke's Diner.
- `orders`: Customer orders.
- `pumpkins`: Generated weights for the Pumpkin Patch.
- `students`: Chilton and Stars Hollow High students.
- `penguins`: Mass data for t-tests.
- And more!

---
*Oy with the poodles already!* 🐩
