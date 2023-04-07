type Props = {
  title: string
  children?: React.ReactNode
}

export const BodyHeader = ({ title, children }: Props) => {
  return (
    <div className=" flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:border-l-4 sm:border-accent">
      <h2 className=" pl-2 text-2xl tracking-tight">{title}</h2>
      <div className="flex max-w-fit flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
        {children}
      </div>
    </div>
  )
}
