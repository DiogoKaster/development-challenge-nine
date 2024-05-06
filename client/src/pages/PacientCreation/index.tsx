import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { Container, Form } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreatePacientFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(3),
  birthDate: z.string(),
  cpf: z.string().min(3),
});

type UploadFormInputs = z.infer<typeof CreatePacientFormSchema>;

export function PacientCreation() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UploadFormInputs>({
    resolver: zodResolver(CreatePacientFormSchema),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token ? token.replace(/^"(.*)"$/, "$1") : "";

  async function handleCreatePacient(data: UploadFormInputs) {
    try {
      await api.post("/pacients/create", data, {
        headers: {
          Authorization: tokenWithoutQuotes,
        },
      });

      navigate("/pacients");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleCreatePacient)}>
        <h2>Criar Paciente</h2>
        <h3>Nome:</h3>
        <Input type="text" {...register("name")} required />
        <h3>Email:</h3>
        <Input type="email" {...register("email")} required />
        <h3>Cpf:</h3>
        <Input type="text" {...register("cpf")} required />
        <h3>Telefone:</h3>
        <Input type="text" {...register("phone")} required />
        <h3>Data de nascimento:</h3>
        <Input type="text" {...register("birthDate")} required />
        <Button text="Criar" type="submit" disabled={isSubmitting} />
      </Form>
    </Container>
  );
}
