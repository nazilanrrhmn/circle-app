import { z } from "zod";

export const postReplySchema = z.object({
  content: z.string().min(1, "Content is required"),
  image: z.any(),
});

export type PostReplyInput = z.infer<typeof postReplySchema>;
