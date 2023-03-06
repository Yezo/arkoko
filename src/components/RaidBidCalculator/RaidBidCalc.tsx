import { useState, useEffect } from "react"
import { Row } from "./Row"

export const RaidBidCalc = () => {
  const [value, setValue] = useState<number>(0)
  const [players, setPlayers] = useState<number>(8)
  const [taxedValue, setTaxedValue] = useState<number>(0)
  const [distributedValue, setDistributedValue] = useState<number>(0)
  const [breakevenValue, setBreakevenValue] = useState<number>(0)
  const [fairBidValue, setFairBidValue] = useState<number>(0)
  const [greedyValue, setGreedyValue] = useState<number>(0)

  const TAX_PERCENT = 0.05

  useEffect(() => {
    //The value of the item after accounting for marketplace tax of 5%
    const tax = value ? Math.floor(value * TAX_PERCENT) : 0
    setTaxedValue(tax)

    //Winning a bid on an item evenly distributes the amount paid to the remaining players and does not count the winner of the bid; therefore the distribution amount is the bid price divided by the amount of players minus one player (the bid winner)
    const distribution = value ? Math.floor(value / (players - 1)) : 0
    setDistributedValue(distribution)

    //Calculate the breakeven point after accounting for 5% marketplace tax + a distribution of gold between all remaining players in which all players including the bid winner get an even split of gold
    const breakeven = value ? Math.floor((value - taxedValue) * ((players - 1) / players)) : 0
    setBreakevenValue(breakeven)

    //The fair bid value where bidding against the current bid turns into a negative profit for the bidder
    const fair = value ? Math.floor(breakeven / 1.1) : 0
    setFairBidValue(fair)

    //gimmie gimmie
    const greed = value ? Math.floor(fair / 1.1) : 0
    setGreedyValue(greed)
  }, [value, players, taxedValue])

  //Handle the amount of profit the user wishes to get from the auction bid
  function handleValue(e: any) {
    const val = e.target.value
    setValue(parseInt(val))
  }

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-2">
      <div className="flex w-full flex-col justify-center pr-4">
        <div className="mb-4 flex flex-col justify-center gap-2">
          <h2 className="text-[0.85rem] font-bold tracking-wide">Number of Players</h2>
          <span className="flex gap-2">
            <button
              className={`flex w-full min-w-[3rem] items-center justify-center rounded bg-primary px-3 py-1 text-[0.8rem] font-bold ring-1 ring-black/[.50] transition-all focus:ring-2 focus:ring-black/[0.6] ${
                players === 4 ? "bg-text text-primary" : null
              }`}
              onClick={() => setPlayers(4)}
            >
              4
            </button>
            <button
              className={`flex w-full min-w-[3rem] items-center justify-center rounded bg-primary px-3 py-1 text-[0.8rem] font-bold ring-1 ring-black/[.50] transition-all focus:ring-2 focus:ring-black/[0.6] ${
                players === 8 ? "bg-text text-primary" : null
              } `}
              onClick={() => setPlayers(8)}
            >
              8
            </button>
          </span>
        </div>
        <div className="mb-2 flex flex-col justify-center gap-2">
          <label htmlFor="num" className="text-[0.85rem] font-bold tracking-normal">
            Auction House Price
          </label>
          <input
            type="number"
            id="num"
            onChange={handleValue}
            value={value}
            className=" block w-full rounded-lg bg-primary px-3 py-2 text-sm outline-none ring-1 ring-black/[.50] placeholder:text-xs placeholder:italic focus:ring-2 focus:ring-gray-600 "
            placeholder="Enter the value of an item..."
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4  md:px-14">
        <div className="min-w-[18rem] divide-y divide-text/10">
          <Row title={"Tax"} value={taxedValue} color={"text-red-500"} minus={true} />
          <Row
            title={"Distribution"}
            value={distributedValue}
            color={"text-red-500"}
            minus={true}
          />
          <Row title={"Breakeven"} value={breakevenValue} color={"text-green-500"} minus={false} />
          <Row title={"Fair Bid"} value={fairBidValue} color={"text-green-500"} minus={false} />
          <Row title={"Greedy"} value={greedyValue} color={"text-green-500"} minus={false} />
        </div>
      </div>
    </div>
  )
}
