import { Request, Response } from "express";
import moment from "moment";

export const healthController = (req: Request, res: Response) => {
  res.json({ message: {
    app: "Thumbstack-Todo Server",
    time: moment()
  } });
};