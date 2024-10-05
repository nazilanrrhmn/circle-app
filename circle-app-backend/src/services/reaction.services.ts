import { Like, PrismaClient, Reply } from "@prisma/client";
import { CreateReplyDTO, LikeDTO } from "../dto/reaction.dto";
import { customError } from "../types/custom.error";
import { SuccessResponse } from "../types/success.respons";

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

  async isLike(data: LikeDTO) {
    const like = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
      },
    });

    if (like) {
      return {
        isLike: true,
      };
    }

    return {
      isLike: false,
    };
  }

  async like(data: LikeDTO): Promise<SuccessResponse<Like | null>> {
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

    return {
      status: "success",
      message: "Thread liked",
    };
  }

  async unlike(
    id: number,
    userId: number
  ): Promise<SuccessResponse<Like | null>> {
    const likeRecord = await prisma.like.findFirst({
      where: {
        authorId: userId,
        threadId: id,
      },
    });

    if (!likeRecord) {
      throw new Error("Like not found");
    }

    const unLike = await prisma.like.delete({
      where: {
        id: likeRecord.id,
      },
    });

    return {
      status: "success",
      message: "Thread unliked",
    };
  }
}

export default new ReactionServices();
