import { useState, useEffect } from 'react'
import {
  createContext
} from 'react'

export const ThemeContext = createContext(null)

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light')

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setThemeMode(localStorage.getItem('theme'))
    } else {
      console.log('No theme localstorage!')
    }
  }, [])

  const toggleTheme = () => {
    setThemeMode(curr => {
      if (curr === 'light') {
        localStorage.setItem('theme', 'dark')
        return 'dark'
      } else {
        localStorage.setItem('theme', 'light')
        return 'light'
      }
    })
  }

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}