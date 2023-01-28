import {
  createContext,
  useReducer,
  useEffect,
  useState
} from 'react'
import { baseURL } from '../config'

export const PostContext = createContext()

// useReducer function
export const postsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        posts: action.payload
      }
    case 'CREATE_POSTS':
      return {
        posts: [action.payload, ...state.posts]
        // when use like this, when new post added it will not stay at top
        // it will stay at bottom until page refresh (load all from db)
        // posts: [...state.posts, action.payload]
      }
    case 'UPDATE_POST':
      const updatePost = action.payload
      const updatePosts = state.posts.map(post => {
        if (post._id === updatePost._id) {
          return updatePost
        }
        return post
      })

      return {
        posts: updatePosts
      }
    case 'DELETE_POSTS':
      return {
        posts: state.posts.filter(post => post._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const PostContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [state, dispatch] = useReducer(postsReducer, { posts: [] })

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [q, setQ] = useState("")

  const [postsCount, setPostsCount] = useState(0)

  const [nextPage, setNextPage] = useState('')
  const [prePage, setPrePage] = useState('')

  const [operation, setOperation] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchPosts = (opt) => {
      switch (opt) {
        case 'search':
          console.log('Search operation ran')
          fetch(`${baseURL}/api/posts?page=${page}&limit=${limit}&q=${q}`, { signal })
            .then(res => {
              if (!res.ok) {
                throw Error('could not fetch the data for that resource')
              }
              return res.json()
            })
            .then(data => {
              data.next && setNextPage(data.next.page)
              data.previous && setPrePage(data.previous.page)
              // TODO when search we don't need to show old data
              // dispatch({ type: 'GET_POSTS', payload: [...state.posts, ...data.results] })
              dispatch({ type: 'GET_POSTS', payload: [...data.results] })
              setLoading(false)
            })
            .catch(err => {
              if (err.name === 'AbortError') {
              } else {
                console.log(err)
                setError(err.message)
              }
            })
          break
        case 'allposts':
          console.log('allposts opt ran!')
          fetch(`${baseURL}/api/posts?page=${page}&limit=${limit}&q=${q}`, { signal })
            .then(res => {
              if (!res.ok) {
                throw Error('could not fetch the data for that resource')
              }
              return res.json()
            })
            .then(data => {
              // console.log(data)
              data.next && setNextPage(data.next.page)
              data.previous && setPrePage(data.previous.page)
              setPostsCount(data.posts)
              dispatch({ type: 'GET_POSTS', payload: [...data.results] })
              setLoading(false)
            })
            .catch(err => {
              if (err.name === 'AbortError') {
              } else {
                console.log(err)
                setError(err.message)
              }
            })
          break
        default:
          fetch(`${baseURL}/api/posts?page=${page}&limit=${limit}&q=`, { signal })
            .then(res => {
              if (!res.ok) {
                throw Error('could not fetch the data for that resource')
              }
              return res.json()
            })
            .then(data => {
              data.next && setNextPage(data.next.page)
              data.previous && setPrePage(data.previous.page)
              // TODO when search we don't need to show old data
              dispatch({ type: 'GET_POSTS', payload: [...state.posts, ...data.results] })
              setLoading(false)
            })
            .catch(err => {
              if (err.name === 'AbortError') {
              } else {
                console.log(err)
                setError(err.message)
              }
            })
          break
      }
    }
    fetchPosts(operation)

    return () => {
      controller.abort()
    }
  }, [dispatch, page, limit, q, operation])

  // console.log('PostContext State', state)

  return (
    <PostContext.Provider value={{
      ...state,
      dispatch,
      isLoading,
      error,
      page,
      setPage,
      limit,
      setLimit,
      q,
      setQ,
      nextPage,
      prePage,
      setPrePage,
      postsCount
    }}>
      {children}
    </PostContext.Provider>
  )
}