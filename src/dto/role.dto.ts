interface DTOAccess {
  [key: string]: {
    read: number;
    write: number;
  };
}

export interface DTORole {
  id?: string;
  name: string;
  access: DTOAccess;
}
