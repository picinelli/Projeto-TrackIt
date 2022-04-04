import styled from "styled-components";
import {useContext} from 'react'
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import HabitosHoje from "../../contexts/HabitosHoje";

import "react-circular-progressbar/dist/styles.css";

export default function Footer() {
  const {habitosHoje} = useContext(HabitosHoje)
  let habitosCompletos = 0

  for(let i = 0; i < habitosHoje.length; i++) {
    if(habitosHoje[i].done === true) {
      habitosCompletos++
    }
  }
  const porcentagem = habitosCompletos / habitosHoje.length;

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/cadastro"
  ) {
    return <></>;
  }

  return (
    <Espacamento>
      <Container>
        <Link to="/habitos">
          <p>Habitos</p>
        </Link>
        <Link to="/hoje">
          <Progresso>
            <CircularProgressbar
              value={porcentagem * 100}
              text="Hoje"
              background={"blue"}
              styles={buildStyles({
                backgroundColor: "#52B6FF",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
                fontFamily: 'Lexend Deca',
              })}
              backgroundPadding={6}
            />
          </Progresso>
        </Link>
        <Link to={'/historico'}>
          <p>Historico</p>
        </Link>
      </Container>
    </Espacamento>
  );
}

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-left: 10%;
  padding-right: 10%;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  right: 0;

  p {
    font-family: "Lexend Deca";
    font-size: 18px;
    text-align: center;
    color: #52b6ff;
  }
`;

const Progresso = styled.div`
  width: 90px;
  margin-bottom: 40px;
`;

const Espacamento = styled.div`
  background: #f2f2f2;
  width: 100%;
  height: 70px;
  padding-top: 150px;
`;
