import { Request, Response } from "express";
import ThreadServices from "../services/thread.services";

class ThreadController {
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
