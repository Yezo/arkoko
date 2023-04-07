//Imports - Hooks
import { useState, useEffect } from "react"
import useFetch from "../../hooks/useFetch"

//Imports - Components
import { Dropdown } from "../Dropdown"
import { TableRow } from "../Table/TableRow"
import { LoadingMessage } from "../Messages/LoadingMessage"
import { ErrorMessage } from "../Messages/ErrorMessage"

//Imports - Libs
import { handleItemRarityColor, sorted } from "../../helpers/helpers"
import { Sparklines, SparklinesLine } from "react-sparklines"

//Imports - Types
import { marketAPI } from "../../types/typeMarketAPI"
import { BodyHeader } from "../Layout/BodyHeader"
import { BodyContainer } from "../Layout/BodyMainContainer"
import { MainContainer } from "../Layout/MainContainer"

export const Marketplace = () => {
  //States
  const [marketData, setMarketData] = useState<marketAPI[] | null>(null)
  const [dropdown, setDropdown] = useState("Enhancement Material")
  const [region, setRegion] = useState("North America East")
  const [sorting, setSorting] = useState({
    key: "name",
    ascending: true,
  })
  //Constants
  const gold = "/gold.png"
  const marketURL = `https://www.lostarkmarket.online/api/export-market-live/${region}?category=${dropdown}`
  const { data: data, loading, error } = useFetch(marketURL)

  //UseEffect
  useEffect(() => {
    if (data) {
      setMarketData(data)
    } else {
      setMarketData(null)
    }
  }, [data])

  //Tablesort
  useEffect(() => {
    if (marketData) {
      //Prevent mutation
      const currentData = [...marketData]

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

      setMarketData(sorting.ascending ? sortedHeaders : sortedHeaders.reverse())
    }
  }, [sorting.ascending, sorting.key])

  function applySorting(key: string, ascending: boolean) {
    setSorting({
      key: key,
      ascending: ascending,
    })
  }

  return (
    <MainContainer>
      <BodyHeader title="Marketplace">
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
      </BodyHeader>

      <BodyContainer>
        {loading && <LoadingMessage />}
        {error && <ErrorMessage />}
        {data && !error && !loading ? (
          <>
            <table className="min-w-full max-w-full ">
              <thead className="cursor-pointer border-b-[1px] border-text/10">
                <tr>
                  <th
                    className="select-none py-3 pl-2 text-left md:px-3"
                    onClick={() => applySorting("name", !sorting.ascending)}
                  >
                    Name
                  </th>
                  <th
                    className="select-none text-right md:px-3"
                    onClick={() => applySorting("lowPrice", !sorting.ascending)}
                  >
                    Lowest Price
                  </th>
                  <th
                    className="select-none pr-2 text-right md:px-3"
                    onClick={() => applySorting("recentPrice", !sorting.ascending)}
                  >
                    Recent Price
                  </th>

                  <th
                    className="hidden select-none sm:table-cell md:px-3"
                    onClick={() => applySorting("lowPrice", !sorting.ascending)}
                  >
                    Market Trend
                  </th>
                  <th
                    className="hidden select-none pr-3 text-right md:table-cell md:px-3"
                    onClick={() => applySorting("cheapestRemaining", !sorting.ascending)}
                  >
                    Quantity
                  </th>
                </tr>
              </thead>

              <tbody className="text-[0.825rem] tracking-tighter ">
                {marketData &&
                  marketData.map(
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
      </BodyContainer>
    </MainContainer>
  )
}
