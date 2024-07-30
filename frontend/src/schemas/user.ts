import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  email: z.string().min(1, 'E-mail é obrigatório.').email('E-mail inválido.'),
})

export const userPasswordSchema = z.object({
  password: z.string().min(8, 'Senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: z.string().min(8, 'Senha deve ter no mínimo 6 caracteres.'),
}).superRefine((data, context) => {
  if (data.password !== data.confirmPassword) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Senhas não conferem.',
      path: ['confirmPassword'],
    });
  }
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserPasswordFormData = z.infer<typeof userPasswordSchema>;
