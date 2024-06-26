/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await productServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "A Product is created successfully",
      data: result,
    });
    // console.log(req.body);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        Object.keys(error).length == 0
          ? error.message
          : error.errors[0].message || "Something went wrong",
      error: error,
    });
  }
};

const getSearchProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await productServices.searchProductFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: "Search product fetched",
        data: result,
      });
    } else {
      const result = await productServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Single product fetched",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "A product deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const { productId } = req.params;
    const updateProductData = req.body;

    const updatedProduct = await productServices.updateProductFromDB(
      productId,
      updateProductData
    );

    res.status(200).json({
      success: true,
      message: "A product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const productController = {
  createProduct,
  getSearchProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
