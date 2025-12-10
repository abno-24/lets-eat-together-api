-- Disable foreign key checks temporarily for a clean setup
SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables if they exist to allow for clean re-runs
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Menu_Items;
DROP TABLE IF EXISTS Restaurants;

-- 1. Restaurants Table
CREATE TABLE Restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Menu Items Table
CREATE TABLE Menu_Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- DECIMAL is best for currency
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key Constraint
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id) ON DELETE CASCADE
);

-- 3. Orders Table
-- For simplicity, assuming one row = one order for one dish
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_item_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key Constraint
    FOREIGN KEY (menu_item_id) REFERENCES Menu_Items(id) ON DELETE RESTRICT
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;