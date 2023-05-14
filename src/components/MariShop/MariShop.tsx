//Imports - PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import {
  nameBodyTemplate,
  blueCrystalTemplate,
  blueCrystalGoldValueTemplate,
  totalBodyTemplate,
  buyFromMarketOrMariTemplate,
} from "./MariShopTemplates"

//Imports - Components
import { Dropdown } from "../Dropdown"
import { BodyHeader } from "../Layout/BodyHeader"
import { BodyContainer } from "../Layout/BodyMainContainer"
import { MainContainer } from "../Layout/MainContainer"

//Imports - Jotai
import { useAtom, useAtomValue } from "jotai"
import { mariShopDataAtom } from "../../atoms/marishop"
import { regionAtom } from "../../atoms/dropdown"

export default function MariShop() {
  const [region, setRegion] = useAtom(regionAtom)
  const data = useAtomValue(mariShopDataAtom)

  return (
    <MainContainer>
      <BodyHeader title="Marketplace">
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
          key="1"
        ></Dropdown>
      </BodyHeader>

      <BodyContainer>
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          size="small"
          responsiveLayout="scroll"
          rowHover={true}
        >
          <Column field="name" header="Name" body={nameBodyTemplate} sortable></Column>
          <Column
            field="bluecrystal"
            header="Blue Crystal"
            body={blueCrystalTemplate}
            sortable
            align="right"
            alignHeader="right"
          ></Column>
          <Column
            field="bluecrystal"
            header="Crystal Value"
            body={blueCrystalGoldValueTemplate}
            sortable
            align="right"
            alignHeader="right"
          ></Column>
          <Column
            field="total"
            header="Total"
            sortable
            align="right"
            alignHeader="right"
            body={totalBodyTemplate}
          ></Column>
          <Column
            field="total"
            header="Buy From"
            align="center"
            alignHeader="center"
            body={buyFromMarketOrMariTemplate}
          ></Column>
        </DataTable>
      </BodyContainer>
    </MainContainer>
  )
}
