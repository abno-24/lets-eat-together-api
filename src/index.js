import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/db.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(
        `Server is running at PORT: http://0.0.0.0:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Database connection failed. Server not started.", error);
    process.exit(1);
  });
