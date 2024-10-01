import { PrismaClient, Thread, User } from "@prisma/client";
import { customError } from "../types/custom.error";
import { CreateThreadsDTO } from "../dto/thread.dto";
import { SuccessResponse } from "../types/success.respons";

const prisma = new PrismaClient();

class ThreadServies {
  async createThread(data: CreateThreadsDTO): Promise<Thread | null> {
    return await prisma.thread.create({ data });
  }

  async getAllThreads(): Promise<SuccessResponse<Thread[]>> {
    const threads = await prisma.thread.findMany({
      include: {
        author: true,
        replies: true,
        like: true,
      },
    });

    return {
      status: "success",
      message: "Threads retrived",
      data: threads,
    };
  }

  async getThreadById(id: number): Promise<SuccessResponse<Thread>> {
    const thread = await prisma.thread.findFirst({
      where: { id },
      include: {
        author: true,
        replies: {
          include: { author: true },
        },
        like: true,
      },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "User Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    return {
      status: "success",
      message: "Thread retrived",
      data: thread,
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
}

export default new ThreadServies();
