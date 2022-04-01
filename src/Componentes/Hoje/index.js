import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "../../../node_modules/dayjs/locale/pt-br";
import HabitosHoje from "../../contexts/HabitosHoje";
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";

import CarregarHabitoHoje from "./CarregarHabitoHoje"

export default function Hoje() {
  const { habitosHoje, setHabitosHoje } = useContext(HabitosHoje);
  const { token } = useContext(TokenContext);

  let primeiroRender = useRef(true);

  console.log(habitosHoje)
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    if (primeiroRender.current) {
      primeiroRender.current = false;
    } else {
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
    }
  }, [token.token, setHabitosHoje]);

  return (
    <>
      <Fundo>
        <Container>
          <Data>
            {dayjs().locale("pt-br").format("dddd")},{" "}
            {dayjs().locale("pt-br").format("DD/MM")}
          </Data>
          <ProgressoTexto>Nenhum hábito concluído ainda</ProgressoTexto>
          {habitosHoje.map((habito) => {
            return (
              <CarregarHabitoHoje key={habito.id} habito={habito} />
            )
          })}
        </Container>
      </Fundo>
    </>
  );
}

const Fundo = styled.main`
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .verdinho {
    color: #8FC549;
  }

  .marcado {
    background-color: #8FC549;
  }

  .desmarcado {
    background-color: #EBEBEB;
  }
`;

const ProgressoTexto = styled.p`
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
