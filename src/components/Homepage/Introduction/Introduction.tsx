export const Introduction = () => {
  return (
    <section className="flex flex-col gap-3 divide-y divide-text/10 rounded-lg bg-secondary p-5 shadow-md ring-1 ring-black/[.15] ">
      <h2 className="border-l-4 border-accent px-2 font-secondary text-lg font-bold">Lai-lai!</h2>
      <div className="grid h-full max-w-[50ch] place-items-center space-y-4 pt-3 leading-7">
        <p>
          Arkoko is a repository of guides, tools, and resources to assist new and veteran players
          navigate through the world of Arkesia. Spend more time on the game while we do the
          heavy-lifting on the side for you.
        </p>
        <p>
          This fansite is maintained by a single developer but rest assured, there are many more
          features coming soon!
        </p>
      </div>
    </section>
  )
}
