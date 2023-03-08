import { useState, useEffect } from "react"
import { engravingType } from "../../../types/typeEngraving"
import { EngravingModal } from "./EngravingModal"
import { ModalButton } from "./ModalButton"
import { ErrorMessage } from "../../Messages/ErrorMessage"
import { LoadingMessage } from "../../Messages/LoadingMessage"

export const Engravings = () => {
  //States
  const [engravingData, setEngravingData] = useState<engravingType[] | null>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [modal, setModal] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  //Constants
  const localApiURL = `https://arkoko-api.onrender.com/api/engravings`
  // const localApiURL = `http://localhost:8080/api/engravings`

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
    window.scrollTo(0, 0)
    const target = e.target as HTMLButtonElement
    if (!isClicked) {
      setIsClicked(true)
    }
    target.id && setModal(target.id)
  }

  return (
    <>
      {isClicked && engravingData && !error ? (
        <EngravingModal engravingData={engravingData} modal={modal} />
      ) : null}
      <>
        {error ? (
          <ErrorMessage />
        ) : (
          <>
            {isLoading ? (
              <LoadingMessage />
            ) : engravingData && !error ? (
              <>
                <ModalButton
                  engravingData={engravingData}
                  handleButtonClick={handleButtonClick}
                  filterBool={false}
                  category="General Engravings"
                ></ModalButton>

                <ModalButton
                  engravingData={engravingData}
                  handleButtonClick={handleButtonClick}
                  filterBool={true}
                  category="Class Engravings"
                ></ModalButton>
              </>
            ) : null}
          </>
        )}
      </>
    </>
  )
}
