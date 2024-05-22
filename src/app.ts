import cors from "cors";
import express, { Application, Request, Response } from "express";
import { studentRoutes } from "./app/modules/student/student.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application router
app.use("/api/v1/students", studentRoutes);
app.get("/", (req: Request, res: Response) => {
  const s = "Hello World!";
  res.send(s);
});

export default app;
