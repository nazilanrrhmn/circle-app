import { ThreadEntity } from "../../../entities/thread";

export type Thread = {
  image?: string;
  fullName: string;
  userName?: string;
  postContent: string;
  postImage?: string;
  like: number;
  reply: number;
};

export type ThreadResponseDTO = {
  status: string;
  message: string;
  data: ThreadEntity[];
};

export type ThreadPostResponseDTO = Omit<ThreadResponseDTO, "data">;

export type ThreadPostRequestDTO = Pick<ThreadEntity, "content" | "image">;
