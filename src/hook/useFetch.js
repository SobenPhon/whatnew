import { useState, useEffect } from 'react'
import { useDashPostContext } from './useDashPostContext'
import { baseURL } from '../config'

export const useFetch = (opt, cat, author, q) => {
  const { dispatch } = useDashPostContext()
  const [posts, setPosts] = useState([])
  const [postsCount, setPostsCount] = useState(0)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [nextPage, setNextPage] = useState('')
  const [prePage, setPrePage] = useState('')

  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchPosts = () => {
      fetch(`${baseURL}/api/posts?page=${page}&limit=${limit}&cat=${cat}&author=${author}&q=${q}`, { signal })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then(data => {
          data.next ? setNextPage(data.next.page) : setNextPage(null)
          data.previous ? setPrePage(data.previous.page) : setPrePage(null)
          setPostsCount(data.total)

          switch (opt) {
            case 'search':
              setPosts(data.results)
              data.results && dispatch({ type: 'GET_POSTS', payload: [...data.results] })
              break
            default:
              data.results && setPosts(pre => [...pre, ...data.results])
              data.results && dispatch({ type: 'GET_POSTS', payload: [...posts, ...data.results] })
              break
          }
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
    fetchPosts()

    return () => {
      controller.abort()
    }
  }, [dispatch, page, limit, cat, author, q, opt])

  useEffect(() => {

  }, [posts])

  return {
    posts, error, isLoading, postsCount, page, setPage, limit, setLimit, nextPage, prePage
  }
}
