import { Route, Routes } from "react-router-dom";

import "./App.css";
import OrbsScene from "./scenes/Orbs";
import Singularity from "./scenes/Singularity";
import Start from "./scenes/Start";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="singularity" element={<Singularity />} />
        <Route path="singularity/sandbox" element={<OrbsScene />} />
      </Routes>
    </div>
  );
}

export default App;
