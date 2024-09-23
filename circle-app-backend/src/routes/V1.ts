import express from "express";
import UserController from "../controllers/user.controller";
import ThreadController from "../controllers/thread.controller";
import authControllers from "../controllers/auth.controller";
import { authentication } from "../middlewares/authentication";
import reactionController from "../controllers/reaction.controller";

export const routerV1 = express.Router();

// AUTH
routerV1.post("/auth/login", authControllers.login);
routerV1.post("/auth/register", authControllers.register);
routerV1.get("/user/me", authentication, authControllers.getUserLogged);

// USER
routerV1.get("/users", UserController.findAll);
routerV1.get("/users/:id", UserController.findOne);
// routerV1.post("/users", UserController.create);
routerV1.patch("/users", authentication, UserController.update);

// THREADS
routerV1.get("/threads", ThreadController.findAll);
routerV1.get("/threads/:id", ThreadController.findOne);
routerV1.get("/user/threads/:id", ThreadController.findByUser);
routerV1.post("/threads", authentication, ThreadController.create);
routerV1.delete("/threads/:id", authentication, ThreadController.delete);

// THREAD REACTION
routerV1.post("/threads/reply", authentication, reactionController.reply);
routerV1.delete(
  "/threads/reply/:id",
  authentication,
  reactionController.deleteReply
);
routerV1.post("/threads/like", authentication, reactionController.like);
routerV1.delete("/threads/like/:id", authentication, reactionController.unlike);

//DASHBOARD ADMIN
// routerV1.get("/dashboard", authentication, authorization("ADMIN"), (req: Request, res: Response) => {
//   res.json({ message: "Dashboard Admin" });
// });
