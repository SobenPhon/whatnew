import styled from "styled-components";

export const DashUserStyle = styled.section`
  .action-menu {
    margin-bottom: 10px;

    .btn-add {
      background: transparent;
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.text};
      border: none;
      padding: 5px 10px;
      height: 40px;
      font-family: inherit;
      font-size: 18px;
      border-radius: 2px;
      text-transform: capitalize;
      cursor: pointer;

      svg {
        margin-bottom: 3px;
      }
    }
  }
`