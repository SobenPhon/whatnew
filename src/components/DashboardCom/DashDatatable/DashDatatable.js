import { DashDatatableStyle } from "./DashDatatable.styled"
import { usePostContext } from "../../../hook/usePostContext"
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'

import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from "react-router-dom";

export const DashDatatable = () => {
  const { posts } = usePostContext()

  const actionColumn = [
    {
      field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/dashboard/edit/${params.row._id}`} className="btn-edit"><TbEdit /> Edit</Link>
            <div className="btn-delete"><MdDeleteOutline /> Delete</div>
          </div>
        )
      }
    }
  ]

  const formatedDate = (date) => {
    if (date) {
      return format(new Date(date), `dd MMM yyyy h:m aaa`)
    }
  }

  const columns = [
    { field: '_id', headerName: 'ID', hide: true },
    { field: 'id', headerName: 'លេខរៀង', width: 80 },
    { field: 'title', headerName: 'ចំណងជើង', width: 400 },
    { field: 'author', headerName: 'អ្នកសរសេរ', width: 90 },
    { field: 'category', headerName: 'ប្រភេទ', width: 150 },
    {
      field: 'createdAt',
      headerName: 'ថ្ងៃចេញផ្សាយ',
      width: 180,
    }
  ];

  const rows = posts.map((row, index) => ({
    _id: row._id, id: (index + 1), title: row.title, author: row.author, category: row.category, createdAt: formatedDate(row.createdAt)
  }))

  return (
    <DashDatatableStyle >
      <div className="datatable" style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns.concat(actionColumn)}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </DashDatatableStyle>
  )
}
