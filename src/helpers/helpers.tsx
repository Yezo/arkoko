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
