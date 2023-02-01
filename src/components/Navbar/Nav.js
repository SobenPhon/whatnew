import { useEffect, useState, useRef } from 'react'
import { baseURL } from '../../config'
import { NavLink, Link } from 'react-router-dom'
import { usePostContext } from '../../hook/usePostContext'
import { useAuthContext } from '../../hook/useAuthContext'

import { ImSearch } from 'react-icons/im'
import { GrFormClose } from 'react-icons/gr'
import { IoClose } from 'react-icons/io5'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import { FaBars } from 'react-icons/fa'

import siteLogo from '../../images/what-new-logo.png'
import { Navbar } from './NavStyled'

import { useThemeContext } from '../../hook/useThemeContext'
import { useFetch } from '../../hook/useFetch'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '../Skeleton/Skeleton'

export const Nav = () => {
  const { themeMode, toggleTheme } = useThemeContext()
  // const { error } = usePostContext()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])

  const navRef = useRef()
  const searchRef = useRef()

  const { user } = useAuthContext()

  const [query, setQuery] = useState("")

  const { posts } = useFetch("search", "", "", query)
  const navigate = useNavigate()
  const [active, setActive] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${baseURL}/api/categories`)
      const data = await response.json()

      if (response.ok) {
        setCategories(data)
        setIsLoading(false)
      }

      if (!response.ok) {
        setError("Something went wrong!")
        console.log('something went wrong!')
      }
    }
    fetchCategories()
  }, [])

  const handleMode = (e) => {
    e.preventDefault()
    toggleTheme()
  }

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav')
  }

  const showSearchBox = () => {
    setQuery('')
    searchRef.current.classList.toggle('showSearch')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query === "") {
      return
    }
    navigate(`/posts/results?q=${query}`)
    showSearchBox()
  }

  console.log(isLoading)

  return (
    <>
      <Navbar>
        <div className="nav-bar">
          <Link to='/' className="site-logo">
            <img onClick={() => {
              setActive(null)
            }} src={siteLogo} alt="site-logo" />
          </Link>

          <nav className="menu-list" ref={navRef} >
            {!isLoading ? (
              <>
                <Link onClick={() => {
                  setActive('ព័ត៌មាន')
                  showNavbar()
                }} to='/posts' className={`menu-item ${(active === 'ព័ត៌មាន') && 'active'}`}>ព័ត៌មាន</Link>

                {categories && categories.map(cat => (
                  <NavLink
                    onClick={() => {
                      setActive(cat)
                      showNavbar()
                    }}
                    className={`menu-item ${(active === cat) && 'active'}`}
                    key={cat._id}
                    to={`posts/${cat.catName}`}>
                    {cat.catName}
                  </NavLink>
                ))}
              </>
            ) : (
              <Skeleton type="nav" />
            )}

            <div className='action-btn'>
              <button className='btn-sub'>Subscribe</button>

              <button className='btn-darkMode' onClick={handleMode}>{themeMode === 'dark' ? <FaToggleOn /> : <FaToggleOff />}</button>
            </div>

            <button className='btn-close-nav' onClick={showNavbar}><GrFormClose /></button>
          </nav>

          <button className='search-icon' onClick={showSearchBox}>
            <ImSearch />
          </button>

          {user && (
            <div className="dashboard">
              <Link to='/dashboard' className='btn-dashboard'><MdSpaceDashboard preserveAspectRatio='none' /> Dashboard</Link>
            </div>
          )}

          {!user && (
            <Link to='/login' className='btn-login'>ចូលប្រើ</Link>
          )}

          <button className='btn-hambergur' onClick={showNavbar}><FaBars /></button>
        </div>

        <div className={`search-section`} ref={searchRef}>
          <div className="search-bar">
            <input
              type="text"
              placeholder='Search...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={handleSearch} className='btn-search'><ImSearch /></button>

            <button
              className='btn-close'
              onClick={showSearchBox}>
              <IoClose />
            </button>
          </div>

          {query && (
            <div className="search-result">
              {posts.map(p => (
                <Link onClick={showSearchBox} to={`/posts/${p.category[0]}/${p._id}`} className='search-item' key={p._id}>
                  <div className="result-content">
                    <h2 className='result-title'>{p.title}</h2>
                    <p className="result-date">{p.createdAt}</p>
                  </div>
                </Link>
              ))}
              {posts.length === 0 && <div className='no-result'>មិនមានអ្វីដែលអ្នកស្វែងរក!</div>}
            </div>
          )}
        </div>

      </Navbar >
    </>

  )
}
