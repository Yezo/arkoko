import { useState } from "react"
import { Button } from "../Button"
import { UnderConstruction } from "../Messages/ConstructionMessage"
import { Engravings } from "./Engravings/Engravings"
import { Runes } from "./Runes/Runes"
import { MainContainer } from "../Layout/MainContainer"
import { BodyHeader } from "../Layout/BodyHeader"
import { BodyContainer } from "../Layout/BodyMainContainer"

export const Database = () => {
  //States
  const [isClicked, setIsClicked] = useState(false)
  const [category, setCategory] = useState<string | null>("Engravings")

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
        <Button categorySetter={handleCategorySelect}>Engravings</Button>
        <Button categorySetter={handleCategorySelect}>Runes</Button>
        <Button categorySetter={handleCategorySelect}>Card Sets</Button>
        <Button categorySetter={handleCategorySelect}>Collectibles</Button>
      </BodyHeader>

      <BodyContainer>
        {category === "Engravings" ? <Engravings /> : null}
        {category === "Runes" ? <Runes /> : null}
        {category === "Card Sets" ? <UnderConstruction category={category} /> : null}
        {category === "Collectibles" ? <UnderConstruction category={category} /> : null}
      </BodyContainer>
    </MainContainer>
  )
}
