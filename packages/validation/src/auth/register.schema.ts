import { z } from "zod";

export const RegisterSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: "Invalid email format" })),
    password: z
      .string({ error: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be at most 128 characters long"),
  }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
