import { z } from "zod";

export const CreatePacientSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(3),
  address: z.string().min(3),
  birthDate: z.string(),
  cpf: z.string().min(3),
});
