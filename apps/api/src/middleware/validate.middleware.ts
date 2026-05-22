import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.slice(1).join("."),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formattedErrors,
        });
        return;
      }

      next(error);
    }
  };
};
