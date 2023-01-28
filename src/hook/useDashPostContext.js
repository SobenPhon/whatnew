import { useContext } from 'react'
import { DashPostContext } from '../context/DashPostContext'

export const useDashPostContext = () => {
  const context = useContext(DashPostContext)

  if (!context) {
    throw Error('Context must use inside DashPostContextProvider!')
  }

  return context
}