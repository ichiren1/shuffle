import { Request, Response } from 'express';

export const rootHandler = (_req: Request, res: Response) => {
  return res.send('Hello, ichiren shuffle API is awesome');
};