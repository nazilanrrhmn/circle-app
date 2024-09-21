import { RoleEnum } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default function authorization(role: RoleEnum) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role != role) {
      return res.status(403).json({
        message: "FORBIDDEN",
      });
    }

    next();
  };
}
