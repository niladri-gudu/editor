import { z } from "zod";

export const UpdateCollaboratorRoleSchema = z.object({
  body: z.object({
    role: z.enum(["EDITOR", "VIEWER"], {
      error: "Role must be either EDITOR or VIEWER",
    }),
  }),
});

export type UpdateCollaboratorRoleInput = z.infer<
  typeof UpdateCollaboratorRoleSchema
>;