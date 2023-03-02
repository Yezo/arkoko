import { useState, useEffect } from "react"
import { Dropdown } from "./Dropdown"
import { Sparklines, SparklinesLine } from "react-sparklines"
import { TableNav } from "./TableNav"
import { TableRow } from "./TableRow"

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */
type marketAPI = {
  name: string
  quantity: number
  id: string
  gameCode: number | string
  image: string
  lowPrice: number
  cheapestRemaining: number
  recentPrice: number
  shortHistoric: unknown
}

export const Market = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const [data, setData] = useState<marketAPI[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [dropdown, setDropdown] = useState("Enhancement Material")
  const [region, setRegion] = useState("North America East")
  const [sorting, setSorting] = useState({
    key: "name",
    ascending: true,
  })

  /* -------------------------------------------------------------------------- */
  /*                                  CONSTANTS                                 */
  /* -------------------------------------------------------------------------- */
  const gold = "https://www.lostarkmarket.online/assets/icons/gold.png"
  const marketURL = `https://www.lostarkmarket.online/api/export-market-live/${region}?category=${dropdown}`

  /* -------------------------------------------------------------------------- */
  /*                             USEEFFECT: FETCHING                            */
  /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                                  TABLESORT                                 */
  /* -------------------------------------------------------------------------- */
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

  const sorted = (obj: any) =>
    Object.keys(obj)
      .sort()
      .reduce((accumulator: any, key: any) => {
        accumulator[key] = obj[key]

        return accumulator
      }, {})

  /* -------------------------------------------------------------------------- */
  /*                              RETURN COMPONENT                              */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="max-w-full p-3 md:p-5">
      <TableNav title="Marketplace">
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
      </TableNav>

      {/* {isLoading && <div>One moment while we fetch the data...</div>}
      {error && <div>There was an error fetching the data.</div>} */}
      {data ? (
        <table className="mt-10 min-w-full max-w-full">
          {/* //? === TABLE: HEADER COLUMNS === */}
          <thead className="cursor-pointer border-b-[1px] border-[#2B313A]">
            <tr className="">
              <th
                className="min-w-[10rem] pb-3 text-left  md:min-w-[20rem] md:px-3 "
                onClick={() => applySorting("name", !sorting.ascending)}
              >
                Name
              </th>
              <th
                className="table-header pb-3 text-right md:px-3"
                onClick={() => applySorting("lowPrice", !sorting.ascending)}
              >
                Lowest Price
              </th>
              <th
                className="table-header pb-3 text-right  md:px-3"
                onClick={() => applySorting("recentPrice", !sorting.ascending)}
              >
                Recent Price
              </th>

              <th
                className="table-header pb-3 text-right  md:px-3"
                onClick={() => applySorting("lowPrice", !sorting.ascending)}
              >
                Market Trend
              </th>
              <th
                className="table-header pb-3 pr-2 text-right  md:px-3 "
                onClick={() => applySorting("cheapestRemaining", !sorting.ascending)}
              >
                Quantity
              </th>
            </tr>
          </thead>

          {/* -------------------------------------------------------------------------- */
          /*                                 TABLE BODY                                 */
          /* -------------------------------------------------------------------------- */}
          <tbody className="text-[0.825rem] tracking-tighter ">
            {data.map(
              ({ name, id, image, lowPrice, cheapestRemaining, recentPrice, shortHistoric }) => {
                return (
                  <tr key={id} className="p-5 hover:bg-primary">
                    {/* Item name */}
                    <TableRow position="justify-start">
                      <span className="max-w-[35px]">
                        <img src={image} alt={name} />
                      </span>
                      <span>{name}</span>
                    </TableRow>

                    {/* Lowest Price */}
                    <TableRow position="justify-end">
                      <span className="font-numbers text-[0.9rem] font-medium">
                        {new Intl.NumberFormat().format(lowPrice)}
                      </span>
                      <img src={gold} alt="gold" />
                    </TableRow>

                    {/* Recent Price*/}
                    <TableRow position="justify-end">
                      <span className="font-numbers text-[0.9rem] font-medium">
                        {new Intl.NumberFormat().format(recentPrice)}
                      </span>
                      <img src={gold} alt="gold" />
                    </TableRow>

                    {/* Graph Trend */}
                    <TableRow position="justify-end pl-10">
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
                    <TableRow position="justify-end pl-10 pr-2">
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
      ) : null}
    </div>
  )
}
