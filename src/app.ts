import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/module/user/user.route";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/users", userRoutes);

const getAcontroller = (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", getAcontroller);

export default app;
