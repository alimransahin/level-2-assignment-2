/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "../order.model";
import { Product } from "../product.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (productData: TOrder) => {
  console.log(productData);
  if (await Product.isProductExists(productData.productId)) {
    const result = await Order.create(productData);

    return result;
  } else {
    throw new Error("Order not found");
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
