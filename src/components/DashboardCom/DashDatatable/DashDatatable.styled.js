import styled from "styled-components";

export const DashDatatableStyle = styled.div`
  font-family: "Barlow Semi Condensed", sans-serif, 'Battambang', cursive;

  .MuiDataGrid-root {
    font-family: "Barlow Semi Condensed", sans-serif, 'Battambang', cursive;
    font-size: 18px;
  }

  .cellAction {
    display: flex;
    gap: 10px;
    align-items: center;

    .btn-edit, .btn-delete {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      color: ${(prop) => prop.theme.textColor};

      svg {
        color: ${({ theme }) => theme.color.secondary};
        width: 18px;
        height: 18px;
      }
    }
  }
`