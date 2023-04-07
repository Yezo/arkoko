import { MainContainer } from "../Layout/MainContainer"
import { Banner } from "./Banner/Banner"
import { Changelog } from "./Changelog/Changelog"
import { Introduction } from "./Introduction/Introduction"

export const Home = () => {
  return (
    <MainContainer>
      <div className="flex flex-col gap-8 md:flex-row-reverse">
        <Banner
          imageURL="https://www.playlostark.com/en-us/news/articles/the-art-of-war-release-notes"
          path="/artofwar.jpg"
          description="Artist - Art of War Patch"
        />
        <Introduction />
      </div>

      <Changelog />
    </MainContainer>
  )
}
