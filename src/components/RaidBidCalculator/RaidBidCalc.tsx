import { useState, useEffect } from "react";
import { RaidBidRow } from "./RaidBidRow";

export const RaidBidCalc = () => {
  const gold = "https://www.lostarkmarket.online/assets/icons/gold.png";
  const [value, setValue] = useState<number>(0);
  const [players, setPlayers] = useState<number>(8);
  const [evenSplit, setEvenSplit] = useState<number>(0);
  const [quarterSplit, setQuarterSplit] = useState<number>(0);
  const [halfSplit, setHalfSplit] = useState<number>(0);
  const [seventySplit, setSeventySplit] = useState<number>(0);
  const [cutoffSplit, setCutoffSplit] = useState<number>(0);
  const buttonClass =
    "flex items-center justify-center px-3 py-1 ring-1 ring-black/[.50] bg-primary rounded w-full text-[0.8rem] font-bold transition-all focus:ring-2 focus:ring-black/[0.6]";

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  //!Handle the amount of profit the user wishes to get from the auction bid
  function handleValue(e: any) {
    const val = e.target.value;
    setValue(parseInt(val));
  }

  //!Value after tax is 0.95% of the original value. 95/4 = each person max can get 23.75%, so one person needs to bid 23.753 = 71.25% of the item's value. This is the max where everyone gets equal value, because if you bid more than 71.25%, you lose money. For 8 people, the same expression results in an 83.125% bid.

  useEffect(() => {
    players === 8
      ? setEvenSplit(
          Math.floor(
            value -
              handleEvenSplit(value) -
              (value - value * 0.95) -
              handleEvenSplit(value) / 7
          )
        )
      : setEvenSplit(
          Math.floor(
            value -
              handleEvenSplit(value) -
              (value - value * 0.95) -
              handleEvenSplit(value) / 3
          )
        );

    players === 8
      ? setQuarterSplit(
          Math.floor(
            value -
              handle25Split(value) -
              (value - value * 0.95) -
              handle25Split(value) / 7
          )
        )
      : setQuarterSplit(
          Math.floor(
            value -
              handle25Split(value) -
              (value - value * 0.95) -
              handle25Split(value) / 3
          )
        );

    players === 8
      ? setHalfSplit(
          Math.floor(
            value -
              handle50Split(value) -
              (value - value * 0.95) -
              handle50Split(value) / 7
          )
        )
      : setHalfSplit(
          Math.floor(
            value -
              handle50Split(value) -
              (value - value * 0.95) -
              handle50Split(value) / 3
          )
        );

    players === 8
      ? setSeventySplit(
          Math.floor(
            value -
              handle75Split(value) -
              (value - value * 0.95) -
              handle75Split(value) / 7
          )
        )
      : setSeventySplit(
          Math.floor(
            value -
              handle75Split(value) -
              (value - value * 0.95) -
              handle75Split(value) / 3
          )
        );

    players === 8
      ? setCutoffSplit(
          Math.floor(
            value -
              handleCutoffSplit(value) -
              (value - value * 0.95) -
              handleCutoffSplit(value) / 7
          )
        )
      : setCutoffSplit(
          Math.floor(
            value -
              handleCutoffSplit(value) -
              (value - value * 0.95) -
              handleCutoffSplit(value) / 3
          )
        );
  }, [value, players, handle25Split, handleEvenSplit, handle50Split]);

  function handleEvenSplit(num: number): number {
    if (num && players === 8) return Math.floor(num * 0.83125);
    if (num && players === 4) return Math.floor(num * 0.7125);
    return 0;
  }

  function handle25Split(num: number): number {
    if (players === 8) return Math.floor(num * 0.811);
    if (players === 4) return Math.floor(num * 0.6952);
    return 0;
  }

  function handle50Split(num: number): number {
    if (players === 8) return Math.floor(num * 0.7916);
    if (players === 4) return Math.floor(num * 0.6786);
    return 0;
  }

  function handle75Split(num: number): number {
    if (players === 8) return Math.floor(num * 0.7732);
    if (players === 4) return Math.floor(num * 0.6628);
    return 0;
  }

  function handleCutoffSplit(num: number): number {
    if (players === 8) return Math.floor(num * 0.7556);
    if (players === 4) return Math.floor(num * 0.6478);
    return 0;
  }

  return (
    <div>
      <div className="flex ">
        {/* LEFT SIDE */}
        <div className="flex w-full basis-1/2 flex-col justify-center pr-4">
          <div className="mb-4 flex flex-col justify-center gap-2">
            <h2 className="text-[0.85rem] font-bold tracking-wide">
              Number of Players
            </h2>
            <span className="flex gap-2">
              <button
                className={`${buttonClass} ${
                  players === 4 ? "bg-text text-primary" : null
                }`}
                onClick={() => setPlayers(4)}
              >
                4
              </button>
              <button
                className={`${buttonClass} ${
                  players === 8 ? "bg-text text-primary" : null
                } `}
                onClick={() => setPlayers(8)}
              >
                8
              </button>
            </span>
          </div>
          <div className="mb-2 flex flex-col justify-center gap-2">
            <label
              htmlFor="num"
              className="text-[0.85rem] font-bold tracking-normal"
            >
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

        {/* RIGHT SIDE */}

        <div className="w-full basis-1/2  px-14">
          <div className="flex justify-end border-b border-text/[.05] p-1.5">
            <div className="flex basis-1/3 items-center justify-center font-bold  uppercase tracking-tighter">
              <div>Bid</div>
            </div>
            <div className="flex basis-1/3 items-center justify-center">
              <span></span>
            </div>
            <div className="flex basis-1/3 items-center justify-center">
              <span className="flex items-center justify-center gap-1 font-bold uppercase tracking-tighter">
                <span>Profit</span>
              </span>
            </div>
          </div>

          <RaidBidRow
            title="Cutoff"
            value={value}
            split={cutoffSplit}
            gold={gold}
            handleSplit={handleCutoffSplit}
          />

          <RaidBidRow
            title="75%"
            value={value}
            split={seventySplit}
            gold={gold}
            handleSplit={handle75Split}
          />

          <RaidBidRow
            title="50%"
            value={value}
            split={halfSplit}
            gold={gold}
            handleSplit={handle50Split}
          />
          <RaidBidRow
            title="25%"
            value={value}
            split={quarterSplit}
            gold={gold}
            handleSplit={handle25Split}
          />

          <RaidBidRow
            title="Even"
            value={value}
            split={evenSplit}
            gold={gold}
            handleSplit={handleEvenSplit}
          />
        </div>
      </div>
    </div>
  );
};
