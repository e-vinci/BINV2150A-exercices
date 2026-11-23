import express, { Express, Request, Response } from "express";
import { authController } from "./controllers/auth.controller";
import { categoriesController } from "./controllers/categories.controller";
import { recipesController } from "./controllers/recipes.controller";
import { usersController } from "./controllers/users.controller";

export const app: Express = express();

// Parse les corps de requête JSON (req.body)
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("MiamMiam API");
});

app.use("/auth", authController);
app.use("/categories", categoriesController);
app.use("/recipes", recipesController);
app.use("/users", usersController);
