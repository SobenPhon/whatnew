import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import useAuth from './useAuth'
import { baseURL } from '../config'

// add type params (type) post, user, or category
export const useFetchAsset = (url, type) => {
  const { user } = useAuthContext()
  const { isAdmin, isEditor } = useAuth()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = () => {
      fetch(`${baseURL}${url}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }, { signal })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then(data => {
          setData(data)
          setLoading(false)
        })
        .catch(err => {
          if (err.name === 'AbortError') {
          } else {
            console.log(err)
            setError(err.message)
          }
        })
    }
    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, type, isAdmin, isEditor, user.token, user.username])

  return {
    data, isLoading, error
  }
}
