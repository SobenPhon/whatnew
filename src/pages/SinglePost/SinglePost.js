import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

import { useAuthContext } from '../../hook/useAuthContext'

import { Container } from '../../GlobalStyled'
import { SinglePostStyle } from './SinglePostStyled'
import { Flexbox } from '../../GlobalStyled'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { format } from 'date-fns'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { TbEdit } from 'react-icons/tb'

import { Markup } from 'interweave'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { Modal } from '../../components/ModalComp/Modal'
import { baseURL } from '../../config'

export const SinglePost = () => {
  const { user } = useAuthContext()
  const { id, category } = useParams()
  const [post, setPost] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const controller = new AbortController()
    const signal = controller.signal

    const fetchPost = async () => {
      fetch(`${baseURL}/api/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      }, { signal })
        .then(res => {
          if (!res.ok) {
            console.log(res)
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then(data => {
          if (data.category.includes(category.toLocaleLowerCase())) {
            setPost(data)
            setLoading(false)
            setError(null)
          } else {
            navigate('/404')
          }
        })
        .catch(err => {
          if (err.name === 'AbortError') {
          } else {
            setError(err.message)
          }
        })
    }
    fetchPost()

    return () => {
      controller.abort()
    }
  }, [id, category, navigate, user])

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const formatedDate = () => {
    if (post.createdAt) {
      return format(new Date(post.createdAt), `dd MMM yyyy h:m aaa`)
    }
  }

  return (
    <Container>
      <article className='single-post'>
        {error && <div className='error'>{error}</div>}
        <Flexbox>
          <>
            {isLoading ? (
              <div className='flex-item'>
                <Skeleton type='single' />
              </div>
            ) : (
              <SinglePostStyle className='flex-item'>

                <div className="categoires">
                  {post.category && post.category.map((cat, index) => (
                    <Link to={`/posts/${cat}`} key={index} className="post-category">{cat}</Link>
                  ))}
                </div>

                <h1 className='post-title'>{post.title}</h1>

                <div className="single-info">
                  <div className="single-meta">
                    <p className="post-author">ដោយ៖ {post.author} . {formatedDate()}</p>
                  </div>

                  {user && (
                    <div className="single-action btn-group">
                      <Link to={`/dashboard/edit/${post._id}`} className="btnEdit"><TbEdit /> Edit</Link>

                      <span
                        onClick={handleShow}
                        className="btnDelete">
                        <MdOutlineDeleteOutline /> Delete
                      </span>
                    </div>
                  )}
                </div>

                <img className={`post-image skeleton ${imgLoaded ? 'imgLoaded' : 'imgLoading'}`} src={post.image} alt={post.title} onLoad={() => setImgLoaded(true)} />

                <Markup className='post-description' content={post.description} />

                {show &&
                  <Modal
                    title="អត្ថបទ"
                    item={post?.title.slice(0, 10) + '...'}
                    handleClose={handleClose}
                    data_id={post?._id}
                    url='/api/posts/'
                    toDelete='post'
                  />}
              </SinglePostStyle>
            )}
            <Sidebar className='flex-item' />
          </>
        </Flexbox>
      </article >
    </Container>
  )
}
