export interface One {
  category: string
  obtainedFrom: string
  _id: string
  rarity?: number
}

export interface Two {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}

export interface Three {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Four {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Five {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Six {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Seven {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Eight {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Nine {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}
export interface Ten {
  category: string
  rarity: number
  obtainedFrom: string
  _id: string
}

export interface Sources {
  one: One
  two: Two
  three: Three
  four: Four
  five: Five
  six: Six
  seven: Seven
  eight: Eight
  nine: Nine
  ten: Ten
}

export interface runesType {
  sources: Sources
  _id: string
  name: string
  imageURL: string
  effect: string
  createdAt: Date
  updatedAt: Date
  __v: number
}
