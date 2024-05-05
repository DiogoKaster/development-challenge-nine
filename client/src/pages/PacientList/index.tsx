import { useEffect, useState } from "react";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";

export type Pacient = {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export function PacientList() {
  const [pacients, setPacients] = useState<Pacient[] | null>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token ? token.replace(/^"(.*)"$/, "$1") : "";

  useEffect(() => {
    const fetchPacients = async () => {
      try {
        const response = await api.get("/pacients", {
          headers: {
            Authorization: tokenWithoutQuotes,
          },
        });

        console.log(response.data);
        setPacients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!token) {
      navigate("/");
    }

    fetchPacients();
  }, [navigate, token, tokenWithoutQuotes]);

  return (
    <Container>
      <h1>Lista de Pacientes</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {pacients?.map((pacient) => (
            <tr key={pacient.id}>
              <td>{pacient.name}</td>
              <td>{pacient.birthDate}</td>
              <td>
                <a>Editar</a>
                <a>Excluir</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
