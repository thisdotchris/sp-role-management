import {
  setAsync,
  getAsync,
  getAllAsync,
  client,
} from "./../connections/redis.connection";
import { Account } from "./../classes/account.class";
import * as userService from "./user.service";
import * as roleService from "./role.service";

const hash = "account";

export const createAccount = (newAccount: Account): Promise<number | null> => {
  if (newAccount.id)
    return setAsync([hash, newAccount.id, JSON.stringify(newAccount)]);
  else return Promise.resolve(null);
};

export const getAllAccount = (): Promise<{ [ket: string]: string }> =>
  getAllAsync(hash);

export const getAccount = (id: string): Promise<string> => getAsync(hash, id);

export const updateAccount = createAccount;

export const delteAccount = (id: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    client.HDEL(hash, id, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

export const parse = async (pendingPromise: Promise<string>): Promise<any> => {
  return JSON.parse(await pendingPromise);
};

export const pushUserCreated = async (
  accountId: string,
  userId: string
): Promise<Account> => {
  const account = await getAccount(accountId);
  const user = await userService.getUser(userId);
  if (account === null) throw new Error("account id is not valid...");
  else if (user === null) throw new Error("user id is not valid...");
  else {
    const parsed: Account = JSON.parse(account);
    const newAccount = new Account(parsed);
    newAccount.pushUser(userId);
    await createAccount(newAccount);
    return newAccount;
  }
};

export const pushRoleCreated = async (
  accountId: string,
  roleId: string
): Promise<Account> => {
  const account = await getAccount(accountId);
  const role = await roleService.getRole(roleId);
  if (account === null) throw new Error("account id is not valid...");
  else if (role === null) throw new Error("role id is not valid...");
  else {
    const parsed: Account = JSON.parse(account);
    const newAccount = new Account(parsed);
    newAccount.pushRole(roleId);
    await createAccount(newAccount);
    return newAccount;
  }
};

export const removeUserCreated = async (
  accountId: string,
  userId: string
): Promise<Account> => {
  const account = await getAccount(accountId);
  const user = await userService.getUser(userId);
  if (account === null) throw new Error("account id is not valid...");
  else if (user === null) throw new Error("user id is not valid...");
  else {
    const parsed: Account = JSON.parse(account);
    const newAccount = new Account(parsed);
    newAccount.removeUser(userId);
    await createAccount(newAccount);
    return newAccount;
  }
};

export const removeRoleCreated = async (
  accountId: string,
  roleId: string
): Promise<Account> => {
  const account = await getAccount(accountId);
  const role = await roleService.getRole(roleId);
  if (account === null) throw new Error("account id is not valid...");
  else if (role === null) throw new Error("role id is not valid...");
  else {
    const parsed: Account = JSON.parse(account);
    const newAccount = new Account(parsed);
    newAccount.removeRole(roleId);
    await createAccount(newAccount);
    return newAccount;
  }
};
