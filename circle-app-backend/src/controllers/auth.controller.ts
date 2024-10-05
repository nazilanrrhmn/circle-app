import { Request, Response } from "express";
import authServices from "../services/auth.services";
import { LoginSchema, RegisterSchema } from "../utils/schemas/auth.schema";
import userServices from "../services/user.services";

class AuthController {
  async register(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/registerSchema"
                    }  
                }
            }
        } 
    */
    try {
      const value = await RegisterSchema.validateAsync(req.body);
      await authServices.register(value);
      const user = await authServices.login(value);
      res.json({
        status: "success",
        message: "User Created",
        data: {
          accessToken: user.data?.accessToken,
          user: user.data?.user,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSchema"
                    }  
                }
            }
        } 
    */
    try {
      const value = await LoginSchema.validateAsync(req.body);
      const user = await authServices.login(value);
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUserLogged(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    try {
      const userId = (req as any).user.id;
      const user = await userServices.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new AuthController();
