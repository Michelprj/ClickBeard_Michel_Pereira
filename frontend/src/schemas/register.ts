import * as z from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório.'),
    email: z.string().min(1, 'E-mail é obrigatório.').email('E-mail inválido.'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
