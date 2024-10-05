import { LikeEntity } from "./like";
import { ReplyEntity } from "./reply";
import { UserEntity } from "./user";

export interface ThreadEntity {
  id: number;
  content: string;
  image?: string;
  author: UserEntity;
  authorId: number;
  replies: ReplyEntity[];
  like: LikeEntity[];
  createdAt: Date;
  updateAt: Date;
  isLike: boolean;
}
