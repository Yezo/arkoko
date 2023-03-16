import { Banner } from "./Banner/Banner"
import { Changelog } from "./Changelog/Changelog"
import { Introduction } from "./Introduction/Introduction"

export const Home = () => {
  return (
    <main className="w-full overflow-y-hidden bg-primary pt-5 font-primary text-sm">
      <div className="mx-auto max-w-5xl rounded p-4">
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <Banner
            imageURL="https://www.playlostark.com/en-us/news/articles/the-art-of-war-release-notes"
            path="/artofwar.jpg"
            description="Artist - Art of War Patch"
          />
          <Introduction />
        </div>

        <Changelog />
      </div>
    </main>
  )
}
