type Props = {
  imgURL: string
  name: string
  quantity: number
  cost: number
  gold: string
}

export const OrehaRecipesRow = ({ imgURL, name, quantity, cost, gold }: Props) => {
  return (
    <div className="flex items-center justify-between gap-[0.15rem]">
      <div className="flex items-center gap-1">
        <img src={imgURL} alt={name} className="max-h-[20px] max-w-[1.3rem]" />

        <span>{name}</span>
        <span className="text-[0.7rem] text-gray-600 ">x{quantity}</span>
      </div>

      <div className="flex items-center gap-[0.15rem] font-bold">
        <span className="font-numbers text-[0.9rem] font-medium ">{Math.ceil(cost)}</span>
        <img src={gold} alt="gold" className="max-h-[20px]" />
      </div>
    </div>
  )
}
