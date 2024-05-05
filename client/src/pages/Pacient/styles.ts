import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme["gray-700"]};
  margin: 10rem auto;
  min-height: 440px;
  max-width: fit-content;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme["gray-100"]};
    margin: 2rem 0;
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
  background-color: ${({ theme }) => theme["gray-700"]};
`;
