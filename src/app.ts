import express from "express";
import swaggerUi from "swagger-ui-express";

import healthRouter from "./routes/health.routes.js";
import productRouter from "./routes/product.routes.js";
import { swaggerDocument } from "./config/swagger.js";

const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/products", productRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
