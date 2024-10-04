import { z } from "zod";

export const editProfileSchema = z.object({
  fullname: z.string().min(1, "Full Name is required"),
  username: z.string(),
  bio: z.string(),
  profilePhoto: z.any(),
});

export type EditProfileFormInput = z.infer<typeof editProfileSchema>;
