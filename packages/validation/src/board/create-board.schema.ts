import { z } from "zod";

export const createBoardSchema = z.object({
  body: z.object({
    title: z
      .string({ error: "Title is required" })
      .trim()
      .min(1, "Title cannot be empty")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),

    visibility: z.enum(["PRIVATE", "SHARED", "PUBLIC"]).default("PRIVATE"),
  }),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
