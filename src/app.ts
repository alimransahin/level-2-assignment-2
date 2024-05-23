import cors from "cors";
import express, { Application, Request, Response } from "express";
import { productRoutes } from "./app/modules/products/products.routes";
import { orderRoutes } from "./app/modules/order/order.routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application router
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req: Request, res: Response) => {
  const s = "Hello World!";
  res.send(s);
});

export default app;
