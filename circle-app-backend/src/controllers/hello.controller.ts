import { Request, Response } from "express";
import sayHello from "../services/hello.services";

export default function HelloController(req: Request, res: Response) {
  try {
    const hello = sayHello();
    res.send(hello);
  } catch (error: unknown) {
    res.status(500).json({
      messages: "404 Hayo loe Liat Link apa!",
    });
  }
}
