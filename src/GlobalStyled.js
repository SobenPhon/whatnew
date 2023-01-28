import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

export const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: inherit;
  }

  body {
    font-family: "Barlow Semi Condensed", sans-serif, 'Battambang', cursive;
    background-color: ${props => props.theme.background};
    /* background-color: #333; */
    color: ${props => props.theme.textColor};
  }

  /* #light {
    background-color: #F4F4F5;
    color: #242526;
  }

  #dark {
    background-color: #18181B;
    color: #E4E6EB;
  } */

  /* body.light {
    background-color: #fff;
    color: #333;
  } */

  /* body.dark {
    background-color: #333;
    color: #fff;
  } */

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  .mb-1 {
    margin-bottom: 10px;
  }

  .mb-2 {
    margin-bottom: 20px;
  }

  .main-heading {
    font-family: 'Bayon', cursive;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    border-bottom: 4px solid ${({ theme }) => theme.color.secondary};
    display: inline-block;
  }

  .loading {
    font-size: 18px;
    margin: 20px 0;
  }

  .error {
    font-size: 1.5rem;
    color: #fff;
  }

  .message, .error, .info {
    background-color: ${props => props.theme.cardColor};
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.color.success};
    margin-bottom: 10px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 500;

    svg {
      background-color: ${({ theme }) => theme.color.success};
      color: ${({ theme }) => theme.color.text};
      border-radius: 50%;
      padding: 2px;
      width: 23px;
      height: 23px;
    }
  }

  .info {
    border: 1px solid ${({ theme }) => theme.color.info};

    svg {
      background-color: ${({ theme }) => theme.color.info};
      width: 25px;
      height: 25px;
    }
  }

  .error {
    background-color: ${props => props.theme.cardColor};
    color: ${props => props.theme.textColor};
    border: 1px solid ${({ theme }) => theme.color.error};

    svg {
      background-color: ${({ theme }) => theme.color.error};
      color: ${({ theme }) => theme.color.text};
    }
  }

  .icon-align {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .btn-primary {
    background: transparent;
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.text};
    border: none;
    padding: 10px;
    font-family: inherit;
    font-size: 18px;
    border-radius: 2px;
    text-transform: capitalize;
    cursor: pointer;
  }

  .btn-group {
    display: flex;
    gap: 5px;

    .btnDelete, .btnEdit {
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.text};
      padding: 5px 10px 5px 5px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      border-radius: 3px;
      cursor: pointer;
      
      svg {
        margin-top: 1px;
        font-size: 18px;
      }
    }
  }

  .imgLoaded {
    filter: blur(0px);
    transition: filter .5s linear;
  }

  .imgLoading {
    filter: blur(4px);
    clip-path: inset(0);
  }
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  padding-top: 50px;
`

export const Flexbox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;

  @media (max-width: 900px) {
    display: block;
  }

  @media (max-width: 400px) {
    display: block;
  }
`

export const DashContainer = styled.section`
  /* background-color: pink; */
`