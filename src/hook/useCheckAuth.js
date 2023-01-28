import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

export const useCheckAuth = (postId) => {
  const { user } = useAuthContext()
  const [visible, setVisible] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`/api/checkauth/${postId}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setVisible(false)
        setError(data.error)
      }

      if (response.ok) {
        setVisible(true)
        setError(null)
      }
    }
    user && checkAuth()
  }, [user])

  return {
    visible, error
  }
}
