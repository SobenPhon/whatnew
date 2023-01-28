import { ModalStyle } from './Modal.styled'
import { useAuthContext } from '../../hook/useAuthContext'
import { baseURL } from '../../config'

import { MdDeleteForever } from 'react-icons/md'
import { ImCross } from 'react-icons/im'

import { useState } from "react"
import { usePostContext } from '../../hook/usePostContext'
import { useDashPostContext } from '../../hook/useDashPostContext'
import { useNavigate } from 'react-router-dom'
import { MsgModal } from '../MsgModal/MsgModal'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const Modal = ({ handleClose, data_id, title, item, url, toDelete, qKey }) => {
  const { user } = useAuthContext()
  const { dispatch } = usePostContext()
  const { dispatch: dashDispatch } = useDashPostContext()
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (dataId) => {
      const response = await fetch(baseURL + url + dataId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      })
      const data = await response.json()

      if (response.ok) {
        setMsg(`${title} "${item}" បានលុបដោយជោគជ័យ`)
        return data
      }

      if (!response.ok) {
        setError(data.error)
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`${qKey}`] })
    },
  })

  const handleDelete = async () => {
    // e.preventDefault()

    switch (toDelete) {
      case 'post':
        const response = await fetch(baseURL + url + data_id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        })
        const data = await response.json()

        if (response.ok) {
          // TODO check what data we deleting (post, category, user .... dispatch will run arcodingly)
          dispatch({ type: 'DELETE_POSTS', payload: data })
          dashDispatch({ type: 'DELETE_POSTS', payload: data })
          setMsg(`${title} "${item}" បានលុបដោយជោគជ័យ`)
          if (data_id === id) {
            navigate(-1)
          }
        }

        if (!response.ok) {
          setError(data.error)
        }
        break
      case 'category':
        mutation.mutate(data_id)
        // handleClose()
        break
      default:
        break
    }
  }

  return (
    <ModalStyle>
      {!error ? (
        <>
          {msg && <MsgModal msg={msg} handleClose={handleClose} />}
          {!msg && (
            <div className="modalContainer">
              <button className='cross-icon' onClick={handleClose}><ImCross /></button>
              <div className="title">
                <MdDeleteForever />
                <p>លុប{title} "{item}"?</p>
              </div>
              <div className="body">
                {/* <p>This action can't be undone!</p> */}
                <p>លុបហើយមិនអាចត្រឡប់ក្រោយបានទេ!</p>
              </div>

              <div className="btnConfirm">
                <button className="btn btnCancel" onClick={handleClose}>ចាកចេញ</button>
                <button
                  className="btn btnDelete"
                  onClick={handleDelete}>លុប</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <MsgModal msg={error} handleClose={handleClose} />
      )}
    </ModalStyle>
  )
}
