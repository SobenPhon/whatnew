import styled from "styled-components";

export const BtnBackStyle = styled.button`
  background: transparent;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.text};
  border: none;
  padding: 0 10px;
  height: 40px;
  font-family: inherit;
  font-size: 18px;
  border-radius: 5px;
  text-transform: capitalize;
  cursor: pointer;
`