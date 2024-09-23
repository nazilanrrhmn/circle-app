import { PrismaClient, Thread, User } from "@prisma/client";
import { customError } from "../types/custom.error";
import { CreateThreadsDTO } from "../dto/thread.dto";

const prisma = new PrismaClient();

class ThreadServies {
  async createThread(data: CreateThreadsDTO): Promise<Thread | null> {
    return await prisma.thread.create({ data });
  }

  async getAllThreads(): Promise<Thread[]> {
    return await prisma.thread.findMany({});
  }

  async getThreadById(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findFirst({
      where: { id },
      include: {
        replies: true,
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

    return thread;
  }

  async getThreadByUser(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        threads: true,
      },
    });

    if (!user) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "User Not Found!",
      } as customError;
    }

    return user;
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
