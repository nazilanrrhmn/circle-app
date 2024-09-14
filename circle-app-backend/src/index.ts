import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import HelloController from "./controllers/hello-controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", HelloController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
