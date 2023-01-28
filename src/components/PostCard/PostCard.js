import { PostCardStyle } from "./PostCardStyled"
import { formatDistanceToNow } from 'date-fns'
import { Link } from "react-router-dom"
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'
import { Markup } from 'interweave'

export const PostCard = ({ post, excerpt, author }) => {
  const formatedDate = () => {
    if (post.createdAt) {
      const formated = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }).split('about')
      return formated
    }
  }

  return (
    <PostCardStyle>
      <div className="post-card">
        <div className="post-content">
          <div className="categoires">
            {post.category.map((cat, index) => (
              <Link to={`/posts/${cat}`} key={index} className="post-category">{cat}</Link>
            ))}
          </div>
          <h1 className="post-title">
            <Link to={`/posts/${(post.category[0].toLowerCase())}/${post._id}`}>
              {post.title}
            </Link>
          </h1>

          {excerpt && (
            <Markup className='post-excerpt' content={(post.description).substring(0, 140) + ' ...'} />
          )}

          <div className="post-meta">
            {author && (
              <Link to={`/author/${post.author.toLowerCase()}`}>
                <span className="post-author"><BsPersonCircle /> {post.author}</span>
              </Link>
            )}

            <p className="post-date"><AiOutlineClockCircle /> {formatedDate()}</p>
          </div>
        </div>

        <Link to={`/posts/${(post.category[0].toLowerCase())}/${post._id}`}>
          <img
            className="post-img"
            src={post.image}
            alt={post.title}
            loading='lazy' />
        </Link>
      </div>
    </PostCardStyle>
  )
}
