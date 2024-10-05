import { Request, Response } from "express";
import ThreadServices from "../services/thread.services";
import threadServices from "../services/thread.services";
import { CreateThreadSchema } from "../utils/schemas/thread.schema";
import cloudinaryServices from "../services/cloudinary.services";

class ThreadController {
  async create(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'Create new thread'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/createThreadSchema"
                    }  
                }
            }
        } 
    */
    try {
      const authorId = (req as any).user.id;
      const fileUpload = req.file;
      let imageUrl = null;

      if (fileUpload) {
        const image = await cloudinaryServices.upload(
          req.file as Express.Multer.File
        );
        imageUrl = image.secure_url;
      }
      const value = {
        ...req.body,
        image: imageUrl,
        authorId: authorId,
      };
      const data = await CreateThreadSchema.validateAsync(value);
      const threads = await threadServices.createThread(data);
      res.json(threads);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async findAll(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'Get all thread'
    try {
      const userId = (req as any).user.id;
      const threads = await ThreadServices.getAllThreads(userId);
      res.json(threads);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'get single thread'
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const thread = await ThreadServices.getThreadById(Number(id), userId);
      res.json(thread);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async findByUser(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    try {
      const { id } = req.params;
      const threads = await ThreadServices.getThreadByUser(Number(id));
      res.json(threads);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'Delete thread'
    try {
      const { id } = req.params;
      const thread = await ThreadServices.deleteThread(Number(id));
      res.json({
        status: "success",
        message: "Thread deleted",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ThreadController();
