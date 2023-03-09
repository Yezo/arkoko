import { useState, useEffect } from "react"
import { marketAPI } from "../../types/typeMarketAPI"
import { Dropdown } from "../Dropdown"
import { TableRow } from "../Table/TableRow"
import { dataAPI, localAPI } from "../../types/typeMariShop"
import { ErrorMessage } from "../Messages/ErrorMessage"
import { LoadingMessage } from "../Messages/LoadingMessage"
import {
  compareBothValues,
  convertBlueCrystalToGold,
  generateCrystal,
  handleSortArray,
  mergeById,
} from "../../helpers/helpers"

export const MariShop = () => {
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
  // const localApiURL = `http://localhost:8080/api/marishop`
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
    <main className="w-full overflow-y-hidden bg-primary pt-5 font-primary text-sm">
      <div className="mx-auto max-w-5xl rounded  p-4">
        <div className=" flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:border-l-4 sm:border-accent">
          <h2 className=" pl-2 text-2xl tracking-tight">Mari's Shop</h2>
          <div className="flex max-w-fit flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
            <div className="rounded  bg-secondary px-3 py-2 text-[0.845rem] shadow-md ring-1 ring-black/[.15]">
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
              key="2"
            ></Dropdown>
          </div>
        </div>

        <div className="mt-4 min-h-[33rem] rounded-lg bg-secondary p-6 shadow-md ring-1 ring-black/[.15] sm:min-h-[42rem] lg:min-h-[47rem]">
          {error ? (
            <ErrorMessage />
          ) : (
            <>
              {isLoading ? (
                <LoadingMessage />
              ) : localDataAPI && finalData && !error ? (
                <>
                  <div className="flex flex-col gap-4 font-primary text-[0.825rem] tracking-tighter sm:hidden ">
                    {finalData.map(
                      ({ name, id, image, bluecrystal, quantity, lowPrice, total }) => {
                        return (
                          <div
                            key={id}
                            className="ring-1- space-y-4 rounded bg-[#2D2D3B] px-8 py-4 text-sm shadow-md ring-black/10"
                          >
                            <div className="flex items-center justify-between text-right text-lg font-bold">
                              <span className="max-w-[35px]">
                                <img src={image} alt={name} />
                              </span>
                              <span className="max-w-[10rem]">{name}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Quantity</span>
                              <span className="flex items-center gap-1 font-numbers">
                                {quantity}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Blue Crystal</span>
                              <span className="flex items-center gap-1 font-numbers">
                                {bluecrystal}
                                <img src={blue} alt="blue crystal" className="max-w-[20px]" />
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Crystal Value</span>
                              <span className="flex items-center gap-1 font-numbers">
                                {new Intl.NumberFormat().format(
                                  convertBlueCrystalToGold(bluecrystal, crystal)
                                )}
                                <img src={gold} alt="gold" className="max-w-[20px]" />
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Market Value</span>
                              <span className="flex items-center gap-1 font-numbers">
                                {total}
                                <img src={gold} alt="gold" className="max-w-[20px]" />
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Buy From?</span>
                              <span className="flex items-center">
                                <button
                                  className={`font-bold tracking-wide  ${
                                    compareBothValues(
                                      convertBlueCrystalToGold(bluecrystal, crystal),
                                      lowPrice * quantity
                                    ) === "Market"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {compareBothValues(
                                    convertBlueCrystalToGold(bluecrystal, crystal),
                                    lowPrice * quantity
                                  )}
                                </button>
                              </span>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>
                  <table className="hidden min-w-full max-w-full sm:table">
                    <thead className="cursor-pointer border-b-[1px] border-text/10">
                      <tr>
                        <th
                          className="py-3 pl-2 text-left md:px-3"
                          onClick={() => applySorting("name", !sorting.ascending)}
                        >
                          Name
                        </th>
                        <th
                          className="text-right  md:px-3"
                          onClick={() => applySorting("lowPrice", !sorting.ascending)}
                        >
                          Price
                        </th>
                        <th
                          className="pr-2 text-right md:px-3"
                          onClick={() => applySorting("recentPrice", !sorting.ascending)}
                        >
                          Crystal Value
                        </th>
                        <th
                          className="text-right md:px-3 "
                          onClick={() => applySorting("lowPrice", !sorting.ascending)}
                        >
                          Market Value
                        </th>
                        <th
                          className=" pr-3 text-center md:px-3"
                          onClick={() => applySorting("cheapestRemaining", !sorting.ascending)}
                        >
                          Buy
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[0.825rem] tracking-tighter ">
                      {finalData.map(
                        ({ name, id, image, bluecrystal, quantity, lowPrice, total }) => {
                          return (
                            <tr
                              key={id}
                              className="border-b-[1px] border-text/10  hover:bg-primary"
                            >
                              {/* Item name */}
                              <TableRow position="justify-start">
                                <span className="max-w-[35px]">
                                  <img src={image} alt={name} />
                                </span>
                                <span className="flex items-center gap-1">
                                  {name}
                                  <span className="text-[0.7rem] text-gray-600">x{quantity}</span>
                                </span>
                              </TableRow>

                              {/* Price */}
                              <TableRow position="justify-end ">
                                <span className="font-numbers text-[0.9rem] font-medium">
                                  {bluecrystal}
                                </span>
                                <img src={blue} alt="blue" className="max-w-[20px]" />
                              </TableRow>

                              {/* Crystal Value */}
                              <TableRow position="justify-end ">
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
                                    ) === "Market"
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
                        }
                      )}
                    </tbody>
                  </table>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
