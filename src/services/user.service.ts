import { User } from "./../classes/user.class";
import {
  setAsync,
  getAsync,
  getAllAsync,
  client,
  delAsync,
} from "./../connections/redis.connection";

const hash = "user";

export const createUser = (newUser: User): Promise<number> => {
  return setAsync([hash, newUser.id, JSON.stringify(newUser)]);
};

export const updateUser = createUser;

export const deleteUser = (id: string) => {
  return new Promise((resolve, reject) => {
    client.HDEL("user", id, (err, res) => {
      console.log(err, res);
      resolve(true);
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
