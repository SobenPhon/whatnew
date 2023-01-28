import { NotFound404Style } from "./NotFound404.styled"
import { useNavigate } from "react-router-dom"

export const NotFound404 = () => {
  const navigate = useNavigate()

  return (
    <NotFound404Style>
      <div className="error404">4<span>0</span>4</div>
      <p className="error-des">Opp! Page Not Found</p>
      <button onClick={() => navigate(-1)} className="btn-go-back">Go Back</button>
    </NotFound404Style>
  )
}
