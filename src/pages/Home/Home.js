import { Showcase } from "../../components/Showcase/Showcase"
import { PostList } from "../PostList/PostList"
import { HomeStyled } from "./HomeStyled"
import { Container } from "../../GlobalStyled"

export const Home = () => {

  return (
    <Container>
      <HomeStyled className="home">
        <Showcase />
        <PostList />
      </HomeStyled>
    </Container>
  )
}
