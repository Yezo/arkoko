import { useState, useEffect } from "react"
import { EngravingModal } from "./EngravingModal"
import { ModalButton } from "./ModalButton"
import { TableNav } from "../TableNav"
import { engravingType } from "../../types/typeEngraving"

export const Engravings = () => {
  //States
  const [engravingData, setEngravingData] = useState<engravingType[] | null>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [modal, setModal] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [category, setCategory] = useState<string | null>("Engravings")

  //Constants
  const localApiURL = `https://arkoko-api.onrender.com/api/engravings`

  //Fetching data
  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      setError(false)
      setIsLoading(true)
      try {
        const data = await fetch(localApiURL, { signal: controller.signal })
        const jsonData = await data.json()
        setEngravingData(jsonData)
      } catch (error) {
        controller.signal.aborted ? console.log("Aborted") : setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAPI()
    return () => {
      controller.abort()
    }
  }, [])

  function handleButtonClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLButtonElement
    if (!isClicked) {
      setIsClicked(true)
    }
    target.id && setModal(target.id)
  }

  function handleCategorySelect(e: React.MouseEvent<Element>) {
    const target = e.target as HTMLButtonElement
    target && setCategory(target.textContent)
    if (isClicked) {
      setIsClicked(false)
    }
  }

  return (
    <div className="flex max-w-full flex-col gap-5 p-3 md:p-5">
      <TableNav title="Database">
        <button
          className="flex min-w-[5.5rem] items-center justify-center rounded bg-primary  px-2 py-2 text-[0.8rem] ring-1 ring-black/[.40]"
          onClick={handleCategorySelect}
        >
          Engravings
        </button>
        {/* <button
          className="flex min-w-[5.5rem] items-center justify-center rounded bg-primary  px-2 py-2 text-[0.8rem] ring-1 ring-black/[.40]"
          onClick={handleCategorySelect}
        >
          Runes
        </button>
        <button
          className="flex min-w-[5.5rem] items-center justify-center rounded bg-primary  px-2 py-2  text-[0.8rem] ring-1 ring-black/[.40]"
          onClick={handleCategorySelect}
        >
          Card Sets
        </button> */}
      </TableNav>

      {category === "Engravings" && engravingData ? (
        <>
          {category === "Engravings" ? (
            isClicked && engravingData ? (
              <EngravingModal engravingData={engravingData} modal={modal} />
            ) : null
          ) : null}
          <section>
            <ModalButton
              engravingData={engravingData}
              handleButtonClick={handleButtonClick}
              filterBool={false}
              category="General Engravings"
            ></ModalButton>
          </section>

          <section>
            <ModalButton
              engravingData={engravingData}
              handleButtonClick={handleButtonClick}
              filterBool={true}
              category="Class Engravings"
            ></ModalButton>
          </section>

          {error && <div>There was an error fetching the data.</div>}
        </>
      ) : null}
    </div>
  )
}
