import { useState } from "react"
import { UnderConstruction } from "../Messages/ConstructionMessage"

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
    <main className="w-full overflow-y-hidden bg-primary pt-5 font-primary text-sm">
      <div className="mx-auto max-w-5xl rounded  p-4">
        <div className=" flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:border-l-4 sm:border-accent">
          <h2 className=" pl-2 text-2xl tracking-tight">{category}</h2>
          <div className="flex gap-2">
            {/* <button
              className="flex min-w-[5.5rem] items-center justify-center rounded bg-secondary  px-2 py-2 text-[0.8rem] ring-1 ring-black/[.40]"
              onClick={handleCategorySelect}
            >
              Dummy Text
            </button>
            <button
              className="flex min-w-[5.5rem] items-center justify-center rounded bg-secondary  px-2 py-2 text-[0.8rem] ring-1 ring-black/[.40]"
              onClick={handleCategorySelect}
            >
              Dummy Text
            </button>
            <button
              className="flex min-w-[5.5rem] items-center justify-center rounded bg-secondary  px-2 py-2  text-[0.8rem] ring-1 ring-black/[.40]"
              onClick={handleCategorySelect}
            >
              Dummy Text
            </button>
            <button
              className="flex min-w-[5.5rem] items-center justify-center rounded bg-secondary  px-2 py-2  text-[0.8rem] ring-1 ring-black/[.40]"
              onClick={handleCategorySelect}
            >
              Dummy Text
            </button> */}
          </div>
        </div>

        <div className="mt-4 min-h-[33rem] rounded-lg bg-secondary p-6 shadow-md ring-1 ring-black/[.15] sm:min-h-[42rem] lg:min-h-[47rem]">
          {category === "Guides" ? <UnderConstruction category={category} /> : null}
          {category === "Dummy Text" ? <UnderConstruction category={category} /> : null}
          {category === "Card Sets" ? <UnderConstruction category={category} /> : null}
          {category === "Collectibles" ? <UnderConstruction category={category} /> : null}
        </div>
      </div>
    </main>
  )
}
