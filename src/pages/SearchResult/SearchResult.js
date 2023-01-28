import { PostCard } from '../../components/PostCard/PostCard'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { Container } from '../../GlobalStyled'
import { useFetch } from '../../hook/useFetch'
import { useSearchParams } from 'react-router-dom'
import { SearchResultStyle } from './SearchResult.styled'

export const SearchResult = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q')

  const { posts, isLoading, page, setPage, limit } = useFetch("search", "", "", q)

  const handleClick = () => {
    setPage(pre => pre + 1)
  }

  return (
    <Container>
      <SearchResultStyle>
        {isLoading ? (
          <>
            <h1 className="main-heading">លទ្ធផល៖​ {q}</h1>
            <div className='post-list'>
              <Skeleton type="feed" />
            </div>
          </>
        ) : (
          <>
            <h1 className="main-heading">លទ្ធផល៖​ {q}</h1>
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

        {(page <= (posts.length / limit)) &&
          <div className='load-more' onClick={handleClick}>បង្ហាញទៀត</div>}
      </SearchResultStyle >
    </Container>
  )
}
