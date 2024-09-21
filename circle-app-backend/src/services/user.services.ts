import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUSerDTO } from "../dto/user.dto";
import { error } from "console";
import { customError } from "../types/custom.error";

const prisma = new PrismaClient();

class UserServices {
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
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

  async createUser(data: CreateUserDTO): Promise<User | null> {
    return await prisma.user.create({ data });
  }

  async updateUser(data: UpdateUSerDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: 8,
      },
    });

    if (!user) {
      throw {
        status: 404,
        message: "User Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    if (data.fullname) {
      user.fullname = data.fullname;
    }

    if (data.password) {
      user.password = data.password;
    }

    if (data.username) {
      user.username = data.username;
    }

    return await prisma.user.update({
      data: user,
      where: { id: 8 },
    });
  }
}

export default new UserServices();
