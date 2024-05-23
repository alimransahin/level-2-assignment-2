import { Schema, model } from "mongoose";
import { OrderModel, TOrder } from "./order/order.interface";

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<TOrder, OrderModel>("Order", orderSchema);
