import { PostListStyle } from './PostListStyled'
import { PostCard } from '../../components/PostCard/PostCard'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { Container } from '../../GlobalStyled'
import { useFetch } from '../../hook/useFetch'
import { useDashPostContext } from '../../hook/useDashPostContext'

export const PostList = () => {
  const { isLoading, setPage, nextPage } = useFetch("", "", "", "")
  const { posts } = useDashPostContext()

  const handleShowMore = () => {
    setPage(pre => pre + 1)
  }

  return (
    <Container>
      <PostListStyle>
        {isLoading ? (
          <>
            <h1 className="main-heading">ព័ត៌មានថ្មីៗ</h1>
            <div className='post-list'>
              <Skeleton type="feed" />
            </div>
          </>
        ) : (
          <>
            <h1 className="main-heading">ព័ត៌មានថ្មីៗ</h1>
            <div className="post-list">
              {posts && posts.map((post, index) => (
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

        {(nextPage !== null) &&
          <div className='load-more' onClick={handleShowMore}>បង្ហាញទៀត</div>}
      </PostListStyle >
    </Container>
  )
}
