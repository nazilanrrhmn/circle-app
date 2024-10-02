import { ReplyEntity } from "./reply";
import { UserEntity } from "./user";

export interface ThreadEntity {
  id: number;
  content: string;
  image?: string; // Optional image field
  author: UserEntity; // Reference to UserEntity for the author
  authorId: number; // ID of the author
  replies: ReplyEntity[]; // Array of replies
  likes: number[]; // Assuming 'likes' is an array of user IDs who liked the thread
  createdAt: Date;
  updatedAt: Date; // Corrected 'updateAt' to 'updatedAt'
}
