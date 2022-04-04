import { useContext, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "../../../node_modules/dayjs/locale/pt-br";
import HabitosHoje from "../../contexts/HabitosHoje";
import TokenContext from "../../contexts/TokenContext";
import HabitosRecebidosContext from "../../contexts/HabitosRecebidosContext";
import axios from "axios";

import CarregarHabitoHoje from "./CarregarHabitoHoje";

export default function Hoje() {
  const { setHabitosRecebidos } = useContext(HabitosRecebidosContext);
  const { habitosHoje, setHabitosHoje } = useContext(HabitosHoje);
  const { token } = useContext(TokenContext);
  let habitosCompletos = 0;
  for (let i = 0; i < habitosHoje.length; i++) {
    if (habitosHoje[i].done === true) {
      habitosCompletos++;
    }
  }
  const porcentagem = habitosCompletos / habitosHoje.length;
  let date = dayjs().locale("pt-br").format("dddd, DD/MM");
  const dateFixed = date.charAt(0).toUpperCase() + date.slice(1)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    if(token.token !== undefined) {
      const promise = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        config
      );
      promise.then((response) => {
        setHabitosHoje(response.data);
      });
      promise.catch((err) => {
        console.log(err.response);
      });

      const promiseHistorico = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        config
      );
      promiseHistorico.then((response) => {
        setHabitosRecebidos(response.data);
      });
    }
  }, [token.token, setHabitosHoje, setHabitosRecebidos]);

  return (
    <>
      <Fundo>
        <Container>
          <Data>
            {dateFixed}
          </Data>
          <ProgressoTexto>
            <HabitoTexto />
          </ProgressoTexto>
          {habitosHoje.map((habito) => {
            return <CarregarHabitoHoje key={habito.id} habito={habito} />;
          })}
        </Container>
      </Fundo>
    </>
  );

  function HabitoTexto() {
    if (habitosCompletos < 1) {
      return <p className="">Nenhum hábito concluído ainda</p>;
    }
    return (
      <p className="verdinho">{`${(porcentagem * 100).toFixed(
        0
      )}% dos hábitos concluídos`}</p>
    );
  }
}

const Fundo = styled.main`
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .verdinho {
    color: #8fc549;
  }

  .marcado {
    background-color: #8fc549;
  }

  .desmarcado {
    background-color: #ebebeb;
  }
`;

const ProgressoTexto = styled.h2`
  margin-top: 10px;
  font-family: "Lexend Deca";
  font-size: 18px;
  color: #bababa;
  margin-bottom: 30px;
`;

const Container = styled.div`
  max-width: 340px;
  width: 100%;
`;

const Data = styled.div`
  padding-top: 110px;
  font-family: "Lexend Deca";
  font-size: 23px;
  color: #126ba5;
`;
