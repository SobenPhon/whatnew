import styled from "styled-components";

export const DashboardStyle = styled.section`
  font-size: 18px;

  .dash-wrapper {
    display: flex;
    min-height: calc(100vh - 50px);

    .left-sidebar {
      padding: 15px;
      background-color: ${props => props.theme.card};
      box-shadow: ${({ theme }) => theme.boxShadow.bs2};
      width: 200px;

      .menu-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        white-space: nowrap;

        .menu-list-item {
          cursor: pointer;

          a {
            display: flex;
            align-items: center;
            gap: 5px;
            color: ${props => props.theme.textColor};
            font-size: 18px;
            font-weight: 500;
            padding: 5px;

            svg {
              width: 20px;
              height: 20px;
            }
          } 

          .active {
            color: ${({ theme }) => theme.color.text};
            background-color: ${({ theme }) => theme.color.secondary};
            padding: 5px;
            height: 40px;
          }
        }
      }
    }

    .content-area {
      padding: 15px;
      width: 100%;
    }
  }
`