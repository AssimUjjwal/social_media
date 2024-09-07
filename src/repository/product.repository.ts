import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

export const createProductRepository = (
    ProductModelProto: Model<ProductDocument> = ProductModel
) => ({
    createProduct: async function (input: any) {
        return ProductModelProto.create(input);
    },

    findProduct: async function (
        query: FilterQuery<ProductDocument>,
        options: QueryOptions = { lean: true }
    ) {
        return ProductModelProto.findOne(query, {}, options);
    },

    updateProduct: async function (
        query: FilterQuery<ProductDocument>,
        update: UpdateQuery<ProductDocument>,
        options: QueryOptions
    ) {
        return ProductModelProto.findOneAndUpdate(query, update, options);
    },

    deleteProduct: async function (query: FilterQuery<ProductDocument>) {
        return ProductModelProto.deleteOne(query);
    }
})