import { Like, LikeReply, PrismaClient, Reply } from "@prisma/client";
import { LikeDTO, LikeRepliesDTO } from "../dto/reaction.dto";
import { customError } from "../types/custom.error";
import { SuccessResponse } from "../types/success.respons";

const prisma = new PrismaClient();

class ReactionServices {
  // Like at reply post
  async isLikeReplies(data: LikeRepliesDTO) {
    const like = await prisma.likeReply.findFirst({
      where: {
        repliesId: data.repliesId,
        authorId: data.authorId,
      },
    });

    if (like) {
      return true;
    }

    return false;
  }

  async likeReplies(
    data: LikeRepliesDTO
  ): Promise<SuccessResponse<LikeReply | null>> {
    const like = await prisma.likeReply.findFirst({
      where: {
        repliesId: data.repliesId,
        authorId: data.authorId,
      },
    });

    if (like) {
      throw {
        status: "fail",
        message: "You have already liked this reply",
      };
    }
    const likes = await prisma.likeReply.create({ data });

    return {
      status: "success",
      message: "Reply liked",
    };
  }

  async unlikeReplies(
    data: LikeRepliesDTO
  ): Promise<SuccessResponse<Like | null>> {
    const likeRecord = await prisma.likeReply.findFirst({
      where: {
        repliesId: data.repliesId,
        authorId: data.authorId,
      },
    });

    if (!likeRecord) {
      throw new Error("Like replies not found");
    }

    const unLike = await prisma.likeReply.delete({
      where: {
        id: likeRecord.id,
      },
    });

    return {
      status: "success",
      message: "Reply unliked",
    };
  }

  // Like at thread post
  async isLike(data: LikeDTO) {
    const like = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
      },
    });

    if (like) {
      return true;
    }

    return false;
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

  async unlike(data: LikeDTO): Promise<SuccessResponse<Like | null>> {
    const likeRecord = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
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
