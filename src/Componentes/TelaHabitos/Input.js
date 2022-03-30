import styled from "styled-components";
import {useState} from 'react'

import '../../assets/css/style.css'

export default function Input(props) {
  const {visivel, setHabito, habito} = props
  const [clicado, setClicado] = useState('')
  const dias = ["0", "1", "2", "3", "4", "5", "6"]

  if (visivel === false) return <></>;

  return (
    <>
    {console.log(habito)}
      <input type="text" placeholder="nome do hábito" value={habito.name} onChange={(e) => setHabito({ ...habito, name: e.target.value })} required></input>
      <div>
        <button day="0" onClick={(e) => verificarClicado(e)}>D</button>
        <button day="1" onClick={(e) => verificarClicado(e)}>S</button>
        <button day="2" onClick={(e) => verificarClicado(e)}>T</button>
        <button day="3" onClick={(e) => verificarClicado(e)}>Q</button>
        <button day="4" onClick={(e) => verificarClicado(e)}>Q</button>
        <button day="5" onClick={(e) => verificarClicado(e)}>S</button>
        <button day="6" onClick={(e) => verificarClicado(e)}>S</button>
      </div>
      <Salvar>
        <p>Cancelar</p>
        <div onClick={salvar}>Salvar</div>
      </Salvar>
    </>
  );

  function salvar() {
    
  }

  function verificarClicado(e) {

    for(let i = 0; i < habito.days.length; i++) {
      if(habito.days[i] === e.target.attributes.day.value) {
        habito.days.splice(i, 1)
        return setClicado('')
      }
    }

    setHabito({...habito, days: [...habito.days, e.target.attributes.day.value]})
    return setClicado('clicado')
  }
}

const Salvar = styled.div`
  max-width: 310px;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 35px;

  p {
    font-family: "Lexend Deca";
    font-size: 16px;
    line-height: 20px;
    color: #52b6ff;
  }

  div {
    width: 84px;
    height: 100%;
    background: #52b6ff;
    border-radius: 4.63636px;
    font-family: "Lexend Deca";
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25px;
  }
`;