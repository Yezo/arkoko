import { useState, useEffect } from "react"
import { runesType } from "../../../types/typeRunes"
import { ErrorMessage } from "../../Messages/ErrorMessage"
import { LoadingMessage } from "../../Messages/LoadingMessage"
import { ModalButton } from "./ModalButton"
import { RuneModal } from "./RuneModal"

export const Runes = () => {
  //States
  const [runeData, setRuneData] = useState<runesType[] | null>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [modal, setModal] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  //Constants
  const localApiURL = `https://arkoko-api.onrender.com/api/runes`
  // const localApiURL = `http://localhost:8080/api/runes`

  //Fetching data
  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      setError(false)
      setIsLoading(true)
      try {
        const data = await fetch(localApiURL, { signal: controller.signal })
        const jsonData = await data.json()
        setRuneData(jsonData)
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
      {isLoading && <LoadingMessage />}
      {error && <ErrorMessage />}
      {isClicked && runeData && !error ? <RuneModal runeData={runeData} modal={modal} /> : null}
      {runeData && !error && !isLoading ? (
        <ModalButton
          category={"Skill Runes"}
          runeData={runeData}
          handleButtonClick={handleButtonClick}
        />
      ) : null}
    </>
  )
}
