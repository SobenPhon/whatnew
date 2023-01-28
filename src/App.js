// import { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { useAuthContext } from './hook/useAuthContext'

import { GlobalStyled } from './GlobalStyled'
import { ThemeProvider } from 'styled-components'
import { theme, lightTheme, darkTheme } from './Theme'
import { useThemeContext } from './hook/useThemeContext'

import { Home } from "./pages/Home/Home";
import { PostList } from './pages/PostList/PostList';
import { PostListByCat } from "./pages/PostListByCat/PostListByCat";
import { PostListByAuthor } from "./pages/PostListByAuthor/PostListByAuthor";
import { SinglePost } from './pages/SinglePost/SinglePost';
import { Add } from './pages/Add/Add';
import { Edit } from "./pages/Edit/Edit";
import { NotFound404 } from './components/NotFound404/NotFound404';
import Login from './pages/Login/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { DashboardRoutes } from './Routes/DashboardRoutes'
import { WithoutNavRoutes } from './Routes/WithoutNavRoutes'
import { WithNavRoutes } from './Routes/WithNavRoutes'
import { SearchResult } from './pages/SearchResult/SearchResult'

function App() {
  const { themeMode } = useThemeContext()
  const { user } = useAuthContext()
  // const { isAdmin } = useAuth()
  // localStorage.removeItem('user')

  return (
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <GlobalStyled />

        <BrowserRouter>
          <Routes>
            <Route element={<WithoutNavRoutes />}>
              {/* <Route element={<ProtectedRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route> */}
              <Route path="/login" element={<Login />} />

              <Route path='/dashboard/*' element={user ? <DashboardRoutes /> : <Navigate to='/login' />} />
              <Route path="/add" element={user ? <Add /> : <Navigate to='/' />} />
              <Route path="/edit/:id" element={user ? <Edit /> : <Navigate to='/' />} />
            </Route>

            <Route element={<WithNavRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/author/:author" element={<PostListByAuthor />} />
              <Route path='/posts'>
                <Route index element={<PostList />} />
                <Route path=":category" element={<PostListByCat />}
                />
                <Route path=":category/:id" element={<SinglePost />} />
                <Route path="results" element={<SearchResult />} />
              </Route>
              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeProvider >
  );
}

export default App;
