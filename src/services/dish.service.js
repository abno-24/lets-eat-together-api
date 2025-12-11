import { executeQuery } from "../db/db.js";

/**
 * Retrieves the top 10 restaurants serving a given dish within a specified price range.
 * @param {string} dishName - The name of the dish to search for.
 * @param {number} minPrice - The minimum price of the dish.
 * @param {number} maxPrice - The maximum price of the dish.
 * @returns {Promise<Array<Object>>} - An array of objects containing the restaurant ID, name, city, dish name, price, and order count.
 */
const searchTopRestaurantsByDish = async (dishName, minPrice, maxPrice) => {
  const sql = `
  SELECT 
    r.id AS restaurantId, 
    r.name AS restaurantName, 
    r.city, 
    mi.name AS dishName,
    mi.price AS dishPrice,
    COUNT(o.id) AS orderCount
  FROM
   Restaurants r
  JOIN
    Menu_Items mi ON r.id = mi.restaurant_id
  JOIN
    Orders o ON mi.id = o.menu_item_id
  WHERE
    mi.name LIKE ?
    AND mi.price BETWEEN ? AND ?
  GROUP BY
    r.id, mi.id, r.name, r.city, mi.name, mi.price
  ORDER BY
    orderCount DESC
  LIMIT 10;
`;

  const params = [`%${dishName}%`, minPrice, maxPrice];

  const results = await executeQuery(sql, params);
  return results;
};

export { searchTopRestaurantsByDish };
