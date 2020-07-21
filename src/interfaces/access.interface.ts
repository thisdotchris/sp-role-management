import { EnumAccess } from "./access.enum";

export interface IAccess {
  read: EnumAccess;
  write: EnumAccess;
}
