import { compareBothValues, handleItemRarityColor } from "../../helpers/helpers"
import { dataAPI } from "../../types/typeMariShop"

//Imports - Jotai
import { useAtomValue } from "jotai"
import { blueCrystalAtom } from "../../atoms/marishop"

//Constants
const gold = "/gold.png"
const blue = "/bluecrystal.png"

export const nameBodyTemplate = (product: dataAPI) => {
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

export const blueCrystalTemplate = (product: dataAPI) => {
  return (
    <div className="flex items-center justify-end gap-1 font-numbers text-[0.9rem]">
      <span>{new Intl.NumberFormat().format(product.bluecrystal)}</span>
      <img src={blue} alt="image of a blue crystal" className={` max-w-[25px] `} />
    </div>
  )
}

export const blueCrystalGoldValueTemplate = (product: dataAPI) => {
  const blueCrystalValue = useAtomValue(blueCrystalAtom)
  return (
    <div className="flex items-center justify-end gap-1 font-numbers text-[0.9rem]">
      <span>{Math.ceil(product.bluecrystal * blueCrystalValue)}</span>
      <img src={gold} alt="image of a gold coin" className={` max-w-[25px] `} />
    </div>
  )
}

export const totalBodyTemplate = (product: dataAPI) => {
  return (
    <div className="font-numbers text-[0.9rem] ">
      {new Intl.NumberFormat().format(product.total)}
    </div>
  )
}

export const buyFromMarketOrMariTemplate = (product: dataAPI) => {
  const blueCrystalValue = useAtomValue(blueCrystalAtom)
  return (
    <div
      className={`inline-flex min-w-[5.5rem] select-none items-center justify-center rounded bg-primary px-4 py-1 font-bold shadow-sm outline-none ring-1 ring-black/[.25] ${
        compareBothValues(
          Math.ceil(product.bluecrystal * blueCrystalValue),
          product.lowPrice * product.quantity
        ) === "Market"
          ? "bg-green-800"
          : "bg-red-900"
      }`}
    >
      {compareBothValues(
        Math.ceil(product.bluecrystal * blueCrystalValue),
        product.lowPrice * product.quantity
      )}
    </div>
  )
}
