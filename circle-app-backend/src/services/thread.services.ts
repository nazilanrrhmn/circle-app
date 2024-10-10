import { PrismaClient, Thread, User, Reply } from "@prisma/client";
import { customError } from "../types/custom.error";
import { CreateThreadsDTO, CreateReplyDTO } from "../dto/thread.dto";
import { SuccessResponse } from "../types/success.respons";

const prisma = new PrismaClient();

class ThreadServies {
  async createThread(
    data: CreateThreadsDTO
  ): Promise<SuccessResponse<Thread | null>> {
    const result = await prisma.thread.create({ data });
    return {
      status: "success",
      message: "Thread Created",
      data: result,
    };
  }

  async createReply(
    data: CreateReplyDTO
  ): Promise<SuccessResponse<Reply | null>> {
    const result = await prisma.reply.create({ data });
    return {
      status: "success",
      message: "Reply Created",
      data: result,
    };
  }

  async getAllThreads(userId: number): Promise<SuccessResponse<Thread[]>> {
    const threads = await prisma.thread.findMany({
      include: {
        author: true,
        replies: true,
        like: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    const threadWithIsLike = threads.map((thread) => {
      const isLike = thread.like.some((like) => like.authorId === userId);
      return {
        ...thread,
        isLike,
      };
    });

    return {
      status: "success",
      message: "Threads retrived",
      data: threadWithIsLike,
    };
  }

  async getThreadById(
    id: number,
    userId: number
  ): Promise<SuccessResponse<any>> {
    const thread = await prisma.thread.findFirst({
      where: { id },
      include: {
        author: true,
        replies: {
          include: { author: true, like_replies: true },
        },
        like: true,
      },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    const isLike = thread.like.some((like) => like.authorId === userId);

    const repliesIsLike = thread.replies.map((reply) => {
      const isRepliesLike = reply.like_replies.some(
        (likeReplies) => likeReplies.authorId === userId
      );
      return { ...reply, isLike: isRepliesLike };
    });

    return {
      status: "success",
      message: "Thread retrived",
      data: { ...thread, isLike, replies: repliesIsLike },
    };
  }

  async getThreadByUser(id: number): Promise<SuccessResponse<Thread[]>> {
    const thread = await prisma.thread.findMany({
      where: { authorId: id },
      include: {
        author: true,
        replies: true,
        like: true,
      },
    });

    if (!thread) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "User Not Found!",
      } as customError;
    }

    return {
      status: "success",
      message: "Threads retrived",
      data: thread,
    };
  }

  async deleteThread(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread Not Found!",
        code: "THREAD_NOT_EXIST",
      } as customError;
    }

    return await prisma.thread.delete({
      where: { id },
    });
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
}

export default new ThreadServies();

// import { PrismaClient, Thread, User, Reply } from "@prisma/client";
// import { customError } from "../types/custom.error";
// import { CreateThreadsDTO, CreateReplyDTO } from "../dto/thread.dto"; // Make sure to have a DTO for replies
// import { SuccessResponse } from "../types/success.respons";

// const prisma = new PrismaClient();

// class ThreadServices {
//   async createThread(
//     data: CreateThreadsDTO
//   ): Promise<SuccessResponse<Thread | null>> {
//     const result = await prisma.thread.create({ data });
//     return {
//       status: "success",
//       message: "Thread Created",
//       data: result,
//     };
//   }

//   async replyToThread(
//     data: CreateReplyDTO // Define this DTO to match your reply structure
//   ): Promise<SuccessResponse<Reply | null>> {
//     const reply = await prisma.reply.create({
//       data,
//     });
//     return {
//       status: "success",
//       message: "Reply Created",
//       data: reply,
//     };
//   }

//   async getAllThreads(userId: number): Promise<SuccessResponse<Thread[]>> {
//     const threads = await prisma.thread.findMany({
//       include: {
//         author: true,
//         replies: true,
//         like: true,
//       },
//     });

//     const threadWithIsLike = threads.map((thread) => {
//       const isLike = thread.like.some((like) => like.authorId === userId);
//       return {
//         ...thread,
//         isLike,
//       };
//     });

//     return {
//       status: "success",
//       message: "Threads retrieved",
//       data: threadWithIsLike,
//     };
//   }

//   async getThreadById(
//     id: number,
//     userId: number
//   ): Promise<SuccessResponse<any>> {
//     const thread = await prisma.thread.findFirst({
//       where: { id },
//       include: {
//         author: true,
//         replies: {
//           include: { author: true },
//         },
//         like: true,
//       },
//     });

//     if (!thread) {
//       throw {
//         status: 404,
//         message: "Thread Not Found!",
//         code: "THREAD_NOT_EXIST",
//       } as customError;
//     }

//     const isLike = thread.like.some((like) => like.authorId === userId);

//     return {
//       status: "success",
//       message: "Thread retrieved",
//       data: { ...thread, isLike },
//     };
//   }

//   async getThreadByUser(id: number): Promise<SuccessResponse<Thread[]>> {
//     const threads = await prisma.thread.findMany({
//       where: { authorId: id },
//       include: {
//         author: true,
//         replies: true,
//         like: true,
//       },
//     });

//     if (!threads) {
//       throw {
//         code: "USER_NOT_EXIST",
//         status: 404,
//         message: "User Not Found!",
//       } as customError;
//     }

//     return {
//       status: "success",
//       message: "Threads retrieved",
//       data: threads,
//     };
//   }

//   async deleteThread(id: number): Promise<Thread | null> {
//     const thread = await prisma.thread.findUnique({
//       where: { id },
//     });

//     if (!thread) {
//       throw {
//         status: 404,
//         message: "Thread Not Found!",
//         code: "THREAD_NOT_EXIST",
//       } as customError;
//     }

//     return await prisma.thread.delete({
//       where: { id },
//     });
//   }

//   async deleteReply(id: number): Promise<SuccessResponse<null>> {
//     const reply = await prisma.reply.findUnique({
//       where: { id },
//     });

//     if (!reply) {
//       throw {
//         status: 404,
//         message: "Reply Not Found!",
//         code: "REPLY_NOT_EXIST",
//       } as customError;
//     }

//     await prisma.reply.delete({
//       where: { id },
//     });

//     return {
//       status: "success",
//       message: "Reply deleted",
//       data: null,
//     };
//   }
// }

// export default new ThreadServices();

// Lawas
// import { PrismaClient, Thread, User } from "@prisma/client";
// import { customError } from "../types/custom.error";
// import { CreateThreadsDTO } from "../dto/thread.dto";
// import { SuccessResponse } from "../types/success.respons";

// const prisma = new PrismaClient();

// class ThreadServies {
//   async createThread(
//     data: CreateThreadsDTO
//   ): Promise<SuccessResponse<Thread | null>> {
//     const result = await prisma.thread.create({ data });
//     return {
//       status: "success",
//       message: "Thread Created",
//       data: result,
//     };
//   }

//   async getAllThreads(userId: number): Promise<SuccessResponse<Thread[]>> {
//     const threads = await prisma.thread.findMany({
//       include: {
//         author: true,
//         replies: true,
//         like: true,
//       },
//     });

//     const threadWithIsLike = threads.map((thread) => {
//       const isLike = thread.like.some((like) => like.authorId === userId);
//       return {
//         ...thread,
//         isLike,
//       };
//     });

//     return {
//       status: "success",
//       message: "Threads retrived",
//       data: threadWithIsLike,
//     };
//   }

//   async getThreadById(
//     id: number,
//     userId: number
//   ): Promise<SuccessResponse<any>> {
//     const thread = await prisma.thread.findFirst({
//       where: { id },
//       include: {
//         author: true,
//         replies: {
//           include: { author: true },
//         },
//         like: true,
//       },
//     });

//     if (!thread) {
//       throw {
//         status: 404,
//         message: "Thread Not Found!",
//         code: "USER_NOT_EXIST",
//       } as customError;
//     }

//     const isLike = thread.like.some((like) => like.authorId === userId);

//     return {
//       status: "success",
//       message: "Thread retrived",
//       data: { ...thread, isLike },
//     };
//   }

//   async getThreadByUser(id: number): Promise<SuccessResponse<Thread[]>> {
//     const thread = await prisma.thread.findMany({
//       where: { authorId: id },
//       include: {
//         author: true,
//         replies: true,
//         like: true,
//       },
//     });

//     if (!thread) {
//       throw {
//         code: "USER_NOT_EXIST",
//         status: 404,
//         message: "User Not Found!",
//       } as customError;
//     }

//     return {
//       status: "success",
//       message: "Threads retrived",
//       data: thread,
//     };
//   }

//   async deleteThread(id: number): Promise<Thread | null> {
//     const thread = await prisma.thread.findUnique({
//       where: { id },
//     });

//     if (!thread) {
//       throw {
//         status: 404,
//         message: "Thread Not Found!",
//         code: "THREAD_NOT_EXIST",
//       } as customError;
//     }

//     return await prisma.thread.delete({
//       where: { id },
//     });
//   }
// }

// export default new ThreadServies();
