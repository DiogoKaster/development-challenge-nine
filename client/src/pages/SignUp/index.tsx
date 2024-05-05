import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>;

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handleSignUp(data: SignUpFormInputs) {
    try {
      const response = await api.post("/auth/signup", data);

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/pacients");
    }
  }, [token, navigate]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <h2>Faça seu Registro!</h2>
        <h3>Nome:</h3>
        <Input
          placeholder="Digite seu nome"
          type="text"
          {...register("name")}
          required
        />
        <h3>Email:</h3>
        <Input
          placeholder="Digite seu email"
          type="email"
          {...register("email")}
          required
        />
        <h3>Senha:</h3>
        <Input
          placeholder="Digite sua senha"
          type="password"
          {...register("password")}
          required
        />
        <Button text="Register" type="submit" disabled={isSubmitting} />
      </Form>
    </Container>
  );
}
