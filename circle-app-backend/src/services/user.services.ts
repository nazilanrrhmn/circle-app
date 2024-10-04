import { PrismaClient, User } from "@prisma/client";
import { UpdateUSerDTO } from "../dto/user.dto";
import { error } from "console";
import { customError } from "../types/custom.error";
import { SuccessResponse } from "../types/success.respons";

const prisma = new PrismaClient();

class UserServices {
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
        threads: {
          include: {
            author: true,
            like: true,
            replies: true,
          },
        },
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

  // async createUser(data: CreateUserDTO): Promise<User | null> {
  //   return await prisma.user.create({ data });
  // }

  async updateUser(data: UpdateUSerDTO): Promise<SuccessResponse<User | null>> {
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
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

    if (data.username) {
      user.username = data.username;
    }

    if (data.bio) {
      user.bio = data.bio;
    }

    if (data.profilePhoto) {
      user.profilePhoto = data.profilePhoto;
    }

    await prisma.user.update({
      data: user,
      where: { id: data.id },
    });

    return {
      status: "success",
      message: "Profile successfully edited",
    };
  }
}

export default new UserServices();
