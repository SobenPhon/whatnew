import { baseURL } from '../../../config'
import { DashOverviewStyle } from './DashOverview.styled'
import { useFetch } from '../../../hook/useFetch'

import { HiClipboardList } from 'react-icons/hi'
import { MdCategory } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi'

import { useAuthContext } from '../../../hook/useAuthContext'
import useAuth from '../../../hook/useAuth'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../../hook/useLogout'
import { DashTable } from '../../../components/DashboardCom/DashTable/DashTable'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDashPostContext } from '../../../hook/useDashPostContext'

export const DashOverview = () => {
  const { user } = useAuthContext()
  const { isAdmin, isEditor } = useAuth()
  const [author, setAuthor] = useState("")
  const { postsCount, isLoading, error } = useFetch("", "", author, "")
  const { posts } = useDashPostContext()
  const navigate = useNavigate()
  const { logout } = useLogout()

  const getCategory = async () => {
    const response = await fetch(`${baseURL}/api/categories`)

    // catch server down
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    return response.json()
  }

  const { data: categoires, isLoading: isCatLoading, isError: isCatError } = useQuery({
    queryKey: ['cats'],
    queryFn: getCategory
  })

  const getUser = async () => {
    const response = await fetch(`${baseURL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })

    const json = await response.json()

    // catch server down
    if (!response.ok) {
      // console.log(json.error)
      if (json.error.message === 'jwt expired') {
        logout()
        navigate('/login')
        return null
      } else {
        throw new Error(json.error.message)
      }
    }
    return json
  }

  const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
    queryKey: ['users'],
    queryFn: getUser
  })

  useEffect(() => {
    if (!isAdmin && !isEditor) {
      users?.forEach(u => {
        if (u.username === user.username) {
          setAuthor(u.username)
        }
      })
    }
  }, [isAdmin, isEditor, user.username])

  return (
    <DashOverviewStyle>
      <div className="overview-main">
        <div className="top-widget-area">
          <div className="widget post-count">
            <HiClipboardList />
            <h3>អត្ថបទ</h3>
            {isLoading ? <p>Loading...</p> : <p className='count'>{postsCount}</p>}
          </div>
          <div className="widget category-count">
            <MdCategory />
            <h3>ប្រភេទអត្ថបទ</h3>
            {isCatLoading ? <p>Loading...</p> : <p className='count'>{categoires.length}</p>}
          </div>
          <div className="widget users-count">
            <HiUsers />
            <h3>អ្នកប្រើប្រាស់</h3>
            {isUserLoading ? <p>Loading...</p> : <p className='count'>{users?.length}</p>}
            {isUserError && <p className='count err'>{userError?.message}</p>}
          </div>
        </div>

        <div className="recent-post">
          <h2 className='widget-title'>អត្ថបទថ្មីៗ</h2>
          {isLoading ? <div className='loading'>Loading...</div> : <DashTable data={posts} hideAction={true} />}
          {error && <div className='error'>{error}</div>}
        </div>
      </div>

      <div className="overview-sidebar">
        <div className="widget active-user">
          <h2 className='widget-title'>អ្នកកំពុងប្រើប្រាស់</h2>
          {users?.map((u, index) => (
            <div key={index} className='user-list'>
              <p className='username'>{u.username}</p>
              <p className='user-role'>{u.role}</p>
              <img className='user-img' src={u.profile} alt={u.username} />
            </div>
          ))}
        </div>
      </div>
    </DashOverviewStyle>
  )
}
