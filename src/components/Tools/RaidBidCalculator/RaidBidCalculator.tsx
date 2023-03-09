import { useState, useEffect } from "react"
import { BidRow, DistributionRow, GrossProfitRow, NetProfitRow } from "./BreakdownRow"
import { Hover } from "./Hover"
import { formatNums } from "../../../helpers/helpers"

export const RaidBidCalculator = () => {
  const [value, setValue] = useState<number>(0)
  const [tax, setTax] = useState<number>(0)
  const [players, setPlayers] = useState<number>(8)
  const [taxedValue, setTaxedValue] = useState<number>(0)
  const [distributedValue, setDistributedValue] = useState<number>(0)
  const [breakevenValue, setBreakevenValue] = useState<number>(0)
  const [fairBidValue, setFairBidValue] = useState<number>(0)
  const [greedyValue, setGreedyValue] = useState<number>(0)

  const TAX_PERCENT = 0.05

  useEffect(() => {
    //The value of the item after accounting for marketplace tax of 5%
    setTax(value ? Math.floor(value * TAX_PERCENT) : 0)

    //Value after getting taxed
    setTaxedValue(value ? value - tax : 0)

    //Winning a bid on an item evenly distributes the amount paid to the remaining players and does not count the winner of the bid; therefore the distribution amount is the bid price divided by the amount of players minus one player (the bid winner)
    setDistributedValue(value ? Math.floor(value / (players - 1)) : 0)

    //Calculate the breakeven point after accounting for 5% marketplace tax + a distribution of gold between all remaining players in which all players including the bid winner get an even split of gold
    setBreakevenValue(value ? Math.floor((value - tax) * ((players - 1) / players)) : 0)

    //The fair bid value where bidding against the current bid turns into a negative profit for the bidder
    setFairBidValue(value ? Math.floor(breakevenValue / 1.1) : 0)

    //gimmie gimmie
    setGreedyValue(value ? Math.floor(fairBidValue / 1.1) : 0)
  }, [value, players, taxedValue, tax, breakevenValue, fairBidValue, greedyValue])

  function handleValue(e: any) {
    const val = e.target.value
    setValue(parseInt(val))
  }

  function calcDistribution(val: number) {
    return val ? Math.floor(val / (players - 1)) : 0
  }
  function calcGrossProfit(val: number) {
    return val ? Math.floor(taxedValue - val) : 0
  }

  function calcNetProfit(val: number) {
    return val ? Math.floor(taxedValue - val - val / (players - 1)) : 0
  }
  return (
    <div className="mx-auto flex max-w-xl  flex-col gap-12">
      <div className="flex w-full flex-col justify-center pr-4">
        <div className="mb-4 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[0.85rem] font-bold tracking-wide ">Number of Players</h2>
            <Hover tooltipText="The total amount of players in the raid">
              <div className="hidden rounded-full text-text/40 transition-colors delay-150 hover:text-accent lg:inline-flex ">
                <InfoTooltipSVG />
              </div>
            </Hover>
          </div>
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
        <div className="mb-2 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="num" className="text-[0.85rem] font-bold tracking-normal">
              Item Market Value
            </label>
            <Hover tooltipText="This is how much the current auction item is listed for in the Marketplace.">
              <div className="hidden rounded-full text-text/40 transition-colors delay-150 hover:text-accent lg:inline-flex">
                <InfoTooltipSVG />
              </div>
            </Hover>
          </div>
          <input
            type="number"
            id="num"
            onChange={handleValue}
            value={value}
            className=" block w-full rounded-lg bg-primary px-3 py-2 text-sm outline-none ring-1 ring-black/[.50] placeholder:text-xs placeholder:italic focus:ring-2 focus:ring-gray-600 "
            placeholder="Enter the winning bid amount..."
          />
        </div>
      </div>

      <div className=" flex w-full flex-col justify-center gap-2 divide-y divide-text/10 ">
        <div className="flex flex-col justify-between gap-4 py-3 sm:flex-row">
          <div className="basis-3/5">
            <h3 className="text-lg font-semibold tracking-tight">Constants</h3>
            <p className="max-w-[34ch] text-xs italic opacity-60">
              These are variables that won't change no matter what. Don't forget there is a 5%
              marketplace tax.
            </p>
          </div>
          <div className="basis-2/5 text-right">
            <Hover tooltipText="This is how much the current auction item is listed for in the Marketplace.">
              <div className="flex items-center justify-between">
                <div className="inline-flex min-w-[50px] select-none items-center justify-center bg-text px-2 text-[0.6rem] font-bold uppercase tracking-wider text-primary ring-1 ring-black/[.15]">
                  Value
                </div>

                <p className="flex items-center justify-center text-[0.75rem] font-semibold">
                  {value ? formatNums.format(value) : 0}
                  <img src="/gold.png" alt="gold" />
                </p>
              </div>
            </Hover>
            <Hover tooltipText="There is a 5% marketplace tax for listing an item.">
              <div className="flex items-center justify-between">
                <div className="inline-flex min-w-[50px] select-none items-center justify-center bg-text px-2 text-[0.6rem] font-bold uppercase tracking-wider text-primary ring-1 ring-black/[.15]">
                  Market tax
                </div>
                <p className="flex items-center justify-center text-[0.75rem] font-semibold">
                  {formatNums.format(tax)}
                  <img src="/gold.png" alt="gold" />
                </p>
              </div>
            </Hover>
            <Hover tooltipText="The value of the item after accounting for marketplace tax.">
              <div className="flex items-center justify-between">
                <div className="inline-flex min-w-[50px] select-none items-center justify-center bg-text px-2 text-[0.6rem] font-bold uppercase tracking-wider text-primary ring-1 ring-black/[.15]">
                  After Tax
                </div>
                <p className="flex items-center justify-center text-[0.75rem] font-semibold">
                  {formatNums.format(taxedValue)}
                  <img src="/gold.png" alt="gold" />
                </p>
              </div>
            </Hover>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 py-3 sm:flex-row">
          <div className="basis-3/5">
            <h3 className="text-lg font-semibold tracking-tight">Breakeven Scenario</h3>
            <p className="max-w-[34ch] text-xs italic opacity-60">
              Every other remaining player in the raid, including the bid winner, gains the exact
              same amount of gold from the auction bid.
            </p>
          </div>
          <div className="basis-2/5 text-right">
            <BidRow value={breakevenValue} />
            <DistributionRow value={breakevenValue} calcDistribution={calcDistribution} />
            <NetProfitRow value={0} calcNetProfit={calcNetProfit} />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 py-3 sm:flex-row">
          <div className="basis-3/5">
            <h3 className="text-lg font-semibold tracking-tight">Fair Bid Scenario</h3>
            <p className="max-w-[34ch] text-xs italic opacity-60">
              The bid winner makes extra profit compared to all other players in the raid for
              selling the item on the marketplace themselves.
            </p>
          </div>
          <div className="basis-2/5 text-right">
            <BidRow value={fairBidValue} />
            <DistributionRow value={fairBidValue} calcDistribution={calcDistribution} />
            <GrossProfitRow value={fairBidValue} calcGrossProfit={calcGrossProfit} />
            <NetProfitRow value={fairBidValue} calcNetProfit={calcNetProfit} />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 py-3 sm:flex-row">
          <div className="basis-3/5">
            <h3 className="text-lg font-semibold tracking-tight">Greedy Bid Scenario</h3>
            <p className="max-w-[34ch] text-xs italic opacity-60">
              I want <strong>more</strong> gold.
            </p>
          </div>
          <div className="basis-2/5 text-right">
            <Hover tooltipText={"Hi"}>
              <BidRow value={greedyValue} />
            </Hover>
            <DistributionRow value={greedyValue} calcDistribution={calcDistribution} />
            <GrossProfitRow value={greedyValue} calcGrossProfit={calcGrossProfit} />
            <NetProfitRow value={greedyValue} calcNetProfit={calcNetProfit} />
          </div>
        </div>
      </div>
    </div>
  )
}

const InfoTooltipSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  )
}
