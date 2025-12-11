USE railway;

-- Disable checks for clean insertion
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Insert Data into Restaurants Table (5 Restaurants)
INSERT INTO Restaurants (id, name, city) VALUES
(1, 'Biryani King', 'Mumbai'),
(2, 'Spice Route', 'Delhi'),
(3, 'Tandoori Tales', 'Bangalore'),
(4, 'Hyderabadi Delight', 'Hyderabad'),
(5, 'The Grand Feast', 'Mumbai'),
(6, 'Curry House', 'Chennai'),
(7, 'Saffron Lounge', 'Kolkata'),
(8, 'Masala Magic', 'Pune'),
(9, 'Royal Rasoi', 'Ahmedabad'),
(10, 'Flavors of India', 'Chennai'),
(11, 'The Spice Villa', 'Jaipur'),
(12, 'Cumin & Coriander', 'Lucknow'),
(13, 'The Tikka Tavern', 'Surat'),
(14, 'Naan & Beyond', 'Goa'),
(15, 'The Samosa Spot', 'Chandigarh');

-- 2. Insert Data into Menu_Items Table (Dishes offered by restaurants)

-- Focus Dish: Chicken Biryani (Price range target: 150-300)
INSERT INTO Menu_Items (id, restaurant_id, name, price) VALUES
(101, 1, 'Biryani', 220.00), -- R1: Price IN range
(102, 2, 'Biryani', 280.00), -- R2: Price IN range
(103, 3, 'Biryani', 140.00), -- R3: Price OUT (Too low)
(104, 4, 'Biryani', 350.00), -- R4: Price OUT (Too high)
(105, 5, 'Biryani', 180.00), -- R5: Price IN range
(109, 6, 'Biryani', 200.00),  -- R6: Price IN range
(110, 7, 'Biryani', 210.00),  -- R7: Price IN range
(111, 8, 'Biryani', 235.00),  -- R8: Price IN range
(112, 9, 'Biryani', 250.00),  -- R9: Price IN range
(113, 10, 'Biryani', 175.00), -- R10: Price IN range
(114, 11, 'Biryani', 290.00), -- R11: Price IN range
(115, 12, 'Biryani', 160.00); -- R12: Price IN range

-- Other Dishes (Should not affect the search for 'biryani')
INSERT INTO Menu_Items (id, restaurant_id, name, price) VALUES
(106, 1, 'Chicken', 450.00),
(107, 2, 'Paneer', 300.00),
(108, 5, 'Manchurian', 150.00); -- Another biryani variant

-- 3. Insert Data into Orders Table (The order counts for testing)

INSERT INTO Orders (menu_item_id) VALUES
(101), (101), (101), (101), (101), (101), (101), (101), (101), (101); -- 10 orders

INSERT INTO Orders (menu_item_id) VALUES
(105), (105), (105), (105), (105), (105), (105); -- 7 orders

INSERT INTO Orders (menu_item_id) VALUES
(102), (102), (102), (102); -- 4 orders

INSERT INTO Orders (menu_item_id) VALUES
(103), (103), (103), (103), (103), (103), (103), (103), (103), (103), (103), (103); -- 12 orders, but price is < 150

INSERT INTO Orders (menu_item_id) VALUES
(104), (104); -- 2 orders, but price is > 300

-- Insert some orders for non-target items (to ensure COUNT is specific to the target dish)
INSERT INTO Orders (menu_item_id) VALUES
(106), (106), (107), (108), (108), (108);

INSERT INTO Orders (menu_item_id) VALUES
(109), (109), (109), (109), (109), (109);

INSERT INTO Orders (menu_item_id) VALUES
(110), (110), (110), (110), (110);

INSERT INTO Orders (menu_item_id) VALUES
(111), (111), (111);

INSERT INTO Orders (menu_item_id) VALUES
(112), (112);

INSERT INTO Orders (menu_item_id) VALUES
(113);

INSERT INTO Orders (menu_item_id) VALUES
(114), (114), (114), (114), (114), (114), (114), (114), (114);

INSERT INTO Orders (menu_item_id) VALUES
(115), (115), (115), (115), (115), (115), (115), (115);

-- Reset checks
SET FOREIGN_KEY_CHECKS = 1;