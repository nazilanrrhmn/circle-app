import { Like, PrismaClient, Reply } from "@prisma/client";
import { CreateReplyDTO, LikeDTO } from "../dto/reaction.dto";
import { customError } from "../types/custom.error";

const prisma = new PrismaClient();

class ReactionServices {
  async createReply(data: CreateReplyDTO): Promise<Reply | null> {
    return await prisma.reply.create({ data });
  }

  async deleteReply(id: number): Promise<Reply | null> {
    const reply = await prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      throw {
        status: 404,
        message: "Reply Not Found!",
        code: "REPLY_NOT_EXIST",
      } as customError;
    }

    return await prisma.reply.delete({
      where: { id },
    });
  }

  async like(data: LikeDTO): Promise<Like | null> {
    const like = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
      },
    });

    if (like) {
      throw {
        status: "fail",
        message: "You have already liked this thread",
      };
    }
    const likes = await prisma.like.create({ data });
    return like;
  }

  async unlike(id: number): Promise<Like | null> {
    return await prisma.like.delete({
      where: { id },
    });
  }
}

export default new ReactionServices();
