export const R_DATA_INIT = `
# --- PRE-LOAD DATA ---

# --- Module 1: Chilton Basics ---
students <- data.frame(
    name = c("Paris", "Rory", "Louise", "Madeline", "Brad"),
    gpa = c(4.0, 4.0, 3.2, 2.8, 3.5),
    club = c("Newspaper", "Newspaper", "Puffs", "Puffs", "Drama")
)

# --- Module 2: Wrangling at Luke's ---
menu <- data.frame(
    item = c("Burger", "Fries", "Coffee", "Pie", "Salad"),
    price = c(12.00, 6.50, 3.00, 5.00, 9.00),
    calories = c(800, 400, 5, 450, 300)
)
customers <- data.frame(
    name = c("Lorelai", "Rory", "Jess", "Kirk", "Luke"),
    status = c("VIP", "VIP", "Employee", "Regular", "Owner")
)
orders <- data.frame(id = 1:5, tips = c(2.00, 5.00, 0.00, 1.50, 10.00))

# --- Module 3: Tidying at the Dragonfly ---
kitchen <- data.frame(
    Dish = c("Risotto", "Pancakes"),
    Monday = c(50, 30),
    Tuesday = c(40, 35)
)
long_data <- data.frame(
    Dish = c("Risotto", "Risotto", "Pancakes", "Pancakes"),
    Day = c("Monday", "Tuesday", "Monday", "Tuesday"),
    Eggs = c(50, 45, 30, 35)
)

# --- Module 4: Festival of Living Art (Visualization) ---
art_entries <- data.frame(
    contestant = c("Kirk", "Rory", "Lorelai", "Taylor", "Babette"),
    painting = c("Jesus", "Portrait", "Renoir", "Washington", "Degas"),
    pose_time = c(15, 20, 18, 12, 10)
)
# Replaces pumpkins
paint_tubes <- data.frame(volume = round(rnorm(200, mean=50, sd=10), 1), brand = sample(c("Winsor","Newton"), 200, replace=TRUE))

# --- Module 5: Yale Stats ---
yale_students <- data.frame(
    name = c("Logan", "Colin", "Finn", "Marty", "Doyle"),
    major = c("Economics", "Philosophy", "Drama", "History", "Journalism"),
    hours_studied = c(2, 1, 0, 10, 12)
)
# Replaces penguins (outlier detection)
stunt_heights <- data.frame(height_m = c(10, 12, 15, 8, 150))

# --- Module 6 (Skill A): Life & Death Brigade ---
guests <- data.frame(
    name = c("Rory", "Paris", "Logan", "Colin", "Finn"),
    costume = c("Gown", "Suit", "Tux", "Tux", "Tux"),
    status = c("Guest", "Gatecrasher", "Member", "Member", "Member")
)
society_list <- data.frame(id = c("01", "03", "04", "05"), society = c("LDB", "LDB", "LDB", "LDB"))

# --- Module 7 (Skill B): Town Festivals ---
festivals <- data.frame(
    event = c("Firelight", "Bid-a-Basket", "Dance Marathon", "Knit-a-thon"),
    date_str = c("Feb 14, 2024", "Mar 10, 2024", "Apr 01, 2024", "Nov 20, 2024"),
    attendance = c(200, 150, 300, 100)
)
marathon <- data.frame(contestant = c("Kirk", "Lorelai", "Rory", "Jackson"), start = 6, end = c(30, 28, 28, 20))

# --- Module 8 (Skill C): Stars Hollow Gazette ---
gazette_bylines <- data.frame(
    writer = c("Rory", "Doyle", "Esther", "Chuck"),
    articles = c(5, 10, 2, 1),
    typos = c(0, 2, 15, 8)
)
rumors <- data.frame(
    source = c("MissPatty", "Babette", "Kirk", "Taylor"),
    text = c("I heard a wedding is coming!", "He's definitely proposing.", "I saw a cat.", "Permits are required.")
)

# --- Module: ANOVA (Friday Night Dinner) ---
dinner_courses <- data.frame(
    course = c("Soup", "Salad", "Main", "Dessert"),
    rating_emily = c(8, 7, 9, 6),
    rating_lorelai = c(9, 8, 10, 10)
)
maids <- data.frame(
    name = c("Sarah", "Gerta", "Maria"),
    tenure_days = c(5, 2, 1)
)

# --- Module: Regression (Richard's Investments) ---
investments <- data.frame(
    company = c("Apple", "Enron", "Google", "Blockbuster"),
    risk = c(2, 10, 3, 9),
    roi = c(15, -100, 12, -50)
)
market_data <- data.frame(
    day = 1:100,
    index = cumsum(rnorm(100)) + 1000
)

# --- Module: Categorical (Miss Patty's Dance Studio) ---
dancers <- data.frame(
    name = c("Clara", "Paul", "Geneva", "Kyle"),
    age_group = c("Kid", "Teen", "Adult", "Teen"),
    style = c("Ballet", "Tap", "Ballroom", "HipHop")
)

# --- Module: Functional (Mrs. Kim's Antiques) ---
antiques <- data.frame(
    item = c("Table", "Chair", "Lamp", "Vase"),
    period = c("Victorian", "Edwardian", "ArtDeco", "Ming"),
    price = c(500, 150, 200, 1000)
)
bills <- c(10, 20, 30)

# --- Module: OOP (DAR vs Hep Alien) ---
dar_members <- data.frame(
    name = c("Emily", "Shira", "Nora"),
    rank = c("President", "Member", "Secretary")
)
band_gigs <- data.frame(
    venue = c("CBGB", "Garage", "Church", "Party"),
    pay = c(50, 0, 20, 100)
)

# --- Misc / Global Helpers ---
townies <- data.frame(role = c("Owner", "Mechanic", "Selectman"))
set.seed(42)
lizards <- data.frame(horn_length = c(10, 12, 11, 14, 9, 22, 24, 21, 25, 20), survival = c(rep("Died", 5), rep("Lived", 5)))
dinner_ratings <- data.frame(
  course = rep(c("Soup", "Salad", "Main"), each = 10),
  rating = c(rnorm(10, 7, 1), rnorm(10, 6, 1), rnorm(10, 9, 1))
)
`;
