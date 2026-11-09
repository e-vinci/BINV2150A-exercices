import express, { Express, Request, Response } from "express";
import { authController } from "./controllers/auth.controller";

export const app: Express = express();

// Parse les corps de requête JSON (req.body)
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/auth", authController);
