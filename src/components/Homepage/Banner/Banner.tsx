type Props = {
  imageURL: string
  path: string
  description: string
}

export const Banner = ({ imageURL, path, description }: Props) => {
  return (
    <section className="basis-9/12">
      <div className="flex flex-col">
        <h2 className="border-l-4 border-accent pl-2 text-2xl tracking-tight">Latest Patch</h2>
        <a href={imageURL} target="_blank">
          <img
            src={path}
            alt={description}
            className="mt-4 min-h-full select-none rounded-xl object-cover shadow-md ring-1 ring-black/[.15]"
          />
        </a>
      </div>
    </section>
  )
}
