import { useState } from "react"
import { Button } from "../Button"
import { UnderConstruction } from "../Messages/ConstructionMessage"
import { OrehaCraftingCalculator } from "./OrehaCraftingCalculator/OrehaCraftingCalculator"
import { RaidBidCalculator } from "./RaidBidCalculator/RaidBidCalculator"
import { MainContainer } from "../Layout/MainContainer"
import { BodyHeader } from "../Layout/BodyHeader"
import { BodyContainer } from "../Layout/BodyMainContainer"

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
    <MainContainer>
      <BodyHeader title={category}>
        <Button categorySetter={handleCategorySelect}>Auction Bid Calculator</Button>
        <Button categorySetter={handleCategorySelect}>Oreha Crafting Calculator</Button>
      </BodyHeader>

      <BodyContainer>
        {category === "Auction Bid Calculator" ? <RaidBidCalculator /> : null}
        {category === "Oreha Crafting Calculator" ? <OrehaCraftingCalculator /> : null}
        {category === "Test" ? <UnderConstruction category={category} /> : null}
      </BodyContainer>
    </MainContainer>
  )
}
