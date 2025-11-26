import { z } from 'zod';

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirmar contraseña es requerido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type IChangePasswordSchema = z.infer<typeof changePasswordSchema>;

// Request Email Change Schema (Step 1: Send OTP)
export const requestEmailChangeSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type IRequestEmailChangeSchema = z.infer<typeof requestEmailChangeSchema>;

// Confirm Email Change Schema (Step 2: Verify OTP)
export const confirmEmailChangeSchema = z.object({
  email: z.string().email('Email inválido'),
  code: z.string().min(1, 'El código es requerido'),
});

export type IConfirmEmailChangeSchema = z.infer<typeof confirmEmailChangeSchema>;

// Request Phone Change Schema (Step 1: Send OTP)
export const requestPhoneChangeSchema = z.object({
  phone: z.string().min(1, 'El teléfono es requerido').regex(/^\+?[1-9]\d{1,14}$/, 'Formato de teléfono inválido'),
});

export type IRequestPhoneChangeSchema = z.infer<typeof requestPhoneChangeSchema>;

// Confirm Phone Change Schema (Step 2: Verify OTP)
export const confirmPhoneChangeSchema = z.object({
  phone: z.string().min(1, 'El teléfono es requerido').regex(/^\+?[1-9]\d{1,14}$/, 'Formato de teléfono inválido'),
  code: z.string().min(1, 'El código es requerido'),
});

export type IConfirmPhoneChangeSchema = z.infer<typeof confirmPhoneChangeSchema>;
