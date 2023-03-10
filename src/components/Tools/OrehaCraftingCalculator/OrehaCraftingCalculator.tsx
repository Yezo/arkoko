import { useState, useEffect } from "react"
import { localDataAPI, marketAPI, mixedAPI } from "../../../types/typeOrehaCalc"
import { ErrorMessage } from "../../Messages/ErrorMessage"
import { LoadingMessage } from "../../Messages/LoadingMessage"
import { OrehaInput } from "./OrehaInput"
import { OrehaItemRow } from "./OrehaItemRow"
import { OrehaRecipesRow } from "./OrehaRecipesRow"
import { OrehaSalesRow } from "./OrehaSalesRow"
import {
  handleCreateURL,
  handleItemRarityColor,
  handleReductionFunctions,
  handleWorkbenchCount,
  sortStrings,
} from "../../../helpers/helpers"

export const OrehaCraftingCalculator = () => {
  //States
  const [data, setData] = useState<localDataAPI[] | null>()
  const [finalData, setFinalData] = useState<mixedAPI[] | null>()
  const [extData, setExtData] = useState<marketAPI[] | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const [craftingCostReduction, setCraftingCostReduction] = useState<number>()
  const [craftingTimeReduction, setCraftingTimeReduction] = useState<number>()
  const [energyConsumptionReduction, setEnergyConsumptionReduction] = useState<number>()
  const [workbenchCount, setWorkbenchCount] = useState<number>()

  //Constants
  const localApiURL = `https://arkoko-api.onrender.com/api/stronghold`
  // const localApiURL = `http://localhost:8080/api/stronghold`
  const baseApiURL = `https://www.lostarkmarket.online/api/export-market-live/North America East?items=`
  const gold = "/gold.png"
  const stronghold = "/strongholdenergy.webp"
  const exp = "/strongholdxp.webp"

  //Barbaric solution; needs refactoring
  useEffect(() => {
    function calcTotalCost(local, external) {
      let localSet = new Set(local.map(({ id }) => id))
      let result = sortStrings(external.filter((o) => localSet.has(o.id)))

      let temp = local.map((item, index) => {
        let itm = result[index]
        let total = itm.lowPrice * item.quantity
        let newItem = { ...item, totalCost: total }
        return newItem
      })

      let matOneId = new Set(local.map(({ materialOne }) => materialOne.id))
      let matOne = sortStrings(external.filter((o) => matOneId.has(o.id)))
      let matTwoId = new Set(local.map(({ materialTwo }) => materialTwo.id))
      let matTwo = sortStrings(external.filter((o) => matTwoId.has(o.id)))
      let matThreeId = new Set(local.map(({ materialThree }) => materialThree.id))
      let matThree = sortStrings(external.filter((o) => matThreeId.has(o.id)))
      let recipePrice = result.map(({ lowPrice }) => lowPrice)
      let rarity = result.map(({ rarity }) => rarity)

      let finalArr = temp.map((item, index) => {
        let matOneCost = (matOne[0].lowPrice * item.materialOne.quantity) / 10
        let matTwoCost = (matTwo[0].lowPrice * item.materialTwo.quantity) / 10
        let matThreeCost = (matThree[0].lowPrice * item.materialThree.quantity) / 100
        let mainPrice = recipePrice[index]
        let itemRarity = rarity[index]

        let newItem = {
          ...item,
          matOneCost: matOneCost,
          matTwoCost: matTwoCost,
          matThreeCost: matThreeCost,
          profit: item.totalCost - (matOneCost + matTwoCost + matThreeCost),
          lowPrice: mainPrice,
          rarity: itemRarity,
        }
        return newItem
      })
      setFinalData(finalArr)
    }
    data && extData && calcTotalCost(data, extData)
  }, [data, extData])

  //Fetching data
  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      setError(false)
      setIsLoading(true)
      try {
        const data = await fetch(localApiURL, { signal: controller.signal })
        const jsonData = await data.json()
        setData(jsonData)

        const gamecodes = jsonData.map(
          ({ id, materialOne, materialTwo, materialThree, materialFour }) => {
            return [id, materialOne.id, materialTwo?.id, materialThree?.id, materialFour?.id]
          }
        )
        const data2 = await fetch(handleCreateURL(gamecodes, baseApiURL))
        const jsonData2 = await data2.json()
        setExtData(jsonData2)
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
  }, [])

  return (
    <div>
      <div className="mb-3 flex flex-col gap-4 lg:flex-row">
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

      {isLoading && <LoadingMessage />}
      {error ? (
        <ErrorMessage />
      ) : (
        <div className="flex flex-col gap-4 md:flex-row">
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
                rarity,
              }) => {
                return (
                  <div className=" basis-1/2 rounded tracking-tighter" key={id}>
                    <div className="flex flex-col gap-2">
                      <section className=" flex flex-col gap-[0.35rem] rounded bg-primary p-5 ring-1 ring-black/[.50]">
                        <div
                          className={`mb-1 flex items-center justify-center  py-1 ring-1 ring-black/[.25] ${handleItemRarityColor(
                            rarity
                          )} `}
                        >
                          <img src={imgURL} className="max-h-[40px] max-w-[50px]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className=" mb-2 border-l-4 border-l-blue-800 py-[0.15rem] pl-2 text-[1rem] font-bold">
                            {name}
                          </div>
                        </div>

                        <OrehaItemRow title="Quantity">{quantity} unit(s)</OrehaItemRow>

                        <OrehaItemRow title="Craft Time">
                          {handleReductionFunctions(craftingTime, craftingTimeReduction)} min(s)
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
                          {handleReductionFunctions(strongholdEnergy, energyConsumptionReduction)}
                        </OrehaItemRow>

                        <OrehaItemRow title="Cost per Unit" imgURL={gold} imgAlt="gold">
                          {lowPrice}
                        </OrehaItemRow>
                      </section>

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
                          {handleReductionFunctions(craftingCost, craftingCostReduction)}
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
                              handleReductionFunctions(craftingCost, craftingCostReduction) +
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
                                    handleReductionFunctions(craftingCost, craftingCostReduction) +
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
                                        handleReductionFunctions(
                                          craftingCost,
                                          craftingCostReduction
                                        ) +
                                        lowPrice * quantity * 0.05),
                                    workbenchCount
                                  )
                                )
                              : Math.ceil(
                                  lowPrice * quantity -
                                    (matOneCost +
                                      matTwoCost +
                                      matThreeCost +
                                      handleReductionFunctions(
                                        craftingCost,
                                        craftingCostReduction
                                      ) +
                                      lowPrice * quantity * 0.05)
                                )}
                          </span>
                          <img src={gold} alt="gold" className="max-h-[20px]" />
                        </OrehaSalesRow>
                      </section>
                    </div>
                  </div>
                )
              }
            )}
        </div>
      )}
    </div>
  )
}
