import styled from "styled-components";

export const DashTableStyle = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-radius: 5px;
    /* overflow: hidden; */
    border-collapse: collapse;
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};

    thead tr {
      text-align: left;
      font-weight: 500;
      background-color:  ${props => props.theme.card};
    }

    th, td {
      vertical-align: middle;
      padding: 12px 15px;
    }

    th {
      white-space: nowrap;
    }

    tbody tr {
      border-bottom: 1px solid ${props => props.theme.borderColor};

      &:nth-of-type(even) {
        background-color: ${props => props.theme.card};
      }

      &:last-child {
        border-bottom: 2px solid ${({ theme }) => theme.color.secondary};
      }
    }
  }

  .dash-table-category {
    width: 40%;

    tr td:last-child {
      width: 1%;
      white-space: nowrap;
    }

    .post-row {
      p {
        display: inline;
        cursor: pointer;
      }

      .btn-edit, .btn-delete {
        &:disabled {
          svg {
            color: grey;
            cursor: not-allowed;
          }
        }
      }
    }
  }

  .dash-table-user {
    width: 50%;

    tr td:last-child {
      width: 1%;
      white-space: nowrap;
    }

    .post-row {
      .user-active {
        color: ${({ theme }) => theme.color.secondary};
      }

      .user-img {
        display: flex;
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
      }

      .username, .role-row {
        text-transform: capitalize;
      }
    }
  }

  .post-row {
    td:last-child {
      width: 1%;
      white-space: nowrap;
    }

    .category {
      white-space: nowrap;
      
      p {
        white-space: nowrap;
      }
    }

    .post-title {
      a {
        color: ${props => props.theme.textColor};

        &:hover {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }

    .action {
      display: flex;
      gap: 10px;
      align-items: center;

      .btn-edit, .btn-delete {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        color: ${(prop) => prop.theme.textColor};
        background: transparent;
        border: none;

        svg {
          color: ${({ theme }) => theme.color.secondary};
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`