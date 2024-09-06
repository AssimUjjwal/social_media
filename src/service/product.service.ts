// product.service.ts
import { Types } from "mongoose";
import { createProduct, findProduct, updateProduct, deleteProduct } from "../repository/product.repository";
import { CreateProductInput } from "../schema/product.schema";

export async function createProductService(
  input: CreateProductInput["body"] & { user: Types.ObjectId; }
) {
  return createProduct(input);
}

export async function findProductService(
  query: any,
  options: any = { lean: true }
) {
  return findProduct(query, options);
}

export async function findAndUpdateProductService(
  query: any,
  update: any,
  options: any
) {
  return updateProduct(query, update, options);
}

export async function deleteProductService(query: any) {
  return deleteProduct(query);
}
