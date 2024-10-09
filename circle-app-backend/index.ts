import express, { Express } from "express";
import dotenv from "dotenv";
import { routerV1 } from "./routes/V1";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger-output.json";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  })
);
app.use("/api/v1", routerV1);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
