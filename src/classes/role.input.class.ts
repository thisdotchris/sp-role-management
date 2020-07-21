import { IAccess } from "./../interfaces/access.interface";
import { IRoleInput } from "./../interfaces/role.input.interface";

export const createRole = (
  newRole: IRoleInput | IRoleInput[]
): { [key: string]: IAccess } => {
  let obj: { [key: string]: IAccess } = {};
  if (Array.isArray(newRole)) {
    newRole.forEach((role) => (obj[role.name] = role.access));
  } else {
    obj[newRole.name] = newRole.access;
  }
  return obj;
};
