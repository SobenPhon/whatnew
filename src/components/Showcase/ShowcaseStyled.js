import styled from "styled-components";

export const ShowcaseStyled = styled.section`
  .showcase {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 20px;

    a:nth-of-type(1) {
      grid-row: 1 / 3;
      height: 100%;
    }

    .showcase-item {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      position: relative;
      cursor: pointer;
      border-radius: 15px;
      overflow: hidden;

      &:hover img {
        transform: scale(1.05);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform .15s ease-out;
      }

      &:not(:first-child) {
        height: 200px;
      }
    }

    .showcase-desc {
      position: absolute;
      transform: translateY(-100%);
      padding: 10px;
      width: 100%;
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0)
      );
    }

    .categoires {
      display: flex;
      gap: 10px;

      .showcase-category {
        color: ${({ theme }) => theme.color.text};
        text-transform: uppercase;
        background-color: ${({ theme }) => theme.color.secondary};
        display: inline-block;
        padding: 0 6px;
        border-radius: 5px;
        font-weight: 700;
      }
    }

    .showcase-title {
      font-size: 20px;
      color: #fff;
      margin: 5px 0;
      font-weight: 600;
      line-height: 1.5;

      @media (max-width: 400px) {
        font-size: 18px;
      }
    }

    .showcase-date {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;

      a:nth-of-type(1) {
        grid-row: 1 / 3;
      }
    }

    @media (max-width: 400px) {
      grid-template-columns: 1fr;

      a:nth-of-type(1) {
        grid-row: 1 / 2;
      }
    }
  }
`