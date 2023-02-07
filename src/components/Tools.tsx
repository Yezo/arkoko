import { useState } from "react";
import { Button } from "./Button";
import { OrehaCalc } from "./OrehaCalculator/OrehaCalc";
import { RaidBidCalc } from "./RaidBidCalculator/RaidBidCalc";
import { TableNav } from "./TableNav";

export const Tools = () => {
  const [category, setCategory] = useState<string>("Oreha Calc");

  return (
    <div className="flex max-w-full flex-col gap-5 p-3 md:p-5">
      <TableNav title={category ? category : "Tools"}>
        <Button title="Auction Bid Calc" categorySetter={setCategory} />
        <Button title="Oreha Calc" categorySetter={setCategory} />
      </TableNav>

      {category === "Auction Bid Calc" ? <RaidBidCalc /> : null}
      {category === "Oreha Calc" ? <OrehaCalc /> : null}
    </div>
  );
};
