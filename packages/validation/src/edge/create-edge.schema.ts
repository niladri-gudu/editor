import { z } from "zod";

export const CreateEdgeSchema = z.object({
  body: z.object({
    sourceId: z.string({ error: "Source node id is required" }).trim(),

    targetId: z.string({ error: "Target node id is required" }).trim(),

    type: z.string().trim().optional(),

    label: z.string().trim().optional(),

    data: z.record(z.string(), z.unknown()).optional(),

    style: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type CreateEdgeInput = z.infer<typeof CreateEdgeSchema>;
