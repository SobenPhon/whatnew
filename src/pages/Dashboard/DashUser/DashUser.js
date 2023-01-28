import { DashUserStyle } from './DashUser.styled'
import { Link } from 'react-router-dom'
import { RiUserAddLine } from 'react-icons/ri'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hook/useAuth'
import { useAuthContext } from '../../../hook/useAuthContext'
import { DashTableUser } from '../../../components/DashboardCom/DashTable/DashTableUser'
import { baseURL } from '../../../config'

export const DashUser = () => {
  const { user } = useAuthContext()
  const { isAdmin } = useAuth()

  const getUser = async () => {
    const response = await fetch(`${baseURL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })

    // catch server down
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    return response.json()
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUser
  })

  return (
    <DashUserStyle>
      {isAdmin && (
        <div className="action-menu">
          <Link to='/dashboard/signup' className="btn-add icon-align"><RiUserAddLine />បង្កើតអ្នកប្រើប្រាស់ថ្មី</Link>
        </div>
      )}

      <div className="user-list">
        {isError ? <div>{error.message}</div> : isLoading ? <div>Loading...</div> : (
          <div className="category-list">
            <DashTableUser data={data} />
          </div>
        )}
      </div>
    </DashUserStyle>
  )
}
