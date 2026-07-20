import type { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import type { CreateProductDto } from "../dto/create-product.dto.js";
import type { Product } from "../models/product.model.js";

type ProductParams = {
  id: string;
};

export class ProductController {
  constructor(private readonly productService = new ProductService()) {}

  createProduct = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      const createProductDto = request.body as CreateProductDto;

      const product = await this.productService.createProduct(createProductDto);

      response.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: product,
      });
    } catch (error) {
      console.error("Error creating product:", error);

      response.status(500).json({
        success: false,
        message: "Error creating product.",
      });
    }
  };

  getAllProducts = async (
    _request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      const products = await this.productService.getProducts();

      if (products.length === 0) {
        response.status(404).json({
          success: false,
          message: "No products found.",
        });
        return;
      }

      response.status(200).json({
        success: true,
        message: "Products retrieved successfully.",
        data: products,
      });
    } catch (error) {
      console.error("Error retrieving products:", error);

      response.status(500).json({
        success: false,
        message: "Error retrieving products.",
      });
    }
  };

  getProductById = async (
    request: Request<ProductParams>,
    response: Response,
  ): Promise<void> => {
    try {
      const { id } = request.params;
      const product = await this.productService.getProductById(id);

      if (!product) {
        response.status(404).json({
          success: false,
          message: "Product not found.",
        });
        return;
      }

      response.status(200).json({
        success: true,
        message: "Product retrieved successfully.",
        data: product,
      });
    } catch (error) {
      console.error("Error retrieving product:", error);

      response.status(500).json({
        success: false,
        message: "Error retrieving product.",
      });
    }
  };

  updateProduct = async (
    request: Request<ProductParams>,
    response: Response,
  ): Promise<void> => {
    try {
      const { id } = request.params;
      const productData = request.body as Partial<Product>;

      const updatedProduct = await this.productService.updateProduct(
        id,
        productData,
      );

      if (!updatedProduct) {
        response.status(404).json({
          success: false,
          message: "Product not found.",
        });

        return;
      }

      response.status(200).json({
        success: true,
        message: "Product updated successfully.",
        data: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);

      response.status(500).json({
        success: false,
        message: "Error updating product.",
      });
    }
  };

  deleteProduct = async (
    request: Request<ProductParams>,
    response: Response,
  ): Promise<void> => {
    try {
      const { id } = request.params;

      const deletedProduct = await this.productService.deleteProduct(id);

      if (!deletedProduct) {
        response.status(404).json({
          success: false,
          message: "Product not found.",
        });

        return;
      }

      response.status(200).json({
        success: true,
        message: "Product deleted successfully.",
        data: deletedProduct,
      });
    } catch (error) {
      console.error("Product deletion failed.", error);

      response.status(500).json({
        success: false,
        message: "Product could not be deleted.",
      });
    }
  };
}
