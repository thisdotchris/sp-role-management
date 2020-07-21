import { IUser } from "./../interfaces/user.interface";
import { IRole } from "./../interfaces/role.interface";
import uniqid from "uniqid";

export class User implements IUser {
  id: string;
  username: string;
  fullname: string;
  password: string;
  role: IRole;
  constructor(
    username: string,
    fullname: string,
    password: string,
    role: IRole
  ) {
    this.id = uniqid();
    this.username = username;
    this.fullname = fullname;
    this.password = password;
    this.role = role;
  }
  getRole(): IRole {
    return this.role;
  }
}
