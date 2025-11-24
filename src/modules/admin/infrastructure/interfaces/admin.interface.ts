export interface IAdmin {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAdminSchema {
  name: string;
  email: string;
  phone: string;
}

export interface IAdminSchemaEdit {
  name?: string;
  email?: string;
  phone?: string;
}
