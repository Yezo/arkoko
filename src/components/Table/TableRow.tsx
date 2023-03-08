type Props = {
  children: any
  position: string
}

export const TableRow = ({ position, children }: Props) => {
  return (
    <td>
      <span className={`flex items-center gap-x-1 py-1 md:px-3 ${position} `}>{children}</span>
    </td>
  )
}
