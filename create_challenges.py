import os
import zipfile

challenges = {
    'basics': {
        'name': 'module_1_basics',
        'files': {
            'module_1_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 1 CHALLENGE
# 🏫 THEME: CHILTON BASICS
# ------------------------------------------------------------------------------
# Welcome to Chilton! Headmaster Charleston expects nothing but excellence.

# TASK 1: PACKAGES
# 1a. Load the 'tidyverse' and 'skimr' packages.
# Write your code below:


# TASK 2: OBJECTS & NAMING
# 2a. Create an object for the number of classes Rory takes. Name it 'rory_classes' and assign it the value 6.

# 2b. Create an object for Paris's favorite subject. Name it 'paris_favorite' and assign it the text "Literature".

# 2c. Fix this bad variable name: `1st place` <- "Paris". Name it correctly using snake_case.


# TASK 3: MATH & PEMDAS
# 3a. Calculate the average of Rory's recent test scores: 98, 95, and 99.
# You must use PEMDAS (parentheses) and the division operator (/). Assign it to 'rory_average'.

# 3b. Calculate 5 raised to the power of 3 (^), multiplied by 2 (*).

# 3c. Calculate 100 minus 50, then divide the result by 2.


# TASK 4: LOGIC
# 4a. Ask R if Rory's average (from 3a) is greater than (>) 95.

# 4b. Ask R if Paris's favorite subject (from 2b) is exactly equal to (==) "Math".

# 4c. Ask R if 10 is NOT equal to (!=) 10.

# 4d. Ask R if 50 is less than (<) 100.

# 4e. Ask R if 100 is greater than or equal to (>=) 100.

# 4f. Ask R if 20 is less than or equal to (<=) 15.


# TASK 5: VECTORS
# 5a. Create a vector of Chilton student grades: 92.5, 98.0, 88.5, 95.0.
# Name the vector 'chilton_grades'.

# 5b. Create a vector of student names: "Paris", "Rory", "Louise". Name it 'puff_members'.


# TASK 6: DATA TYPES
# 6a. Check the class() of the 'chilton_grades' vector.

# 6b. Check the class() of the text "Headmaster Charleston".

# 6c. Check the class() of the value TRUE.


# TASK 7: COMMENTS
# 7a. Write a comment below saying: "I will survive Chilton"


# TASK 8: SUMMARIZING DATA
# 8a. We have a CSV file called 'students.csv'. Read it into an object called 'students'.
# Hint: students <- read.csv("students.csv")


# 8b. Use the skim() function from the skimr package to get a summary of the 'students' dataset.


# ------------------------------------------------------------------------------
# 🎉 GREAT JOB! If your code runs without errors, you survive another day at Chilton!
# ------------------------------------------------------------------------------
""",
            'students.csv': """name,gpa,club\nParis,4.0,Newspaper\nRory,4.0,Newspaper\nLouise,3.2,Puffs\nMadeline,2.8,Puffs\nBrad,3.5,Drama"""
        }
    },
    'wrangling': {
        'name': 'module_2_wrangling',
        'files': {
            'module_2_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 2 CHALLENGE
# 🍔 THEME: LUKE'S DINER
# ------------------------------------------------------------------------------
# Luke is overwhelmed and needs you to manage the diner's data.

# Setup: Load tidyverse
library(tidyverse)

# Read the data
menu <- read.csv("menu.csv")
customers <- read.csv("customers.csv")
orders <- read.csv("orders.csv")

# TASK 1: PULL vs SELECT
# 1a. Create a new dataframe called 'menu_items' that only contains the 'item' and 'price' columns from 'menu'.
# Use select().

# 1b. Select all columns EXCEPT 'calories' from 'menu' (use -).

# 1c. Extract just the 'calories' column from 'menu' as a vector. Use pull().


# TASK 2: THE DOLLAR SIGN
# 2a. Extract the 'name' column from the 'customers' dataframe using the $ shortcut.


# TASK 3: FILTER
# 3a. Filter the 'menu' to only show items with a price greater than (>) 5.00.

# 3b. Filter the 'customers' to show everyone who is NOT (!=) a "VIP".

# 3c. Filter the 'menu' to show only the "Burger" item (==).

# 3d. Filter 'menu' for items with calories < 500 AND price <= 6.50.


# TASK 4: ARRANGE
# 4a. Sort the 'menu' by 'calories' from highest to lowest (descending).

# 4b. Sort the 'orders' by 'tips' from lowest to highest (ascending).


# TASK 5: MUTATE
# 5a. Luke is raising prices! Mutate the 'menu' to add a new column 'new_price'
# that is the 'price' + 2.00. Assign this to a new object 'updated_menu'.

# 5b. Mutate 'menu' to add a column 'price_per_calorie' (price / calories).


# TASK 6: INSPECTING
# 6a. Use table() on the 'status' column of the 'customers' dataframe to count the types of customers.

# 6b. Use unique() to find the unique statuses in 'customers'.


# TASK 7: GROUP_BY & SUMMARISE
# 7a. Group the 'customers' dataframe by 'status', and summarise to count the number of people in each status (use n()).

# 7b. Using 'orders', summarise the total tips (sum(tips)) and average tip (mean(tips)).

""",
            'menu.csv': """item,price,calories\nBurger,12.00,800\nFries,6.50,400\nCoffee,3.00,5\nPie,5.00,450\nSalad,9.00,300""",
            'customers.csv': """name,status\nLorelai,VIP\nRory,VIP\nJess,Employee\nKirk,Regular\nLuke,Owner""",
            'orders.csv': """id,tips\n1,2.00\n2,5.00\n3,0.00\n4,1.50\n5,10.00"""
        }
    },
    'tidying': {
        'name': 'module_3_tidying',
        'files': {
            'module_3_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 3 CHALLENGE
# 🏨 THEME: THE DRAGONFLY INN
# ------------------------------------------------------------------------------
# Sookie's kitchen data is a mess! Let's pivot it.

library(tidyverse)
kitchen <- read.csv("kitchen.csv")
long_data <- read.csv("long_data.csv")
supplies <- read.csv("supplies.csv")

# TASK 1: PIVOT LONGER
# 1a. Use pivot_longer() on 'kitchen' to combine the 'Monday' and 'Tuesday' columns.
# Call the new name column "Day" and the value column "Eggs". Assign to 'kitchen_long'.

# 1b. The 'supplies' data is wide. It has 'Apples', 'Oranges', 'Bananas'.
# Pivot it longer! Names to "Fruit", values to "Count". Assign to 'supplies_long'.


# TASK 2: PIVOT WIDER
# 2a. Use pivot_wider() on 'long_data'.
# Take column names from "Day" and values from "Eggs". Assign to 'kitchen_wide'.

# 2b. Use pivot_wider() on 'supplies_long' (from 1b) to turn it back to wide format.

""",
            'kitchen.csv': """Dish,Monday,Tuesday\nRisotto,50,40\nPancakes,30,35""",
            'long_data.csv': """Dish,Day,Eggs\nRisotto,Monday,50\nRisotto,Tuesday,45\nPancakes,Monday,30\nPancakes,Tuesday,35""",
            'supplies.csv': """Chef,Apples,Oranges,Bananas\nSookie,10,15,5\nJackson,20,5,30"""
        }
    },
    'visualization': {
        'name': 'module_4_visualization',
        'files': {
            'module_4_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 4 CHALLENGE
# 🎨 THEME: FESTIVAL OF LIVING ART
# ------------------------------------------------------------------------------
# Make some art using ggplot2!

library(tidyverse)
art_entries <- read.csv("art_entries.csv")
paint_tubes <- read.csv("paint_tubes.csv")

# TASK 1: HISTOGRAM
# 1a. Start a plot with 'paint_tubes'. Set x-axis to 'volume'. Add a histogram.

# 1b. Try changing the 'bins' argument in geom_histogram to 10.


# TASK 2: BAR PLOT
# 2a. Plot 'art_entries' with x-axis 'painting'. Add a bar plot.

# 2b. Plot 'art_entries' with x-axis 'contestant'.


# TASK 3: BOXPLOT
# 3a. Plot 'art_entries'. Set x to 'painting' and y to 'pose_time'. Add a boxplot.

# 3b. Plot 'paint_tubes'. Set x to 'brand' and y to 'volume'. Add a boxplot.


# TASK 4: SCATTERPLOT
# 4a. Plot 'paint_tubes'. Set x to 'volume' and y to 'volume' (just for demo). Add points.

# 4b. Change the color of the points in 4a to "blue" inside geom_point().


# TASK 5: COLOR vs FILL
# 5a. Plot 'paint_tubes' with x = 'brand' and fill = 'brand'. Add a bar plot.

# 5b. Plot 'paint_tubes' with x = 'volume' and color = 'brand'. Add a scatterplot (geom_point).


# TASK 6: LABELS & THEMES
# 6a. Take your scatterplot from Task 4a, add theme_classic(), a title using labs(), and change x/y labels.


# TASK 7: FACETING
# 7a. Plot 'paint_tubes' with x='volume', add a histogram, and facet_wrap(~ brand).

# 7b. Plot 'art_entries' with x='pose_time', add a histogram, and facet_wrap(~ painting).

""",
            'art_entries.csv': """contestant,painting,pose_time\nKirk,Jesus,15\nRory,Portrait,20\nLorelai,Renoir,18\nTaylor,Washington,12\nBabette,Degas,10\nMissPatty,Renoir,16""",
            'paint_tubes.csv': """volume,brand\n50.2,Winsor\n48.1,Newton\n55.3,Winsor\n45.0,Newton\n51.2,Winsor\n60.1,Newton\n49.8,Winsor\n52.1,Winsor\n47.5,Newton"""
        }
    },
    'statistics': {
        'name': 'module_5_statistics',
        'files': {
            'module_5_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 5 CHALLENGE
# 🎓 THEME: YALE STATISTICS
# ------------------------------------------------------------------------------

library(tidyverse)
stunt_heights <- read.csv("stunt_heights.csv")
yale_students <- read.csv("yale_students.csv")
lizards <- read.csv("lizards.csv")
creams <- read.csv("creams.csv")

# TASK 1: DATA CLEANING
# 1a. Filter 'stunt_heights' to keep height_m < 100. Assign to 'clean_stunts'.

# 1b. Filter 'yale_students' to keep hours_studied >= 0 (no negative study hours!).


# TASK 2: NORMALITY CHECK
# 2a. Run ks.test on clean_stunts$height_m (using y="pnorm", mean=mean(x), sd=sd(x)).


# TASK 3: LOG TRANSFORM
# 3a. Create log_height in 'clean_stunts' using log10(height_m).


# TASK 4: ONE-SAMPLE T-TEST
# 4a. Run a one-sample t-test on yale_students$hours_studied with mu = 20.

# 4b. Run a one-sample t-test on clean_stunts$height_m with mu = 10.


# TASK 5: PAIRED T-TEST
# 5a. Compare 'Cream_A' and 'Cream_B' from 'creams' dataset. Use paired = TRUE.


# TASK 6: UNPAIRED T-TEST
# 6a. Compare 'horn_length' by 'survival' using the 'lizards' data.
# Remember to use the formula syntax: Numeric ~ Group.


# TASK 7: POWER ANALYSIS
# 7a. Calculate power.t.test with delta = 10, sd = 15, power = 0.8, type = "two.sample".

# 7b. Calculate power.t.test with delta = 5, sd = 10, power = 0.9, type = "one.sample".

""",
            'stunt_heights.csv': """height_m\n10\n12\n15\n8\n150\n11\n9""",
            'yale_students.csv': """name,major,hours_studied\nLogan,Economics,2\nColin,Philosophy,1\nFinn,Drama,0\nMarty,History,10\nDoyle,Journalism,12\nRory,English,-5""",
            'lizards.csv': """horn_length,survival\n10,Died\n12,Died\n11,Died\n14,Died\n9,Died\n22,Lived\n24,Lived\n21,Lived\n25,Lived\n20,Lived""",
            'creams.csv': """Patient,Cream_A,Cream_B\n1,5.2,8.1\n2,4.8,7.9\n3,5.5,8.5\n4,6.0,9.0\n5,4.5,7.5"""
        }
    },
    'anova': {
        'name': 'module_6_anova',
        'files': {
            'module_6_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 6 CHALLENGE
# 🍽️ THEME: FRIDAY NIGHT DINNER (ANOVA)
# ------------------------------------------------------------------------------

library(tidyverse)
dinner_ratings <- read.csv("dinner_ratings.csv")
maids <- read.csv("maids.csv")

# TASK 1: ANOVA
# 1a. Run an ANOVA (aov) to see if 'rating' depends on 'course' in 'dinner_ratings'.
# Save it as 'anova_result'.
# Use formula: rating ~ course

# 1b. Use summary() on 'anova_result' to see the p-value.


# TASK 2: TUKEY'S HSD
# 2a. Run TukeyHSD() on your 'anova_result' to see which courses differ.


# TASK 3: MORE ANOVA
# 3a. Run an ANOVA (aov) to see if 'tenure_days' depends on 'name' in 'maids'.
# Save as 'maids_aov' and summarize it.

""",
            'dinner_ratings.csv': """course,rating\nSoup,7.5\nSoup,6.8\nSoup,7.2\nSalad,5.5\nSalad,6.1\nSalad,5.9\nMain,9.2\nMain,8.8\nMain,9.5""",
            'maids.csv': """name,tenure_days\nSarah,5\nSarah,4\nGerta,2\nGerta,3\nMaria,1\nMaria,2"""
        }
    },
    'regression': {
        'name': 'module_7_regression',
        'files': {
            'module_7_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 7 CHALLENGE
# 📈 THEME: RICHARD'S INVESTMENTS (REGRESSION)
# ------------------------------------------------------------------------------

library(tidyverse)
investments <- read.csv("investments.csv")
market_data <- read.csv("market_data.csv")

# TASK 1: CORRELATION
# 1a. Run cor.test() to check the correlation between 'risk' and 'roi' in 'investments'.


# TASK 2: LINEAR REGRESSION
# 2a. Build a linear model (lm) predicting 'roi' from 'risk' in 'investments'.
# Save it as 'model'. Formula: roi ~ risk.

# 2b. Use summary() on 'model' to get the R-squared and coefficients.


# TASK 3: TIME SERIES REGRESSION
# 3a. Build a linear model predicting 'index' from 'day' using 'market_data'.
# Save as 'market_model' and summarize it.

""",
            'investments.csv': """company,risk,roi\nApple,2,15\nEnron,10,-100\nGoogle,3,12\nBlockbuster,9,-50\nStartupA,8,-20\nSafeBet,1,5""",
            'market_data.csv': """day,index\n1,1001\n2,1005\n3,1012\n4,1010\n5,1020"""
        }
    },
    'categorical': {
        'name': 'module_8_categorical',
        'files': {
            'module_8_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: MODULE 8 CHALLENGE
# 💃 THEME: MISS PATTY'S STUDIO (CATEGORICAL)
# ------------------------------------------------------------------------------

library(tidyverse)
dancers <- read.csv("dancers.csv")

# TASK 1: TABLE
# 1a. Create a contingency table of 'age_group' and 'style' using table().
# Save it as 'dance_table'.


# TASK 2: CHI-SQUARED TEST
# 2a. Run chisq.test() on your 'dance_table' to see if age group and style are associated.


# TASK 3: ANOTHER TEST
# 3a. Test if there's an equal number of dancers in each 'age_group'.
# Use chisq.test(table(dancers$age_group)).

""",
            'dancers.csv': """name,age_group,style\nClara,Kid,Ballet\nPaul,Teen,Tap\nGeneva,Adult,Ballroom\nKyle,Teen,HipHop\nAmy,Kid,Ballet\nBob,Adult,Tap\nSue,Teen,HipHop\nDan,Adult,Ballroom"""
        }
    },
    'module6': {
        'name': 'skill_a_module6',
        'files': {
            'skill_a_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL A CHALLENGE
# 🦍 THEME: LIFE & DEATH BRIGADE (JOINING)
# ------------------------------------------------------------------------------

library(tidyverse)
guests <- read.csv("guests.csv")
society_list <- read.csv("society_list.csv")

# TASK 1: LEFT JOIN
# 1a. Left join 'guests' with 'society_list' by 'id'. Assign to 'party_roster'.


# TASK 2: INNER JOIN
# 2a. Inner join 'guests' with 'society_list'.


# TASK 3: CASE WHEN
# 3a. Mutate 'guests' to add a 'VIP_status' column using case_when().
# If status == "Member", then "VIP".
# If status == "Gatecrasher", then "Bouncer Alert".
# TRUE ~ "Regular"

""",
            'guests.csv': """id,name,status\n01,Logan,Member\n02,Rory,Guest\n03,Colin,Member\n06,Paris,Gatecrasher""",
            'society_list.csv': """id,society\n01,LDB\n03,LDB\n04,LDB\n05,LDB"""
        }
    },
    'skill_b': {
        'name': 'skill_b_dates',
        'files': {
            'skill_b_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL B CHALLENGE
# 📆 THEME: TOWN FESTIVALS (DATES)
# ------------------------------------------------------------------------------

library(tidyverse)
library(lubridate)
festivals <- read.csv("festivals.csv")
marathon <- read.csv("marathon.csv")

# TASK 1: PARSING DATES
# 1a. Mutate 'festivals' to convert 'date_str' (e.g., "Feb 14, 2024") to a date using mdy().
# Assign to a new column 'real_date'.


# TASK 2: DURATION
# 2a. Mutate 'marathon' to calculate 'duration' (end - start).


# TASK 3: EXTRACTING COMPONENTS
# 3a. Extract the month() from your 'real_date' column in 'festivals'.

""",
            'festivals.csv': """event,date_str\nFirelight,Feb 14, 2024\nBid-a-Basket,Mar 10, 2024\nDance Marathon,Apr 01, 2024""",
            'marathon.csv': """contestant,start,end\nKirk,6,30\nLorelai,6,28\nRory,6,28"""
        }
    },
    'skill_c': {
        'name': 'skill_c_strings',
        'files': {
            'skill_c_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL C CHALLENGE
# 🗞️ THEME: STARS HOLLOW GAZETTE (STRINGS)
# ------------------------------------------------------------------------------

library(tidyverse)
library(stringr)
gazette <- read.csv("gazette.csv")
rumors <- read.csv("rumors.csv")

# TASK 1: STRING DETECT
# 1a. Filter 'rumors' to keep rows where 'text' contains the word "wedding" (str_detect).


# TASK 2: STRING REPLACE
# 2a. Mutate 'rumors' to replace "cat" with "tiger" using str_replace().


# TASK 3: STRING LENGTH
# 3a. Mutate 'gazette' to add a column 'name_length' using str_length() on the 'writer' column.


# TASK 4: TO UPPER / TO LOWER
# 4a. Mutate 'gazette' to make the 'writer' names ALL CAPS using str_to_upper().

""",
            'gazette.csv': """writer,articles\nRory,5\nDoyle,10\nEsther,2""",
            'rumors.csv': """source,text\nMissPatty,I heard a wedding is coming!\nBabette,He's definitely proposing.\nKirk,I saw a cat.\nTaylor,Permits are required."""
        }
    },
    'functional': {
        'name': 'skill_d_functional',
        'files': {
            'skill_d_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL D CHALLENGE
# 🛋️ THEME: MRS. KIM'S ANTIQUES (FUNCTIONAL PROGRAMMING)
# ------------------------------------------------------------------------------

library(tidyverse)
library(purrr)
antiques <- read.csv("antiques.csv")

# TASK 1: MAP
# 1a. Use map() on the 'price' column of 'antiques' to apply the sqrt() function.


# TASK 2: MAP_DBL
# 2a. Use map_dbl() on the 'price' column of 'antiques' to apply the sqrt() function (returns a vector).


# TASK 3: ANONYMOUS FUNCTIONS
# 3a. Use map_dbl() on the 'price' column to multiply each price by 1.10 (add 10% tax).
# Hint: map_dbl(antiques$price, ~ .x * 1.10)

""",
            'antiques.csv': """item,price\nTable,500\nChair,150\nLamp,200\nVase,1000"""
        }
    },
    'oop': {
        'name': 'skill_e_oop',
        'files': {
            'skill_e_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL E CHALLENGE
# 🎸 THEME: THE DAR & HEP ALIEN (OOP)
# ------------------------------------------------------------------------------

# TASK 1: S3 CLASSES
# 1a. Create a list called 'band_member' with name = "Lane" and instrument = "Drums".
# 1b. Assign the class "rockstar" to 'band_member'.
# 1b. Write a generic method `play` and a specific method `play.rockstar` that prints "Rock on!".


# TASK 2: R6 CLASSES (Bonus)
# 2a. (Optional) Define an R6 class "Band" with a public method "gig".

""",
            'instructions.txt': "Review your notes on S3 and R6 classes to complete the OOP tasks!"
        }
    },
    'metaprogramming': {
        'name': 'skill_f_metaprogramming',
        'files': {
            'skill_f_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL F CHALLENGE
# 🎶 THEME: THE TROUBADOUR (METAPROGRAMMING)
# ------------------------------------------------------------------------------

library(rlang)
library(tidyverse)

# TASK 1: QUOTATION
# 1a. Write a function `my_summarise` that takes a dataframe and a grouping variable.
# Use enquo() and !! to group the dataframe before summarising.

# Example:
# my_summarise <- function(df, group_var) {
#   var <- enquo(group_var)
#   df |> group_by(!!var) |> summarise(count = n())
# }

""",
            'instructions.txt': "Test your metaprogramming function with mtcars or any dataset."
        }
    },
    'debugging': {
        'name': 'skill_g_debugging',
        'files': {
            'skill_g_challenge.Rmd': """# ------------------------------------------------------------------------------
# 🏆 THE R GILMORE STUDY GUIDE: SKILL G CHALLENGE
# 🛡️ THEME: PARIS GELLER'S BUNKER (DEBUGGING)
# ------------------------------------------------------------------------------

# TASK 1: BROWSER()
# 1a. Write a loop from 1 to 5. Insert browser() inside the loop when i == 3.

# TASK 2: TRACEBACK
# 2a. Call a function that produces an error. Then mentally run traceback() (or actually run it in your console).

""",
            'instructions.txt': "Practice debugging interactively in RStudio."
        }
    }
}

os.makedirs('downloads', exist_ok=True)

for html_name, chal_data in challenges.items():
    zip_name = chal_data['name']
    zip_path = f"downloads/{zip_name}.zip"
    with zipfile.ZipFile(zip_path, 'w') as zf:
        # Create an inner directory inside the zip for neatness
        for filename, content in chal_data['files'].items():
            zf.writestr(f"{zip_name}/{filename}", content)
