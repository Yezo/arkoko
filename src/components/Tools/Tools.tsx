import { useState } from "react"
import { Button } from "../Button"
import { UnderConstruction } from "../Messages/ConstructionMessage"
import { OrehaCraftingCalculator } from "./OrehaCraftingCalculator/OrehaCraftingCalculator"
import { RaidBidCalculator } from "./RaidBidCalculator/RaidBidCalculator"

export const Tools = () => {
  //States
  const [isClicked, setIsClicked] = useState(false)
  const [category, setCategory] = useState<string | null>("Auction Bid Calculator")

  //Helper
  function handleCategorySelect(e: React.MouseEvent<Element>) {
    const target = e.target as HTMLButtonElement
    target && setCategory(target.textContent)
    if (isClicked) {
      setIsClicked(false)
    }
  }
  return (
    <main className="w-full overflow-y-hidden bg-primary pt-5 font-primary text-sm">
      <div className="mx-auto max-w-5xl rounded  p-4">
        <div className=" flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:border-l-4 sm:border-accent">
          <h2 className=" pl-2 text-2xl tracking-tight">{category}</h2>
          <div className="flex gap-2">
            <Button categorySetter={handleCategorySelect}>Auction Bid Calculator</Button>
            <Button categorySetter={handleCategorySelect}>Oreha Crafting Calculator</Button>
          </div>
        </div>

        <div className="mt-4 min-h-[33rem] rounded-lg bg-secondary p-6 shadow-md ring-1 ring-black/[.15] sm:min-h-[42rem] lg:min-h-[47rem]">
          {category === "Auction Bid Calculator" ? <RaidBidCalculator /> : null}
          {category === "Oreha Crafting Calculator" ? <OrehaCraftingCalculator /> : null}
          {category === "Test" ? <UnderConstruction category={category} /> : null}
        </div>
      </div>
    </main>
  )
}
