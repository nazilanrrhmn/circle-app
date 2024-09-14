import { PrismaClient, Thread } from "@prisma/client";
import { customError } from "../types/custom.error";

const prisma = new PrismaClient();

class ThreadServies {
  async getAllThreads(): Promise<Thread[]> {
    return await prisma.thread.findMany();
  }

  async getThreadById(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findFirst({
      where: { id },
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

  async deleteThread(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "User Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    return await prisma.thread.delete({
      where: { id },
    });
  }
}

export default new ThreadServies();
