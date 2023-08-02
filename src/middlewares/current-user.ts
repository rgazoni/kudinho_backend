import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  team_code: string;
  team_id: string;
  team_name: string;
}

// At the moment we are augmenting Request object.
// To do that we are accessing Express project,
// and changing initial interface implementation with the
// code bellow. As it can be seen, currentUser is optional.
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.signedCookies.kudinho_platform) {
    return next();
  }

  try {
    // This is the objective of this function. If it has a payload
    // attach currentUser data on a new currentUser property request body
    // at this point we don't care if a user isn't logged
    const payload = jwt.verify(
      req.signedCookies.kudinho_platform,
      "segredo",
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
