import { Link } from 'react-router-dom'
import { useDashPostContext } from '../../../hook/useDashPostContext'
import { format } from 'date-fns'
import { useAuthContext } from '../../../hook/useAuthContext'
import useAuth from '../../../hook/useAuth'

import { DashPostListStyle } from './DashPostList.styled'
import { MdOutlinePostAdd } from 'react-icons/md'
import { DashTable } from '../../../components/DashboardCom/DashTable/DashTable'
import { useState } from 'react'
import { useEffect } from 'react'
import { DashPagination } from '../../../components/DashboardCom/DashPagination/DashPagination'
import { useFetch } from '../../../hook/useFetch'
import { useFetchAsset } from '../../../hook/useFetchAsset'
import { baseURL } from '../../../config'

export const DashPostList = () => {
  const { user } = useAuthContext()
  const { isAdmin, isEditor } = useAuth()
  const [cat, setCat] = useState("")
  const [author, setAuthor] = useState("")
  const [query, setQuery] = useState("")
  const { error, page, setPage, limit, postsCount, prePage, nextPage, isLoading } = useFetch("search", cat, author, query)
  const { posts } = useDashPostContext()

  const { data: users, error: usersError, isLoading: usersIsLoading } = useFetchAsset(`/api/users/view`, 'users')
  const { data: categories, error: catsError, isLoading: catsIsLoading } = useFetchAsset(`/api/categories`)

  const { data: dateData, isLoading: dateIsLoading, error: dateError } = useFetchAsset(`/api/posts?page=&limit=&q=`)

  const formatedDate = (date) => {
    if (date) {
      return format(new Date(date), `MMM yyyy`)
    }
  }

  let monthAndYear = []
  const date = dateData.results

  if (date) {
    const allDate = date.map(d => formatedDate(d.createdAt))
    allDate.forEach((item, i, { [i - 1]: prev, [i + 1]: next }) => {
      if (item !== prev) {
        monthAndYear.push(item)
      }
    })
  }

  useEffect(() => {
    if (sessionStorage.getItem('page') !== null) {
      setPage(JSON.parse(sessionStorage.getItem('page')))
    }

    if (!isAdmin && !isEditor) {
      users.forEach(u => {
        if (u.username === user.username) {
          setAuthor(u.username)
        }
      })
    }
  }, [users, isAdmin, isEditor, setPage, user.username])

  return (
    <DashPostListStyle>
      <div className="action-menu">
        <Link to='/dashboard/add' className="btn-add icon-align"><MdOutlinePostAdd />បន្ថែមអត្ថបទថ្មី</Link>
      </div>

      <div className="menu-bar mb-1">
        <input
          onChange={(e) => {
            // let search begin from first record
            setPage(1)
            setCat("")
            setAuthor("")
            setQuery(e.target.value)
          }}
          type="text"
          className='search-box'
          placeholder='ស្វែងរក...' />

        <div className="filter-bar">
          {!usersIsLoading ? (
            <select value={author} className='filter-select' onChange={e => {
              setAuthor(e.target.value)
            }}>
              {users.length !== 1 && <option value=''>User ទាំងអស់</option>}
              {
                users && users.map(user => (
                  <option
                    key={user._id}
                    value={user.username}
                  >
                    {user.username}
                  </option>
                ))
              }
            </select>
          ) : <div className='filter-loading'>Loading...</div>}

          {!catsIsLoading ? (
            <select value={cat} className='filter-select' onChange={e => {
              setCat(e.target.value)
            }}>
              <option value=''>ប្រភេទទាំងអស់</option>
              {
                categories && categories.map(cat => (
                  <option
                    key={cat._id}
                    value={cat.catName}
                  >
                    {cat.catName}
                  </option>
                ))
              }
            </select>
          ) : <div className='filter-loading'>Loading...</div>}
        </div>
      </div>

      {isLoading ? <div className='loading'>Loading...</div> : <DashTable data={posts} />}
      {error && <div className='error'>{error}</div>}

      {!isLoading && (
        <DashPagination
          isLoading={isLoading}
          limit={limit}
          postsCount={postsCount}
          nextPage={nextPage}
          prePage={prePage}
          page={page}
          setPage={setPage} />
      )}

    </DashPostListStyle>
  )
}
