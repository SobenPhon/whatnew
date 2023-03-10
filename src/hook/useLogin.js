import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom"
import { baseURL } from "../config"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [message, setMessage] = useState('')
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseURL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
      setMessage('Login sucessfully')
      navigate('/dashboard')
    }
  }

  return { login, isLoading, error, message }
}