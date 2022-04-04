import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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
import HabitosHoje from '../../contexts/HabitosHoje'
import Historico from '../Historico'

export default function App() {
  const [token, setToken] = useState("");
  const [habitosRecebidos, setHabitosRecebidos] = useState([]);
  const [habitosHoje, setHabitosHoje] = useState([])


  useEffect(() => {
    const tokenStorageSerializado = localStorage.getItem('infoUsuario')
    const tokenStorage = JSON.parse(tokenStorageSerializado)

    if(tokenStorage) {
      setToken(tokenStorage)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <TokenContext.Provider value={{ token, setToken }}>
          <HabitosRecebidosContext.Provider value={{ habitosRecebidos, setHabitosRecebidos }}>
            <HabitosHoje.Provider value={{habitosHoje, setHabitosHoje}}>
              <Header />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/habitos" element={<TelaHabitos />} />
                <Route path="/hoje" element={<Hoje />} />
                <Route path="/historico" element={<Historico />} />
              </Routes>
              <Footer />
            </HabitosHoje.Provider>
          </HabitosRecebidosContext.Provider>
        </TokenContext.Provider>
      </BrowserRouter>
    </>
  );
}
