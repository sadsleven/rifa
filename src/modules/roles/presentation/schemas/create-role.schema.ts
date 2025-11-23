import { z } from 'zod';

export interface IRoleSchema {
  name: string;
  description: string | null;
  permissions: string[];
}

export const RoleSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es obligatorio',
  }),
  description: z.string().nullable().optional(),
  permissions: z
    .array(z.string())
    .min(1, {
      message: 'Debe seleccionar al menos un permiso',
    })
    .optional(),
});
