import { DashTableStyle } from "./DashTable.styled"
import { format } from 'date-fns'

import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { useState } from "react"
import { Modal } from '../../ModalComp/Modal'
import { EditCat } from '../EditCat/EditCat'
import useAuth from "../../../hook/useAuth"

export const DashTableCategory = ({ data }) => {
  const { isAdmin } = useAuth()
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [catRow, setCatRow] = useState()

  const [id, setId] = useState()
  const [catName, setCatName] = useState()

  const handleShowEdit = (row) => {
    setShowEdit(true)
    setCatRow(row)
  }

  const handleCloseEdit = () => setShowEdit(false)

  const handleShow = (_id, cat) => {
    setShow(true)
    setId(_id)
    setCatName(cat)
  }
  const handleClose = () => setShow(false)

  // const formatedDate = (date) => {
  //   if (date) {
  //     return format(new Date(date), `dd MMM yyyy h:m aaa`)
  //   }
  // }

  return (
    <DashTableStyle>
      <table className="dash-table-category">
        <thead>
          <tr>
            <th>លេខរៀង</th>
            <th>ប្រភេទអត្ថបទ</th>
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
                <td><p onClick={() => {
                  if (isAdmin) {
                    handleShowEdit(row)
                  }
                }}>{row.catName}</p></td>
                <td >
                  <div className="action">
                    <button onClick={() => handleShowEdit(row)} className="btn-edit" disabled={!isAdmin}><TbEdit /></button>
                    <button onClick={() => handleShow(row._id, row.catName)} className="btn-delete" disabled={!isAdmin}><MdDeleteOutline /></button>
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
          title="ប្រភេទអត្ថបទ"
          item={catName}
          handleClose={handleClose}
          data_id={id}
          url='/api/categories/'
          toDelete='category'
          qKey='cats'
        />
      }

      {showEdit &&
        <EditCat
          data={catRow}
          handleCloseEdit={handleCloseEdit}
        />
      }
    </DashTableStyle >
  )
}
