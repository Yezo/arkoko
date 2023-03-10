//Sort the sparkline in order
export const sorted = (obj: any) =>
  Object.keys(obj)
    .sort()
    .reduce((accumulator: any, key: any) => {
      accumulator[key] = obj[key]

      return accumulator
    }, {})

// Blue crystals are taxed by 5%
export function generateCrystal(value: number) {
  return Math.round(value * 95)
}

// Accounting for tax
export function convertBlueCrystalToGold(amount: number, crystal: number) {
  return Math.ceil((amount / 95) * crystal)
}

//Sort an array by its game code
export const handleSortArray = (arr) =>
  arr.sort((a: { gameCode: any }, b: { gameCode: any }) => a.gameCode - b.gameCode)

//Merging two objects
export const mergeById = (localData, externalData) =>
  externalData.map((itm: { name: any }) => ({
    ...localData.find((item: { name: any }) => item.name === itm.name && item),
    ...itm,
  }))

//Determine if you should buy from the Mari's Shop or from the Marketplace
export const compareBothValues = (a: number, b: number) => {
  return a >= b ? "Market" : "Mari"
}

export function handleCreateURL(arr, baseApiURL: string) {
  const flatArr = arr.flat()
  return `${baseApiURL}${flatArr}`.slice(0, -1).replace(/,+/g, ",")
}

// Calculate the how much to reduce the total for crafting time, crafting cost, and energy cost
export function handleReductionFunctions(num: number, reduction: number | undefined) {
  return reduction && num ? Math.ceil(num - num * (reduction / 100)) : Math.ceil(num)
}

// Each workbench has 10 items in it so we multiply the total value by 10 per workbench
export function handleWorkbenchCount(num: number, workbenchCount: number | undefined) {
  return workbenchCount && num ? Math.ceil(num * (workbenchCount * 10)) : Math.ceil(num)
}

export function sortStrings(arr) {
  return arr.sort((a, b) => {
    let fa = a.id.toLowerCase(),
      fb = b.id.toLowerCase()

    if (fa < fb) {
      return 1
    }
    if (fa > fb) {
      return -1
    }
    return 0
  })
}

export const formatNums = new Intl.NumberFormat("en-US", {
  currency: "USD",
})

export function handleItemRarityColor(rarity: number) {
  if (rarity === 1) return "bg-gradient-to-br from-[#1e2d0b] to-[#304911]" //green
  if (rarity === 2) return "bg-gradient-to-br from-[#112739] to-[#113d5d]" //blue
  if (rarity === 3) return "bg-gradient-to-br from-[#2e123c] to-[#480d5d]" //purple
  if (rarity === 4) return "bg-gradient-to-br from-[#452b06] to-[#9e5f04]" //yellow
  if (rarity === 5) return "bg-gradient-to-br from-[#48220b] to-[#a24006]" //dark-orange
  return "bg-gradient-to-br from-[#262626] to-[#3d3d3d]" //gray
}
