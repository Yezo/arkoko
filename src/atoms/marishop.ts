import { atomWithCache } from "jotai-cache"
import { marketAPI, localAPI } from "../types/typeMariShop"
import { regionAtom } from "./dropdown"

export const blueCrystalAtom = atomWithCache(async (get) => {
  const region = get(regionAtom)
  const response = await fetch(
    `https://www.lostarkmarket.online/api/export-market-live/${region}?category=Currency Exchange`
  )
  const data = await response.json()
  return data[0].lowPrice
})

export const mariShopAtom = atomWithCache<Promise<marketAPI[]>>(async (get) => {
  const region = get(regionAtom)
  const response = await fetch(
    `https://www.lostarkmarket.online/api/export-market-live/${region}?items=honor-shard-pouch-l-3,honor-shard-pouch-s-1,great-honor-leapstone-2,honor-leapstone-2,solar-grace-1,solar-blessing-2,solar-protection-3,basic-oreha-fusion-material-2,simple-oreha-fusion-material-1,superior-oreha-fusion-material-4,crystallized-destruction-stone-0,crystallized-guardian-stone-0,marvelous-honor-leapstone-3`
  )
  return response.json()
})

export const localMariShopAtom = atomWithCache<Promise<localAPI[]>>(async (get) => {
  const response = await fetch(`https://arkoko-api.onrender.com/api/marishop`)
  return response.json()
})

export const mariShopDataAtom = atomWithCache(async (get) => {
  const local = await get(localMariShopAtom)
  const external = await get(mariShopAtom)
  const mergeById = external.map((itm) => ({
    ...local.find((item) => item.name === itm.name && item),
    ...itm,
  }))
  //Adding new key value pairs to existing data
  const data = mergeById.map((item) =>
    Object.assign(item, { total: item.quantity * item.lowPrice, rarity: item.rarity })
  )

  return data
})
