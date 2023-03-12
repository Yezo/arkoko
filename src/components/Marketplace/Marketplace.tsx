import { useState, useEffect } from "react"
import { Sparklines, SparklinesLine } from "react-sparklines"
import { marketAPI } from "../../types/typeMarketAPI"
import { handleItemRarityColor, sorted } from "../../helpers/helpers"
import { Dropdown } from "../Dropdown"
import { TableRow } from "../Table/TableRow"
import { LoadingMessage } from "../Messages/LoadingMessage"
import { ErrorMessage } from "../Messages/ErrorMessage"

export const Marketplace = () => {
  //States
  const [data, setData] = useState<marketAPI[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [dropdown, setDropdown] = useState("Enhancement Material")
  const [region, setRegion] = useState("North America East")
  const [sorting, setSorting] = useState({
    key: "name",
    ascending: true,
  })

  //Constants
  const gold = "/gold.png"
  const marketURL = `https://www.lostarkmarket.online/api/export-market-live/${region}?category=${dropdown}`

  //Fetching data
  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      setError(false)
      setIsLoading(true)
      try {
        const data = await fetch(marketURL, { signal: controller.signal })
        const jsonData = await data.json()
        setData(jsonData)
      } catch (error) {
        controller.signal.aborted ? console.log("Aborted the fetch") : setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAPI()
    return () => {
      controller.abort()
    }
  }, [dropdown, region])

  //Tablesort
  useEffect(() => {
    if (data) {
      const currentData = [...data]

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

      setData(sorting.ascending ? sortedHeaders : sortedHeaders.reverse())
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
          <h2 className=" pl-2 text-2xl tracking-tight">Marketplace</h2>
          <div className="flex max-w-fit flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
            <Dropdown
              options={[
                "Enhancement Material",
                "Combat Supplies",
                "Cooking",
                "Trader",
                "Adventurer's Tome",
                "Sailing",
                "Pets",
                "Mount",
                "Gem Chest",
              ]}
              setter={setDropdown}
              placeholder={dropdown}
              key="1"
            ></Dropdown>
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
          {isLoading && <LoadingMessage />}
          {error && <ErrorMessage />}
          {data && !error && !isLoading ? (
            <>
              <table className="min-w-full max-w-full ">
                <thead className="cursor-pointer border-b-[1px] border-text/10">
                  <tr>
                    <th
                      className="py-3 pl-2 text-left md:px-3"
                      onClick={() => applySorting("name", !sorting.ascending)}
                    >
                      Name
                    </th>
                    <th
                      className="text-right md:px-3 "
                      onClick={() => applySorting("lowPrice", !sorting.ascending)}
                    >
                      Lowest Price
                    </th>
                    <th
                      className="pr-2 text-right md:px-3 "
                      onClick={() => applySorting("recentPrice", !sorting.ascending)}
                    >
                      Recent Price
                    </th>

                    <th
                      className="hidden sm:table-cell md:px-3 "
                      onClick={() => applySorting("lowPrice", !sorting.ascending)}
                    >
                      Market Trend
                    </th>
                    <th
                      className="hidden pr-3 text-right md:table-cell md:px-3 "
                      onClick={() => applySorting("cheapestRemaining", !sorting.ascending)}
                    >
                      Quantity
                    </th>
                  </tr>
                </thead>

                <tbody className="text-[0.825rem] tracking-tighter ">
                  {data.map(
                    ({
                      name,
                      id,
                      image,
                      lowPrice,
                      cheapestRemaining,
                      recentPrice,
                      shortHistoric,
                      rarity,
                    }) => {
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
                            <span>{name}</span>
                          </TableRow>

                          {/* Lowest Price */}
                          <TableRow position="justify-end ">
                            <span className="font-numbers text-[0.9rem] font-medium">
                              {new Intl.NumberFormat().format(lowPrice)}
                            </span>
                            <img src={gold} alt="gold" className="select-none" />
                          </TableRow>

                          {/* Recent Price*/}
                          <TableRow position="justify-end">
                            <span className="font-numbers text-[0.9rem] font-medium">
                              {new Intl.NumberFormat().format(recentPrice)}
                            </span>
                            <img src={gold} alt="gold" className="select-none" />
                          </TableRow>

                          {/* Graph Trend */}
                          <TableRow position="justify-center hidden sm:block">
                            {
                              <Sparklines data={Object.values(sorted(shortHistoric))}>
                                <SparklinesLine
                                  style={{
                                    stroke: "#b7c2d0",
                                    strokeWidth: "5",
                                    strokeOpacity: "0.8",
                                    fill: "#627897",
                                    fillOpacity: "0.7",
                                  }}
                                />
                              </Sparklines>
                            }
                          </TableRow>

                          {/* Quantity */}
                          <TableRow position="justify-end  hidden md:flex">
                            <span className="font-numbers text-[0.9rem] font-medium">
                              {new Intl.NumberFormat().format(cheapestRemaining)}
                            </span>
                          </TableRow>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      </div>
    </main>
  )
}
