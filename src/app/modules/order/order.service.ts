import { Order } from "../order.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (productData: TOrder) => {
  const result = await Order.create(productData);
  console.log(result);
  return result;
};
const getAllOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};
const searchOrder = async (query: any) => {
  console.log(query);
  const result = await Order.find({ email: query });
  return result;
};
export const orderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  searchOrder,
};
