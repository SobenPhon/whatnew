import { useState } from "react"
import { useAuthContext } from "../../../hook/useAuthContext"
import { useThemeContext } from "../../../hook/useThemeContext"
import { useLogout } from "../../../hook/useLogout"
import { Link } from "react-router-dom"

import sitelogo from '../../../images/what-new-logo.png'
import { DashTopbarStyle } from "./DashTopbar.styled"
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import { TbExternalLink } from 'react-icons/tb'

export const DashTopbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const { themeMode, toggleTheme } = useThemeContext()
  const [hover, setHover] = useState(false)

  const handleMode = (e) => {
    e.preventDefault()
    toggleTheme()
  }

  const handleLogout = () => {
    logout()
  }

  const onHover = () => {
    setHover(true)
  }

  const onLeave = () => {
    setHover(false)
  }

  return (
    <DashTopbarStyle>
      <div className="left-menu">
        <Link to='/dashboard' className="site-logo">
          <img src={sitelogo} alt="what-new-logo" />
        </Link>
        <Link to='/' className="visit-site"><TbExternalLink /> ទៅវេបសាយ</Link>
      </div>

      <div className="center-menu">
        ផ្ទាំងគ្រប់គ្រង
      </div>

      <div className="right-menu">
        <div className='action-btn'>
          <button className='btn-darkMode' onClick={handleMode}>{themeMode === 'dark' ? <FaToggleOn /> : <FaToggleOff />}</button>
        </div>

        {user && (
          <div className="user-login">
            {/* {!hover && <p className='username'>Hi, {user?.username}</p>} */}
            <p className='username'>សួស្ដី, {user?.username}</p>
            <img
              className='user-profile'
              src={user?.profile} alt="user-profile"
              onMouseEnter={onHover}
              onMouseLeave={onLeave} />
            <button
              className="user-logout"
              onClick={handleLogout}><BiLogOutCircle /> ចាកចេញ</button>
          </div>
        )}
      </div>
    </DashTopbarStyle>
  )
}
