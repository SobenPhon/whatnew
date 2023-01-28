import { DashTableStyle } from "./DashTable.styled"
import { format } from 'date-fns'
import { useState } from "react"
import { Modal } from "../../Modal/Modal"

export const DashTableCategory = ({ data, col, rows, columns }) => {
  const [show, setShow] = useState(false)
  const [id, setId] = useState()

  console.log(rows)
  console.log(columns)

  const handleShow = (_id) => {
    setShow(true)
    setId(_id)
  }
  const handleClose = () => setShow(false)

  // const formatedDate = (date) => {
  //   if (date) {
  //     return format(new Date(date), `dd MMM yyyy h:m aaa`)
  //   }
  // }

  return (
    <DashTableStyle>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="no-data">មិនមានអត្ថបទ</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className='post-row'>
                {columns.map((col, i) => (
                  <td key={i}>{row[col.field]}</td>
                ))}
                <td>Edit / Delete</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* // <tr tr key = { index } className = 'post-row' >
              // </tr> */}
      {/* <td >
        <div className="action">
          <Link to={`/dashboard/edit/${row._id}`} className="btn-edit"><TbEdit /> Edit</Link>
          <div onClick={() => handleShow(row._id)} className="btn-delete"><MdDeleteOutline /> Delete</div>
        </div>
      </td> */}

      {
        show && <Modal
          handleClose={handleClose}
          postId={id}
        />
      }
    </DashTableStyle >
  )
}
