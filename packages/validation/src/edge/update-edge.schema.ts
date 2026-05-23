import { z } from "zod";

export const UpdateEdgeSchema = z.object({
  body: z.object({
    type: z.string().trim().optional(),

    label: z.string().trim().optional(),

    data: z.record(z.string(), z.unknown()).optional(),

    style: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type UpdateEdgeInput = z.infer<typeof UpdateEdgeSchema>;