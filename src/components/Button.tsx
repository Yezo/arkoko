type Props = {
  categorySetter: (e: React.MouseEvent<Element>) => void
  children?: React.ReactNode
}

export const Button = ({ children, categorySetter }: Props) => {
  return (
    <button
      className="flex min-w-[5.5rem] items-center justify-center rounded bg-secondary  px-2 py-2 text-[0.8rem] ring-1 ring-black/[.40] transition-colors hover:bg-text hover:text-primary"
      onClick={categorySetter}
    >
      {children}
    </button>
  )
}
