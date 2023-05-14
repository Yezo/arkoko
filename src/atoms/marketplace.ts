import { atomWithCache } from "jotai-cache"
import { marketAPI } from "../types/typeMarketAPI"
import { dropdownAtom, regionAtom } from "./dropdown"

export const marketplaceDataAtom = atomWithCache<Promise<marketAPI[]>>(async (get) => {
  const region = get(regionAtom)
  const dropdown = get(dropdownAtom)
  const response = await fetch(
    `https://www.lostarkmarket.online/api/export-market-live/${region}?category=${dropdown}`
  )
  return response.json()
})
