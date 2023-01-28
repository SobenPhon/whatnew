import React from 'react'
import { PostCard } from '../PostCard/PostCard'
import { SidebarStyle, Widget } from './SidebarStyled'
import { usePostContext } from '../../hook/usePostContext'
import { useParams } from 'react-router-dom'

export const Sidebar = () => {
  const { posts, isLoading } = usePostContext()
  const { id } = useParams()

  return (
    <SidebarStyle>
      {isLoading && <div className='loading'>Loading...</div>}
      {!isLoading && (
        <Widget className='latest-post'>
          <h2 className="sidebar-title">ព័ត៌មានថ្មីៗ</h2>
          <div className='post-list'>
            {posts && posts.filter(p => p._id != id).slice(0, 4).map(post => (
              <PostCard
                className="post-card"
                key={post._id}
                post={post}
                showAction={false}
              />
            ))}
          </div>
        </Widget>
      )}

    </SidebarStyle>
  )
}
