import { useState, useEffect } from "react"
import { Dropdown } from "./Dropdown"
import { TableNav } from "./TableNav"
import { TableRow } from "./TableRow"
import { marketAPI, localAPI, dataAPI } from "../types/typeMariShop"
import {
  generateCrystal,
  convertBlueCrystalToGold,
  handleSortArray,
  mergeById,
  compareBothValues,
} from "../helpers/helpers"

export const Mari = () => {
  //States
  const [region, setRegion] = useState("North America East")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [marketDataAPI, setMarketDataAPI] = useState<marketAPI[] | null>([])
  const [localDataAPI, setLocalDataAPI] = useState<localAPI[] | null>([])
  const [finalData, setFinalData] = useState<dataAPI[] | null>([])
  const [crystal, setCrystal] = useState(0)
  const [sorting, setSorting] = useState({
    key: "name",
    ascending: true,
  })

  //Constants
  const gold = "/gold.png"
  const blue = "/bluecrystal.png"
  const localApiURL = `https://arkoko-api.onrender.com/api/marishop`
  const blueCrystalURL = `https://www.lostarkmarket.online/api/export-market-live/${region}?category=Currency Exchange`
  const apiURL = `https://www.lostarkmarket.online/api/export-market-live/${region}?items=honor-shard-pouch-l-3,honor-shard-pouch-s-1,great-honor-leapstone-2,honor-leapstone-2,solar-grace-1,solar-blessing-2,solar-protection-3,basic-oreha-fusion-material-2,simple-oreha-fusion-material-1,superior-oreha-fusion-material-4,crystallized-destruction-stone-0,crystallized-guardian-stone-0,marvelous-honor-leapstone-3`

  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      setError(false)
      setIsLoading(true)
      try {
        //Fetching the current value of Blue Crystals
        const resBlueCrystal = await fetch(blueCrystalURL)
        const dataBlueCrystal = await resBlueCrystal.json()
        setCrystal(generateCrystal(dataBlueCrystal[0].lowPrice))

        //Fetching item data from the external API
        const data = await fetch(apiURL)
        const jsonData = await data.json()
        setMarketDataAPI(handleSortArray(jsonData))

        //Fetching item data from our local API
        const resLocalAPI = await fetch(localApiURL)
        const dataLocalAPI = await resLocalAPI.json()
        setLocalDataAPI(dataLocalAPI)
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
  }, [region])

  // Preventing infinite loops;
  useEffect(() => {
    //Merge local and external API data together into one array
    const tempData = mergeById(localDataAPI, marketDataAPI)

    //Adding new key value pairs to existing data
    const finale = tempData.map((item: { quantity: number; lowPrice: number }) =>
      Object.assign(item, { total: item.quantity * item.lowPrice })
    )

    setFinalData(finale)
  }, [marketDataAPI, localDataAPI])

  // Tablesort
  useEffect(() => {
    if (finalData) {
      const currentData = [...finalData]

      const sortedHeaders = currentData.sort((a, b) => {
        let fa = a[sorting.key]
        let fb = b[sorting.key]

        if (typeof fa === "string") {
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        }
        if (typeof fa === "number") {
          return a[sorting.key] - b[sorting.key]
        } else return 0
      })

      setFinalData(sorting.ascending ? sortedHeaders : sortedHeaders.reverse())
    }
  }, [sorting.ascending, sorting.key])

  function applySorting(key: any, ascending: any) {
    setSorting({
      key: key,
      ascending: ascending,
    })
  }

  return (
    <div className="max-w-full p-3 md:p-5">
      <TableNav title="Mari's Shop">
        <div className="rounded bg-primary px-3 py-2 ring-1 ring-black/[.40]">
          <span className="flex items-center justify-center  gap-2">
            <span className="flex items-center font-numbers text-[0.9rem] font-medium">
              95
              <img src={blue} alt="blue crystal" className="mb-[0.15rem] w-4" />
            </span>
            /
            <span className="flex items-center font-numbers text-[0.9rem] font-medium ">
              {crystal}
              <img src={gold} alt="gold" className="w-5" />
            </span>
          </span>
        </div>
        <Dropdown
          options={[
            "North America East",
            "North America West",
            "Europe Central",
            "Europe West",
            "South America",
          ]}
          setter={setRegion}
          placeholder={region}
        ></Dropdown>
      </TableNav>

      {error ? (
        <div className="grid place-items-center py-40">
          There was an error while fetching the data.
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="grid place-items-center py-40">
              One moment while we fetch the data...
            </div>
          ) : localDataAPI && finalData && !error ? (
            <table className="mt-10 min-w-full max-w-full">
              <thead className="cursor-pointer border-b-[1px] border-[#2B313A]">
                <tr className="">
                  <th
                    className="min-w-[10rem] pb-3 text-left md:min-w-[20rem] md:px-3"
                    onClick={() => {
                      applySorting("name", !sorting.ascending)
                    }}
                  >
                    Name
                  </th>
                  <th
                    className="table-header pb-3 text-right md:px-3"
                    onClick={() => applySorting("bluecrystal", !sorting.ascending)}
                  >
                    Price
                  </th>
                  <th
                    className="table-header pb-3 text-right md:px-3"
                    onClick={() => applySorting("bluecrystal", !sorting.ascending)}
                  >
                    Crystal Value
                  </th>
                  <th
                    className="table-header pb-3 text-right md:px-3"
                    onClick={() => applySorting("total", !sorting.ascending)}
                  >
                    Market Value
                  </th>
                  <th
                    className="table-header pb-3 text-center md:px-3"
                    onClick={() => applySorting("bluecrystal", !sorting.ascending)}
                  >
                    Buy
                  </th>
                </tr>
              </thead>
              <tbody className="text-[0.825rem] tracking-tighter ">
                {finalData.map(({ name, id, image, bluecrystal, quantity, lowPrice, total }) => {
                  return (
                    <tr key={id} className="p-5 hover:bg-primary">
                      {/* Item name */}
                      <TableRow position="justify-start">
                        <span className="max-w-[35px]">
                          <img src={image} alt={name} />
                        </span>
                        <span className="flex items-center gap-1">
                          {name}
                          <span className="text-[0.7rem] text-gray-600 ">x{quantity}</span>
                        </span>
                      </TableRow>

                      {/* Price */}
                      <TableRow position="justify-end">
                        <span className="font-numbers text-[0.9rem] font-medium">
                          {bluecrystal}
                        </span>
                        <img src={blue} alt="blue" className="max-w-[20px]" />
                      </TableRow>

                      {/* Crystal Value */}
                      <TableRow position="justify-end">
                        <span className="font-numbers text-[0.9rem] font-medium">
                          {new Intl.NumberFormat().format(
                            convertBlueCrystalToGold(bluecrystal, crystal)
                          )}
                        </span>
                        <img src={gold} alt="gold" className="max-w-[25px]" />
                      </TableRow>

                      {/* Market Price */}
                      <TableRow position="justify-end">
                        <span className="font-numbers text-[0.9rem] font-medium">
                          {new Intl.NumberFormat().format(total)}
                        </span>
                        <img src={gold} alt="gold" className="max-w-[25px]" />
                      </TableRow>

                      {/* Buy from Mari or Market */}
                      <TableRow position="justify-center">
                        <button
                          className={`min-w-[5.5rem] rounded bg-primary px-3 py-1 font-bold ring-1 ring-black/[.25] ${
                            compareBothValues(
                              convertBlueCrystalToGold(bluecrystal, crystal),
                              lowPrice * quantity
                            ) === "MARKET"
                              ? "bg-green-800"
                              : "bg-red-900"
                          }`}
                        >
                          {compareBothValues(
                            convertBlueCrystalToGold(bluecrystal, crystal),
                            lowPrice * quantity
                          )}
                        </button>
                      </TableRow>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : null}
        </>
      )}
    </div>
  )
}
