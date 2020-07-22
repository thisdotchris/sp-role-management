import { IAccount } from "./../dto/account.dto";
import { hashIt } from "./../utils/password.util";

import uniqid from "uniqid";

export class Account implements IAccount {
  id?: string | undefined;
  username: string;
  fullname: string;
  password: string;
  rolesCreated: string[] | undefined = [];
  usersCreated: string[] | undefined = [];
  constructor(newAccount: IAccount) {
    this.id = !newAccount.id ? uniqid() : newAccount.id;
    this.username = newAccount.username;
    this.fullname = newAccount.fullname;
    this.password = hashIt(newAccount.password);
  }
  pushUser(userId: string): void {
    if (this.usersCreated) this.usersCreated.push(userId);
  }
  pushRole(roleId: string): void {
    if (this.rolesCreated) this.rolesCreated.push(roleId);
  }
  removeUser(userId: string): void {
    if (this.usersCreated)
      this.usersCreated = [...this.usersCreated].filter(
        (user) => user !== userId
      );
  }
  removeRole(roleId: string): void {
    if (this.rolesCreated)
      this.rolesCreated = [...this.rolesCreated].filter(
        (role) => role !== roleId
      );
  }
}
