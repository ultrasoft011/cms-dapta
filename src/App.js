import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProgramasUniversitarios } from "./components/ProgramasUniversitarios";
import Bancos from "./components/Bancos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProgramasUniversitarios />} />
        <Route path="/bancos" element={<Bancos />} />
      </Routes>
    </div>
  );
}

export default App;