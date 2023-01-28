import { MsgModalStyle } from './MsgModal.styled'
import { BsFillInfoCircleFill } from 'react-icons/bs'

export const MsgModal = ({ msg, handleClose }) => {

  return (
    <MsgModalStyle>
      <div className="msgModalContainer">
        <BsFillInfoCircleFill />
        <p className='body'>{msg}</p>

        <button onClick={handleClose} className="btn btnClose">ចាកចេញ</button>
      </div>
    </MsgModalStyle>
  )
}
