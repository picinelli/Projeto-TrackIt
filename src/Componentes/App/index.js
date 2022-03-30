import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "../../assets/css/reset.css";
import "../../assets/css/style.css";

import Login from "../Login";
import Cadastro from "../Cadastro";
import Header from "../Header";
import TelaHabitos from "../TelaHabitos";
import TokenContext from "../../contexts/TokenContext";

export default function App() {
  const [token, setToken] = useState("");

  return (
    <>
      <BrowserRouter>
        <TokenContext.Provider value={{ token, setToken }}>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/habitos" element={<TelaHabitos />} />
          </Routes>
        </TokenContext.Provider>
      </BrowserRouter>
    </>
  );
}
