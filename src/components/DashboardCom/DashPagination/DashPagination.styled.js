import styled from "styled-components";

export const DashPaginationStyle = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;

  .total {
    line-height: 5px;
    margin-right: 10px;
    font-weight: 500;
  }

  .btn-next, .btn-previous {
    background: none;
    border: none;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.text};
    font-family: inherit;
    font-size: 18px;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-next:disabled {
    background-color: gray;
  }

  .active {
    border: 1px solid #fff;
  }
`