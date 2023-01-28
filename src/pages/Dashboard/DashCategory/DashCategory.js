import { DashCategoryStyle } from './DashCategory.styled'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { DashTableCategory } from '../../../components/DashboardCom/DashTable/DashTableCategory'

import { RiBallPenFill } from 'react-icons/ri'
import { GiConfirmed } from 'react-icons/gi'

import { useState } from 'react'
import { useAuthContext } from '../../../hook/useAuthContext'
import useAuth from '../../../hook/useAuth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL } from '../../../config'

export const DashCategory = () => {
  const { user } = useAuthContext()
  const { isAdmin } = useAuth()
  const [showInput, setShowInput] = useState(false)
  const [catName, setCatName] = useState('')

  const [err, setErr] = useState(null)
  const [message, setMessage] = useState()
  const [alertVisible, setAlertVisible] = useState(false)

  const queryClient = useQueryClient()

  const getCategory = async () => {
    const response = await fetch(`${baseURL}/api/categories`)

    // catch server down
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    return response.json()
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cats'],
    queryFn: getCategory
  })

  const mutation = useMutation({
    mutationFn: async (newCat) => {
      const response = await fetch(`${baseURL}/api/categories`, {
        method: "POST",
        body: JSON.stringify(newCat),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setErr(data.error)
        setAlertVisible(true)
        throw new Error(data.error)
      }

      if (response.ok) {
        setCatName('')
        setMessage('បានបន្ថែមប្រភេទអត្ថបទថ្មីជោគជ័យ')
        setAlertVisible(true)
        setErr(null)
        return data
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cats'] })
    },
  })

  const handleCreate = async (e) => {
    e.preventDefault()
    setMessage('')

    mutation.mutate({ catName })

    setTimeout(() => {
      setAlertVisible(false)
    }, 3000);
  }

  return (
    <DashCategoryStyle>
      {isAdmin && (
        <>
          <div className="action-menu">
            <button onClick={() => {
              setShowInput(!showInput)
              setErr('')
            }} className="btn-add icon-align"><AiOutlineAppstoreAdd />បង្កើតប្រភេទអត្ថបទថ្មី</button>
          </div>

          <div className={`input-area mb-1 ${showInput ? 'active' : 'inactive'}`}>
            <div className="inputAndBtn">
              <input value={catName} onChange={(e) => setCatName(e.target.value)} className='input-cat' type="text" placeholder='ប្រភេទអត្ថបទ' />
              <button onClick={handleCreate} className='btn-create'>បង្កើត</button>
            </div>

            {((alertVisible && message) && !isLoading) && <p className='msg-text'><GiConfirmed /> {message}</p>}
            {err && <p className='error-text'><RiBallPenFill /> {err}</p>}
          </div>
        </>
      )}

      {isError ? <div>{error.message}</div> : isLoading ? <div>Loading...</div> : (
        <div className={`${isAdmin ? 'category-list' : ''}`}>
          <DashTableCategory data={data} />
        </div>
      )}

    </DashCategoryStyle>
  )
}