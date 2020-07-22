import { User } from "./../classes/user.class";
import {
  setAsync,
  getAsync,
  getAllAsync,
  client,
} from "./../connections/redis.connection";

const hash = "user";

export const createUser = (newUser: User): Promise<number> => {
  return setAsync([hash, newUser.id, JSON.stringify(newUser)]);
};

export const updateUser = createUser;

export const deleteUser = (id: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    client.HDEL(hash, id, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

export const getUser = (id: string): Promise<string> => {
  return getAsync(hash, id);
};

export const getAll = (): Promise<{ [key: string]: string }> => {
  return getAllAsync(hash);
};

export const parse = async (pendingPromise: Promise<string>): Promise<User> => {
  const pendingPromiseResult = await pendingPromise;
  const result: User = JSON.parse(pendingPromiseResult);
  return result;
};
