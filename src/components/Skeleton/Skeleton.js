import {
  SkeletonStyle,
  SinglePostSkStyle,
  SignupSkStyle,
  ShowcaseSkStyle
} from "./Skeleton.styled"

export const Skeleton = ({ type }) => {
  const COUNTER = 10

  const FeedSkeleton = () => (
    <SkeletonStyle className="postSk">
      <div className="postImgSk"></div>

      <div className="postContentSk">
        <div className="postCatSk"></div>
        <div className="postTitleSk"></div>
        <div className="postExcSk"></div>
        <div className="postMetaSk">
          <p className="postAuthorSk"></p>
          <p className="postDateSk"></p>
        </div>
      </div>
    </SkeletonStyle>
  )

  const SinglePostSkeleton = () => (
    <SinglePostSkStyle>
      <div className="singleCatSk"></div>
      <div className="singleTitleSk"></div>
      <div className="singleDateSk"></div>
      <div className="singleImgSk"></div>
      <div className="singleContent1Sk"></div>
      <div className="singleContent2Sk"></div>
    </SinglePostSkStyle>
  )

  const SignupSkeleton = () => (
    <SignupSkStyle>
      <div className="titleSk"></div>
      <div className="nameSk">
        <div className="firstnameSk"></div>
        <div className="lastnameSk"></div>
      </div>
      <div className="usernameSk"></div>
      <div className="emailSk"></div>
      <div className="passwordSk"></div>
      <div className="roleSk"></div>
      <div className="imgUploadSk"></div>
      <div className="btnSk">
        <div className="btnSubmitSk"></div>
      </div>
    </SignupSkStyle>
  )

  const ShowcaseSkeleton = () => (
    <ShowcaseSkStyle>
      <div className="showcase-item-sk"></div>
      <div className="showcase-item-sk"></div>
      <div className="showcase-item-sk"></div>
      <div className="showcase-item-sk"></div>
      <div className="showcase-item-sk"></div>
    </ShowcaseSkStyle>
  )

  // if (type === 'feed') return Array(COUNTER).fill(<FeedSkeleton />)
  if (type === 'feed') return Array.from(Array(COUNTER), (_, index) => <FeedSkeleton key={index} />)

  if (type === 'single') return <SinglePostSkeleton />

  if (type === 'signup') return <SignupSkeleton />

  if (type === 'showcase') return <ShowcaseSkeleton />
}
