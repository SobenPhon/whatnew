import styled from "styled-components";

export const PostListByCatStyle = styled.section`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-heading-2 {
    font-size: 1.8rem;
    text-transform: capitalize;
    font-weight: 600;
    background-color: ${props => props.theme.card};
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};
    padding: 5px 10px;
    margin-bottom: 20px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border-bottom: 4px solid ${({ theme }) => theme.color.secondary};
    
    svg {
      color: ${({ theme }) => theme.color.secondary};
    }
  }

  /* override post-card */
  .post-card {
    flex-direction: row-reverse;

    @media (max-width: 400px) {
      width: auto;
    }

    .post-img {
      width: 300px;
      height: 200px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

      @media (max-width: 400px) {
        width: 130px;
        height: 130px;
      }
    }

    .post-content {
      flex-basis: 100%;
      .post-category {
        color: ${({ theme }) => theme.color.secondary};
        text-transform: uppercase;
        display: inline-block;
        border-radius: 2px;
        font-weight: 700;
      }

      .post-title {
        font-size: 24px;
        line-height: 1.3;

        @media (max-width: 400px) {
          font-size: 18px;
        }
      }

      .post-excerpt {
        line-height: 1.5;
        font-size: 17.5px;
        font-weight: 400;
      }

      .post-date {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .load-more {
    font-size: 18px;
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.secondary};
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
  }
`