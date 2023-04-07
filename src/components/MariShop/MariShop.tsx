//Imports - Hooks/Utils
import { useState, useEffect } from "react"
import {
  compareBothValues,
  convertBlueCrystalToGold,
  generateCrystal,
  handleItemRarityColor,
  handleSortArray,
  mergeById,
} from "../../helpers/helpers"

//Imports - Types
import { marketAPI } from "../../types/typeMarketAPI"
import { dataAPI, localAPI } from "../../types/typeMariShop"

//Imports - Components
import { Dropdown } from "../Dropdown"
import { TableRow } from "../Table/TableRow"
import { ErrorMessage } from "../Messages/ErrorMessage"
import { LoadingMessage } from "../Messages/LoadingMessage"
import { MainContainer } from "../Layout/MainContainer"
import { BodyHeader } from "../Layout/BodyHeader"
import { CrystalCounter } from "./CrystalCounter"
import { MobileMariShop } from "./MobileMariShop"
import { BodyContainer } from "../Layout/BodyMainContainer"

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
    const finale = tempData.map((item: { quantity: number; lowPrice: number; rarity: number }) =>
      Object.assign(item, { total: item.quantity * item.lowPrice, rarity: item.rarity })
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

        ///Use this sorting if data type is a string
        if (typeof fa === "string") {
          if (fa < fb) return -1
          if (fa > fb) return 1
        }
        //Use this sorting if data type is a number
        if (typeof fa === "number") {
          return fa - fb
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
    <MainContainer>
      <BodyHeader title="Mari's Shop">
        <CrystalCounter crystal={crystal}></CrystalCounter>
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
      </BodyHeader>

      <BodyContainer>
        {isLoading && <LoadingMessage />}
        {error && <ErrorMessage />}
        {finalData && !error && !isLoading ? (
          <>
            <MobileMariShop finalData={finalData} crystal={crystal}></MobileMariShop>

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
                    className="text-right md:px-3"
                    onClick={() => applySorting("bluecrystal", !sorting.ascending)}
                  >
                    Price
                  </th>
                  <th
                    className="pr-2 text-right md:px-3"
                    onClick={() => applySorting("bluecrystal", !sorting.ascending)}
                  >
                    Crystal Value
                  </th>
                  <th
                    className="text-right md:px-3 "
                    onClick={() => applySorting("total", !sorting.ascending)}
                  >
                    Market Value
                  </th>
                  <th className="cursor-default pr-3 text-center md:px-3">Buy</th>
                </tr>
              </thead>

              <tbody className="text-[0.825rem] tracking-tighter ">
                {finalData.map(
                  ({ name, id, image, bluecrystal, quantity, lowPrice, total, rarity }) => {
                    return (
                      <tr key={id} className="border-b-[1px] border-text/10  hover:bg-primary">
                        {/* Item name */}
                        <TableRow position="justify-start">
                          <span
                            className={`mr-1 max-w-[35px] ring-1 ring-black/[.25] ${handleItemRarityColor(
                              rarity
                            )}`}
                          >
                            <img src={image} alt={name} className="select-none" />
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
                          <img src={blue} alt="blue" className="max-w-[20px] select-none" />
                        </TableRow>

                        {/* Crystal Value */}
                        <TableRow position="justify-end ">
                          <span className="font-numbers text-[0.9rem] font-medium">
                            {new Intl.NumberFormat().format(
                              convertBlueCrystalToGold(bluecrystal, crystal)
                            )}
                          </span>
                          <img src={gold} alt="gold" className="max-w-[25px] select-none" />
                        </TableRow>

                        {/* Market Price */}
                        <TableRow position="justify-end">
                          <span className="font-numbers text-[0.9rem] font-medium">
                            {new Intl.NumberFormat().format(total)}
                          </span>
                          <img src={gold} alt="gold" className="max-w-[25px] select-none" />
                        </TableRow>

                        {/* Buy from Mari or Market */}
                        <TableRow position="justify-center">
                          <div
                            className={`inline-flex min-w-[5.5rem] select-none items-center justify-center rounded bg-primary px-4 py-1 font-bold shadow-sm outline-none ring-1 ring-black/[.25] ${
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
                          </div>
                        </TableRow>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </table>
          </>
        ) : null}
      </BodyContainer>
    </MainContainer>
  )
}
