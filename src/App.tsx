import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SiginUp } from "./features/components/sign-up/SIgnUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiginUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
