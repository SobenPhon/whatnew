import { Link } from 'react-router-dom'
import { AiOutlineClockCircle } from 'react-icons/ai'

import { ShowcaseStyled } from './ShowcaseStyled'
import { formatDistanceToNow } from 'date-fns'
import { Skeleton } from '../Skeleton/Skeleton'
import { useFetch } from '../../hook/useFetch'

export const Showcase = () => {
  const { posts, isLoading } = useFetch("search", '', '', '')

  const formatedDate = (postedDate) => {
    if (postedDate) {
      return formatDistanceToNow(new Date(postedDate), { addSuffix: true }).split('about')
    }
  }

  return (
    <ShowcaseStyled>
      {!isLoading ? (
        <div className="showcase">
          {posts && posts.slice(0, 5).map(post => (
            <Link to={`/posts/${(post.category[0].toLowerCase())}/${post._id}`} className="showcase-item" key={post._id}>
              <img src={post.image} alt={post.title} />
              <div className='showcase-desc'>
                <div className="categoires">
                  {post.category && post.category.map((cat, index) => (
                    <p key={index} className="showcase-category">{cat}</p>
                  ))}
                </div>
                <h1 className='showcase-title'>{post.title}</h1>
                <p className='showcase-date'><AiOutlineClockCircle /> {formatedDate(post.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : <Skeleton type='showcase' />}
    </ShowcaseStyled >
  )
}
