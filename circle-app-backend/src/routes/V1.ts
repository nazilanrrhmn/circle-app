import express from "express";
import UserController from "../controllers/user.controller";
import ThreadController from "../controllers/thread.controller";
import authControllers from "../controllers/auth.controller";
import { authentication } from "../middlewares/authentication";
import reactionController from "../controllers/reaction.controller";
import followController from "../controllers/follow.controller";
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
// routerV1.patch(
//   "/users",
//   authentication,
//   upload.fields([
//     { name: "profilePhoto", maxCount: 1 }, // Mengizinkan upload profilePhoto
//     { name: "coverPhoto", maxCount: 1 }, // Mengizinkan upload coverPhoto
//   ]),
//   UserController.update
// );

routerV1.patch(
  "/users",
  authentication,
  upload.fields([{ name: "profilePhoto" }, { name: "coverPhoto" }]),
  UserController.update
);

// FOLLOW
routerV1.post("/follow", authentication, followController.follow);
routerV1.delete("/unfollow/:id", authentication, followController.unfollow);
routerV1.get("/follows", authentication, followController.followList);

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

routerV1.post(
  "/threads/:id/reply",
  upload.single("image"),
  authentication,
  ThreadController.replyToThread
);
routerV1.delete(
  "/threads/reply/:id",
  authentication,
  ThreadController.deleteReply
);

// THREAD REACTION
// routerV1.post("/threads/:id/reply", authentication, reactionController.reply);
// routerV1.delete(
//   "/threads/reply/:id",
//   authentication,
//   reactionController.deleteReply
// );

// LIKE
routerV1.post("/threads/like", authentication, reactionController.like);
routerV1.post("/threads/islike", authentication, reactionController.isLike);
routerV1.delete("/threads/like/:id", authentication, reactionController.unlike);
routerV1.post("/replies/like", authentication, reactionController.likeReplies);

//DASHBOARD ADMIN
// routerV1.get("/dashboard", authentication, authorization("ADMIN"), (req: Request, res: Response) => {
//   res.json({ message: "Dashboard Admin" });
// });
