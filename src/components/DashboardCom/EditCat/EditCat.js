import { useState } from "react"
import { EditCatStyle } from "./EditCat.styled"
import { useAuthContext } from "../../../hook/useAuthContext"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MsgModal } from "../../MsgModal/MsgModal"

export const EditCat = ({ data, handleCloseEdit }) => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const [catName, setCatName] = useState(data.catName)
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState()

  const editMutation = useMutation({
    mutationFn: async (editCat) => {
      const response = await fetch(`/api/categories/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify(editCat),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        console.log('json error: ', json.error)
      }

      if (response.ok) {
        setError(null)
        setMsg('បានធ្វើបច្ចុប្បភាពជោគជ័យ')
        return json
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cats'] })
    },
  })

  const handleSave = () => {
    if (data.catName !== catName) {
      editMutation.mutate({ catName })
      // handleCloseEdit()
    } else {
      setError('មិនមានអ្វីបានកែប្រែ!')
    }
  }

  return (
    <EditCatStyle>
      {!msg && (
        <div className="edit-cat-container">
          <h2>កែប្រែប្រភេទអត្ថបទ</h2>
          <input
            type="text"
            value={catName}
            onChange={(e) => setCatName(e.target.value)} />

          {error && <p className="input-msg">{error}</p>}

          <div className="btn">
            <button onClick={handleCloseEdit} className="btnCancel">ចាកចេញ</button>
            <button onClick={handleSave} className="btnSave">រក្សាទុក</button>
          </div>
        </div>
      )}

      {msg && <MsgModal msg={msg} handleClose={handleCloseEdit} />}
    </EditCatStyle>
  )
}
