import { PrismaClient, User } from "@prisma/client";
import { UpdateUserDTO } from "../dto/user.dto";
import { updateUserDTO } from "../dto/auth.dto";
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
        _count: {
          select: {
            following: true,
            followers: true,
          },
        },
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

  async getUserByMailName(mailname: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email: mailname }, { username: mailname }],
      },
    });
  }

  // async createUser(data: CreateUserDTO): Promise<User | null> {
  //   return await prisma.user.create({ data });
  // }

  // async updateUser(
  //   data: UpdateUserDTO
  // ): Promise<
  //   SuccessResponse<Pick<
  //     User,
  //     "coverPhoto" | "profilePhoto" | "bio" | "fullname" | "username"
  //   > | null>
  // > {
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: data.id,
  //     },
  //   });

  //   if (!user) {
  //     throw {
  //       status: 404,
  //       message: "User Not Found!",
  //       code: "USER_NOT_EXIST",
  //     } as customError;
  //   }

  //   if (data.fullname) {
  //     user.fullname = data.fullname;
  //   }

  //   if (data.username) {
  //     user.username = data.username;
  //   }

  //   if (data.bio) {
  //     user.bio = data.bio;
  //   }

  //   if (data.profilePhoto) {
  //     user.profilePhoto = data.profilePhoto;
  //   }

  //   if (data.coverPhoto) {
  //     user.coverPhoto = data.coverPhoto;
  //   }

  //   const update = await prisma.user.update({
  //     data: data,
  //     where: { id: data.id },
  //   });

  //   return {
  //     status: "success",
  //     message: "Profile successfully edited",
  //     data: {
  //       profilePhoto: update.profilePhoto,
  //       coverPhoto: update.coverPhoto,
  //       fullname: update.fullname,
  //       username: update.username,
  //       bio: update.bio,
  //     },
  //   };
  // }

  // New
  async updateUser(
    data: UpdateUserDTO
  ): Promise<
    SuccessResponse<Pick<
      User,
      "coverPhoto" | "profilePhoto" | "bio" | "fullname" | "username"
    > | null>
  > {
    // Cari user berdasarkan ID
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    // Jika user tidak ditemukan, lempar error
    if (!user) {
      throw {
        status: 404,
        message: "User Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    // Buat object untuk menyimpan perubahan yang valid
    const updateData: Partial<User> = {};

    // Periksa dan tambahkan field yang perlu diperbarui
    if (data.fullname) {
      updateData.fullname = data.fullname;
    }

    if (data.username) {
      updateData.username = data.username;
    }

    if (data.bio) {
      updateData.bio = data.bio;
    }

    if (data.profilePhoto) {
      updateData.profilePhoto = data.profilePhoto;
    }

    if (data.coverPhoto) {
      updateData.coverPhoto = data.coverPhoto;
    }

    // Lakukan pembaruan data pada user
    const updatedUser = await prisma.user.update({
      data: updateData,
      where: { id: data.id },
    });

    // Kembalikan response sukses dengan data yang telah diperbarui
    return {
      status: "success",
      message: "Profile successfully edited",
      data: {
        profilePhoto: updatedUser.profilePhoto,
        coverPhoto: updatedUser.coverPhoto,
        fullname: updatedUser.fullname,
        username: updatedUser.username,
        bio: updatedUser.bio,
      },
    };
  }

  // auth
  async updateUsers(id: number, data: Partial<updateUserDTO>): Promise<void> {
    await prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserServices();
