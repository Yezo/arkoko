//Imports - PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import {
  nameBodyTemplate,
  lowPriceBodyTemplate,
  recentPriceBodyTemplate,
  marketTrendBodyTemplate,
  quantityBodyTemplate,
} from "./MarketplaceTemplates"

//Imports - Components
import { Dropdown } from "../Dropdown"

//Imports - Types
import { BodyHeader } from "../Layout/BodyHeader"
import { BodyContainer } from "../Layout/BodyMainContainer"
import { MainContainer } from "../Layout/MainContainer"

//Imports - Jotai
import { useAtom } from "jotai"
import { regionAtom, dropdownAtom } from "../../atoms/dropdown"
import { marketplaceDataAtom } from "../../atoms/marketplace"

export const Marketplace = () => {
  //Jotai
  const [result, setResult] = useAtom(marketplaceDataAtom)
  const [region, setRegion] = useAtom(regionAtom)
  const [dropdown, setDropdown] = useAtom(dropdownAtom)

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
        <DataTable
          value={result}
          tableStyle={{ minWidth: "50rem" }}
          size="small"
          responsiveLayout="scroll"
          rowHover={true}
        >
          <Column field="name" header="Name" body={nameBodyTemplate} sortable></Column>
          <Column
            field="lowPrice"
            header="Lowest Price"
            body={lowPriceBodyTemplate}
            sortable
            align="right"
            alignHeader="right"
          ></Column>
          <Column
            field="recentPrice"
            header="Recent Price"
            body={recentPriceBodyTemplate}
            sortable
            align="right"
            alignHeader="right"
          ></Column>
          <Column
            field="avgPrice"
            header="Market Trend"
            body={marketTrendBodyTemplate}
            sortable
            align="center"
            alignHeader="center"
          ></Column>
          <Column
            field="cheapestRemaining"
            header="Quantity"
            sortable
            align="right"
            alignHeader="right"
            className=""
            body={quantityBodyTemplate}
          ></Column>
        </DataTable>
      </BodyContainer>
    </MainContainer>
  )
}
