import { Link } from "react-router-dom"
import { Changelog } from "./Changelog/Changelog"
import { Introduction } from "./Introduction/Introduction"

export const Home = () => {
  return (
    <main className="w-full overflow-y-hidden bg-primary pt-5 font-primary text-sm">
      <div className="mx-auto max-w-5xl rounded  p-4">
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <a
            href="https://www.playlostark.com/en-us/news/articles/first-anniversary-celebration-release-notes"
            target="_blank"
            className="basis-9/12"
          >
            <img
              src="https://pbs.twimg.com/media/FoYSKhpaUAAFrnz?format=jpg&name=orig"
              alt="1st Year Anniversary Celebration"
              className="aspect-video h-full select-none rounded-xl  object-cover shadow-md ring-1 ring-black/[.15]"
            />
          </a>

          <section className="flex flex-col gap-3 divide-y divide-text/10 rounded-lg bg-secondary p-5 shadow-md ring-1 ring-black/[.15] ">
            <h3 className="border-l-4 border-accent px-2 font-secondary text-lg font-bold">
              Lai-lai!
            </h3>
            <div className="grid h-full max-w-[50ch] place-items-center space-y-4 pt-3 leading-7">
              <p>
                Arkoko is a repository of guides, tools, and resources to assist new and veteran
                players navigate through the world of Arkesia. Spend more time on the game while we
                do the heavy-lifting on the side for you.
              </p>
              <p>
                This fansite is maintained by a single developer but rest assured, there are many
                more features coming soon!
              </p>
            </div>
          </section>
        </div>

        <section className="mt-4 flex flex-col gap-3 divide-y divide-text/10 rounded-lg bg-secondary p-5 shadow-md ring-1 ring-black/[.15] ">
          <h3 className="border-l-4 border-accent px-2 font-secondary text-lg font-bold">
            Changelog
          </h3>

          <article className="space-y-4 py-4">
            <h4 className="text-[0.95rem] font-bold tracking-tight">March 8th, 2023</h4>
            <ul className="list-disc space-y-3 pl-4 text-sm marker:text-accent">
              <ChangeLogListItem
                title={"Updated the <Raid Bid Calculator> with new functionality"}
                type={"Update"}
              />
            </ul>
          </article>

          <article className="space-y-4 py-4">
            <h4 className="text-[0.95rem] font-bold tracking-tight">March 7th, 2023</h4>
            <ul className="list-disc space-y-3 pl-4 text-sm marker:text-accent">
              <ChangeLogListItem
                title={"Revamped the entirety of Arkoko's infrastructure"}
                type={"Update"}
              />

              <ChangeLogListItem title={"Revamped the UI/UX for all pages"} type={"Update"} />
              <ChangeLogListItem
                title={"Updated <Changelog> for easier readability"}
                type={"Update"}
              />
              <ChangeLogListItem
                title={"Added <Guides> section for future in-game guides"}
                type={"New"}
              />
              <ChangeLogListItem
                title={"Added loading and error messages for all pages"}
                type={"New"}
              />
              <ChangeLogListItem title={"Removed <Features> section"} type={"Removed"} />
            </ul>
          </article>

          <article className="space-y-4 py-4">
            <h4 className="text-[0.95rem] font-bold tracking-tight">March 6th, 2023</h4>
            <ul className="list-disc space-y-3 pl-4 text-sm marker:text-accent">
              <ChangeLogListItem
                title={"Updated the <Raid Bid Calculator> for easier readability and use"}
                type={"Update"}
              />
              <ChangeLogListItem
                title={
                  "Added functionality for users to close a dropdown menu when clicking outside of it"
                }
                type={"New"}
              />
            </ul>
          </article>
        </section>
      </div>
    </main>
  )
}

const ChangeLogListItem = ({ title, type }: { title: string; type: string }) => {
  return (
    <li>
      <div className="flex items-center gap-2">
        {type === "Update" && <UpdatedButton />}
        {type === "Removed" && <RemovedButton />}
        {type === "New" && <NewButton />}

        <p className="pl-1 text-[0.8rem] tracking-tight">{title}</p>
      </div>
    </li>
  )
}

const RemovedButton = () => {
  return (
    <span className="inline-flex min-w-[50px] select-none items-center justify-center bg-[#992622] text-[0.45rem] uppercase tracking-wider">
      Removed
    </span>
  )
}

const UpdatedButton = () => {
  return (
    <span className="item-center inline-flex min-w-[50px] select-none justify-center bg-[#3E853E] px-1 text-[0.45rem] uppercase tracking-wider">
      Updated
    </span>
  )
}

const NewButton = () => {
  return (
    <span className="item-center inline-flex min-w-[50px] select-none justify-center bg-[#2c9ac2] px-1 text-[0.45rem] uppercase tracking-wider">
      New
    </span>
  )
}
