import { z } from "zod";

export const AddCollaboratorSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: "Invalid email format" })),

    role: z.enum(["EDITOR", "VIEWER"], {
      error: "Role must be either EDITOR or VIEWER",
    }),
  }),
});

export type AddCollaboratorInput = z.infer<
  typeof AddCollaboratorSchema
>;