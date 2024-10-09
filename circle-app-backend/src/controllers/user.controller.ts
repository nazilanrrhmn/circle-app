import { Request, Response } from "express";
import UserServices from "../services/user.services";
import { createUserSchema } from "../utils/schemas/user.schema";
import userServices from "../services/user.services";
import cloudinaryServices from "../services/cloudinary.services";

class UserController {
  async findAll(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Find all users'
    try {
      const userId = (req as any).user.id;
      const users = await UserServices.getAllUsers(userId);
      res.json(users);
    } catch (error: unknown) {
      res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Find a user by params id'
    try {
      const userId = req.params.id;
      const userLoginId = (req as any).user.id;
      const user = await userServices.getUserById(Number(userId));
      const isFollow = await userServices.isFollow(Number(userId), userLoginId);
      res.json({ ...user, isFollow });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update existing user'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/profileEditSchema"
                    }  
                }
            }
        } 
    */
    try {
      const id = (req as any).user.id;

      const files = req.files as {
        profilePhoto?: Express.Multer.File[];
        coverPhoto?: Express.Multer.File[];
      };

      let imageUrl = null;
      let imageUrlCover = null;

      // Handle profile photo upload
      if (files.profilePhoto && files.profilePhoto.length > 0) {
        const profileImage = await cloudinaryServices.upload(
          files.profilePhoto[0]
        );
        imageUrl = profileImage.secure_url;
      }

      // Handle cover photo upload
      if (files.coverPhoto && files.coverPhoto.length > 0) {
        const coverImage = await cloudinaryServices.upload(files.coverPhoto[0]);
        imageUrlCover = coverImage.secure_url;
      }

      const value = {
        ...req.body,
        profilePhoto: imageUrl,
        coverPhoto: imageUrlCover,
        id: id,
      };

      const user = await UserServices.updateUser(value);
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
