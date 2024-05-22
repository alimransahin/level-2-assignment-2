import { Request, Response } from "express";

const createProduct = async (req: Request, res: Response) => {
  try {
    // const { product: productData } = req.body;
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
export const productController = {
  createProduct,
};
