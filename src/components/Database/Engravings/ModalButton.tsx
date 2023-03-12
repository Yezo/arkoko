import { engravingType } from "../../../types/typeEngraving"

type Props = {
  engravingData?: engravingType[]
  handleButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void
  filterBool: boolean
  category: string
}

export const ModalButton = ({ engravingData, handleButtonClick, filterBool, category }: Props) => {
  return (
    <div className="flex flex-col gap-2 pb-4">
      <h2 className="border-b-[1px] border-gray-700 pb-2 text-[0.85rem] tracking-wide">
        {category}
      </h2>
      <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-1 ">
        {engravingData
          ? engravingData
              .filter((item) => item.isClassEngraving === filterBool)
              .sort((a, b) =>
                category === "General Engravings" && a.engraving && b.engraving
                  ? a.engraving < b.engraving
                    ? -1
                    : 1
                  : category === "Class Engravings" &&
                    a.belongsToClass &&
                    b.belongsToClass &&
                    a.belongsToClass < b.belongsToClass
                  ? -1
                  : 1
              )

              .map(({ engraving, _id, imageURL, belongsToClass }) => {
                return (
                  <div
                    className="inline-flex cursor-pointer justify-around gap-3 rounded-md bg-primary px-3 py-[0.35rem] text-xs tracking-tight shadow-sm ring-1 ring-black/[.35] transition-all hover:bg-text hover:italic hover:text-primary hover:ring-2"
                    onClick={handleButtonClick}
                    key={_id}
                    id={engraving}
                  >
                    <img
                      src={imageURL}
                      className="max-w-[30px] select-none rounded-full ring-1 ring-black/[.35]"
                      id={engraving}
                    ></img>
                    <div
                      className="flex h-full w-full flex-col flex-wrap items-start justify-center text-[0.75rem]"
                      id={engraving}
                    >
                      {engraving}
                      {belongsToClass && (
                        <div className="text-[0.65rem] italic text-slate-500" id={engraving}>
                          {belongsToClass}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
          : null}
      </div>
    </div>
  )
}
