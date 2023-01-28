import styled from "styled-components";

export const DashTopbarStyle = styled.nav`
  height: 50px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  .left-menu {
    display: flex;
    align-items: center;
    gap: 15px;

    .site-logo {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      img {
        width: 150px;
        height: 30%;
      }
    }

    .visit-site {
      white-space: nowrap;
      color: ${({ theme }) => theme.color.text};
      display: flex;
      align-items: center;
      gap: 5px;

      svg {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  }
  
  .center-menu {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .right-menu {
    display: flex;

    .action-btn {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;

      .btn-darkMode {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: transparent;
        border: none;
        color: ${({ theme }) => theme.color.text};
        border-radius: 3px;

        svg {
          font-size: 15px;
          height: 30px;
          width: 30px;
        }
      }
    }

    /* User login */
    .user-login {
      color: #fff;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 5px;
      border-left: 1px solid grey;
      margin-left: 10px;
      padding-left: 10px;

      .user-profile {
        border-radius: 50%;
        width: 35px;
        height: 35px;
        object-fit: cover;
        cursor: pointer;
        margin-left: 4px;
        border: 2px solid #fff;
      }

      .username {
        border-radius: 5px;
        color: ${({ theme }) => theme.color.text};
      }

      .user-logout {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        background-color: transparent;
        color: ${({ theme }) => theme.color.text};
        border: none;
        font-family: inherit;
        font-size: 18px;
        cursor: pointer;

        svg {
          font-size: 20px;
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  }
`