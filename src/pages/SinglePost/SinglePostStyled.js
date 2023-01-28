import styled from "styled-components";

export const SinglePostStyle = styled.section`
  padding: 20px 0;

  .categoires {
    display: flex;
    gap: 10px;

    .post-category {
      color: ${({ theme }) => theme.color.text};
      background-color: ${({ theme }) => theme.color.secondary};
      text-transform: uppercase;
      display: inline-block;
      padding: 2px 6px;
      padding: 0 6px;
      border-radius: 5px;
      font-weight: 700;
    }
  }

  .post-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 5px;
    line-height: 1.3;
  }

  .single-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;

    .single-meta {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .post-author,
      .post-date {
        text-transform: uppercase;
        font-weight: 600;
        margin: 5px 0;
        opacity: 0.7;
      }

      .post-date {
        /* font-family: 'Courier New', Courier, monospace; */
      }
    }

    @media(max-width: 400px) {
      .single-action {
        display: none;
      }
    }
  }

  .post-description {
    font-size: 1.2em;
    line-height: 1.4;
    font-weight: 500;

    a:link {
      color: ${({ theme }) => theme.color.secondary};
    }
    a:focus {
      color: ${({ theme }) => theme.color.secondary};
    }

    ul {
      /* list-style-position: inside; */

      li {
        margin-left: 1em;
      }
    }
  }

  .post-image {
    width: 100%;
    margin: 10px 0;
  }

  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
  }

  .skeleton-text {
    width: 100%;
    height: 2rem;
    margin-bottom: .5rem;
    border-radius: .5rem;
  }

  .skeleton-text:last-child {
    margin-bottom: 0;
    width: 80%;
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 70%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
  
  @media(max-width: 400px) {
    .post-title {
      font-size: 1.55rem;
    }

    .post-description {
      font-size: 1.15em;
      line-height: 1.5;
    }
  }
`