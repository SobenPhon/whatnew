import {
  createContext,
  useReducer
} from 'react'

export const DashPostContext = createContext()

// useReducer function
export const dashPostsReducer = (state, action) => {
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

export const DashPostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashPostsReducer, { posts: [] })

  return (
    <DashPostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DashPostContext.Provider>
  )
}