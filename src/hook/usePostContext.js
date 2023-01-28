import { useContext } from 'react'
import { PostContext } from '../context/PostContext'

export const usePostContext = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw Error('Context must use inside PostContextProvider!')
  }

  return context
}