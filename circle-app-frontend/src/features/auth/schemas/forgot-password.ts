import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email must be a valid email"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 character"),
  // newPassword: z.string().min(6, "Password must be at least 6 character"),
});
// .superRefine(({ newPassword, password }, ctx) => {
//   if (newPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "The password did not match",
//       path: ["newPassword"],
//     });
//   }
// });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
