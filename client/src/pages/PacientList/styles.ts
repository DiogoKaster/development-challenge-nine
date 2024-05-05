import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  max-width: 800px;

  h1 {
    font-size: 2rem;
    margin-top: 2rem;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 2rem;

    thead {
      th {
        padding: 1.25rem 2rem;
        text-align: left;
        background-color: ${({ theme }) => theme["gray-600"]};
      }
    }

    td {
      padding: 1.25rem 2rem;
      background-color: ${({ theme }) => theme["gray-700"]};
    }
  }
`;
