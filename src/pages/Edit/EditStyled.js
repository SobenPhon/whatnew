import styled from "styled-components";

export const EditStyle = styled.form`
  .editing {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-start;
  }

  .btn-submit {
    border: none;
    padding: 5px 10px;
    font-size: 18px;
    font-family: inherit;
    font-weight: 500;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.text};
    cursor: pointer;
    margin-bottom: 5px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    font-size: 18px;

    input {
      width: 100%;
    }
  }

  .form-control {
    padding: 5px 10px;
    margin: 10px 0;
    font-size: 18px;
    border: none;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    background-color: ${props => props.theme.card};
    color:  ${props => props.theme.textColor};
    border-radius: 3px;
    height: 50px;

    &:focus {
      outline: none;
    }
  }

  .edit-area {
    width: 60%;
    margin: 0 auto;

    .post-title {
      font-family: ${({ theme }) => theme.font.enKh};
      font-size: 1.6rem;
      font-weight: 600;
      border-radius: 10px;
    }

    .text-editor {
      margin-top: 10px;
    }

    .quill {
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
      margin-bottom: 20px;
    }
  }

  /* setting / sidebar */
  .setting {
    background-color: ${props => props.theme.card};
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};
    padding: 15px;
    border-radius: 15px;
    width: 20%;

    .main-heading {
      margin: 10px 0;
    }

    .sub-heading {
      margin-bottom: 10px;
    }

    .form-control {
      height: 40px;
      background-color: ${props => props.theme.background};
      color:  ${props => props.theme.textColor};
    }

    .author-select, .category-select {
      border-bottom: 1px solid ${props => props.theme.borderColor};
      padding-bottom: 5px;
      margin-bottom: 5px;
    }

    .author-select {
      .author-title {
        margin-bottom: 0;
      }
    }

    .category-select {
      .categories {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 18px;
        text-transform: capitalize;
      }

      label:last-child {
        margin-bottom: 0;
      }

      /* Hide the default checkbox */
      .categories input {
        visibility: hidden;
        cursor: pointer;
      }

      /* Create a custom checkbox */
      .mark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: lightgray;
      }

      .categories:hover input ~ .mark {
        background-color: gray;
      }

      .categories input:checked ~ .mark {
        background-color: ${({ theme }) => theme.color.secondary};
      }

      /* Create the mark/indicator (hidden when not checked) */
      .mark:after {
        content: "";
        position: absolute;
        display: none;
      }

      /* Show the mark when checked */
      .categories input:checked ~ .mark:after {
        display: block;
      }

      /* Style the mark/indicator */
      .categories .mark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }

    /* image upload */
    .image-select {
      .imgInput {
        display: none;
      }

      #imgBox {
        position: relative;
      
        .upload-icon {
          background-color: #d9d9db;
          height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 3px;

          &:hover {
            background-color: #c4c4c6;
          }

          p {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            color: ${({ theme }) => theme.color.primary};

            svg {
              color: ${({ theme }) => theme.color.secondary};
              width: 20px;
              height: 20px;
            }
          }
        }

        .thumb-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 3px;
        }

        .progress-bar {
          height: 8px;
          width: 100%;
          background-color: #dadada;
          margin-top: 10px;
          border-radius: 5px;

          .progress {
            height: 8px;
            background-color: ${({ theme }) => theme.color.secondary};
            border-radius: 5px;
          }
        }

        .progress-count {
          margin: 5px 0;
          text-align: center;
        }

        .file-info {
          border: 1px solid #dadada;
          border-radius: 5px;
          padding: 5px;

          .fileName {
            word-wrap: break-word;
          }
        }
      }
    }
  }

  /* Preview area */
  .live-preview {
    background-color: ${props => props.theme.card};
    box-shadow: ${({ theme }) => theme.boxShadow.bs2};
    padding: 15px;
    border-radius: 15px;

    .title {
      font-size: 22px;
      
      span {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    .category, .author {
      font-weight: 600;
      margin: 5px 0;
    }

    .description {
      line-height: 1.4;
      font-size: 17px;
      border: 1px solid #dadada;
      padding: 10px;
      border-radius: 15px;
    }

    .image-link {
      font-weight: 600;
      margin: 5px 0;
      
      a {
        color: ${({ theme }) => theme.color.secondary};
      }

      a:hover {
        text-decoration: underline;
      }
    }

    .image-preview {
      width: 30%;
      margin-top: 10px;
    }
  }
  
`