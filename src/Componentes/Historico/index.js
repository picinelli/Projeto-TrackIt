import {useState, useEffect, useContext} from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import axios from 'axios'
import dayjs from 'dayjs'
import HabitosHoje from "../../contexts/HabitosHoje";
import HabitosRecebidosContext from "../../contexts/HabitosRecebidosContext";
import TokenContext from "../../contexts/TokenContext"

import 'react-calendar/dist/Calendar.css'

export default function Historico() {
  const [diasConcluidos, setDiasConcluidos] = useState([])
  const {token} = useContext(TokenContext)
  const {setHabitosHoje} = useContext(HabitosHoje)
  const {setHabitosRecebidos} = useContext(HabitosRecebidosContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    if(token.token !== undefined) {
      const promiseDiasConcluidos = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily', config)
      promiseDiasConcluidos.then((response) => {
        setDiasConcluidos(response.data)
      })
      promiseDiasConcluidos.catch((err) => console.log(err.response))
    }
  }, [token.token])

  //Atualizar o Progresso e a Tela de Criacao de Habitos ao dar f5 na pagina
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    if(token.token !== undefined) {
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
  }, [setHabitosHoje, token.token, setHabitosRecebidos])

  return (
    <Fundo>
      <Container>
        <Titulo>Histórico</Titulo>
        <Calendar locale="pt-br" calendarType="US" tileClassName={({ date }) => alterarFundo(date)}/>
      </Container>
    </Fundo>
  )

  function alterarFundo(date) {
    const dia = dayjs(date).format('DD/MM/YYYY');
    let habitosDoDia = null

    diasConcluidos.forEach(e => {
      if (e.day === dia) {
          habitosDoDia = e.habits;
      }
  })

    if (habitosDoDia) {
      if ((habitosDoDia.filter(e => e.done).length) / habitosDoDia.length === 1.0) {
          return "verde"
      } else {
          return "vermelho"
      }
    }
  }
}
const Fundo = styled.main`
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  max-width: 340px;
  width: 100%;

  .verde {
    background-color: #8CC653;
  }

  .vermelho {
    background-color: #E95766;
  }

  .react-calendar {
    border: 0;
    border-radius: 10px;
  }

  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    height: 48px;
    border-radius: 50%
  }

  .react-calendar__tile--now {
    background: #ffff76;
  }
`;

const Titulo = styled.div`
  padding-top: 110px;
  font-family: "Lexend Deca";
  font-size: 23px;
  color: #126ba5;
  margin-bottom: 20px;
`;