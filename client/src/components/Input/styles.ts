import styled from "styled-components";

export const Container = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme["gray-600"]};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme["gray-800"]};
  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;
