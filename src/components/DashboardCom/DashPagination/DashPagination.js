import { DashPaginationStyle } from "./DashPagination.styled"
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5'

export const DashPagination = ({ isLoading, limit, nextPage, prePage, page, setPage, postsCount }) => {

  const handleNext = () => {
    setPage(pre => pre + 1)
    sessionStorage.setItem('page', JSON.stringify(page + 1))
  }

  const handlePrevious = () => {
    if (page >= 1) {
      setPage(pre => pre - 1)
      sessionStorage.setItem('page', JSON.stringify(page - 1))
    } else {
      console.log('page < 1')
    }
  }

  return (
    <DashPaginationStyle>
      {postsCount && (
        <>
          <p className="total">សរុប៖ {postsCount}</p>

          {(prePage !== null) && (
            <button className="btn-previous" disabled={(prePage === null) || isLoading} onClick={handlePrevious}><IoChevronBackSharp /></button>
          )}

          <p className="posts-count">{page} / {Math.ceil(postsCount / limit)}</p>

          <button className="btn-next" disabled={(nextPage === null) || isLoading} onClick={handleNext}><IoChevronForwardSharp /></button>
        </>
      )}
    </DashPaginationStyle >
  )
}
