import { Request, Response, Router, IRouter, NextFunction } from "express";
import {
  createRole,
  getRole,
  getAll,
  parse,
  deleteRole,
  updateRole,
} from "./../services/role.service";
import { Role } from "./../classes/role.class";
import { DTORole } from "./../dto/role.dto";
import { ParamDTORole } from "../dto/param.dto";
import {
  pushRoleCreated,
  removeRoleCreated,
} from "./../services/account.service";

export const RoleRouter: IRouter = Router();

RoleRouter.get("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let getAllResult: { [key: string]: string } = await getAll();
    const mappedResult = Object.keys(getAllResult).map((key) => {
      const { id, name }: DTORole = JSON.parse(getAllResult[key]);
      return { id, name };
    });
    res.status(200).json({ data: mappedResult });
  } catch (error) {
    return next(error);
  }
});

RoleRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param: ParamDTORole = req.params;
      if (param.id) {
        const result = await parse(getRole(param.id));
        res.status(200).json({ data: result });
      } else {
        res.status(200).json({ data: null });
      }
    } catch (error) {
      return next(error);
    }
  }
);

RoleRouter.post("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.accountid) {
      const body: DTORole = req.body;
      const newRole = new Role({ name: body.name, access: body.access });
      const accountid: string | string[] = req.headers.accountid;
      await createRole(newRole);
      await pushRoleCreated(
        typeof accountid === "string" ? accountid : accountid[0],
        newRole.id
      );
      res
        .status(200)
        .json({ message: "added new role successfully", data: newRole });
    } else {
      return next(new Error("unable to get accountid from headers"));
    }
  } catch (error) {
    return next(error);
  }
});

RoleRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param: { id?: string } = req.params;
      const accountid: string | string[] | undefined = req.headers.accountid;
      if (param.id && accountid) {
        await removeRoleCreated(
          typeof accountid === "string" ? accountid : accountid[0],
          param.id
        );
        await deleteRole(param.id);
        res.status(200).json({ data: "deleted" });
      } else {
        res.status(200).json({ data: "ok" });
      }
    } catch (error) {
      return next(error);
    }
  }
);

RoleRouter.patch(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: DTORole = req.body;
      if (body.id) {
        const prev: Role = await parse(getRole(body.id));
        const newRole = new Role(prev);
        newRole.id = prev.id;
        newRole.access = body.access;
        newRole.name = body.name;
        await updateRole(newRole);
        res.status(200).json({ message: "updated successfully..." });
      } else {
        res.status(200).json({ message: null });
      }
    } catch (error) {
      return next(error);
    }
  }
);
