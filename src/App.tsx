import { Homepage } from "./pages/Homepage"
import { Route, Routes } from "react-router-dom"
import { MariShopPage } from "./pages/MariShopPage"
import { MarketplacePage } from "./pages/MarketplacePage"
import { DatabasePage } from "./pages/DatabasePage"
import { ToolsPage } from "./pages/ToolsPage"
import { GuidesPage } from "./pages/GuidesPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/marketplace" element={<MarketplacePage />}></Route>
      <Route path="/marishop" element={<MariShopPage />}></Route>
      <Route path="/database" element={<DatabasePage />}></Route>
      <Route path="/tools" element={<ToolsPage />}></Route>
      <Route path="/guides" element={<GuidesPage />}></Route>
    </Routes>
  )
}

export default App
