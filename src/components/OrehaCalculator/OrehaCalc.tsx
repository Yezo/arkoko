import { useState, useEffect } from "react";
import { OrehaInput } from "./OrehaInput";
import { OrehaItemRow } from "./OrehaItemRow";
import { OrehaRecipesRow } from "./OrehaRecipesRow";
import { OrehaSalesRow } from "./OrehaSalesRow";

type material = {
  name: string;
  quantity: number;
  imgURL: string;
  gamecode: string;
  id: string;
};
type localDataAPI = {
  _id: string;
  name: string;
  quantity: number;
  id: string;
  imgURL: string;
  materialOne: material;
  materialTwo: material;
  materialThree: material;
  materialFour: material;
};
type marketAPI = {
  name: string;
  quantity: number;
  id: string;
  gameCode: number | string;
  image: string;
  lowPrice: number;
};
type garbageAPI = {
  _id: string;
  name: string;
  quantity: number;
  id: string;
  materialOne: material;
  materialTwo: material;
  materialThree: material;
  materialFour: material;
  matOneCost: number;
  matTwoCost: number;
  matThreeCost: number;
  totalCost: number;
  profit: number;
  imgURL: string;
  craftingCost: number;
  craftingTime: number;
  strongholdEnergy: number;
  strongholdXP: number;
  lowPrice: number;
};
export const OrehaCalc = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                    */
  /* -------------------------------------------------------------------------- */
  const [data, setData] = useState<localDataAPI[] | null>();
  const [finalData, setFinalData] = useState<garbageAPI[] | null>();
  const [extData, setExtData] = useState<marketAPI[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [craftingCostReduction, setCraftingCostReduction] = useState<number>();
  const [craftingTimeReduction, setCraftingTimeReduction] = useState<number>();
  const [energyConsumptionReduction, setEnergyConsumptionReduction] =
    useState<number>();
  const [workbenchCount, setWorkbenchCount] = useState<number>();

  const localApiURL = `https://arkoko-api.onrender.com/api/stronghold`;
  const baseApiURL = `https://www.lostarkmarket.online/api/export-market-live/North America East?items=`;
  const gold = "https://www.lostarkmarket.online/assets/icons/gold.png";
  const stronghold =
    "https://www.lostarkmarket.online/assets/icons/energy.webp";
  const exp = "https://www.lostarkmarket.online/assets/icons/strongholdxp.webp";

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  function handleCreateURL(arr) {
    const flatArr = arr.flat();
    return `${baseApiURL}${flatArr}`.slice(0, -1).replace(/,+/g, ",");
  }

  function sortStrings(arr) {
    return arr.sort((a, b) => {
      let fa = a.id.toLowerCase(),
        fb = b.id.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  }

  function handleCraftingCostReduction(num: number) {
    return craftingCostReduction && num
      ? Math.ceil(num - num * (craftingCostReduction / 100))
      : Math.ceil(num);
  }

  function handleCraftingTimeReduction(num: number) {
    return craftingTimeReduction && num
      ? Math.ceil(num - num * (craftingTimeReduction / 100))
      : Math.ceil(num);
  }

  function handleEnergyConsumptionReduction(num: number) {
    return energyConsumptionReduction && num
      ? Math.ceil(num - num * (energyConsumptionReduction / 100))
      : Math.ceil(num);
  }

  function handleWorkbenchCount(num: number) {
    return workbenchCount && num
      ? Math.ceil(num * (workbenchCount * 10))
      : Math.ceil(num);
  }

  useEffect(() => {
    function calcTotalCost(local, external) {
      let localSet = new Set(local.map(({ id }) => id));
      let result = sortStrings(external.filter((o) => localSet.has(o.id)));

      let temp = local.map((item, index) => {
        let itm = result[index];
        let total = itm.lowPrice * item.quantity;
        let newItem = { ...item, totalCost: total };
        return newItem;
      });

      let matOneId = new Set(local.map(({ materialOne }) => materialOne.id));
      let matOne = sortStrings(external.filter((o) => matOneId.has(o.id)));
      let matTwoId = new Set(local.map(({ materialTwo }) => materialTwo.id));
      let matTwo = sortStrings(external.filter((o) => matTwoId.has(o.id)));
      let matThreeId = new Set(
        local.map(({ materialThree }) => materialThree.id)
      );
      let matThree = sortStrings(external.filter((o) => matThreeId.has(o.id)));
      let recipePrice = result.map(({ lowPrice }) => lowPrice);

      let finalArr = temp.map((item, index) => {
        let matOneCost = (matOne[0].lowPrice * item.materialOne.quantity) / 10;
        let matTwoCost = (matTwo[0].lowPrice * item.materialTwo.quantity) / 10;
        let matThreeCost =
          (matThree[0].lowPrice * item.materialThree.quantity) / 100;
        let mainPrice = recipePrice[index];

        let newItem = {
          ...item,
          matOneCost: matOneCost,
          matTwoCost: matTwoCost,
          matThreeCost: matThreeCost,
          profit: item.totalCost - (matOneCost + matTwoCost + matThreeCost),
          lowPrice: mainPrice,
        };
        return newItem;
      });
      setFinalData(finalArr);
    }
    data && extData && calcTotalCost(data, extData);
  }, [data, extData]);

  /* -------------------------------------------------------------------------- */
  /*                               FETCHING ITEMS                               */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const controller = new AbortController();
    const fetchAPI = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const data = await fetch(localApiURL, { signal: controller.signal });
        const jsonData = await data.json();
        setData(jsonData);

        const gamecodes = jsonData.map(
          ({ id, materialOne, materialTwo, materialThree, materialFour }) => {
            return [
              id,
              materialOne.id,
              materialTwo?.id,
              materialThree?.id,
              materialFour?.id,
            ];
          }
        );
        const data2 = await fetch(handleCreateURL(gamecodes));
        const jsonData2 = await data2.json();
        setExtData(jsonData2);
      } catch (error) {
        controller.signal.aborted ? console.log("Aborted") : setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAPI();
    return () => {
      controller.abort();
    };
  }, []);

  // data && extData && calcTotalCost(data, extData);
  return (
    <div>
      <div className="mb-3 flex gap-4">
        <OrehaInput
          title="Crafting Cost Reduction"
          setter={setCraftingCostReduction}
          state={craftingCostReduction}
          maxChar={3}
        />
        <OrehaInput
          title="Crafting Time Reduction"
          setter={setCraftingTimeReduction}
          state={craftingTimeReduction}
          maxChar={3}
        />
        <OrehaInput
          title="Energy Cost Reduction"
          setter={setEnergyConsumptionReduction}
          state={energyConsumptionReduction}
          maxChar={3}
        />
        <OrehaInput
          title="Workbench Count"
          setter={setWorkbenchCount}
          state={workbenchCount}
          maxChar={1}
        />
      </div>

      {isLoading && (
        <div className="grid place-items-center py-40">
          One moment while we fetch the data...
        </div>
      )}
      {error ? (
        <div className="grid place-items-center py-40">
          There was an error while fetching the data.
        </div>
      ) : (
        <div className="flex gap-4">
          {data &&
            extData &&
            finalData &&
            !error &&
            finalData.map(
              ({
                name,
                quantity,
                id,
                imgURL,
                craftingCost,
                craftingTime,
                materialOne,
                materialTwo,
                materialThree,
                matOneCost,
                matTwoCost,
                matThreeCost,
                strongholdEnergy,
                lowPrice,
                strongholdXP,
              }) => {
                return (
                  <div className=" basis-1/2 rounded tracking-tighter" key={id}>
                    <div className="flex flex-col gap-2">
                      {/* -------------------------------------------------------------------------- */
                      /*                            FIRST SECTION: ITEM
                       */
                      /* -------------------------------------------------------------------------- */}
                      <section className=" flex flex-col gap-[0.35rem] rounded bg-primary p-5 ring-1 ring-black/[.50]">
                        <div className="flex items-center justify-center">
                          <img
                            src={imgURL}
                            className="max-h-[40px] max-w-[50px]"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className=" mb-2 border-l-4 border-l-blue-800 py-[0.15rem] pl-2 text-[1rem] font-bold">
                            {name}
                          </div>
                        </div>

                        <OrehaItemRow title="Quantity">
                          {quantity} unit(s)
                        </OrehaItemRow>

                        <OrehaItemRow title="Craft Time">
                          {handleCraftingTimeReduction(craftingTime)} min(s)
                        </OrehaItemRow>

                        <OrehaItemRow
                          title="Stronghold EXP"
                          imgURL={exp}
                          imgAlt="Stronghold EXP Icon"
                        >
                          {strongholdXP}
                        </OrehaItemRow>

                        <OrehaItemRow
                          title="Energy Cost"
                          imgURL={stronghold}
                          imgAlt="Stronghold Energy Icon"
                        >
                          {handleEnergyConsumptionReduction(strongholdEnergy)}
                        </OrehaItemRow>

                        <OrehaItemRow
                          title="Cost per Unit"
                          imgURL={gold}
                          imgAlt="gold"
                        >
                          {lowPrice}
                        </OrehaItemRow>
                      </section>

                      {/* -------------------------------------------------------------------------- */
                      /*                            SECOND SECTION: RECIPE                            */
                      /* -------------------------------------------------------------------------- */}
                      <section className=" flex flex-col gap-[0.35rem] rounded bg-primary p-5 ring-1 ring-black/[.50]">
                        <div className="flex items-center justify-between">
                          <div className=" mb-2 border-l-4 border-l-orange-800 py-[0.15rem] pl-2 text-[1rem] font-bold">
                            Recipe
                          </div>
                        </div>

                        {/* Main Recipe Item */}
                        <OrehaRecipesRow
                          imgURL={imgURL}
                          name={name}
                          quantity={quantity}
                          cost={Math.ceil(lowPrice * quantity)}
                          gold={gold}
                        ></OrehaRecipesRow>

                        {/* Material One */}
                        <OrehaRecipesRow
                          imgURL={materialOne.imgURL}
                          name={materialOne.name}
                          quantity={materialOne.quantity}
                          cost={matOneCost}
                          gold={gold}
                        ></OrehaRecipesRow>

                        {/* Material Two */}
                        <OrehaRecipesRow
                          imgURL={materialTwo.imgURL}
                          name={materialTwo.name}
                          quantity={materialTwo.quantity}
                          cost={matTwoCost}
                          gold={gold}
                        ></OrehaRecipesRow>

                        {/* Material Three */}
                        <OrehaRecipesRow
                          imgURL={materialThree.imgURL}
                          name={materialThree.name}
                          quantity={materialThree.quantity}
                          cost={matThreeCost}
                          gold={gold}
                        ></OrehaRecipesRow>
                      </section>
                      {/* -------------------------------------------------------------------------- */
                      /*                            THIRD SECTION: SALES                            */
                      /* -------------------------------------------------------------------------- */}
                      <section className=" flex flex-col gap-[0.35rem] rounded bg-primary p-5 ring-1 ring-black/[.50]">
                        <div className="flex items-center justify-between">
                          <div className=" mb-2 border-l-4 border-l-red-700 py-[0.15rem] pl-2 text-[1rem] font-bold">
                            Sales
                          </div>
                        </div>

                        {/* Material Fee */}
                        <OrehaSalesRow title="Material Fee ">
                          {Math.ceil(matOneCost + matTwoCost + matThreeCost)}
                          <img src={gold} alt="gold" className="max-h-[20px]" />
                        </OrehaSalesRow>

                        {/* Crafting Fee */}
                        <OrehaSalesRow title="Crafting Fee">
                          {handleCraftingCostReduction(craftingCost)}
                          <img src={gold} alt="gold" className="max-h-[20px]" />
                        </OrehaSalesRow>

                        {/* Market Fee */}
                        <OrehaSalesRow title="Market Fee">
                          {Math.ceil(lowPrice * quantity * 0.05)}
                          <img src={gold} alt="gold" className="max-h-[20px]" />
                        </OrehaSalesRow>

                        {/* Total Cost */}
                        <OrehaSalesRow title="Total Cost">
                          {Math.ceil(
                            matOneCost +
                              matTwoCost +
                              matThreeCost +
                              handleCraftingCostReduction(craftingCost) +
                              lowPrice * quantity * 0.05
                          )}
                          <img src={gold} alt="gold" className="max-h-[20px]" />
                        </OrehaSalesRow>

                        {/* Total Profit */}
                        <OrehaSalesRow title="Total Profit">
                          <span
                            className={`font-bold ${
                              Math.ceil(
                                lowPrice * quantity -
                                  (matOneCost +
                                    matTwoCost +
                                    matThreeCost +
                                    handleCraftingCostReduction(craftingCost) +
                                    lowPrice * quantity * 0.05)
                              ) >= 0
                                ? "text-green-600"
                                : "text-red-800"
                            }`}
                          >
                            {workbenchCount
                              ? Math.ceil(
                                  handleWorkbenchCount(
                                    lowPrice * quantity -
                                      (matOneCost +
                                        matTwoCost +
                                        matThreeCost +
                                        handleCraftingCostReduction(
                                          craftingCost
                                        ) +
                                        lowPrice * quantity * 0.05)
                                  )
                                )
                              : Math.ceil(
                                  lowPrice * quantity -
                                    (matOneCost +
                                      matTwoCost +
                                      matThreeCost +
                                      handleCraftingCostReduction(
                                        craftingCost
                                      ) +
                                      lowPrice * quantity * 0.05)
                                )}
                          </span>
                          <img src={gold} alt="gold" className="max-h-[20px]" />
                        </OrehaSalesRow>
                      </section>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      )}
    </div>
  );
};
