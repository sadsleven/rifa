export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserSchema {
  name: string;
  email: string;
  phone: string;
}

export interface IUserSchemaEdit {
  name?: string;
  email?: string;
  phone?: string;
}
