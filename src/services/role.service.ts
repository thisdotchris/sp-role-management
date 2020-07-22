import { Role } from "./../classes/role.class";
import {
  setAsync,
  getAsync,
  getAllAsync,
  client,
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

export const updateRole = (role: Role): Promise<number> => {
  return setAsync([hash, role.id, JSON.stringify(role)]);
};

export const deleteRole = (id: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    client.HDEL(hash, id, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
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
