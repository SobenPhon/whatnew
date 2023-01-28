import styled from "styled-components";

export const SignupStyle = styled.section`
  .action-menu {
    margin-bottom: 15px;
  }

  .signup-form {
    display: flex;
    gap: 15px;
    align-items: flex-start;

    .error {
      margin: 0;
      margin-top: 10px;
    }

    .user-roles {
      text-transform: capitalize;
    }
  }

  .input-area, .upload-area {
    background-color: ${props => props.theme.card};
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};
    padding: 20px;
    border-radius: 15px;
  }

  .input-area {
    .head-area {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 2rem;
        font-weight: 600;
        border-bottom: 4px solid ${({ theme }) => theme.color.secondary};
        display: inline-block;
        margin-bottom: 20px;
      }

      .login-switch {
        margin: 10px 0;
        font-size: 18px;

        a {
          color: ${({ theme }) => theme.color.secondary};

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      width: 100%;
    }

    .form-control {
      padding: 5px 10px;
      margin-bottom: 10px;
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

    .name {
      display: flex;
      gap: 20px;
      
      input {
        width: 100%;
      }

      @media (max-width: 400px) {
        gap: 0;
        flex-direction: column;
      }
    }
  }

  .right-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-end;
  }

  .upload-area {
    .imgInput {
      display: none;
    }

    .btn-and-img {
      display: flex;
      gap: 15px;
      height: 110px;
      width: 100%;
    }

    .btn-upload {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      padding: 10px;
      border-radius: 10px;
      background-color: ${props => props.theme.card};
      border: 1px solid ${props => props.theme.borderColor};
      position: relative;

      .progress-bar {
        position: absolute;
        height: 10%;
        left: 0;
        bottom: 0;
        z-index: 0;
        border-radius: 0 0 10px 10px;
        background-color: green;
      }

      &:hover svg {
        transform: scale(1.2);
      }

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: ${props => props.theme.textColor};
        z-index: 1;

        svg {
          color: ${({ theme }) => theme.color.secondary};
          width: 25px;
          height: 25px;
          transition: transform .2s ease-out;
        }
      }
    }

    .profile-preview {
      width: 110px;
      object-fit: cover;
      border-radius: 10px;
    }

    .file-info {
      border: 1px solid ${props => props.theme.borderColor};
      padding: 5px;
      border-radius: 10px;
      width: 100%;
      margin-top: 15px;
      word-break: break-all;
    }
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

    &:disabled {
      background-color: darkgray;
      color: #333;
      cursor: not-allowed;
    }
  }
`