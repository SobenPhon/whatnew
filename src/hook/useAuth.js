import { useAuthContext } from './useAuthContext'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const { user } = useAuthContext()
  let userId
  let isAdmin = false
  let isEditor = false
  let status = 'author'

  const ROLE = {
    ADMIN: 'administrator',
    EDITOR: 'editor',
    AUTHOR: 'author'
  }

  if (user?.token) {
    const decoded = jwtDecode(user.token)
    const { role, _id } = decoded.UserInfo

    isAdmin = (role.toLowerCase() === ROLE.ADMIN)
    isEditor = (role.toLowerCase() === ROLE.EDITOR)

    if (isAdmin) status = ROLE.ADMIN
    if (isEditor) status = ROLE.EDITOR

    userId = _id

    return {
      userId, role, status, isAdmin, isEditor
    }
  }

  return {
    role: '', isAdmin, isEditor, status, userId
  }
}

export default useAuth
