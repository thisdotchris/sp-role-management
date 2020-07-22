import { Request, Response, Router, IRouter, NextFunction } from "express";
import { ICreateAccount } from "./../interfaces/account.create.interface";
import { Account } from "./../classes/account.class";
import {
  getAllAccount,
  createAccount,
  getAccount,
  parse,
  updateAccount,
  delteAccount,
} from "./../services/account.service";
import { IAccount } from "../dto/account.dto";

export const AccountRouter: IRouter = Router();

AccountRouter.get(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: { [ket: string]: string } = await getAllAccount();
      const mappedResult = Object.keys(result).map((k) => {
        const { id, username }: IAccount = JSON.parse(result[k]);
        return { id, username };
      });
      res.status(200).json({ data: mappedResult });
    } catch (error) {
      return next(error);
    }
  }
);

AccountRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param: { id?: string } = req.params;
      if (param.id) {
        const result = await parse(getAccount(param.id));
        res.status(200).json({ data: result });
      } else {
        res.status(200).json({ data: null });
      }
    } catch (error) {
      return next(error);
    }
  }
);

AccountRouter.post(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: ICreateAccount = req.body;
      const newAccount = new Account(body);
      await createAccount(newAccount);
      res.status(200).json({ data: newAccount });
    } catch (error) {
      return next(error);
    }
  }
);

AccountRouter.patch(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: IAccount = req.body;
      if (body.id) {
        const newAccount = new Account(body);
        await updateAccount(newAccount);
        res.status(200).json({ data: newAccount });
      } else {
        res.status(200).json({ data: null });
      }
    } catch (error) {
      return next(error);
    }
  }
);

AccountRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param: { id?: string } = req.params;
      if (param.id) {
        const result = await delteAccount(param.id);
        res.status(200).json({ data: result });
      } else {
        res.status(200).json({ data: "ok" });
      }
    } catch (error) {
      return next(error);
    }
  }
);
