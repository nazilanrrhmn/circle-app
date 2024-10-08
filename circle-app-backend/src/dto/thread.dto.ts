export type CreateThreadsDTO = {
  content: string;
  image?: string;
  authorId: number;
};

// New Adding
export interface CreateReplyDTO {
  threadId: number; // The ID of the thread being replied to
  authorId: number; // The ID of the user replying
  content: string; // The content of the reply
  image?: string | null; // Optional image URL for the reply
}
