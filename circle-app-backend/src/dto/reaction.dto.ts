export type CreateReplyDTO = {
  threadId: number;
  content: string;
  image?: string;
  authorId: number;
};

export type LikeDTO = {
  threadId: number;
  authorId: number;
};
