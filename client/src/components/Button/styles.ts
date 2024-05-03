import styled from "styled-components";

export const Container = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme["blue-500"]};
  color: ${({ theme }) => theme["gray-900"]};
  outline: none;
  border: none;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["blue-300"]};
  }

  p {
    font-weight: 700;
  }
`;