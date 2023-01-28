import { TextEditorStyle } from './TextEditorStyled.js'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const TextEditor = ({ value, setValue }) => {

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'color': [] }, { background: [] }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'font', '',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <TextEditorStyle>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        setValue={setValue}
      />
    </TextEditorStyle>
  )
}
