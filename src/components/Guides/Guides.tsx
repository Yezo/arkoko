//Imports - Hooks/Utils
import { useState } from "react"

//Imports - Components
import { UnderConstruction } from "../Messages/ConstructionMessage"
import { MainContainer } from "../Layout/MainContainer"
import { BodyHeader } from "../Layout/BodyHeader"
import { BodyContainer } from "../Layout/BodyMainContainer"

export const Guides = () => {
  //States
  const [isClicked, setIsClicked] = useState(false)
  const [category, setCategory] = useState<string | null>("Guides")

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
      <BodyHeader title={category}></BodyHeader>

      <BodyContainer>
        {category === "Guides" ? <UnderConstruction category={category} /> : null}
        {category === "Dummy Text" ? <UnderConstruction category={category} /> : null}
        {category === "Card Sets" ? <UnderConstruction category={category} /> : null}
        {category === "Collectibles" ? <UnderConstruction category={category} /> : null}
      </BodyContainer>
    </MainContainer>
  )
}
