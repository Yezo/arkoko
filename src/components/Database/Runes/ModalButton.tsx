import { runesType } from "../../../types/typeRunes"

type Props = {
  runeData?: runesType[]
  handleButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void
  category?: string
}

export const ModalButton = ({ runeData, handleButtonClick, category }: Props) => {
  return (
    <div className="flex flex-col gap-2 pb-4">
      <h2 className="border-b-[1px] border-gray-700 pb-2 text-[0.85rem] tracking-wide">
        {category}
      </h2>
      <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-1 ">
        {runeData
          ? runeData
              .sort(function (a, b) {
                if (a.name < b.name) {
                  return -1
                }
                if (a.name > b.name) {
                  return 1
                }
                return 0
              })
              .map(({ name, _id, imageURL }) => {
                return (
                  <div
                    className="flex cursor-pointer justify-around gap-3 rounded-md bg-primary px-3 py-[0.35rem] text-xs  tracking-tight ring-1 ring-black/[.35]"
                    onClick={handleButtonClick}
                    key={_id}
                    id={name}
                  >
                    <img
                      src={imageURL}
                      className="max-w-[30px] rounded-full ring-1 ring-black/[.35]"
                      id={name}
                    ></img>
                    <div
                      className="flex h-full w-full flex-col flex-wrap items-start justify-center text-[0.75rem]"
                      id={name}
                    >
                      {name}
                    </div>
                  </div>
                )
              })
          : null}
      </div>
    </div>
  )
}
