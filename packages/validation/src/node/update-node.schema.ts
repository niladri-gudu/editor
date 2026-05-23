import { z } from "zod";

export const UpdateNodeSchema = z.object({
  body: z.object({
    type: z.string().trim().optional(),

    label: z.string().trim().optional(),

    x: z.number().optional(),

    y: z.number().optional(),

    width: z.number().optional(),

    height: z.number().optional(),

    data: z.record(z.string(), z.unknown()).optional(),

    style: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type UpdateNodeInput = z.infer<typeof UpdateNodeSchema>;
