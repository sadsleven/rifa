import { z } from 'zod';

export interface IOwnerSchema {
  name: string;
  email: string;
  phone: string;
}

export interface IBankSchema {
  name: string;
  dbs: string;
  urlEndpoint: string;
  secretJwt: string;
  hashBank: string;
  urlBg?: string;
  urlLogo?: string;
  owner: IOwnerSchema;
}

export const OwnerSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre del dueño es requerido',
  }),
  email: z
    .string()
    .min(1, {
      message: 'El email del dueño es requerido',
    })
    .email({
      message: 'Email inválido',
    }),
  phone: z.string().min(1, {
    message: 'El teléfono del dueño es requerido',
  }),
});

export const BankSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es requerido',
  }),
  dbs: z.string().min(1, {
    message: 'El DBS es requerido',
  }),
  urlEndpoint: z.string().min(1, {
    message: 'El URL Endpoint es requerido',
  }),
  secretJwt: z.string().min(1, {
    message: 'El Secret JWT es requerido',
  }),
  hashBank: z.string().min(1, {
    message: 'El Hash Bank es requerido',
  }),
  urlBg: z.string().nullable().optional(),
  urlLogo: z.string().nullable().optional(),
  owner: OwnerSchema,
});
