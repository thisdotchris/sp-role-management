import { Role } from "./../classes/role.class";
import {
  setAsync,
  getAsync,
  getAllAsync,
} from "./../connections/redis.connection";

const hash = "role";

export const createRole = async (role: Role | Role[]): Promise<void> => {
  if (Array.isArray(role)) {
    role.forEach(
      async (newRole) =>
        await setAsync([hash, newRole.id, JSON.stringify(newRole)])
    );
  } else {
    await setAsync([hash, role.id, JSON.stringify(role)]);
  }
  return;
};

export const getRole = (id: string): Promise<string> => {
  return getAsync(hash, id);
};

export const getAll = (): Promise<{ [key: string]: string }> => {
  return getAllAsync(hash);
};

export const parse = async (promiseRequest: Promise<string>): Promise<any> => {
  let res: string = await promiseRequest;
  if (res) return JSON.parse(res);
  else return;
};
