import { IRole } from "../interfaces/role.interface";
import { IAccess } from "../interfaces/access.interface";
import uniqid from "uniqid";

export class Role implements IRole {
  id: string;
  name: string;
  access: { [key: string]: IAccess };
  constructor(role: IRole) {
    this.id = !role.id ? uniqid() : role.id;
    this.name = role.name;
    this.access = role.access;
  }
}
