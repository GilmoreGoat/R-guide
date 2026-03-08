import os
import zipfile

projects = {
    'project_1': {
        'name': 'tier4_project_1_dooses_market',
        'files': {
            'dooses_market.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 1
# 🛒 THEME: DOOSE'S MARKET INVENTORY (WRANGLING)
# ------------------------------------------------------------------------------
# Taylor Doose is furious about a missing shipment of organic plums.
# It's your job to reconcile the inventory data and report back.

library(tidyverse)
inventory <- read.csv("inventory.csv")
sales <- read.csv("sales.csv")

# TASK 1: INVENTORY CHECK
# 1a. Filter the `inventory` dataframe for items where `stock` is less than `minimum_required`.
# Save this to an object called `reorder_list`.

# TASK 2: PRICE HIKE
# 2a. Taylor wants to increase the price of all "Produce" items by 15%.
# Mutate the `inventory` dataframe to create a `new_price` column.
# Use an ifelse() or case_when() inside mutate to only increase prices for the "Produce" category.

# TASK 3: SALES SUMMARY
# 3a. Summarize the `sales` dataframe. Calculate the total revenue (quantity * price) for each `date`.
# Group by `date` and use summarize(). Save to `daily_revenue`.

# TASK 4: THE BIG REVEAL 🏆
# Join `sales` and `inventory` by `item_id`.
# Find out which item generated the most total revenue overall.
# Sort descending and save the top result to `top_item`.

""",
            'inventory.csv': "item_id,item_name,category,stock,minimum_required,price\n101,Organic Plums,Produce,5,20,1.50\n102,Canned Beans,Pantry,50,10,0.80\n103,Baguette,Bakery,2,5,3.00\n104,Apples,Produce,15,10,0.50\n",
            'sales.csv': "sale_id,date,item_id,quantity\n1,2024-05-01,101,10\n2,2024-05-01,103,3\n3,2024-05-02,101,5\n4,2024-05-02,104,20\n"
        }
    },
    'project_2': {
        'name': 'tier4_project_2_westons_bakery',
        'files': {
            'westons_bakery.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 2
# 🥧 THEME: WESTON'S BAKERY MENU (TIDYING & STRINGS)
# ------------------------------------------------------------------------------
# Weston's Bakery has a messy digital menu. The categories and prices are all mixed up.

library(tidyverse)
menu_raw <- read.csv("westons_raw.csv")

# TASK 1: SEPARATE COLUMNS
# The `item_info` column contains the item name and its category separated by a hyphen (e.g., "Cherry Pie-Dessert").
# Separate this into two columns: `item` and `category`.

# TASK 2: STRING CLEANING
# The `price_str` column has messy dollar signs and text (e.g., "$4.50 (slice)").
# Use stringr functions (like str_remove or str_extract) to isolate just the numeric part,
# and convert it to a numeric column called `price`.

# TASK 3: PIVOTING
# Pivot the dataset wider so that each `category` becomes a column,
# and the values are the `item` names. (You might need to create a row identifier first to avoid list-cols).

# TASK 4: THE SPECIAL ORDER 🏆
# Filter the cleaned dataset for items containing the word "Chocolate" (case-insensitive).
# Save to `chocolate_items`.

""",
            'westons_raw.csv': "id,item_info,price_str\n1,Cherry Pie-Dessert,$4.50 (slice)\n2,Chocolate Cake-Dessert,$5.00!!\n3,Croissant-Pastry,$3.00\n4,Black Coffee-Beverage,$2.50 cup\n5,Chocolate Croissant-Pastry,$3.50\n"
        }
    },
    'project_3': {
        'name': 'tier4_project_3_als_pancakes',
        'files': {
            'als_pancakes.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 3
# 🥞 THEME: AL'S PANCAKE WORLD (DATES & JOINING)
# ------------------------------------------------------------------------------
# Al's Pancake World has completely pivoted to international cuisine again.
# We need to track the changing menus over time.

library(tidyverse)
library(lubridate)
menus <- read.csv("menus.csv")
reviews <- read.csv("reviews.csv")

# TASK 1: DATE PARSING
# The `launch_date` in `menus` is formatted weirdly (e.g., "15-Mar-2004").
# Convert it to a proper Date object using lubridate.

# TASK 2: DURATION
# Calculate how many days each menu lasted.
# Subtract `launch_date` from the `end_date` (parse `end_date` first!).
# Save as a `duration_days` column.

# TASK 3: THE MERGE
# Join the `menus` and `reviews` datasets. Be careful, a menu might have multiple reviews.
# Calculate the average rating for each `cuisine_type`.

# TASK 4: TIME TRAVELLER 🏆
# Find which cuisine was active on "2004-10-31" (Halloween).
# Save the `cuisine_type` to `halloween_menu`.

""",
            'menus.csv': "menu_id,cuisine_type,launch_date,end_date\n1,Moroccan,01-Jan-2004,14-Mar-2004\n2,El Salvadorian,15-Mar-2004,30-Jun-2004\n3,Martian,01-Jul-2004,15-Nov-2004\n",
            'reviews.csv': "review_id,menu_id,rating\n101,1,4\n102,1,5\n103,2,2\n104,2,3\n105,3,1\n106,3,2\n"
        }
    },
    'project_4': {
        'name': 'tier4_project_4_independence_inn',
        'files': {
            'independence_inn.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 4
# 🛎️ THEME: THE INDEPENDENCE INN LEDGER (ADVANCED TIDYING & VISUALIZATION)
# ------------------------------------------------------------------------------
# Lorelai needs to present the quarterly earnings to Mia, but the ledger is a disaster.

library(tidyverse)
ledger <- read.csv("ledger.csv")

# TASK 1: THE BIG CLEANUP
# The `ledger` dataset has months as columns (Jan, Feb, Mar) and revenue types as rows.
# Pivot the dataset longer so we have `Month` and `Revenue` columns.
# Save to `tidy_ledger`.

# TASK 2: SUMMARIZING BY CATEGORY
# Group `tidy_ledger` by `Category` and calculate the total revenue for the quarter.
# Save to `category_totals`.

# TASK 3: VISUALIZING THE QUARTER
# Create a bar chart using ggplot2 showing the total revenue by `Category`.
# Fill the bars by `Category` and add a title "Q1 Revenue by Category".
# Assign the plot to an object `revenue_plot`.

# TASK 4: THE BOARD MEETING 🏆
# Create a line plot showing the `Revenue` over `Month`, colored by `Category`.
# (Note: You may need to ensure `Month` is an ordered factor to plot correctly: Jan, Feb, Mar).
# Assign the plot to `trend_plot`.

""",
            'ledger.csv': "Category,Jan,Feb,Mar\nRooms,15000,12000,18000\nWeddings,5000,8000,10000\nDining,4000,3500,5000\nEvents,2000,1000,3000\n"
        }
    },
    'project_5': {
        'name': 'tier4_project_5_kirks_jobs',
        'files': {
            'kirks_jobs.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 5
# 💼 THEME: KIRK'S EMPLOYMENT HISTORY (FUNCTIONAL PROGRAMMING)
# ------------------------------------------------------------------------------
# Kirk has had too many jobs to count. We need to analyze his varied income streams without using loops.

library(tidyverse)
library(purrr)

# We have a list of Kirk's daily earnings from three different jobs.
kirk_earnings <- list(
  mailman = c(50, 55, 60, 45, 50),
  swan_delivery = c(100, 0, 0, 150, 0),
  beauty_sales = c(20, 30, 25, 40, 35)
)

# TASK 1: MAP TO THE RESCUE
# Use map_dbl() to calculate the total (sum) earnings for each job in the list.
# Save the result to `total_per_job`.

# TASK 2: CUSTOM FUNCTIONS
# Write a function called `tax_calc` that takes a numeric vector,
# subtracts 15% for taxes, and returns the sum.
# Use map_dbl() to apply `tax_calc` to `kirk_earnings`. Save to `after_tax_totals`.

# TASK 3: FILTERING LISTS
# Use keep() from purrr to keep only the jobs where the *maximum* daily earning was over $70.
# Save to `high_paying_jobs`.

# TASK 4: THE HUSTLE 🏆
# Use map() to calculate the mean earning for each job, then bind the list into a single dataframe
# (using list_rbind or similar, or just map_dfr if you prefer the old way).
# The dataframe should have columns `job` and `mean_earning`. Save to `kirk_summary`.

"""
        }
    },
    'project_6': {
        'name': 'tier4_project_6_taylors_budgets',
        'files': {
            'taylors_budgets.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 6
# 💰 THEME: TAYLOR'S TOWN BUDGETS (STATISTICS & ANOVA)
# ------------------------------------------------------------------------------
# Taylor is convinced the town's seasonal festivals are spending too much money.

library(tidyverse)
festivals <- read.csv("festivals.csv")

# TASK 1: CHECKING NORMALITY
# Taylor wants to know if the `cost` of festivals is normally distributed.
# Run a Shapiro-Wilk test on the `cost` column. Save the result to `cost_normality`.

# TASK 2: THE T-TEST
# Compare the costs between "Spring" and "Autumn" festivals.
# Filter the data for only these two seasons and run an unpaired t-test.
# Save the result to `season_ttest`.

# TASK 3: ANOVA
# Now, test if there is a significant difference in `cost` across ALL `season` categories.
# Run an ANOVA (aov). Save the model to `cost_anova`.

# TASK 4: TUKEY TIME 🏆
# If the ANOVA is significant, we need to know WHICH seasons differ.
# Run TukeyHSD() on your `cost_anova` model. Save the result to `cost_tukey`.
# Which pairs are significantly different? (Look for p adj < 0.05).

""",
            'festivals.csv': "festival_name,season,cost\nFirelight,Winter,5000\nWinter Carnival,Winter,4500\nSpring Fling,Spring,8000\nFlower Festival,Spring,7500\nEnd of Summer Madness,Summer,3000\nLazy Hazy Days,Summer,3500\nAutumn Festival,Autumn,9000\nHay Ride,Autumn,8500\n"
        }
    },
    'project_7': {
        'name': 'tier4_project_7_paris_debates',
        'files': {
            'paris_debates.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 7
# 🗣️ THEME: PARIS'S DEBATE RECORDS (REGRESSION & STRINGS)
# ------------------------------------------------------------------------------
# Paris Geller tracks everything. She wants to know if the length of her opening statement
# predicts her debate score.

library(tidyverse)
library(stringr)
debates <- read.csv("debates.csv")

# TASK 1: WORD COUNT
# The `statement` column contains Paris's opening remarks.
# Use stringr to count the number of words in each statement.
# (Hint: str_count() with a regex for words or spaces).
# Add this as a new column `word_count` to the `debates` dataframe.

# TASK 2: CORRELATION
# Run a correlation test (cor.test) between `word_count` and `judge_score`.
# Save the result to `debate_cor`.

# TASK 3: LINEAR REGRESSION
# Build a linear model (lm) predicting `judge_score` based on `word_count`.
# Save the model to `debate_model`.

# TASK 4: PREDICTION 🏆
# Use your `debate_model` to predict what Paris's score would be
# if she gave a statement with exactly 500 words.
# Save the predicted value to `predicted_score`.

""",
            'debates.csv': "debate_id,statement,judge_score\n1,I am prepared to obliterate the opposition.,85\n2,While the opponent makes a point they are fundamentally flawed in their reasoning.,90\n3,The core issue here is not what we think but what is right.,88\n4,To begin I must state categorically that everything you just heard is wrong.,92\n5,Let us look at the facts.,75\n6,If we examine the historical precedent it becomes abundantly clear that our stance is the only logical conclusion.,95\n"
        }
    },
    'project_8': {
        'name': 'tier4_project_8_lorelai_coffee',
        'files': {
            'lorelai_coffee.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 8
# ☕ THEME: LORELAI'S COFFEE CONSUMPTION (TIME SERIES REGRESSION)
# ------------------------------------------------------------------------------
# We are trying to determine if Lorelai's coffee consumption is increasing over time,
# and if it is affected by the day of the week.

library(tidyverse)
coffee_data <- read.csv("coffee.csv")

# TASK 1: THE WEEKEND EFFECT
# Create a dummy variable called `is_weekend` in the `coffee_data` dataframe.
# It should be 1 if `day_of_week` is "Saturday" or "Sunday", and 0 otherwise.

# TASK 2: MULTIPLE REGRESSION
# Build a linear model (lm) predicting `cups_drank` based on BOTH `day_index` (time)
# and `is_weekend`. Save to `coffee_model`.

# TASK 3: EXTRACTING COEFFICIENTS
# Extract the coefficient for `is_weekend` from your model.
# Save it to `weekend_effect`. Does she drink more on weekends?

# TASK 4: PLOTTING THE TREND 🏆
# Create a scatterplot of `cups_drank` over `day_index`.
# Add a linear regression line (geom_smooth) to the plot.
# Assign the plot to `coffee_plot`.

""",
            'coffee.csv': "day_index,day_of_week,cups_drank\n1,Monday,5\n2,Tuesday,6\n3,Wednesday,5\n4,Thursday,7\n5,Friday,8\n6,Saturday,10\n7,Sunday,9\n8,Monday,6\n9,Tuesday,7\n10,Wednesday,6\n"
        }
    },
    'project_9': {
        'name': 'tier4_project_9_ldb_database',
        'files': {
            'ldb_database.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 9
# 🦍 THEME: THE LIFE & DEATH BRIGADE DATABASE (METAPROGRAMMING & OOP)
# ------------------------------------------------------------------------------
# Logan has tasked you with building a system to track LDB stunts.

library(rlang)
library(tidyverse)

# TASK 1: THE S3 CLASS
# Create a list called `new_stunt` with elements `name` ("Umbrella Jump") and `height` (50).
# Assign it the S3 class "ldb_stunt".

# TASK 2: THE METHOD
# Write an S3 generic method called `execute`.
# Write a specific method `execute.ldb_stunt` that takes an object and prints:
# "In Omnia Paratus! Executing [name] from [height] feet."

# TASK 3: TIDY EVAL FUNCTION
# Write a function `summarize_stunts` that takes a dataframe and a grouping variable.
# Use enquo() and !! to group the dataframe by the provided variable and calculate the max height.
# Example usage: summarize_stunts(stunt_data, location)

# TASK 4: THE TEST 🏆
# stunt_data <- data.frame(location = c("Tower", "Tower", "Bridge"), height = c(50, 60, 40))
# Run your `summarize_stunts` function on `stunt_data` grouping by `location`.
# Save the resulting dataframe to `stunt_summary`.

"""
        }
    },
    'project_10': {
        'name': 'tier4_project_10_stars_hollow_census',
        'files': {
            'stars_hollow_census.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: TIER 4 - PROJECT 10 (CAPSTONE)
# 🗺️ THEME: THE ULTIMATE STARS HOLLOW CENSUS
# ------------------------------------------------------------------------------
# Taylor Doose has compiled the decennial census. It's a mess.
# You need to use everything you've learned to generate the final town report.

library(tidyverse)
library(lubridate)
library(stringr)

# We have three messy files:
population <- read.csv("pop_raw.csv") # Has name, age, and joined_date
businesses <- read.csv("biz_raw.csv") # Has owner_name and revenue string
events <- read.csv("events.csv")      # Has event_name and attendance

# TASK 1: CLEAN POPULATION (DATES & FILTERING)
# 1. Convert `joined_date` to a proper Date.
# 2. Filter out anyone whose age is NA.
# Save to `clean_pop`.

# TASK 2: CLEAN BUSINESSES (STRINGS)
# 1. The `revenue` column looks like "Rev: $50000". Extract just the number and convert to numeric.
# Save to `clean_biz`.

# TASK 3: THE GRAND JOIN
# Left join `clean_pop` with `clean_biz` by matching `name` to `owner_name`.
# (Not everyone owns a business, which is fine).
# Save to `town_data`.

# TASK 4: STATISTICAL ANALYSIS
# Run a linear regression predicting business `revenue` based on the owner's `age`.
# Save the model to `age_revenue_model`.

# TASK 5: THE FINAL REPORT 🏆
# Create a summary dataframe called `town_summary` from `town_data`:
# 1. Calculate `total_population` (number of rows).
# 2. Calculate `total_business_revenue` (sum of revenue, ignoring NAs).
# 3. Calculate `average_age`.

""",
            'pop_raw.csv': "name,age,joined_date\nLuke,40,01-Jan-1980\nTaylor,65,15-Feb-1960\nKirk,30,10-Mar-1990\nLorelai,35,05-Oct-1999\nBabette,NA,01-Jan-1970\n",
            'biz_raw.csv': "owner_name,revenue\nLuke,Rev: $85000\nTaylor,Rev: $120000\nLorelai,Rev: $95000\nKirk,Rev: $1500\n",
            'events.csv': "event_name,attendance\nFirelight,500\nDance Marathon,300\n"
        }
    }
}

os.makedirs('downloads', exist_ok=True)

for html_name, chal_data in projects.items():
    zip_name = chal_data['name']
    zip_path = f"downloads/{zip_name}.zip"
    with zipfile.ZipFile(zip_path, 'w') as zf:
        for filename, content in chal_data['files'].items():
            zf.writestr(f"{zip_name}/{filename}", content)

print("Tier 4 projects generated successfully.")
