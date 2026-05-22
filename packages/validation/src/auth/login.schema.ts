import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: "Invalid email format" })),
    password: z.string({ error: "Password is required" }),
  }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
