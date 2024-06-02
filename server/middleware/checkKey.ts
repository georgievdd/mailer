import {NextFunction, Request, Response} from "express";
import {SECRET} from "../config";

export default (req: Request, res: Response, next: NextFunction) => {
  const secret = req.get('SECRET')
  if (secret == SECRET) {
    return next()
  }
  res.status(403).send(`Forbidden`)
}