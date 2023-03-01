import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import { Marketpage } from "./pages/Marketpage";
import { Marishop } from "./pages/Marishop";
import { DatabasePage } from "./pages/DatabasePage";
import { ToolsPage } from "./pages/ToolsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/market" element={<Marketpage />}></Route>
      <Route path="/marishop" element={<Marishop />}></Route>
      <Route path="/database" element={<DatabasePage />}></Route>
      <Route path="/tools" element={<ToolsPage />}></Route>
    </Routes>
  );
}

export default App;
