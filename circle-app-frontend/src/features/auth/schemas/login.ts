import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email must be a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormInput = z.infer<typeof loginSchema>;
