import React from "react"
import { dataAPI } from "../../types/typeMariShop"
import {
  handleItemRarityColor,
  convertBlueCrystalToGold,
  compareBothValues,
} from "../../helpers/helpers"

export const MobileMariShop = ({
  finalData,
  crystal,
}: {
  finalData: dataAPI[] | null
  crystal: number
}) => {
  const gold = "/gold.png"
  const blue = "/bluecrystal.png"

  return (
    <div className="flex flex-col gap-4 font-primary text-[0.825rem] tracking-tighter sm:hidden">
      {finalData &&
        finalData.map(({ name, id, image, bluecrystal, quantity, lowPrice, total, rarity }) => {
          return (
            <div
              key={id}
              className="ring-1- space-y-4 rounded bg-[#2D2D3B] px-8 py-4 text-sm shadow-md ring-black/10"
            >
              <div className="flex items-center justify-between text-right text-lg font-bold">
                <span
                  className={`mr-1 max-w-[35px] ring-1 ring-black/[.25] ${handleItemRarityColor(
                    rarity
                  )}`}
                >
                  <img src={image} alt={name} />
                </span>
                <span className="max-w-[10rem]">{name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Quantity</span>
                <span className="flex items-center gap-1 font-numbers">{quantity}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Blue Crystal</span>
                <span className="flex items-center gap-1 font-numbers">
                  {bluecrystal}
                  <img src={blue} alt="blue crystal" className="max-w-[20px]" />
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Crystal Value</span>
                <span className="flex items-center gap-1 font-numbers">
                  {new Intl.NumberFormat().format(convertBlueCrystalToGold(bluecrystal, crystal))}
                  <img src={gold} alt="gold" className="max-w-[20px]" />
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Market Value</span>
                <span className="flex items-center gap-1 font-numbers">
                  {total}
                  <img src={gold} alt="gold" className="max-w-[20px]" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Buy From?</span>
                <span className="flex items-center">
                  <button
                    className={`font-bold tracking-wide  ${
                      compareBothValues(
                        convertBlueCrystalToGold(bluecrystal, crystal),
                        lowPrice * quantity
                      ) === "Market"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {compareBothValues(
                      convertBlueCrystalToGold(bluecrystal, crystal),
                      lowPrice * quantity
                    )}
                  </button>
                </span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
