import { Request, Response, NextFunction } from "express";

export default function GreetingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Welcome Bro :D");
  next();
}
