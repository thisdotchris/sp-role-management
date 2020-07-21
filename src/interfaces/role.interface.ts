import { IAccess } from "./access.interface";

export interface IRole {
  id?: string;
  name: string;
  access: {
    [key: string]: IAccess;
  };
}
