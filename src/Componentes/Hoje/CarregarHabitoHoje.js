import {useContext} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import TokenContext from "../../contexts/TokenContext"
import HabitosHoje from "../../contexts/HabitosHoje";

import Checkmark from '../../assets/images/Checkmark.svg'

export default function CarregarHabitoHoje(props) {
  const {token} = useContext(TokenContext)
  const { setHabitosHoje } = useContext(HabitosHoje);
  const {habito} = props
  const {name, highestSequence, currentSequence, id, done} = habito
  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  return (
    <ContainerHabito key={id}>
      <h1>{name}</h1>
      <p>Sequência atual: <span className={done ? "verdinho" : ""}>{currentSequence} dias</span></p>
      <p>Seu recorde: <span className={currentSequence === highestSequence  ? "verdinho" : ""}>{highestSequence} dias</span></p>
      <ContainerIcone className={done ? "marcado" : "desmarcado"} onClick={() => {cumprirHabito(habito, token)}}>
        <img src={Checkmark} alt={Checkmark}></img>
      </ContainerIcone>
    </ContainerHabito>
  )

  function cumprirHabito(habito, token) {

    // se o habito nao estiver marcado, enviar como marcado para API e recarregar lista de habitos
    if(habito.done === false) {
      const promiseCumprir = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`,{}, config)
      promiseCumprir.then(() => {
        const promiseListarHabitos = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
          config
        );
        promiseListarHabitos.then((response) => {
          setHabitosHoje(response.data);
        });
        promiseListarHabitos.catch((err) => {
          console.log(err.response);
        });
      }
      )
      promiseCumprir.catch(err => console.log(err.response))
    }
    // se o habito estiver marcado, enviar como desmarcado para API e recarregar lista de habitos
    else {
      const promiseCumprir = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`,{}, config)
      promiseCumprir.then(() => {
        const promiseListarHabitos = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
          config
        );
        promiseListarHabitos.then((response) => {
          setHabitosHoje(response.data);
        });
        promiseListarHabitos.catch((err) => {
          console.log(err.response);
        });
      }
      )
      promiseCumprir.catch(err => console.log(err.response))
    }
    }
}

const ContainerHabito = styled.div`
  padding: 15px 88px 15px 15px;
  margin-bottom: 15px;
  max-width: 340px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  font-family: "Lexend Deca";
  font-size: 20px;
  position: relative;

  h1 {
    margin-bottom: 5px;
    word-break: break-all;
    color: #666666;
  }

  p {
    font-size: 13px;
    color: #666666;
  }
`;

const ContainerIcone = styled.div`
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-color: #EBEBEB;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 5px;
`