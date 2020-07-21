import { Request, Response, Router, IRouter, NextFunction } from "express";
import { createRole, getRole, getAll, parse } from "./../services/role.service";
import { Role } from "./../classes/role.class";
import { DTORole } from "./../dto/role.dto";
import { ParamDTORole } from "../dto/param.dto";

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
    const body: DTORole = req.body;
    const newRole = new Role({ name: body.name, access: body.access });
    await createRole(newRole);
    res
      .status(200)
      .json({ message: "added new role successfully", data: newRole });
  } catch (error) {
    return next(error);
  }
});
