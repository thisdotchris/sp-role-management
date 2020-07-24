import { Request, Response, Router, IRouter, NextFunction } from "express";
import {
  createUser,
  getAll,
  getUser,
  parse,
  updateUser,
  deleteUser,
} from "./../services/user.service";
import * as roleService from "./../services/role.service";
import { DTOUser } from "./../dto/user.dto";
import { User } from "./../classes/user.class";
import { IRole } from "../interfaces/role.interface";
import { ParamDTOUser } from "./../dto/param.dto";
import { IUpdateUser } from "./../dto/user.update";
import { Role } from "../classes/role.class";
import {
  pushUserCreated,
  removeUserCreated,
} from "./../services/account.service";

export const UserRouter: IRouter = Router();

UserRouter.get("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllResult: { [key: string]: string } = await getAll();
    const result = Object.keys(getAllResult).map((key) => {
      const { id, username }: DTOUser = JSON.parse(getAllResult[key]);
      return { id, username };
    });
    res.status(200).json({ data: result });
  } catch (error) {
    return next(error);
  }
});

UserRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param: ParamDTOUser = req.params;
      if (param.id) {
        const parsed: User = await parse(getUser(param.id));
        res.status(200).json({ data: parsed });
      } else {
        throw new Error("please provide correct parameters...");
      }
    } catch (error) {
      return next(error);
    }
  }
);

UserRouter.post("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: DTOUser = req.body;
    const accountid: string | string[] | undefined = req.headers.accountid;
    if (body && accountid) {
      const parsedRole: IRole = await roleService.parse(
        roleService.getRole(body.role)
      );
      const newUser = new User(
        body.username,
        body.fullname,
        body.password,
        parsedRole
      );
      await createUser(newUser);
      await pushUserCreated(
        typeof accountid === "string" ? accountid : accountid[0],
        newUser.id
      );
      res
        .status(200)
        .json({ message: "added new user successfully", data: newUser });
    } else {
      return next(new Error("undefined body or accountid..."));
    }
  } catch (error) {
    return next(error);
  }
});

UserRouter.patch(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: IUpdateUser = req.body;
      const user: User = await parse(getUser(body.id));
      const newRole: Role = await roleService.parse(
        roleService.getRole(body.role)
      );
      user.fullname = body.fullname;
      user.password = body.password;
      user.role = newRole;
      user.username = body.username;
      // update
      await updateUser(user);
      res.status(200).json({ message: "updated successfully..." });
    } catch (error) {
      return next(error);
    }
  }
);

UserRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param: { id?: string } = req.params;
      const accountid: string | string[] | undefined = req.headers.accountid;
      if (param.id && accountid) {
        await removeUserCreated(
          typeof accountid === "string" ? accountid : accountid[0],
          param.id
        );
        await deleteUser(param.id);
        res.status(200).json({ data: "deleted" });
      } else {
        res.status(200).json({ data: null });
      }
    } catch (error) {
      return next(error);
    }
  }
);
