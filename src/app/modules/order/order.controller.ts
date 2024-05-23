/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const result = await orderService.createOrderIntoDB(orderData);
    res.status(200).json({
      success: true,
      message: "A Order is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getAllOrSearchOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
      const result = await orderService.searchOrder(email);
      res.status(200).json({
        success: true,
        message: "Search product fetched",
        data: result,
      });
    } else {
      const result = await orderService.getAllOrderFromDB();
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
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

export const orderController = {
  createOrder,
  getAllOrSearchOrder,
};
