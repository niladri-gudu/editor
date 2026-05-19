import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z.string().min(1),
});

export const UpdateNodeSchema = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
});

export type CreateBoardInput = z.infer<typeof CreateBoardSchema>;
export type UpdateNodeInput = z.infer<typeof UpdateNodeSchema>;