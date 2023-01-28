import styled from "styled-components";

export const ModalStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 5;

  .modalContainer {
    background-color: ${props => props.theme.background};
    box-shadow: ${({ theme }) => theme.boxShadow.bs1};
    padding: 20px;
    border-radius: 3px;
    text-align: center;

    .cross-icon {
      color: ${props => props.theme.textColor};
      background: none;
      border: none;
      position: absolute;
      transform: translate(700%, -50%);
      cursor: pointer;
    }

    .title {
      font-size: 21px;
      font-weight: 500;
      color: ${props => props.theme.textColor};

      svg {
        background-color: ${({ theme }) => theme.color.secondary};
        color: #fff;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        padding: 5px;
      }
    }

    .body {
      font-size: 18px;
      margin: 5px 0;
      color: ${props => props.theme.textColor};
    }

    .btnConfirm {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    }

    .btn {
      height: 40px;
      border: none;
      padding: 0 10px;
      font-family: inherit;
      font-size: 18px;
      border-radius: 3px;
      width: 100px;
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

    .btnDelete {
      background-color: ${({ theme }) => theme.color.secondary};
      color: #fff;

      &:hover {
        background-color: #FE5E29;
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }

  
`