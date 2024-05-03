import { Container } from "./styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export function Button({ text, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <p>{text}</p>
    </Container>
  );
}
