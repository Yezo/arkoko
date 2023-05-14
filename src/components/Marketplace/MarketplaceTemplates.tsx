import { Sparklines, SparklinesLine } from "react-sparklines"
import { handleItemRarityColor, sorted } from "../../helpers/helpers"
import { marketAPI } from "../../types/typeMarketAPI"

const gold = "/gold.png"

export const nameBodyTemplate = (product: marketAPI) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={product.image}
        alt={product.name}
        className={`${handleItemRarityColor(
          product.rarity
        )} max-w-[35px] shadow-md ring-1 ring-black/[.25] `}
      />
      <span>{product.name}</span>
    </div>
  )
}
export const lowPriceBodyTemplate = (product: marketAPI) => {
  return (
    <div className="flex items-center justify-end gap-1 font-numbers text-[0.9rem]">
      <span>{new Intl.NumberFormat().format(product.lowPrice)}</span>
      <img src={gold} alt="gold" className={` max-w-[25px] `} />
    </div>
  )
}

export const recentPriceBodyTemplate = (product: marketAPI) => {
  return (
    <div className="flex items-center justify-end gap-1 font-numbers text-[0.9rem] ">
      <span>{new Intl.NumberFormat().format(product.recentPrice)}</span>
      <img src={gold} alt="gold" className={`max-w-[25px] `} />
    </div>
  )
}

export const marketTrendBodyTemplate = (product: marketAPI) => {
  return (
    <div className="px-7">
      <Sparklines data={Object.values(sorted(product.shortHistoric))}>
        <SparklinesLine
          style={{
            stroke: "#b7c2d0",
            strokeWidth: "5",
            strokeOpacity: "0.8",
            fill: "#627897",
            fillOpacity: "0.7",
          }}
        />
      </Sparklines>
    </div>
  )
}
export const quantityBodyTemplate = (product: marketAPI) => {
  return (
    <div className="font-numbers text-[0.9rem] ">
      {new Intl.NumberFormat().format(product.cheapestRemaining)}
    </div>
  )
}
