export type material = {
  name: string
  quantity: number
  imgURL: string
  gamecode: string
  id: string
}
export type localDataAPI = {
  _id: string
  name: string
  quantity: number
  id: string
  imgURL: string
  materialOne: material
  materialTwo: material
  materialThree: material
  materialFour: material
}
export type marketAPI = {
  name: string
  quantity: number
  id: string
  gameCode: number | string
  image: string
  lowPrice: number
}
export type mixedAPI = {
  _id: string
  name: string
  quantity: number
  id: string
  materialOne: material
  materialTwo: material
  materialThree: material
  materialFour: material
  matOneCost: number
  matTwoCost: number
  matThreeCost: number
  totalCost: number
  profit: number
  imgURL: string
  craftingCost: number
  craftingTime: number
  strongholdEnergy: number
  strongholdXP: number
  lowPrice: number
}
