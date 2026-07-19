export const swaggerDocument = {
  openapi: "3.0.3",

  info: {
    title: "Dynamic Pricing Engine API",
    version: "1.0.0",
    description:
      "REST API documentation for the Dynamic Pricing Engine project.",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "Application health operations",
    },
    {
      name: "Products",
      description: "Product management operations",
    },
  ],

  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "669c0f6584a23456789abcde",
          },
          name: {
            type: "string",
            example: "Fresh Milk",
          },
          basePrice: {
            type: "integer",
            description: "Base price stored in cents",
            example: 4500,
          },
          stock: {
            type: "integer",
            example: 100,
          },
          criticalStockThreshold: {
            type: "integer",
            example: 20,
          },
          maxPriceMultiplier: {
            type: "number",
            format: "double",
            example: 1.5,
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      CreateProductRequest: {
        type: "object",
        required: [
          "name",
          "basePrice",
          "stock",
          "criticalStockThreshold",
          "maxPriceMultiplier",
        ],
        properties: {
          name: {
            type: "string",
            example: "Fresh Milk",
          },
          basePrice: {
            type: "integer",
            description: "Base price stored in cents",
            minimum: 0,
            example: 4500,
          },
          stock: {
            type: "integer",
            minimum: 0,
            example: 100,
          },
          criticalStockThreshold: {
            type: "integer",
            minimum: 0,
            example: 20,
          },
          maxPriceMultiplier: {
            type: "number",
            format: "double",
            minimum: 1,
            example: 1.5,
          },
        },
      },

      UpdateProductRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Updated Fresh Milk",
          },
          basePrice: {
            type: "integer",
            description: "Base price stored in cents",
            minimum: 0,
            example: 5000,
          },
          stock: {
            type: "integer",
            minimum: 0,
            example: 80,
          },
          criticalStockThreshold: {
            type: "integer",
            minimum: 0,
            example: 15,
          },
          maxPriceMultiplier: {
            type: "number",
            format: "double",
            minimum: 1,
            example: 1.4,
          },
        },
      },

      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Product not found.",
          },
        },
      },
    },
  },

  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Check application health",
        responses: {
          "200": {
            description: "Application is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Application is healthy.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/products": {
      post: {
        tags: ["Products"],
        summary: "Create a product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateProductRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Product created successfully.",
                    },
                    data: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },

      get: {
        tags: ["Products"],
        summary: "Get all products",
        responses: {
          "200": {
            description: "Products retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Products retrieved successfully.",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },

    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Get a product by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB product ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Product retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Product retrieved successfully.",
                    },
                    data: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Product not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },

      patch: {
        tags: ["Products"],
        summary: "Update a product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB product ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateProductRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Product updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Product updated successfully.",
                    },
                    data: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Product not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },

      delete: {
        tags: ["Products"],
        summary: "Delete a product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB product ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Product deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Product deleted successfully.",
                    },
                    data: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Product not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
};
