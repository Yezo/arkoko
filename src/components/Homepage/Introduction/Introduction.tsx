import React from "react"

type Props = {}

export const Introduction = () => {
  return (
    <div className="flex max-w-full flex-col gap-5 rounded bg-secondary p-3  font-primary text-sm md:p-5 lg:max-h-[15rem] lg:min-h-[15rem] lg:justify-center">
      <h2 className="text-2xl font-bold tracking-tighter">Lai-lai!</h2>
      <p className="max-w-[65ch]">
        Arkoko is a collection of guides and tools aimed to assist newer and veteran players
        navigate through the world of Arkesia. This fansite is maintained by a single person and was
        originally created to help myself learn more about programming.
      </p>
    </div>
  )
}
