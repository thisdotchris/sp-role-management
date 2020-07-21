import { IRole } from "./role.interface";

export interface IUser {
  username: string;
  fullname: string;
  password: string;
  role: IRole;
  getRole(): IRole;
}
