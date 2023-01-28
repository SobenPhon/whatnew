import styled from "styled-components";

export const Navbar = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  position: fixed;
  margin: 0 auto;
  width: 100%;
  z-index: 10;
  height: 50px;

  .nav-bar {
    max-width: 1200px;
    margin: 0 auto;
    z-index: 10;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 15px;

    .site-logo {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      img {
        width: 150px;
        height: 80%;
      }
    }

    nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .menu-item {
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.color.text};
        white-space: nowrap;
        font-family: 'Bayon', cursive;

        &:hover {
          color: ${({ theme }) => theme.color.secondary};
        }
      }

      .active {
        color: ${({ theme }) => theme.color.secondary};
      }

      .action-btn {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        height: 30px;

        .btn-sub {
          height: 100%;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          color: ${({ theme }) => theme.color.text};
          text-transform: uppercase;
          background-color: ${({ theme }) => theme.color.secondary};

            &:hover {
            background-color: #fff;
            color: ${({ theme }) => theme.color.primary};
          }
        }

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
            height: 25px;
            width: 25px;
            transition: .3s ease-out;
            transform: scale(1);

            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }
    }

    /* Dashboard */
    .dashboard {
      border-left: 1px solid ${({ theme }) => theme.color.secondary};
      margin-left: 10px;
      padding-left: 10px;
      
      .btn-dashboard {
        display: flex;
        /* align-items: center; */
        /* justify-content: center; */
        gap: 3px;
        color: ${({ theme }) => theme.color.text};
        border: none;
        font-family: inherit;
        font-size: 16px;
        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .btn-login {
      border-left: 1px solid ${({ theme }) => theme.color.secondary};
      margin-left: 10px;
      padding-left: 10px;

      text-decoration: none;
      font-size: 18px;
      font-family: 'Bayon', cursive;
      color: ${({ theme }) => theme.color.text};
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
      height: 45%;

      svg {
        font-size: 20px;
      }

      .user-profile {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        object-fit: cover;
        cursor: pointer;
      }

      .username {
        position: absolute;
        top: 100%;
        padding: 5px;
        margin-top: 5px;
        border-radius: 5px;
        color: ${props => props.theme.contrastText};
        background-color: ${props => props.theme.contrastBg};
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
        font-size: 15px;
        cursor: pointer;
      }
    }

    .btn-close-nav {
      cursor: pointer;
      background: transparent;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.color.primary};
      position: absolute;
      background-color: #e0e0e0;
      border-radius: 5px;
      top: 3%;
      right: 5%;
      display: none;

      svg {
        display: flex;
        align-items: center;
        width: 30px;
        height: 30px;
      }
    }
  }

  .search-icon {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.color.text};
    cursor: pointer;
    margin-left: 10px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .btn-hambergur {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.color.text};
    display: none;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 10;
  }

  .hidden {
    display: none;
  }

  /* Search Section */
  .search-section {
    transition: .1s ease-out;
    /* transform: translateY(-100vh); */
    /* display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center; */
    display: none;
    height: calc(100vh - 50px);
    padding-top: 150px;
    background-color: rgba(36,37,38, 0.85);
    backdrop-filter: blur(3px);

    .search-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      /* position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      top: 20vh; */
      /* transform: translateY(200px);
      animation: slideInFromTop 0.4s ease-out; */
      width: 30%;
      
      input {
        border: none;
        padding: 10px 20px;
        width: 100%;
        height: 50px;
        font-size: 20px;
        font-family: inherit;
        border-radius: 5px 0 0 5px;

        &:focus {
          outline: none;
        }
      }

      .btn-search {
        cursor: pointer;
        border: none;
        color: ${({ theme }) => theme.color.text};
        background-color: ${({ theme }) => theme.color.secondary};
        border-radius: 0 5px 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;

        svg {
          display: flex;
          width: 45px;
          height: 45px;
          padding: 6px;
        }
      }

      .btn-close {
        position: absolute;
        top: 60px;
        right: 150px;
        display: flex;
        border: none;
        border-radius: 5px;
        background: transparent;
        /* background-color: ${({ theme }) => theme.color.secondary}; */
          
        svg {
          cursor: pointer;
          font-size: 3rem;
          fill: ${({ theme }) => theme.color.text};
          transition: fill 0.15s ease-out;

          &:hover {
            /* transform: scale(1.2); */
            fill: ${({ theme }) => theme.color.secondary};
          }
        }
      }
    }

    .search-result {
      background-color: ${props => props.theme.card};
      padding: 15px;
      border-radius: 15px;
      width: 50%;

      .search-item {
        padding: 10px 0;
        color: ${props => props.theme.textColor};
        border-bottom: 1px solid ${props => props.theme.borderColor};
        display: flex;
        gap: 10px;
        padding: 15px 0;

        .result-img {
          width: 110px;
          height: 100px;
          border-radius: 15px;
          object-fit: cover;
        }

        .result-title {
          font-size: 18px;
          line-height: 1.3;
        }

        .result-date {
          margin-top: 5px;
        }
      }

      .no-result {
        font-size: 18px;
      }
    }

    /* @keyframes slideInFromTop {
      0% {
        -webkit-transform: translateY(-100%);
      }

      100% {
        -webkit-transform: translateY(200px);
      }
    } */
  }

  .showSearch {
    /* transform: translateY(0); */
    /* transform: none; */
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  @media (max-width: 900px) {
    .nav-bar {
      .site-logo {
        img {
          width: 110px;
          height: 70%;
        }
      }
      
      nav {
        position: fixed;
        top: 0;
        left: 0;
        color: ${props => props.theme.textColor};
        background-color: ${props => props.theme.card};
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 20px;
        transition: .4s ease-out;
        /* height: 100vh; */
        transform: translateY(-150vh);
        gap: 10px;
        padding-top: 50px;
        border-bottom: 4px solid ${({ theme }) => theme.color.secondary};

        .menu-item {
          border-bottom: 1px solid ${props => props.theme.borderColor};
          width: 100%;
          padding-bottom: 10px;
          color: ${props => props.theme.textColor};
        }

        .active {
          color: ${({ theme }) => theme.color.secondary};
        }

        .action-btn {
          align-self: center;
          margin-top: 15px;

          .btn-darkMode {
            padding: 2px 10px;
            /* background-color: ${props => props.theme.background}; */
            color: ${props => props.theme.textColor};
          }
        }

        .btn-close-nav {
          display: block;
        }
      }

      .responsive_nav {
        transform: none;
      }

      .search-icon {
        margin-left: 0;
        margin-right: 15px;
        /* margin-right: 10px; */
      }

      .user-login {
        margin-right: 10px;
        margin-left: 0;
      }

      .dashboard {
        margin-right: 10px;
      }
    }

    .search-section {
      .search-bar {
        width: 80%;

        .btn-close {
          right: 25px;
        }
      }

      .search-result {

      }
    }

    .btn-hambergur {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .active { 
    a {
      color: red;
    }

    color: red;
  }

`