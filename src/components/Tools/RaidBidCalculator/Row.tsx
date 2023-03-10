import { Hover } from "./Hover"

type Props = {
  title: string
  value: number
  color: string
  minus: boolean
  description: string
}

export const Row = ({ title, value, color, minus, description }: Props) => {
  const gold = "/gold.png"
  return (
    <Hover tooltipText={description}>
      <div className="flex items-center justify-between py-[6px] px-10">
        {title}
        <div
          className={`flex items-center justify-center gap-1 font-numbers ${value > 0 && color}`}
        >
          {minus && value > 0 ? "-" : ""}
          {value}
          <img src={gold} alt="gold" />
        </div>
      </div>
    </Hover>
  )
}
