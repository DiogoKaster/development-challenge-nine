import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme["gray-900"]};

  h4 {
    font-weight: 400;
    margin: 0.5rem 0;

    a {
      color: ${({ theme }) => theme["blue-300"]};
      text-decoration: none;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.5rem;
  min-height: fit-content;
  min-width: 30rem;
  background-color: ${({ theme }) => theme["gray-800"]};
`;
