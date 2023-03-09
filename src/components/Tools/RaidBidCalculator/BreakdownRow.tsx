import { formatNums } from "../../../helpers/helpers"
import { Hover } from "./Hover"

export const BidRow = ({ value }: { value: number }) => {
  return (
    <Hover tooltipText="This is the amount of gold you should be bidding in this respective scenario.">
      <div className="flex items-center justify-between">
        <div className="inline-flex  select-none items-center justify-center bg-[#1c5ca7] px-2 text-[0.6rem] font-bold uppercase tracking-wider text-text ring-1 ring-black/[.15]">
          Bid
        </div>
        <p
          className={`flex items-center justify-center text-[0.75rem] font-semibold ${
            value > 0 ? "text-[#63a7f5]" : ""
          } ${value === 0 && "text-text"}`}
        >
          {value && value <= 0 ? "-" : ""}
          {formatNums.format(value)}
          <img src="/gold.png" alt="gold" />
        </p>
      </div>
    </Hover>
  )
}

export const DistributionRow = ({
  value,
  calcDistribution,
}: {
  value: number
  calcDistribution: (val: number) => number
}) => {
  return (
    <Hover tooltipText="This is the amount of gold that every other player gains from the bid auction, split evenly amongst the remaining players.">
      <div className="flex items-center justify-between">
        <div className="inline-flex min-w-[50px] select-none items-center justify-center bg-[#992622]  px-2 text-[0.6rem] font-bold uppercase tracking-wider text-text ring-1 ring-black/[.15]">
          Distribution
        </div>
        <p
          className={` flex items-center justify-center 
          text-[0.75rem] font-semibold ${value > 0 ? "text-red-500" : ""} ${
            value === 0 && "text-text"
          }`}
        >
          {value && value > 0 ? "-" : null}
          {value && formatNums.format(calcDistribution(value))}

          <img src="/gold.png" alt="gold" />
        </p>
      </div>
    </Hover>
  )
}

export const GrossProfitRow = ({
  value,
  calcGrossProfit,
}: {
  value: number
  calcGrossProfit: (val: number) => number
}) => {
  return (
    <Hover tooltipText="Gross profit is the total amount of gold after tax that the bid winner gains from selling the item back to the Marketplace provided they bidded the amount listed in this scenario.">
      <div className="flex items-center justify-between">
        <div className="inline-flex min-w-[50px] select-none items-center justify-center bg-[#8f3cbc] px-2 text-[0.6rem] font-bold uppercase tracking-wider text-text ring-1 ring-black/[.15]">
          Gross Profit
        </div>
        <p
          className={`flex items-center justify-center text-[0.75rem] font-semibold    ${
            value > 0 ? "text-[#bb61eb]" : ""
          } ${value === 0 && "text-text"}`}
        >
          {value && value <= 0 ? "-" : null}
          {value && value > 0 ? "+" : null}
          {value && value === 0 ? "" : null}
          {formatNums.format(calcGrossProfit(value))}
          <img src="/gold.png" alt="gold" />
        </p>
      </div>
    </Hover>
  )
}

export const NetProfitRow = ({
  value,
  calcNetProfit,
}: {
  value: number
  calcNetProfit: (val: number) => number
}) => {
  return (
    <Hover tooltipText="Net profit is accounting for the distribution amount since there is opportunity cost where the user could have instead been the one receiving that distribution.">
      <div className="flex items-center justify-between">
        <div className="inline-flex min-w-[50px] select-none items-center justify-center bg-[#3E853E]  px-2 text-[0.6rem] font-bold uppercase tracking-wider text-text ring-1 ring-black/[.15]">
          Net Profit
        </div>
        <p
          className={`flex items-center justify-center text-[0.75rem] font-semibold  ${
            value > 0 ? "text-green-500" : ""
          } ${value === 0 && "text-text"}`}
        >
          {value && value <= 0 ? "-" : null}
          {value && value > 0 ? "+" : null}
          {value && value === 0 ? "" : null}
          {value && formatNums.format(calcNetProfit(value))}
          <img src="/gold.png" alt="gold" />
        </p>
      </div>
    </Hover>
  )
}
