import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()

  const signup = async (firstName, lastName, username, email, password, role, profile) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseURL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ firstName, lastName, username, email, password, role, profile })
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      // save the user to local storage or session
      // localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      // dispatch({ type: 'LOGIN', payload: json })
      navigate('/dashboard/user')

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
