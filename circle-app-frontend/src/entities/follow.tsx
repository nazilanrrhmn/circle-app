import { UserEntity } from "./user";

export interface FollowEntitiy {
  id: number;
  followingId: number;
  followersId: number;
  following: UserEntity;
  followers: UserEntity;
  createdAt: Date;
  updateAt: Date;
}
