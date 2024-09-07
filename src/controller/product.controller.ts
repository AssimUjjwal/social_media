import { Request, Response } from "express";
import { Types } from "mongoose";

import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import { createProductService } from "../service/product.service";

export const createProductController = (
  productService = createProductService()
) => ({

  createProductHandler: async function (
    req: Request<{}, {}, CreateProductInput["body"]>,
    res: Response
  ) {
    const userId = res.locals.user._id as Types.ObjectId;
    const body = req.body;
    const product = await productService.createProductService({ ...body, user: userId });

    return res.send(product);
  },

  updateProductHandler: async function (
    req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
    res: Response
  ) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await productService.findProductService({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    const updatedProduct = await productService.findAndUpdateProductService({ productId }, update, {
      new: true,
    });

    return res.send(updatedProduct);
  },

  getProductHandler: async function (
    req: Request<UpdateProductInput["params"]>,
    res: Response
  ) {
    const productId = req.params.productId;
    const product = await productService.findProductService({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  },

  deleteProductHandler: async function (
    req: Request<UpdateProductInput["params"]>,
    res: Response
  ) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await productService.findProductService({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    await productService.deleteProductService({ productId });

    return res.sendStatus(200);
  }
})