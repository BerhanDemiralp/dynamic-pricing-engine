import { ProductRepository } from "../repositories/product.repository.js";
import type { CreateProductDto } from "../dto/create-product.dto.js";
import type { Product, ProductCreateData } from "../models/product.model.js";
import { PricingService } from "./pricing.service.js";

export class ProductService {
  private readonly productRepository: ProductRepository;
  private readonly pricingService: PricingService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.pricingService = new PricingService();
  }

  async createProduct(createProductDto: CreateProductDto) {
    const pricingResult = this.pricingService.calculatePrice(createProductDto);

    const productData: ProductCreateData = {
      ...createProductDto,
      ...pricingResult,
    };

    return this.productRepository.create(productData);
  }

  async getProducts() {
    return this.productRepository.findAll();
  }

  async getProductById(id: string) {
    return this.productRepository.findById(id);
  }

  async updateProduct(id: string, updateProductDto: Partial<CreateProductDto>) {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      return null;
    }

    const pricingInput = {
      basePrice: updateProductDto.basePrice ?? existingProduct.basePrice,

      stock: updateProductDto.stock ?? existingProduct.stock,

      criticalStockThreshold:
        updateProductDto.criticalStockThreshold ??
        existingProduct.criticalStockThreshold,

      expirationDate:
        updateProductDto.expirationDate ?? existingProduct.expirationDate,

      freshnessScore:
        updateProductDto.freshnessScore ?? existingProduct.freshnessScore,

      minimumPriceMultiplier:
        updateProductDto.minimumPriceMultiplier ??
        existingProduct.minimumPriceMultiplier,

      maxPriceMultiplier:
        updateProductDto.maxPriceMultiplier ??
        existingProduct.maxPriceMultiplier,
    };

    const pricingResult = this.pricingService.calculatePrice(pricingInput);

    const productUpdateData: Partial<Product> = {
      ...updateProductDto,
      ...pricingResult,
    };

    return this.productRepository.updateById(id, productUpdateData);
  }

  async deleteProduct(id: string) {
    return this.productRepository.deleteById(id);
  }
}
