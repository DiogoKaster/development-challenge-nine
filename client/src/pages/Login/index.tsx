import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handleLogin(data: LoginFormInputs) {
    try {
      const response = await api.post("/auth/login", data);

      const tokenJSON = JSON.stringify(response.data.token);
      localStorage.setItem("token", tokenJSON);

      navigate("/pacients");
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
      <Form onSubmit={handleSubmit(handleLogin)}>
        <h2>Faça seu Login!</h2>
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
        <h4>
          Não tem uma conta? <NavLink to="/signup">Registre-se</NavLink>
        </h4>
        <Button text="Login" type="submit" disabled={isSubmitting} />
      </Form>
    </Container>
  );
}
