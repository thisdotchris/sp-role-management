import { Request, Response, NextFunction } from "express";
import { getAccount } from "./../services/account.service";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const headers = req.headers;
    if (headers.accountid) {
      const accountid: string | string[] = headers.accountid;
      if (typeof accountid === "string") {
        const account = await getAccount(accountid);
        if (account === null)
          return res
            .status(401)
            .json({ message: "[accountid] from header is not valid..." });
        else return next();
      } else {
        return res.status(500).json({ message: "unable to find the account" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "unable to find [accountid] from headers..." });
    }
  } catch (error) {
    return next(error);
  }
}
