import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running at PORT: http://0.0.0.0:${process.env.PORT}`);
});