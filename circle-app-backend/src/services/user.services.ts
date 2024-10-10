import { PrismaClient, User } from "@prisma/client";
import { UpdateUSerDTO } from "../dto/user.dto";
import { error } from "console";
import { customError } from "../types/custom.error";
import { SuccessResponse } from "../types/success.respons";

const prisma = new PrismaClient();

class UserServices {
  async getAllUsers(userId: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        followers: true,
      },
    });

    const followedUsers = await prisma.follow.findMany({
      where: { followersId: userId },
      select: { followingId: true },
    });

    const followedIds = new Set(
      followedUsers.map((follow) => follow.followingId)
    );

    return users.map((user) => ({
      ...user,
      isFollow: followedIds.has(user.id),
    }));
  }

  async isFollow(userLoginId: number, userId: number): Promise<boolean> {
    const follow = await prisma.follow.findFirst({
      where: {
        followersId: userId,
        followingId: userLoginId,
      },
    });

    return follow !== null; // Mengembalikan true jika follow ada, false jika tidak
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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

  async updateUser(
    data: UpdateUSerDTO
  ): Promise<
    SuccessResponse<Pick<
      User,
      "profilePhoto" | "bio" | "fullname" | "username"
    > | null>
  > {
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

    const update = await prisma.user.update({
      data: data,
      where: { id: data.id },
    });

    return {
      status: "success",
      message: "Profile successfully edited",
      data: {
        profilePhoto: update.profilePhoto,
        fullname: update.fullname,
        username: update.username,
        bio: update.bio,
      },
    };
  }
}

export default new UserServices();
