import { FollowEntitiy } from "./follow";
import { ThreadEntity } from "./thread";

export interface UserEntity {
  id: number;
  fullname: string;
  email: string;
  password?: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  role: string;
  following: FollowEntitiy[];
  followers: FollowEntitiy[];
  threads: ThreadEntity[];
  isFollow: boolean;
  _count: {
    following: number;
    followers: number;
  };
}
