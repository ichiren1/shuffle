import { Request, Response } from "express";

export const rootHandler = (_req: Request, res: Response) =>
  res.send("Hello, ichiren shuffle API is awesome");
