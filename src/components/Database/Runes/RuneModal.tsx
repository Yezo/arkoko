import { runesType } from "../../../types/typeRunes"

type Props = {
  runeData: runesType[] | null
  modal: string | null
}

export const RuneModal = ({ runeData, modal }: Props) => {
  let rune = runeData?.find((item) => item.name === modal)
  return (
    <>
      {rune && (
        <div className="mb-4 flex flex-col gap-2 font-primary sm:flex-row ">
          <div className="flex min-h-[9rem] basis-1/5 flex-col items-center justify-center gap-3  rounded-md bg-primary p-3 tracking-tight shadow-md ring-1 ring-black/[.30]">
            <img src={rune.imageURL} className="max-w-[50px] select-none rounded-full"></img>

            <div>
              <div className="flex select-none flex-wrap items-center justify-center rounded bg-gradient-to-br from-accent via-green-500 to-green-600 py-1 px-3  text-[0.8rem] font-semibold text-primary shadow-md ring-1 ring-black/[.15]">
                {rune.name}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CONTAINER*/}
          <div className="basis-4/5 text-[0.825rem] ">
            <span className="flex min-h-[9rem] flex-col justify-center gap-4 rounded-md bg-primary  px-5 py-2 tracking-tight  ring-1 ring-black/[.30] sm:flex-row sm:gap-0 sm:divide-x sm:divide-text/10">
              <div className="basis-2/5">
                <div className="flex h-full flex-col items-center justify-center gap-2 px-2 text-center">
                  <h3 className="text-[1rem] font-semibold italic">Effect</h3>
                  {rune.effect}
                </div>
              </div>
              <div className="basis-3/5">
                <div className="flex h-full flex-col gap-2 sm:justify-evenly sm:px-2">
                  {rune.sources.one && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.one.rarity} />
                      <CategoryButton title={rune.sources.one.category} />
                      <p className="text-xs">{rune.sources.one.obtainedFrom}</p>
                    </span>
                  )}
                  {rune.sources.two && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.two.rarity} />
                      <CategoryButton title={rune.sources.two.category} />
                      <p className="text-xs">{rune.sources.two.obtainedFrom}</p>
                    </span>
                  )}
                  {rune.sources.three && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.three.rarity} />
                      <CategoryButton title={rune.sources.three.category} />
                      <p className="text-xs">{rune.sources.three.obtainedFrom}</p>
                    </span>
                  )}
                  {rune.sources.four && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.four?.rarity} />
                      <CategoryButton title={rune.sources.four?.category} />
                      <p className="text-xs">{rune.sources.four.obtainedFrom}</p>
                    </span>
                  )}

                  {rune.sources.five && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.five?.rarity} />
                      <CategoryButton title={rune.sources.five?.category} />
                      <p className="text-xs">{rune.sources.five.obtainedFrom}</p>
                    </span>
                  )}

                  {rune.sources.six && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.six?.rarity} />
                      <CategoryButton title={rune.sources.six?.category} />
                      <p className="text-xs">{rune.sources.six.obtainedFrom}</p>
                    </span>
                  )}

                  {rune.sources.seven && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.seven?.rarity} />
                      <CategoryButton title={rune.sources.seven?.category} />
                      <p className="text-xs">{rune.sources.seven.obtainedFrom}</p>
                    </span>
                  )}

                  {rune.sources.eight && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.eight?.rarity} />
                      <CategoryButton title={rune.sources.eight?.category} />
                      <p className="text-xs">{rune.sources.eight.obtainedFrom}</p>
                    </span>
                  )}
                  {rune.sources.nine && (
                    <span className="flex flex-wrap items-center gap-2">
                      <TagSVG rarity={rune.sources.nine?.rarity} />
                      <CategoryButton title={rune.sources.nine?.category} />
                      <p className="text-xs">{rune.sources.nine.obtainedFrom}</p>
                    </span>
                  )}
                </div>
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export const CategoryButton = ({ title }: { title: string }): JSX.Element => {
  function handleBackgroundColor() {
    if (title === "RNG") return "bg-red-700 text-text"
    if (title === "Exchange") return "bg-blue-600 text-text"
    if (title === "Rapport") return "bg-pink-500 text-text"
    if (title === "Collectible") return "bg-green-600 text-text"
    if (title === "Adventurer's Tome") return "bg-orange-700 text-text"
    if (title === "Boss") return "bg-yellow-600 text-text"
    if (title === "Encounter") return "bg-indigo-600 text-text"
    return "bg-secondary text-text"
  }
  return (
    <span
      className={`inline-flex min-w-[5.5rem] select-none items-center justify-center px-2 py-[1px] text-[0.6rem] font-semibold uppercase tracking-wide ring-1 ring-black/[.15] ${handleBackgroundColor()}`}
    >
      {title}
    </span>
  )
}

export const TagSVG = ({ rarity }: { rarity?: number }) => {
  function handleBackgroundColor() {
    if (rarity === 1) return "text-green-500"
    if (rarity === 2) return "text-blue-500"
    if (rarity === 3) return "text-purple-500"
    if (rarity === 4) return "text-orange-500"
    return "text-white"
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${handleBackgroundColor()} `}
    >
      <polyline points="13 17 18 12 13 7"></polyline>
      <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
  )
}
