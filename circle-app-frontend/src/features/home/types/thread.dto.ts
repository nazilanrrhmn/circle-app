import { ThreadEntity } from "../../../entities/thread";

export type Thread = {
  id: number;
  profilePhoto?: string;
  fullName: string;
  userName?: string;
  postContent: string;
  postImage?: string;
  like: number;
  reply: number;
  createdAt: Date;
};

export type ThreadResponseDTO = {
  status: string;
  message: string;
  data: ThreadEntity[];
};

export type ThreadPostResponseDTO = Omit<ThreadResponseDTO, "data">;

export type ThreadPostRequestDTO = Pick<ThreadEntity, "content" | "image">;

export type ReplyPostResponseDTO = ThreadPostResponseDTO;
