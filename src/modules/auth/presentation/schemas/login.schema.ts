import { z } from 'zod';

export interface ILoginSchema {
  emailOrPhone: string;
  password: string;
}

export const LoginSchema = z.object({
  emailOrPhone: z.string().email('No es un email valido').toLowerCase().trim().refine(value => value !== null, {
    message: 'El correo electrónico es obligatorio'
  }),
  password: z.string()
    .min(6, 'El minimo es de 6 caracteres')
    .max(30, 'El maximo es de 30')
    .regex(/^[a-zA-Z0-9]+$/, 'La contraseña debe ser alfanumérica')
});
