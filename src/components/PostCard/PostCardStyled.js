import styled from "styled-components";

export const PostCardStyle = styled.div`

  &:hover .post-title {
    text-decoration: none;
  }
  
  .post-card {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    color: ${props => props.theme.textColor};
    width: 100%;

    @media (max-width: 900px) {
      justify-content: space-between;
    }
  }

  .post-img {
    width: 160px;
    height: 110px;
    object-fit: cover;
    border-radius: 15px;
  }

  .post-content {
    a {
      text-decoration: none;
      color: ${props => props.theme.textColor};
    }

    .categoires {
      display: flex;
      gap: 5px;
      
      .post-category {
        color: ${({ theme }) => theme.color.secondary};
        text-transform: uppercase;
        display: inline-block;
        border-radius: 2px;
        font-weight: 700;   
        text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
      }  
    }

    .post-title {
      font-size: 17px;
      font-weight: 700;
      margin: 0 0 5px;
      text-transform: capitalize;
      line-height: 1.5;
      color: ${({ theme }) => theme.color.primary};
      
      a {
        transition: color .2s ease-out;
      }

      &:hover a {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    .post-excerpt {
      h1, h2, h3 {
        display: none;
      }

      ul li {
        list-style: none;
      }
    
      @media (max-width: 400px) {
        display: none;
      }
    }

    .post-meta {
      display: flex;
      gap: 10px;
      margin-top: 5px;

      .post-author, .post-date {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .post-author {
        text-transform: capitalize;
      }

      @media (max-width: 400px) {
        flex-direction: column;
        gap: 4px;

        .post-author {
          display: none;
        }
      }
    }

    .btnDelete, .btnEdit {
      color: ${({ theme }) => theme.color.text};
      background-color: ${({ theme }) => theme.color.secondary};
      padding: 5px 10px 5px 5px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      border-radius: 3px;
      margin-top: 10px;
      margin-right: 10px;
      cursor: pointer;
      
      svg {
        margin-top: 1px;
        font-size: 18px;
      }

      @media (max-width: 400px) {
        display: none;
      }
    }
  }
  
`