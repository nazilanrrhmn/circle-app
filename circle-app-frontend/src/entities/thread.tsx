import { ReplyEntity } from "./reply";
import { UserEntity } from "./user";

export interface ThreadEntity {
  id: number;
  content: string;
  image?: string;
  author: UserEntity;
  authorId: number;
  replies: ReplyEntity[];
  like: any[];
  createdAt: Date;
  updateAt: Date;
}
