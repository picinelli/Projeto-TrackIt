import styled from "styled-components";
import {Link} from 'react-router-dom'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

export default function Footer() {

  const percentage = 66;

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
            value={percentage}
            text="Hoje"
            background={"blue"}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent"
              })}
            backgroundPadding={6}/>
        </Progresso>
        </Link>
        <p>Historico</p>
      </Container>
    </Espacamento>
  );
}

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-left: 15%;
  padding-right: 15%;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #FFFFFF;
  position: fixed;
  bottom: 0;
  right: 0;

  p {
    font-family: 'Lexend Deca';
    font-size: 18px;
    text-align: center;
    color: #52B6FF;
  }
`

const Progresso = styled.div`
  width: 90px;
  margin-bottom: 40px;
`

const Espacamento = styled.div`
  background: #F2F2F2;
  width: 100%;
  height: 70px;
  padding-top: 150px;
`