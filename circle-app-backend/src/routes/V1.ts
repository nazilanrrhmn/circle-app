import express from "express";
import GreetingMiddleware from "../middlewares/greeting";
import HelloController from "../controllers/hello.controller";
import UserController from "../controllers/user.controller";
import ThreadController from "../controllers/thread.controller";

export const routerV1 = express.Router();

routerV1.get("/", GreetingMiddleware, HelloController);

routerV1.get("/users", UserController.find);
routerV1.post("/users", UserController.create);
routerV1.patch("/users", UserController.update);

routerV1.get("/threads", ThreadController.findAll);
routerV1.get("/threads/:id", ThreadController.findOne);
routerV1.delete("/threads/:id", ThreadController.delete);
