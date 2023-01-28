import styled from "styled-components";

export const EditCatStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
  z-index: 5;

  .edit-cat-container {
    background-color: ${props => props.theme.card};
    padding: 15px;
    border-radius: 5px;

    h2 {
      font-size: 22px;
      font-family: inherit;
      margin-bottom: 10px;
    }

    input {
      height: 40px;
      width: 100%;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: inherit;
      color: ${props => props.theme.textColor};
      background-color: ${props => props.theme.background};
      border: 1px solid ${props => props.theme.borderColor};

      &:focus {
        outline: none;
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
      }
    }
  }

  
`