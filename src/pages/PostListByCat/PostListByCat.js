import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../../config'

import { PostListStyle } from '../PostList/PostListStyled'
import { PostCard } from '../../components/PostCard/PostCard'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Container } from '../../GlobalStyled'
import { Skeleton } from '../../components/Skeleton/Skeleton'

export const PostListByCat = () => {
  const [postsByCat, setPostsByCat] = useState([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const { category } = useParams()

  useEffect(() => {
    setIsLoading(true)
    const controller = new AbortController()
    const signal = controller.signal
    let isCanceled = false
    let localCategory

    if (localStorage.getItem('category') !== '') {
      localCategory = JSON.parse(localStorage.getItem('category'))
    }

    if (localCategory !== category) {
      setPage(1)
    }

    const fetchPostByCat = () => {
      fetch(`${baseURL}/api/posts?cat=${category}&page=${page}&limit=${limit}&q=`, { signal })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then(data => {
          if (!isCanceled) {
            if (localCategory === category) {
              setPostsByCat(pre => [...pre, ...data.results])
            } else {
              setPostsByCat(data.results)
            }
            setIsLoading(false)
            localStorage.setItem('category', JSON.stringify(category))
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

  }, [category, page, limit])

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

        {!isLoading && postsByCat.length > 0 && (
          <>
            <h1 className="main-heading">{category && `${category}`}</h1>
            <div className="post-list">
              {postsByCat && postsByCat.map((post, index) => (
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

        {(!isLoading && postsByCat.length < 1) && <div className='info'><AiOutlineInfoCircle /> មិនមានអត្ថបទនៅឡើយទេ</div>}

        {
          ((page <= (postsByCat.length / limit)) && !isLoading) &&
          <div className='load-more' onClick={handleClick}>បង្ហាញទៀត</div>
        }
      </PostListStyle >
    </Container>
  )
}
