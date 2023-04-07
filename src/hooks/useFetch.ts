import { useEffect, useState } from "react"

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      setError(false)
      setLoading(true)
      try {
        const data = await fetch(url, { signal: controller.signal })
        const jsonData = await data.json()
        setData(jsonData)
      } catch (error) {
        controller.signal.aborted ? console.log("Aborted the fetch") : setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchAPI()
    return () => {
      controller.abort()
    }
  }, [url])

  return { data, error, loading }
}
