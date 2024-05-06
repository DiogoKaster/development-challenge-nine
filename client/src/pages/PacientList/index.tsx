import { useEffect, useState } from "react";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { Trash, NotePencil } from "@phosphor-icons/react";
import { Button } from "../../components/Button";

export type PacientType = {
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
  const [pacients, setPacients] = useState<PacientType[] | null>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token ? token.replace(/^"(.*)"$/, "$1") : "";

  async function handleDeletePacient(id: number) {
    try {
      await api.delete(`/pacients/${id}`, {
        headers: {
          Authorization: tokenWithoutQuotes,
        },
      });

      const newPacients = pacients?.filter((pacient) => pacient.id !== id);
      if (newPacients) {
        setPacients(newPacients);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

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
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "2rem",
          justifyContent: "space-between",
        }}
      >
        <Button
          text="Criar Paciente"
          onClick={() => navigate("/pacients/create")}
        />
        <Button text="Logout" onClick={handleLogout} />
      </div>
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
                <button onClick={() => navigate(`/pacients/${pacient.id}`)}>
                  <NotePencil size={27} />
                </button>
                <button onClick={() => handleDeletePacient(pacient.id)}>
                  <Trash size={27} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
