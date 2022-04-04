import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import HabitosHoje from "../../contexts/HabitosHoje";
import HabitosRecebidosContext from "../../contexts/HabitosRecebidosContext";
import TokenContext from "../../contexts/TokenContext";

import "react-calendar/dist/Calendar.css";

export default function Historico() {
  const [diasConcluidos, setDiasConcluidos] = useState([]);
  const { token } = useContext(TokenContext);
  const { setHabitosHoje } = useContext(HabitosHoje);
  const { setHabitosRecebidos } = useContext(HabitosRecebidosContext);
  const [diaCalendarioSelecionado, setDiaCalendarioSelecionado] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    if (token.token !== undefined) {
      const promiseDiasConcluidos = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
        config
      );
      promiseDiasConcluidos.then((response) => {
        setDiasConcluidos(response.data);
      });
      promiseDiasConcluidos.catch((err) => console.log(err.response));
    }
  }, [token.token]);

  //Atualizar o Progresso e a Tela de Criacao de Habitos ao dar f5 na pagina
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    if (token.token !== undefined) {
      //Atualizar o Progresso
      const promiseListarHabitos = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        config
      );
      promiseListarHabitos.then((response) => {
        setHabitosHoje(response.data);
      });

      //Devolve erro caso nao consiga atualizar os habitos do dia
      promiseListarHabitos.catch((err) => {
        console.log(err.response);
      });

      //Atualizar a Tela de Criacao de Habitos
      const promiseHistorico = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        config
      );
      promiseHistorico.then((response) => {
        setHabitosRecebidos(response.data);
      });
    }
  }, [setHabitosHoje, token.token, setHabitosRecebidos]);


  return (
    <Fundo>
      <Container>
        <Titulo>Histórico</Titulo>
        <Calendar
          locale="pt-br"
          calendarType="US"
          tileClassName={({ date }) => alterarFundo(date)}
          formatDay={(locate, date) => dayjs(date).format("DD")}
          onClickDay={(date) => {
            buscarHabitosHistorico(date);
          }}
        />
      </Container>
      <Container>
        <DiaEscolhido>{diaCalendarioSelecionado.day}</DiaEscolhido>
        <ContainerHistorico />
      </Container>
    </Fundo>
  );

  function buscarHabitosHistorico(date) {
    const dia = dayjs(date).format("DD/MM/YYYY");
    let achouDia = false

    diasConcluidos.forEach((e) => {
      if (e.day === dia) {
        achouDia = true
        return setDiaCalendarioSelecionado(e);
      }
    });

    if(achouDia === false) {
      return setDiaCalendarioSelecionado({})
    }
  }

  function ContainerHistorico() {
    if(diaCalendarioSelecionado.day === undefined) {
      return <></>
    }
    return (
    <ContainerBranco>
      {diaCalendarioSelecionado.habits.map((habito) => {
        if (habito.done) {
          return <p key={habito.name} className="completado">{habito.name}</p>
        }
        return <p key={habito.name} className="nao-completado">{habito.name}</p>
      })}
    </ContainerBranco>
    )
  }

  function alterarFundo(date) {
    const dia = dayjs(date).format("DD/MM/YYYY");
    let habitosDoDia = null;

    diasConcluidos.forEach((e) => {
      if (e.day === dia) {
        habitosDoDia = e.habits;
      }
    });

    if (habitosDoDia) {
      if (
        habitosDoDia.filter((e) => e.done).length / habitosDoDia.length ===
        1.0
      ) {
        return "verde";
      } else {
        return "vermelho";
      }
    }
  }
}
const Fundo = styled.main`
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus {
    background: #52B6FF;
  }

  .react-calendar__tile--hasActive {
  background: #52B6FF;
}

  .react-calendar__tile--active {
  background: #52B6FF;
  color: white;
  }
  
`;

const Container = styled.div`
  max-width: 340px;
  width: 100%;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 10px;
    box-sizing: content;

    abbr {
      width: 32px;
      height: 32px;
    }
  }

  .verde abbr {
    background-color: #8cc653;
    padding: 9px;
    border-radius: 50%;
  }

  .vermelho abbr {
    background-color: #e95766;
    padding: 9px;
    border-radius: 50%;
  }

  .completado {
    color: #8cc653
  }

  .nao-completado {
    color: #e95766
  }
`;

const Titulo = styled.div`
  padding-top: 110px;
  font-family: "Lexend Deca";
  font-size: 23px;
  color: #126ba5;
  margin-bottom: 20px;
`;

const DiaEscolhido = styled.div`
  padding-top: 20px;
  font-family: "Lexend Deca";
  font-size: 23px;
  color: #126ba5;
  margin-bottom: 20px;
`;

const ContainerBranco = styled.div`
  padding: 15px 15px 15px 15px;
  margin-bottom: 15px;
  max-width: 340px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  font-family: "Lexend Deca";
  font-size: 20px;

  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;
