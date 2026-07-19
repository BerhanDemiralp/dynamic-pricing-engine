import { Router } from "express";

import { ProductController } from "../controllers/product.controller.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.post("/", productController.createProduct);

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.patch("/:id", productController.updateProduct);

productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
