import { z } from "zod";

export const CreateNodeSchema = z.object({
  body: z.object({
    type: z.string({ error: "Node type is required" }).trim(),

    label: z.string({ error: "Label is required" }).trim(),

    x: z.number({ error: "X coordinate is required" }),

    y: z.number({ error: "Y coordinate is required" }),

    width: z.number().optional(),

    height: z.number().optional(),

    data: z.record(z.string(), z.unknown()).optional(),

    style: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type CreateNodeInput = z.infer<typeof CreateNodeSchema>;
