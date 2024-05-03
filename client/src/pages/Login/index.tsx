import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  async function handleLogin(data: LoginFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  }

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
        <Button text="Login" type="submit" disabled={isSubmitting} />
      </Form>
    </Container>
  );
}
