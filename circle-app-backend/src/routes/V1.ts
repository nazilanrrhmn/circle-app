import express from "express";
import { Request, Response } from "express";
import GreetingMiddleware from "../middlewares/greeting";
import HelloController from "../controllers/hello.controller";
import UserController from "../controllers/user.controller";
import ThreadController from "../controllers/thread.controller";
import authControllers from "../controllers/auth.controller";
import { authentication } from "../middlewares/authentication";
import userControllers from "../controllers/user.controller";
import authorization from "../middlewares/authorization";

export const routerV1 = express.Router();

routerV1.get("/", GreetingMiddleware, HelloController);

// USER
routerV1.get("/users", UserController.findAll);
routerV1.get("/users/:id", UserController.findOne);
routerV1.post("/users", UserController.create);
routerV1.patch("/users", UserController.update);

// AUTH
routerV1.post("/auth/login", authControllers.login);
routerV1.post("/auth/register", authControllers.register);
routerV1.get("/user/me", authentication, authControllers.getUserLogged);

//DASHBOARD ADMIN
routerV1.get(
  "/dashboard",
  authentication,
  authorization("ADMIN"),
  (req: Request, res: Response) => {
    res.json({ message: "Dashboard Admin" });
  }
);

// THREADS
routerV1.get("/threads", ThreadController.findAll);
routerV1.get("/threads/:id", ThreadController.findOne);
routerV1.get("/user/threads/:id", ThreadController.findByUser);
routerV1.post("/threads", ThreadController.create);
routerV1.delete("/threads/:id", ThreadController.delete);
