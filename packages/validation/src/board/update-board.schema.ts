import { z } from "zod";

export const UpdateBoardSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(1, "Title cannot be empty")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),

      visibility: z.enum(["PRIVATE", "SHARED", "PUBLIC"]).optional(),
    })
    .refine(
      (data) =>
        data.title !== undefined ||
        data.description !== undefined ||
        data.visibility !== undefined,
      {
        message: "At least one field must be provided",
      },
    ),
});

export type UpdateBoardInput = z.infer<typeof UpdateBoardSchema>;
