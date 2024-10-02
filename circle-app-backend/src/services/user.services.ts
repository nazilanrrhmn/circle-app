import { PrismaClient, User } from "@prisma/client";
import { UpdateUSerDTO } from "../dto/user.dto";
import { customError } from "../types/custom.error";

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

  async updateUser(id: number, data: UpdateUSerDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw {
        status: 404,
        message: "User Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    // Create a new data object to store updates
    const updatedData: Partial<User> = {};

    if (data.fullname) {
      updatedData.fullname = data.fullname;
    }

    if (data.username) {
      updatedData.username = data.username;
    }

    if (data.bio) {
      updatedData.bio = data.bio;
    }

    if (data.profilePhoto) {
      updatedData.profilePhoto = data.profilePhoto;
    }

    // Update the user with the new data
    return await prisma.user.update({
      where: { id },
      data: updatedData,
    });
  }
}

export default new UserServices();
