import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { PostListStyle } from '../PostList/PostListStyled'
import { PostCard } from '../../components/PostCard/PostCard'

import { NotFound404 } from '../../components/NotFound404/NotFound404'
import { Container } from '../../GlobalStyled'
import { Skeleton } from '../../components/Skeleton/Skeleton'

export const PostListByAuthor = () => {
  const [postsByAuthor, setPostsByAuthor] = useState([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const { author } = useParams()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let isCanceled = false
    let localAuthor

    if (localStorage.getItem('author')) {
      localAuthor = JSON.parse(localStorage.getItem('author'))
    }

    if (localAuthor !== author) {
      setPage(1)
    }

    const fetchPostByCat = () => {
      fetch(`/api/posts?author=${author}&page=${page}&limit=${limit}`, { signal })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then(data => {
          if (!isCanceled) {
            if (localAuthor === author) {
              setPostsByAuthor(pre => [...pre, ...data.results])
            } else {
              setPostsByAuthor(data.results)
            }
            setIsLoading(false)
            localStorage.setItem('author', JSON.stringify(author))
          }
        })
        .catch(err => {
          if (err.name === 'AbortError') {
          } else {
            console.log(err)
          }
        })
    }
    fetchPostByCat()

    return () => {
      // run before useEffect after it finish useEffect will run
      controller.abort()
      isCanceled = true
    }

  }, [author, page])

  const handleClick = () => {
    setPage(pre => pre + 1)
  }

  return (
    <Container>
      <PostListStyle>
        {isLoading && (
          <div className='post-list'>
            <Skeleton type="feed" />
          </div>
        )}

        {!isLoading && postsByAuthor.length > 0 && (
          <>
            <h1 className="main-heading">Author: {author && `${author}`}</h1>
            <div className="post-list">
              {postsByAuthor && postsByAuthor.map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                  excerpt={true}
                  author={true}
                  showAction={true}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && postsByAuthor.length < 1 && <NotFound404 />}

        {
          page <= (postsByAuthor.length / limit) &&
          <div className='load-more' onClick={handleClick}>បង្ហាញទៀត</div>
        }
      </PostListStyle >
    </Container>
  )
}
