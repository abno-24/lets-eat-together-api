-- Disable checks for clean insertion
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Insert Data into Restaurants Table (5 Restaurants)
INSERT INTO Restaurants (id, name, city) VALUES
(1, 'Biryani King', 'Mumbai'),
(2, 'Spice Route', 'Delhi'),
(3, 'Tandoori Tales', 'Bangalore'),
(4, 'Hyderabadi Delight', 'Hyderabad'),
(5, 'The Grand Feast', 'Mumbai');

-- 2. Insert Data into Menu_Items Table (Dishes offered by restaurants)

-- Focus Dish: Chicken Biryani (Price range target: 150-300)
INSERT INTO Menu_Items (id, restaurant_id, name, price) VALUES
(101, 1, 'Chicken Biryani', 220.00), -- R1: Price IN range
(102, 2, 'Chicken Biryani', 280.00), -- R2: Price IN range
(103, 3, 'Chicken Biryani', 140.00), -- R3: Price OUT (Too low)
(104, 4, 'Chicken Biryani', 350.00), -- R4: Price OUT (Too high)
(105, 5, 'Chicken Biryani', 180.00); -- R5: Price IN range

-- Other Dishes (Should not affect the search for 'biryani')
INSERT INTO Menu_Items (id, restaurant_id, name, price) VALUES
(106, 1, 'Butter Chicken', 450.00),
(107, 2, 'Palak Paneer', 300.00),
(108, 5, 'Veg Biryani', 150.00); -- Another biryani variant

-- 3. Insert Data into Orders Table (The order counts for testing)

-- Test Goal: Make R1 the highest, R5 second, R2 third. R3 and R4 should not appear due to price filter.
-- Order Count for R1 (Item 101, Price 220): HIGH COUNT (Expected Top 1)
INSERT INTO Orders (menu_item_id) VALUES
(101), (101), (101), (101), (101), (101), (101), (101), (101), (101); -- 10 orders

-- Order Count for R5 (Item 105, Price 180): MEDIUM COUNT (Expected 2nd)
INSERT INTO Orders (menu_item_id) VALUES
(105), (105), (105), (105), (105), (105), (105); -- 7 orders

-- Order Count for R2 (Item 102, Price 280): LOW COUNT (Expected 3rd)
INSERT INTO Orders (menu_item_id) VALUES
(102), (102), (102), (102); -- 4 orders

-- Order Count for R3 (Item 103, Price 140): HIGH ORDERS, BUT PRICE IS OUT OF RANGE (Should be filtered out)
INSERT INTO Orders (menu_item_id) VALUES
(103), (103), (103), (103), (103), (103), (103), (103), (103), (103), (103), (103); -- 12 orders, but price is < 150

-- Order Count for R4 (Item 104, Price 350): SOME ORDERS, BUT PRICE IS OUT OF RANGE (Should be filtered out)
INSERT INTO Orders (menu_item_id) VALUES
(104), (104); -- 2 orders, but price is > 300

-- Insert some orders for non-target items (to ensure COUNT is specific to the target dish)
INSERT INTO Orders (menu_item_id) VALUES
(106), (106), (107), (108), (108), (108);

-- Reset checks
SET FOREIGN_KEY_CHECKS = 1;