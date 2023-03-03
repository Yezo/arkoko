type Props = {
  handleSplit: (num: number) => number
  value: number
  split: number
  gold: string
  title: string
}

export const RaidBidRow = ({ title, value, split, gold, handleSplit }: Props) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] items-center justify-center py-1 ">
      <div className="flex w-full items-center justify-center gap-1 border-b border-text/[.05] pb-1 font-numbers text-[0.9rem] font-medium">
        {value ? new Intl.NumberFormat().format(handleSplit(value)) : "0"}
        <img src={gold} alt="gold" className="max-w-[20px]" />
      </div>

      <div className="flex w-full items-center justify-center gap-1 border-b border-text/[.05] pb-1 text-[0.825rem] tracking-tighter ">
        {title}
      </div>

      <div className="flex w-full items-center justify-center gap-1 border-b border-text/[.05] pb-1 font-numbers text-[0.9rem] font-medium ">
        {value ? "+" + new Intl.NumberFormat().format(split) : "0"}
        <img src={gold} alt="gold" className="max-w-[20px]" />
      </div>
    </div>
  )
}
