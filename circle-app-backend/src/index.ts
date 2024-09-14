import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routerV1 } from "./routes/V1";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", routerV1); //version 1.0

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
