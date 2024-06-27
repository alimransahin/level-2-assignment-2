/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.name)) {
    throw new Error("This product already Exists");
  }
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};
const searchProductFromDB = async (query: any) => {
  const queryResult = { tags: { $in: query } };

  const result = await Product.find(queryResult);
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id });
  return result;
};

const deleteProductFromDB = async (_id: string) => {
  const result = await Product.updateOne({ _id }, { isDeleted: true });
  return result;
};

const updateProductFromDB = async (_id: string, updatedFields: object) => {
  const updateFields = { ...updatedFields };
  const updatedProduct = await Product.findOneAndUpdate({ _id }, updateFields, {
    new: true,
  }).lean();
  return updatedProduct;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  searchProductFromDB,
};
