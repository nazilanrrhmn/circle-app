import express from "express";
import authControllers from "../controllers/auth.controller";
import followController from "../controllers/follow.controller";
import reactionController from "../controllers/reaction.controller";
import ThreadController from "../controllers/thread.controller";
import UserController from "../controllers/user.controller";
import { authentication } from "../middlewares/authentication";
import { upload } from "../middlewares/upload.file";

export const routerV1 = express.Router();

// AUTH
routerV1.post("/auth/login", authControllers.login);
routerV1.post("/auth/register", authControllers.register);
routerV1.get("/user/me", authentication, authControllers.getUserLogged);

// USER
routerV1.get("/users", authentication, UserController.findAll);
routerV1.get("/users/:id", authentication, UserController.findOne);
// routerV1.post("/users", UserController.create);
routerV1.patch("/users", authentication, UserController.update);

// FOLLOW
routerV1.post("/follow", authentication, followController.follow);
routerV1.delete("/unfollow", authentication, followController.unfollow);

// THREADS
routerV1.get("/threads", authentication, ThreadController.findAll);
routerV1.get("/threads/:id", authentication, ThreadController.findOne);
routerV1.get("/user/threads/:id", authentication, ThreadController.findByUser);
routerV1.post(
  "/threads",
  authentication,
  upload.single("image"),
  ThreadController.create
);
routerV1.delete("/threads/:id", authentication, ThreadController.delete);

// THREAD REACTION
routerV1.post("/threads/:id/reply", authentication, reactionController.reply);
routerV1.delete(
  "/threads/reply/:id",
  authentication,
  reactionController.deleteReply
);
routerV1.post("/threads/like", authentication, reactionController.like);
routerV1.delete("/threads/like/:id", authentication, reactionController.unlike);

// DASHBOARD | ADMIN
// routerV1.get("/dashboard", authentication, authorization("ADMIN"), (req: Request, res: Response) => {
//   res.json({ message: "Dashboard Admin" });
// });
