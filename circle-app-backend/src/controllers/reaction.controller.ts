import { Request, Response } from "express";
import { CreateReplySchema } from "../utils/schemas/reaction.schema";
import reactionSevices from "../services/reaction.services";

class ReactionController {
  // async reply(req: Request, res: Response) {
  //   // #swagger.tags = ['Reaction']
  //   // #swagger.summary = 'Create new Reply'
  //   /*  #swagger.requestBody = {
  //               required: true,
  //               content: {
  //                   "application/json": {
  //                       schema: {
  //                           $ref: "#/components/schemas/createReplySchema"
  //                       }
  //                   }
  //               }
  //           }
  //       */
  //   try {
  //     const authorId = (req as any).user.id;
  //     const { id } = req.params;
  //     const threadId = Number(id);
  //     const { content, image } = req.body;
  //     const reply = await reactionSevices.createReply({
  //       threadId,
  //       content,
  //       image,
  //       authorId,
  //     });
  //     res.json({
  //       status: "success",
  //       message: "Reply Created",
  //     });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

  // async deleteReply(req: Request, res: Response) {
  //   // #swagger.tags = ['Reaction']
  //   // #swagger.summary = 'Delete reply'
  //   try {
  //     const { id } = req.params;
  //     const thread = await reactionSevices.deleteReply(Number(id));
  //     res.json({
  //       status: "success",
  //       message: "Reply deleted",
  //     });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

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
      const like = await reactionSevices.like({
        threadId,
        authorId,
      });
      res.json(like);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unlike(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Unlike a thread'
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const unLike = await reactionSevices.unlike(Number(id), userId);
      res.json(unLike);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ReactionController();
