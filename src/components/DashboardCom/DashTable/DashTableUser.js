import { DashTableStyle } from "./DashTable.styled"
import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { useState } from "react"
import { Modal } from '../../ModalComp/Modal'
import { useAuthContext } from "../../../hook/useAuthContext"
import { EditUser } from "../EditUser/EditUser"

export const DashTableUser = ({ data }) => {
  const { user } = useAuthContext()
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [userRow, setUserRow] = useState()

  const [id, setId] = useState()
  const [item, setItem] = useState()

  const [imgLoaded, setImgLoaded] = useState(false)

  const handleShowEdit = (row) => {
    setShowEdit(true)
    setUserRow(row)
  }

  const handleCloseEdit = () => setShowEdit(false)

  const handleShow = (_id, item) => {
    setShow(true)
    setId(_id)
    setItem(item)
  }
  const handleClose = () => setShow(false)

  // const formatedDate = (date) => {
  //   if (date) {
  //     return format(new Date(date), `dd MMM yyyy h:m aaa`)
  //   }
  // }

  return (
    <DashTableStyle>
      <table className="dash-table-user">
        <thead>
          <tr>
            <th>លេខរៀង</th>
            <th>អ្នកប្រើប្រាស់</th>
            <th>តួនាទី</th>
            <th>រូបភាព</th>
            <th>សកម្ម</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="no-data">មិនមានអត្ថបទ</td>
            </tr>
          ) : (
            data?.map((row, index) => (
              <tr key={index} className='post-row'>
                <td>{index + 1}</td>
                <td className={`username ${user.username === row.username ? 'user-active' : ''}`}><p onClick={() => handleShowEdit(row)}>{row.username}</p></td>
                <td className="role-row">{row.role}</td>
                <td><img className={`user-img ${imgLoaded ? 'imgLoaded' : 'imgLoading'}`} src={row.profile} alt={row.username} onLoad={() => setImgLoaded(true)} /></td>
                <td >
                  <div className="action">
                    <button onClick={() => handleShowEdit(row)} className="btn-edit"><TbEdit /></button>
                    <button onClick={() => handleShow(row._id, row.username)} className="btn-delete"><MdDeleteOutline /></button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {
        show &&
        <Modal
          title="អ្នកប្រើប្រាស់"
          item={item}
          handleClose={handleClose}
          data_id={id}
          url='/api/users/'
          toDelete='category'
          qKey='users'
        />
      }

      {showEdit &&
        <EditUser
          data={userRow}
          handleCloseEdit={handleCloseEdit}
        />
      }
    </DashTableStyle >
  )
}
