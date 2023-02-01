import styled from "styled-components";

export const SkeletonStyle = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  animation: skeleton 1s ease-out infinite alternate;

  .postImgSk {
    width: 35%;
    height: 200px;
    border-radius: 15px;
    background-color: ${props => props.theme.skeletonColor};

    @media (max-width: 400px) {
      width: 60%;
      height: 90px;
    }
  }

  .postContentSk {
    width: 100%;
    
    .postCatSk {
      width: 100px;
      height: 30px;
      border-radius: 5px;
      background-color: ${props => props.theme.skeletonColor};
      margin-bottom: 15px;
    }

    .postTitleSk {
      width: 60%;
      height: 30px;
      border-radius: 5px;
      background-color: ${props => props.theme.skeletonColor};
      margin-bottom: 15px;
    }

    .postExcSk {
      width: 40%;
      height:30px;
      border-radius: 5px;
      background-color: ${props => props.theme.skeletonColor};
      margin-bottom: 15px;
    }

    .postMetaSk {
      display: flex;
      gap: 15px;

      .postAuthorSk {
        width: 15%;
        height: 30px;
        border-radius: 5px;
        background-color: ${props => props.theme.skeletonColor};
      }

      .postDateSk {
        width: 15%;
        height:30px;
        border-radius: 5px;
        background-color: ${props => props.theme.skeletonColor};
      }
    }
    
  }

  @media (max-width: 400px) {
      .postContentSk {
        .postCatSk, .postTitleSk, .postExcSk {
          height: 20px;
          margin-bottom: 10px;
        }

        .postCatSk {
          width: 40%;
        }

        .postTitleSk {
          width: 100%;
        }

        .postExcSk {
          display: none;
        }

        .postMetaSk {
          gap: 10px;

          .postAuthorSk {
            display: none;
          }

          .postDateSk {
            height: 20px;
            width: 30%;
          }
        }
      }
    }

  @keyframes skeleton {
    to {
      opacity: .5;
    }
  }
`

export const SinglePostSkStyle = styled.section`
  margin: 20px 0;
  animation: skeleton 1s ease-out infinite alternate;

  .singleCatSk, .singleTitleSk, .singleDateSk, .singleImgSk, .singleContent1Sk, .singleContent2Sk, .singleContent3Sk {
    background-color: ${props => props.theme.skeletonColor};
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .singleCatSk {
    height: 30px;
    width: 10%;
  }

  .singleTitleSk {
    height: 40px;
  }

  .singleDateSk {
    height: 25px;
    width: 30%;
  }

  .singleImgSk {
    height: 300px;
  }

  .singleContent1Sk, .singleContent2Sk, .singleContent3Sk {
    height: 30px;
  }

  .singleContent2Sk {
    width: 90%;
  }

  @keyframes skeleton {
    to {
      opacity: .5;
    }
  }
`

export const SignupSkStyle = styled.section`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #dadada;
  border-radius: 15px;
  animation: skeleton 1s ease-out infinite alternate;
  
  .titleSk, .firstnameSk, .lastnameSk, .usernameSk, .emailSk, .passwordSk, .roleSk, .imgUploadSk, .btnSubmitSk {
    /* background-color: ${props => props.theme.skeletonColor}; */
    background-color: #D3D3D3;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .titleSk {
    height: 40px;
    width: 30%;
  }

  .nameSk {
    display: flex;
    gap: 15px;

    .firstnameSk, .lastnameSk {
      height: 40px;
      width: 50%;
    }
  }

  .usernameSk, .emailSk, .passwordSk, .roleSk {
    height: 40px;
  }

  .imgUploadSk {
    height: 70px;
    width: 100px;
  }

  .btnSk {
    display: flex;
    justify-content: flex-end;

    .btnSubmitSk {
      height: 40px;
      width: 30%;
      margin-bottom: 0;
    }
  }
`

export const ShowcaseSkStyle = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
  animation: skeleton 1s ease-out infinite alternate;

  .showcase-item-sk {
    background-color: ${props => props.theme.skeletonColor};
    border-radius: 15px;
    width: 322px;
    height: 200px;

    &:nth-of-type(1) {
      grid-row: 1 / 3;
      width: 484px;
      height: 100%;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;

    .showcase-item-sk {
      width: 100%;

      &:nth-of-type(1) {
        grid-row: 1 / 3;
        width: 100%;
      }
    }
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;

    .showcase-item-sk {
      &:nth-of-type(1) {
        grid-row: 1 / 2;
      }
    }
  }

  @keyframes skeleton {
    to {
      opacity: .5;
    }
  }
`

export const NavSkStyle = styled.div`
  animation: skeleton 1s ease-out infinite alternate;
  display: flex;
  gap: 15px;

  .menuSk {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.skeletonColor};
  }

  @keyframes skeleton {
    to {
      opacity: .5;
    }
  }
`