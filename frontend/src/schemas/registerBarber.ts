import * as z from 'zod'

export const registerBarberSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório.'),
    age: z.string().min(1, 'Idade é obrigatória.'),
    specialty: z.string().array().min(1, 'Especialidade é obrigatória.'),
})

export type RegisterBarberFormData = z.infer<typeof registerBarberSchema>
