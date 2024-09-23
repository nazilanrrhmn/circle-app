import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, (process.env as any).JWT_SECRET_KEY);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
