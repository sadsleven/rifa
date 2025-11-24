import { z } from 'zod';

export interface IAdminSchema {
  name: string;
  email: string;
  phone: string;
  roles?: number[];
}

export const AdminSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es requerido',
  }),
  email: z
    .string()
    .min(1, {
      message: 'El email es requerido',
    })
    .email({
      message: 'Email inválido',
    }),
  phone: z.string().min(1, {
    message: 'El teléfono es requerido',
  }),
  roles: z.array(z.number()).optional(),
});
