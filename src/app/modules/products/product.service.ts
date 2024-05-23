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
const searchProductFromDB = async (query: any) => {
  const queryResult = { tags: { $in: query } };
  console.log(queryResult);
  const result = await Product.find(queryResult);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ id });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateProductFromDB = async (id: string, updatedFields: object) => {
  const updateFields = { ...updatedFields };
  const updatedProduct = await Product.findOneAndUpdate({ id }, updateFields, {
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
