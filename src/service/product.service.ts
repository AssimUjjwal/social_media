import { Types } from "mongoose";
import {  createProductRepository } from "../repository/product.repository";
import { CreateProductInput } from "../schema/product.schema";

export const createProductService = (
  productRepository = createProductRepository()
) => ({
  createProductService: async function (
    input: CreateProductInput["body"] & { user: Types.ObjectId; }
  ) {
    return productRepository.createProduct(input);
  },
  
  findProductService: async function (
    query: any,
    options: any = { lean: true }
  ) {
    return productRepository.findProduct(query, options);
  },
  
  findAndUpdateProductService: async function (
    query: any,
    update: any,
    options: any
  ) {
    return productRepository.updateProduct(query, update, options);
  },
  
  deleteProductService: async function (query: any) {
    return productRepository.deleteProduct(query);
  }
})