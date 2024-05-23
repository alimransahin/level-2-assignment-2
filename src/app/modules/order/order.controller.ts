import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const result = await orderService.createOrderIntoDB(orderData);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "A Order is created successfully",
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
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrderFromDB();
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
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

const searchOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    // console.log(email);
    const result = await orderService.searchOrder(email);
    res.status(200).json({
      success: true,
      message: "Search product fetched",
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

export const orderController = {
  createOrder,
  getAllOrder,
  searchOrder,
};
