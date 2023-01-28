import styled from "styled-components";

export const SidebarStyle = styled.section`
  padding: 20px 0;
  margin-top: 30px;

  @media (max-width: 400px) {
    margin-top: 0;
  }
`

export const Widget = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  background-color: ${props => props.theme.card};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;

  .sidebar-title {
    font-family: 'Bayon', cursive;
    margin-bottom: 15px;
    font-weight: 500;
    border-bottom: 2px solid ${({ theme }) => theme.color.secondary};
  }

  .post-list {
    div:last-child > div {
      border: none;
      padding: 0;
      margin-bottom: 3px;
    }

    .post-card {
      margin-bottom: 10px;
      padding-bottom: 10px;

      .post-img {
        width: 130px;
        height: 90px;
      }
    }
  }

  @media (max-width: 900px) {
    .post-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    } 
  }

  @media (max-width: 400px) {
    .post-list {
      display: block;
    }
  }
`