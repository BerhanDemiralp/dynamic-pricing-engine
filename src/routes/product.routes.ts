import { Router } from "express";

import { ProductController } from "../controllers/product.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.post(
  "/",
  validateBody(createProductSchema),
  productController.createProduct,
);

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.patch(
  "/:id",
  validateBody(updateProductSchema),
  productController.updateProduct,
);

productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
