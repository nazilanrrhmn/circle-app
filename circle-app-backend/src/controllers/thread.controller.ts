import { Request, Response } from "express";
import ThreadServices from "../services/thread.services";
import threadServices from "../services/thread.services";
import { CreateThreadSchema } from "../utils/schemas/thread.schema";

class ThreadController {
  async create(req: Request, res: Response) {
    try {
      const value = await CreateThreadSchema.validateAsync(req.body);
      const threads = await threadServices.createThread(value);
      res.json(threads);
    } catch (error) {
      res.json(error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const threads = await ThreadServices.getAllThreads();
      res.json(threads);
    } catch (error) {
      res.json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await ThreadServices.getThreadById(Number(id));
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
  }

  async findByUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const threads = await ThreadServices.getThreadByUser(Number(id));
      res.json(threads);
    } catch (error) {
      res.json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await ThreadServices.deleteThread(Number(id));
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new ThreadController();
