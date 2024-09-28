import { Request, Response } from "express";
import ThreadServices from "../services/thread.services";
import threadServices from "../services/thread.services";
import { CreateThreadSchema } from "../utils/schemas/thread.schema";

class ThreadController {
  async create(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'Create new thread'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createThreadSchema"
                    }  
                }
            }
        } 
    */
    try {
      const authorId = (req as any).user.id;
      const { content, image } = await CreateThreadSchema.validateAsync(
        req.body
      );
      const threads = await threadServices.createThread({
        content,
        image,
        authorId,
      });
      res.json({
        status: "success",
        message: "Thread Created",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async findAll(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'Get all thread'
    try {
      const threads = await ThreadServices.getAllThreads();
      res.json({
        status: "success",
        message: "Threads retrived",
        data: {
          threads,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    // #swagger.summary = 'get single thread'
    try {
      const { id } = req.params;
      const thread = await ThreadServices.getThreadById(Number(id));
      res.json({
        status: "success",
        message: "Thread retrived",
        data: {
          thread,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async findByUser(req: Request, res: Response) {
    // #swagger.tags = ['Threads']
    try {
      const { id } = req.params;
      const threads = await ThreadServices.getThreadByUser(Number(id));
      res.json({
        status: "success",
        message: "Threads retrived",
        data: {
          threads,
        },
      });
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
