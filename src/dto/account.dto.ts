export interface IAccount {
  id?: string;
  username: string;
  fullname: string;
  password: string;
  rolesCreated?: string[];
  usersCreated?: string[];
}
