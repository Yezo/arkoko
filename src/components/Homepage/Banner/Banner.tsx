type Props = {
  imageURL: string
  path: string
  description: string
}

export const Banner = ({ imageURL, path, description }: Props) => {
  return (
    <section className="basis-9/12">
      <a href={imageURL} target="_blank">
        <img
          src={path}
          alt={description}
          className="aspect-video h-full select-none rounded-xl object-cover shadow-md ring-1 ring-black/[.15]"
        />
      </a>
    </section>
  )
}
