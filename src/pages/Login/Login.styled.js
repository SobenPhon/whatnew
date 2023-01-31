import styled from "styled-components";

export const LoginStyle = styled.section`
  max-width: 350px;
  margin: 0 auto;
  margin-top: 60px;
  background-color: ${props => props.theme.card};
  box-shadow: ${({ theme }) => theme.boxShadow.bs1};
  padding: 20px;
  border-radius: 15px;

  .message {
    margin-bottom: 0;
  }

  .head-area {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .title {
      font-size: 2rem;
      border-bottom: 4px solid ${({ theme }) => theme.color.secondary};
      display: inline-block;
    }

    .profile-preview {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    width: 100%;
    margin-bottom: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    svg {
      width: 23px;
      height: 23px;
      margin-bottom: 4px;
    }
  }

  .form-control {
    width: 100%;
    padding: 5px 10px;
    font-size: 18px;
    border: none;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.textColor};
    border-radius: 5px;
    height: 40px;
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};

    &:focus {
      outline: none;
    }
  }

  .error-msg {
    margin-top: 5px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.error};
  }

  .password-area {
    display: flex;
    align-items: center;
    position: relative;

    .btn-show-password {
      position: absolute;
      right: 10px;
      cursor: pointer;
      /* color: ${({ theme }) => theme.color.primary}; */

      svg {
        display: flex;
        margin-bottom: 0;
      }
    }
  }

  .login-switch {
    margin: 10px 0;
    font-size: 18px;
    text-align: right;

    a {
      color: ${({ theme }) => theme.color.secondary};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .account {
    text-align: center;
    .acc-role {
      font-size: 15px;
    }
  }

  .btn-right {
    text-align: center;
  }

  .btn-submit {
    border: none;
    padding: 4px 10px;
    font-size: 18px;
    font-family: inherit;
    font-weight: 500;
    border-radius: 10px;
    height: 40px;
    line-height: 30px;
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.text};
    cursor: pointer;
    margin-top: 10px;

    &:disabled {
      background-color: darkgray;
      color: #333;
      cursor: not-allowed;
    }
  }

  .login-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .goto-link {
      white-space: nowrap;
      color: ${props => props.theme.textColor};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      font-size: 18px;
      gap: 5px;

      svg {
        font-size: 20px;
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    .error {
      margin: 10px 0 0;
      align-self: center;
    }
  }

  
`