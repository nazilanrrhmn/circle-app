import { Request, Response } from "express";
import UserServices from "../services/user.services";
import { createUserSchema } from "../utils/schemas/user.schema";

class UserController {
  // async create(req: Request, res: Response) {
  //   // #swagger.tags = ['Users']
  //   // #swagger.summary = 'Create new user'
  //   try {
  //     const value = await createUserSchema.validateAsync(req.body);

  //     const user = await UserServices.createUser(value);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

  async findAll(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Find all users'
    try {
      const users = await UserServices.getAllUsers();
      res.json(users);
    } catch (error: unknown) {
      res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Find a user by params id'
    try {
      const { id } = req.params;
      const user = await UserServices.getUserById(Number(id));
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update existing user'
    try {
      const { id } = req.params; // Ambil ID dari parameter URL
      const value = req.body; // Ambil data dari body request

      const user = await UserServices.updateUser(Number(id), value); // Berikan ID dan data ke metode updateUser
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
