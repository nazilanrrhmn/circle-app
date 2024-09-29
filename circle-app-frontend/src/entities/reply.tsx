import { UserEntity } from "./user";

export interface ReplyEntity {
  id: number;
  content: string;
  image?: string;
  author: UserEntity;
  authorId: number;
  threadId: number;
  createdAt: Date;
  updateAt: Date;
}
