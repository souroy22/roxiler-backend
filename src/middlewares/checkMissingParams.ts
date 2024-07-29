import { NextFunction, Request, Response } from "express";

const checkMissingParams = {
  checkMonthParam: (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.month) {
      return res.status(400).json({ error: "Please provide a month" });
    }
    const month = parseInt(req.query.month as string, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ error: "Invalid month parameter" });
    }
    next();
  },
};

export default checkMissingParams;
