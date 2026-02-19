export const R_DATA_INIT = `
# --- PRE-LOAD DATA ---
menu <- data.frame(
    item = c("Burger", "Fries", "Coffee", "Pie", "Salad"),
    price = c(12.00, 6.50, 3.00, 5.00, 9.00),
    calories = c(800, 400, 5, 450, 300)
)
orders <- data.frame(id = 1:5, tips = c(2.00, 5.00, 0.00, 1.50, 10.00))
customers <- data.frame(
    name = c("Lorelai", "Rory", "Taylor", "Kirk", "Luke"),
    status = c("VIP", "VIP", "Banned", "Odd", "Owner")
)
townies <- data.frame(role = c("Owner", "Mechanic", "Selectman"))
kitchen <- data.frame(Dish = c("Omelette", "Pancakes"), Monday = c(50, 30), Tuesday = c(40, 35))
long_data <- data.frame(Dish = c("Omelette", "Omelette", "Pancakes", "Pancakes"), Day = c("Monday", "Tuesday", "Monday", "Tuesday"), Eggs = c(50, 45, 30, 35))
set.seed(42)
pumpkins <- data.frame(weight = round(rnorm(200, mean=15, sd=5), 1), type = sample(c("A","B"), 200, replace=TRUE))
students <- data.frame(house = c("Yale", "Harvard", "Yale", "Yale", "Harvard"), school = c("Chilton","Chilton","StarsHollow","Chilton","StarsHollow"), hours = c(5, 2, 6, 8, 1))
data <- data.frame(coffee = c(1, 2, 3, 4, 5), jitters = c(1, 3, 4, 7, 9))
mass <- c(4500, 3200, 5100, 2900, 120000)
penguins <- data.frame(mass_kg = mass)
sodium_vector <- c(145, 150, 138, 142, 160, 155)
Cream_A <- c(10, 12, 11, 14, 9)
Cream_B <- c(15, 18, 16, 19, 14)
lizards <- data.frame(horn_length = c(10, 12, 11, 14, 9, 22, 24, 21, 25, 20), survival = c(rep("Died", 5), rep("Lived", 5)))
`;
