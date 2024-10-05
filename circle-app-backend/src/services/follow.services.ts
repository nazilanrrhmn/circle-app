import { Follow, PrismaClient } from "@prisma/client";
import { FollowDTO } from "../dto/follow.dto";
import { SuccessResponse } from "../types/success.respons";
import { when } from "joi";

const prisma = new PrismaClient();

class FollowServices {
  async follow(data: FollowDTO): Promise<SuccessResponse<Follow>> {
    const isFollow = await prisma.follow.findFirst({
      where: {
        followersId: data.followersId,
        followingId: data.followingId,
      },
    });

    if (isFollow) {
      throw {
        status: "fail",
        message: "You have already follow this user",
      };
    }

    const follow = await prisma.follow.create({ data });

    return {
      status: "success",
      message: "Followed",
      data: follow,
    };
  }

  async unfollow(data: FollowDTO): Promise<SuccessResponse<any>> {
    const followRecord = await prisma.follow.findFirst({
      where: {
        followersId: data.followersId,
        followingId: data.followingId,
      },
    });

    if (!followRecord) {
      throw {
        status: "fail",
        message: "you haven't followed this account yet",
      };
    }

    const unfollow = await prisma.follow.delete({
      where: { id: followRecord.id },
    });

    return {
      status: "success",
      message: "Unfollowed",
    };
  }

  async followList(userId: number): Promise<SuccessResponse<any>> {
    const following = await prisma.follow.findMany({
      where: {
        followersId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            fullname: true,
            username: true,
            bio: true,
            profilePhoto: true,
          },
        },
      },
    });

    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        followers: {
          select: {
            id: true,
            fullname: true,
            username: true,
            bio: true,
            profilePhoto: true,
          },
        },
      },
    });

    const followedUsers = await prisma.follow.findMany({
      where: { followersId: userId },
      select: { followingId: true },
    });

    const followedIds = new Set(
      followedUsers.map((follow) => follow.followingId)
    );

    const followersWithIsFollow = followers.map((follow) => ({
      ...follow,
      isFollow: followedIds.has(follow.followers.id),
    }));

    const followingWithIsFollow = following.map((follow) => ({
      ...follow,
      isFollow: followedIds.has(follow.following.id),
    }));

    return {
      status: "success",
      message: "Following and Followers List Retrived",
      data: {
        followers: followersWithIsFollow,
        following: followingWithIsFollow,
      },
    };
  }
}

export default new FollowServices();
