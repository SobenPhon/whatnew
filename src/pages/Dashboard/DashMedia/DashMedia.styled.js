import styled from "styled-components";

export const DashMediaStyle = styled.div`

  .btn-input {
    display: none;
  }

  .btn-choose {
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.text};
    padding: 5px 10px;
    display: inline-block;
    height: 40px;
    font-family: inherit;
    font-size: 18px;
    border-radius: 2px;
    text-transform: capitalize;
    margin-bottom: 10px;
    cursor: pointer;

    svg {
      margin-bottom: 3px;
    }
  }

  .image-list {
    margin-top: -10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    .image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 15px;
    }

    .loadingg {
      filter: blur(4px);
      clip-path: inset(0);
    }

    .loaded {
      filter: blur(0px);
      transition: filter .5s linear;
    }
  }

  .load-more {
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.secondary};
    height: 40px;
    padding: 0 5px;
    font-size: 17px;
    cursor: pointer;
    border-radius: 5px;
    border: none;

    &:disabled {
      background-color: gray;
    }
  }
`