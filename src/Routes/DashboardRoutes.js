import { Routes, Route, Navigate } from "react-router-dom"
import useAuth from "../hook/useAuth"
import Signup from "../pages/Signup/Signup"

import { DashContainer } from "../GlobalStyled"
import Dashboard from "../pages/Dashboard/Dashboard"
import { Add } from "../pages/Add/Add"
import { Edit } from "../pages/Edit/Edit"
import { DashCategory } from "../pages/Dashboard/DashCategory/DashCategory"
import { DashUser } from "../pages/Dashboard/DashUser/DashUser"
import { DashMedia } from "../pages/Dashboard/DashMedia/DashMedia"
import { DashPostList } from "../pages/Dashboard/DashPostList/DashPostList"
import { DashOverview } from "../pages/Dashboard/DashOverview/DashOverview"

export const DashboardRoutes = () => {
  const { isAdmin } = useAuth()

  return (
    <DashContainer>
      <Routes>
        <Route element={<Dashboard />}>
          <Route index element={<DashOverview />} />
          <Route path="post" element={<DashPostList />} />
          <Route path="media" element={<DashMedia />} />
          <Route path="category" element={<DashCategory />} />
          <Route path="user" element={<DashUser />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="add" element={<Add />} />
          <Route path="signup" element={isAdmin ? <Signup /> : <Navigate to='/dashboard' />} />
        </Route>
      </Routes>
    </DashContainer>
  )
}
