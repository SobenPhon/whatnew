import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Navbar/Nav'

export const WithNavRoutes = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}
