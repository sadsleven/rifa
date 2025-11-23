export interface IRoleSchemaEdit {
  name: string;
  description: string | null;
}

export interface IRoleSchemaPermissionsEdit {
  permissions: string[];
}
