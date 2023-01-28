import styled from "styled-components";

export const DashOverviewStyle = styled.section`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 15px;

  /* global */
  .widget {
    background-color: ${props => props.theme.card};
    padding: 12px 15px 15px;
    border-radius: 5px;

    svg {
      width: 35px;
      height: 35px;
      padding: 5px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.text};
    }

    .count {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .widget-title {
    font-size: 24px;
    margin-bottom: 10px;
    border-bottom: 2px solid ${({ theme }) => theme.color.secondary};
  }

  /* overview main */
  .overview-main {
    .top-widget-area {
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
    }

    .post-count, .category-count, .users-count {
      width: 150px;
    }
  }

  /* overview sidebar */
  .overview-sidebar {
    .active-user {
      .user-list {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        .username {
          width: 80px;
        }

        .user-role {
          width: 100px;
        }
        
        .user-img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }
      }

    }
  }

  .err {
    color: ${({ theme }) => theme.color.secondary};
    font-size: 17px !important;
  }
`