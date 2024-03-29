import { useState, useRef } from "react"

type Props = {
  setter: React.Dispatch<React.SetStateAction<string>>
  options: string[]
  placeholder: string
}

export const Dropdown = ({ options, setter, placeholder }: Props) => {
  //States
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  //Close the dropdown if the user clicks anywhere outside of the menu
  const dropdownMenu = useRef<HTMLInputElement>(null)
  const closeOpenMenus = (e) => {
    if (dropdownMenu.current && isExpanded && !dropdownMenu.current.contains(e.target)) {
      setIsExpanded(false)
    }
  }
  document.addEventListener("mousedown", closeOpenMenus)

  return (
    <div ref={dropdownMenu}>
      <button
        className={`scrollbar flex min-w-[12rem] items-center  justify-between rounded bg-secondary  px-3 py-2 text-[0.845rem] shadow-md ring-1 ring-black/[.15] transition-colors hover:bg-text hover:text-primary `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{placeholder}</span>
        <span>
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
              />
            </svg>
          )}
        </span>
      </button>
      {isExpanded && (
        <div className="scrollbar absolute z-10 mt-[4.5px] flex min-w-[12rem] max-w-fit cursor-pointer flex-col gap-5 overflow-hidden overflow-y-scroll rounded bg-secondary ring-1 ring-black/[.15]">
          <div className="">
            {options.map((option) => (
              <div
                onClick={() => {
                  setIsExpanded(false)
                  setter(option)
                }}
                className="px-3 py-2 transition-colors hover:bg-text hover:text-primary "
                key={option}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
