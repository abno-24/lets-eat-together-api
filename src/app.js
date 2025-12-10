import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import healthRouter from "./routes/health/health.routes.js";

const morganFormat = ":method :url :status :response-time ms";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Health check route
app.use("/api/v1/health", healthRouter);

app.use(errorHandler);

export { app };