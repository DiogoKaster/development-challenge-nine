import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Container, Form } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UploadFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(3),
  birthDate: z.string(),
  cpf: z.string().min(3),
});

type UploadFormInputs = z.infer<typeof UploadFormSchema>;

export function Pacient() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UploadFormInputs>({
    resolver: zodResolver(UploadFormSchema),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token ? token.replace(/^"(.*)"$/, "$1") : "";

  async function handleUpdatePacient(data: UploadFormInputs) {
    try {
      await api.put(`/pacients/${id}`, data, {
        headers: {
          Authorization: tokenWithoutQuotes,
        },
      });

      navigate("/pacients");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchPacient = async () => {
      try {
        const response = await api.get(`/pacients/${id}`, {
          headers: {
            Authorization: tokenWithoutQuotes,
          },
        });

        console.log(response.data);
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setValue("cpf", response.data.cpf);
        setValue("phone", response.data.phone);
        setValue("birthDate", response.data.birthDate);
      } catch (error) {
        console.error(error);
      }
    };

    if (!token) {
      navigate("/");
    }

    fetchPacient();
  }, [navigate, token, tokenWithoutQuotes, id, setValue]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleUpdatePacient)}>
        <h2>Dados do paciente</h2>
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
        <Button text="Atualizar" type="submit" disabled={isSubmitting} />
      </Form>
    </Container>
  );
}
