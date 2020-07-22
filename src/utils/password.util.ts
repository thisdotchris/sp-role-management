import { genSaltSync, hashSync, compareSync } from "bcrypt";

const saltRounds = 10;
const salt = genSaltSync(saltRounds);

export const hashIt = (password: string): string => hashSync(password, salt);

export const compare = (password: string, hash: string): boolean =>
  compareSync(password, hash);
