import styled from "styled-components";

export const DashCategoryStyle = styled.section`
  .action-menu {
    margin-bottom: 10px;

    .btn-add {
      background: transparent;
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.text};
      border: none;
      padding: 5px 10px;
      height: 40px;
      font-family: inherit;
      font-size: 18px;
      border-radius: 5px;
      text-transform: capitalize;
      cursor: pointer;

      svg {
        margin-bottom: 3px;
      }
    }
  }

  .input-area {
    .inputAndBtn {
      height: 40px;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .input-cat {
      height: 100%;
      width: 200px;
      border: none;
      border-radius: 5px;
      font-size: inherit;
      padding: 5px 10px;
      color: ${props => props.theme.textColor};
      background-color: ${props => props.theme.card};
      box-shadow: ${props => props.theme.boxShadow};

      &:focus {
        outline: none;
      }
    }

    .btn-create {
      color: ${({ theme }) => theme.color.text};
      background-color: ${({ theme }) => theme.color.secondary};
      border: none;
      border-radius: 5px;
      width: 80px;
      height: 100%;
      padding: 5px 10px;
      font-size: 18px;
      cursor: pointer;
    }
    
    .msg-text, .error-text {
      font-size: 16px;
      font-weight: 600;
      margin-top: 10px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 5px 10px;
      border-radius: 5px;
      color: #15AE27;
      background-color: ${({ theme }) => theme.color.successBg};
      box-shadow: ${props => props.theme.boxShadow};
    }

    .error-text {
      color: ${({ theme }) => theme.color.secondary};
      background-color: ${({ theme }) => theme.color.errorBg};
    }

    .error, .message {
      height: 100%;
      margin-bottom: 0;
    }
  }

  .input-area.inactive {
    opacity: 0;
    visibility: hidden;
    margin-bottom: 0;
    transform: translateY(-20px);
    transition: .3s ease-out;
  }

  .input-area.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: .3s ease-out;
    margin-bottom: 45px;
  }

  .category-list {
    margin-top: -35px;
  }
`