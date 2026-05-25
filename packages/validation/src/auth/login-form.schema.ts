import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .pipe(
      z.email({
        error: "Invalid email format",
      }),
    ),

  password: z.string({
    error: "Password is required",
  }),
});

export type LoginFormInput = z.infer<typeof LoginFormSchema>;
