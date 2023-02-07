import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import { Marketpage } from "./pages/Marketpage";
import { Marishop } from "./pages/Marishop";
import { DatabasePage } from "./pages/DatabasePage";
import { ToolsPage } from "./pages/ToolsPage";
import { TestPage } from "./pages/TestPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/market" element={<Marketpage />}></Route>
        <Route path="/marishop" element={<Marishop />}></Route>
        <Route path="/database" element={<DatabasePage />}></Route>
        <Route path="/tools" element={<ToolsPage />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
