import { Request, Response } from "express";
import authServices from "../services/auth.services";
import { LoginSchema, RegisterSchema } from "../utils/schemas/auth.schema";

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
      const user = await authServices.register(value);
      res.json({
        status: "succes",
        message: "User Created",
      });
    } catch (error) {
      res.json(error);
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
      res.json({
        status: "succes",
        message: "User logged succesfully",
        data: {
          accessToken: user.token,
        },
      });
    } catch (error) {
      res.json(error);
    }
  }

  async getUserLogged(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    try {
      const user = (req as any).user;
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new AuthController();
