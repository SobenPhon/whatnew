import styled from "styled-components";

export const NotFound404Style = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25vh;

  .error404 {
    font-size: 6rem;
    font-weight: 500;
    margin-top: 100px;

    span {
      color: ${({ theme }) => theme.color.secondary};
    }
  }

  .error-des {
    font-size: 18px;
  }

  .btn-go-back {
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.secondary};
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 500;
    font-family: inherit;
    margin-top: 15px;
    text-transform: uppercase;
    transition: color .2s ease-out, background-color .2s ease-out;
    cursor: pointer;

    &:hover{
      color: ${props => props.theme.card};
      background-color: ${({ theme }) => theme.color.text};
    }
  }
`