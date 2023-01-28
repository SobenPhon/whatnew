import { DashTableStyle } from "./DashTable.styled"
import { Link } from "react-router-dom"
import { format } from 'date-fns'

import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { useState } from "react"
import { Modal } from "../../ModalComp/Modal"

export const DashTable = ({ data, hideAction }) => {
  const [show, setShow] = useState(false)
  const [id, setId] = useState()
  const [item, setItem] = useState('')

  const handleShow = (_id, title) => {
    setShow(true)
    setId(_id)
    setItem(title.slice(0, 10) + '...')
  }
  const handleClose = () => setShow(false)

  const formatedDate = (date) => {
    if (date) {
      return format(new Date(date), `dd MMM yyyy h:m aaa`)
    }
  }

  return (
    <DashTableStyle>
      <table>
        <thead>
          <tr>
            <th>លេខរៀង</th>
            <th>ចំណងជើង</th>
            <th>អ្នកសរសេរ</th>
            <th>ប្រភេទ</th>
            <th>ថ្ងៃចេញផ្សាយ</th>
            {!hideAction && <th>សកម្ម</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr >
              <td className="no-data">មិនមានអត្ថបទ</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row._id} className='post-row'>
                <td>{index + 1}</td>
                <td className='post-title'><Link to={`/dashboard/edit/${row._id}`}>{row.title}</Link></td>
                <td>{row.author}</td>
                <td className="category">{row.category.map((cat, i) => (
                  <p key={i} className="table-cat">{cat},</p>
                ))}</td>
                <td>{formatedDate(row.createdAt)}</td>
                {!hideAction && (
                  <td >
                    <div className="action">
                      <Link to={`/dashboard/edit/${row._id}`} className="btn-edit"><TbEdit /></Link>
                      <div onClick={() => handleShow(row._id, row.title)} className="btn-delete"><MdDeleteOutline /></div>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {show &&
        <Modal
          title="អត្ថបទ"
          item={item}
          handleClose={handleClose}
          data_id={id}
          url='/api/posts/'
          toDelete='post'
        />}
    </DashTableStyle>
  )
}
