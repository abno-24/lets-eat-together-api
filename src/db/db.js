import mysql from "mysql2/promise";
import logger from "../utils/logger.js";
import { ApiError } from "../utils/api/ApiError.js";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Establishes a connection to the database, releases it and logs the status.
 * If the connection fails, logs the error and exits the process with a non-zero status code.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    logger.info("Database connected successfully.");
  } catch (error) {
    logger.error("Database connection failed:", error);
    process.exit(1);
  }
};

/**
 * Executes a database query with the provided SQL and parameters.
 * Releases the connection after the query is finished.
 * Logs an error message if the query fails and throws an ApiError.
 * @param {string} sql The SQL query to execute.
 * @param {Array} [params] The parameters to pass to the query.
 * @returns {Promise<Array>} The result of the query as an array of objects.
 */
const executeQuery = async (sql, params = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    logger.error(`Database query error: ${error.message}`, { sql, params });
    throw new ApiError(500, "Database query failed");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { connectDB, executeQuery };
