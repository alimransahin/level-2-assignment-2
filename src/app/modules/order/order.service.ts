/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Product } from "../products/product.model";
import { productServices } from "../products/product.service";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (productData: TOrder) => {
  // const id = productData.productId;
  if (await productServices.getSingleProductFromDB(productData.productId)) {
    const result = await Order.create(productData);
    return result;
  } else {
    throw new Error("Product not found");
  }
};

const getAllOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};
const searchOrder = async (query: any) => {
  const result = await Order.find({ email: query });
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  searchOrder,
};
