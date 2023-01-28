import styled from 'styled-components'

export const TextEditorStyle = styled.div`
  .quill {
    margin-top: 10px;

    .ql-editor {
      min-height: 18em;
      overflow-y: scroll;
      resize: vertical;
      line-height: 1.6;
    }

    .ql-toolbar {
      background-color: #fff;
      font-family: ${({ theme }) => theme.font.enKh};
    }

    .ql-container {
      font-family: inherit;
      font-size: 18px;
    }
  }
`


