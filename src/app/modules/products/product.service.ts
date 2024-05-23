import { Product } from "../product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.id)) {
    throw new Error("This product already Exists");
  }
  const result = await Product.create(productData);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};
export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
