import styled from "styled-components";

export const DashPostListStyle = styled.section`
  .action-menu {
    margin-bottom: 10px;

    .btn-add {
      background: transparent;
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.text};
      border: none;
      padding: 5px 10px;
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

  .menu-bar {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .search-box {
      border: none;
      height: 40px;
      outline: none;
      border-radius: 5px;
      width: 20%;
      padding: 5px 10px;
      font-family: inherit;
      font-size: 17px;
      box-shadow: ${({ theme }) => theme.boxShadow.bs2};

      @media (max-width: 900px) {
        width: 30%;
      }
    }

    .filter-bar {
      display: flex;
      gap: 10px;

      .filter-select, .filter-loading {
        border: 1px solid ${props => props.theme.borderColor};
        background-color: ${props => props.theme.card};
        color: ${props => props.theme.textColor};
        font-family: inherit;
        font-size: 18px;
        padding: 5px;
        border-radius: 5px;

        &:focus {
          outline: none;
        }
      }

      .filter-loading {
        display: flex;
        align-items: center;
      }
    }
  }
`