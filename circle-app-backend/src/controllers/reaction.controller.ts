import { Request, Response } from "express";
import reactionSevices from "../services/reaction.services";

class ReactionController {
  async likeReplies(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Like a thread reply'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/likeRepliesSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { repliesId } = req.body;
      const isLike = await reactionSevices.isLikeReplies({
        repliesId,
        authorId,
      });
      if (!isLike) {
        const like = await reactionSevices.likeReplies({
          repliesId,
          authorId,
        });
        res.json(like);
      } else {
        const like = await reactionSevices.unlikeReplies({
          repliesId,
          authorId,
        });

        res.json(like);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async isLike(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Thread isLike'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/likeSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { threadId } = req.body;
      const like = await reactionSevices.isLike({
        threadId,
        authorId,
      });
      res.json(like);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async like(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Like a thread'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/likeSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { threadId } = req.body;
      const isLike = await reactionSevices.isLike({ threadId, authorId });
      if (!isLike) {
        const like = await reactionSevices.like({
          threadId,
          authorId,
        });
        res.json(like);
      } else {
        const like = await reactionSevices.unlike({ threadId, authorId });

        res.json(like);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unlike(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Unlike a thread'
    try {
      const authorId = (req as any).user.id;
      const threadId = Number(req.params.id);
      const unLike = await reactionSevices.unlike({ threadId, authorId });
      res.json(unLike);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ReactionController();
