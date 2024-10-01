export type CreateThreadsDTO = {
  content: string;
  image?: string;
  authorId: number;
};

export type UpdateThreadDTO = CreateThreadsDTO & {
  id: number;
};
