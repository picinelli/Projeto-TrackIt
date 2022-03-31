import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "../../assets/css/reset.css";
import "../../assets/css/style.css";

import Login from "../Login";
import Cadastro from "../Cadastro";
import Header from "../Header";
import TelaHabitos from "../TelaHabitos";
import Footer from '../Footer'
import Hoje from '../Hoje'
import TokenContext from "../../contexts/TokenContext";
import HabitosRecebidosContext from "../../contexts/HabitosRecebidosContext"

export default function App() {
  const [token, setToken] = useState("");
  const [habitosRecebidos, setHabitosRecebidos] = useState([]);

  return (
    <>
      <BrowserRouter>
        <TokenContext.Provider value={{ token, setToken }}>
          <HabitosRecebidosContext.Provider value={{ habitosRecebidos, setHabitosRecebidos }}>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/habitos" element={<TelaHabitos />} />
              <Route path="/hoje" element={<Hoje />} />
            </Routes>
            <Footer />
          </HabitosRecebidosContext.Provider>
        </TokenContext.Provider>
      </BrowserRouter>
    </>
  );
}
