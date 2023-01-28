import { useNavigate } from "react-router-dom"
import { BtnBackStyle } from "./BtnBack.styled"
import { TiArrowBackOutline } from 'react-icons/ti'

export const BtnBack = () => {
  const navigate = useNavigate()

  return (
    <BtnBackStyle
      className="icon-align"
      onClick={() => navigate(-1)}
    >
      <TiArrowBackOutline /> ត្រឡប់ក្រោយ
    </BtnBackStyle>
  )
}
