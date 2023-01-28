import styled from "styled-components";

export const EditUserStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 5;

  .form-group {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    width: 100%;
    margin-bottom: 15px;
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

  .edit-cat-container {
    background-color: ${props => props.theme.card};
    padding: 20px 25px 25px;
    border-radius: 5px;

    .title {
      font-size: 22px;
      font-family: inherit;
      margin-bottom: 20px;
      display: inline-block;
      padding-bottom: 2px;
      border-bottom: 2px solid ${({ theme }) => theme.color.secondary};
    }

    .user-form {
      .form-group {
        label {
          width: 150px;
          display: inline-block;
          white-space: nowrap;
        }
      }

      .upload-area {
        display: flex;

        .imgLabel {
          width: 101.22px;
        }

        .upload-icon {
          display: flex;
          gap: 15px;

          .imgInput {
            display: none;
          }

          .btn-upload {
            display: flex;
            gap: 5px;
            width: 100%;
            cursor: pointer;

            .profile-preview {
              border-radius: 15px;
              width: 100px;
              height: 100px;
              object-fit: cover;
            }
          }

          .btn-change-profile {
            width: 100%;
            height: fit-content;
            padding: 2px 5px;
            margin-right: 0;
            border-radius: 5px;
            background: transparent;
            border: none;
            white-space: nowrap;
            color: ${props => props.theme.textColor};
            background-color: ${props => props.theme.background};
            border-bottom: 2px solid ${({ theme }) => theme.color.secondary};
            font-size: 17px;
            cursor: pointer;
          }

          .upload-state {
            text-align: center;
            margin-top: 5px;
          }
        }
      }

      .user-roles {
        text-transform: capitalize;
      }
    }

    .input-msg {
      color: ${({ theme }) => theme.color.secondary};
      font-size: 16px;
      font-weight: 600;
      margin-top: 5px;
    }

    .btn {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 15px;

      .btnCancel, .btnSave {
        border: none;
        padding: 3px 5px;
        font-family: inherit;
        font-size: 18px;
        border-radius: 3px;
        width: 100px;
        cursor: pointer;
      }

      .btnCancel {
        background-color: ${({ theme }) => theme.color.primary};
        color: #fff;
        border: 1px solid ${props => props.theme.borderColor};

        &:hover {
          background-color: ${({ theme }) => theme.color.text};
          color: ${({ theme }) => theme.color.primary};
        }
      }

      .btnSave {
        background-color: ${({ theme }) => theme.color.secondary};
        color: #fff;

        &:hover {
          background-color: #FE5E29;
          color: ${({ theme }) => theme.color.primary};
        }

        &:disabled {
          background-color: darkgray;
          color: #333;
          cursor: not-allowed;
        }
      }
    }
  }

  
`