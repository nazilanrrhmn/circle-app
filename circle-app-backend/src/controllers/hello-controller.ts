import { Request, Response } from "express";
import sayHello from "../services/hello-service";

export default function HelloController(req: Request, res: Response) {
  try {
    const hello = sayHello();
    res.send(hello);
  } catch (error: unknown) {
    res.status(500).json({
      messages: "404 Hayo Liat Link apa!",
    });
  }
}
