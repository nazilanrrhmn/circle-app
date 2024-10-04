import { z } from "zod";

export const postThreadSchema = z.object({
  content: z.string().min(1, "Content is required"),
  image: z.any(),
});

export type PostThradInput = z.infer<typeof postThreadSchema>;
