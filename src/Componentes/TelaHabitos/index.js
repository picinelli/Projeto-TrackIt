import styled from "styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import TokenContext from "../../contexts/TokenContext";
import HabitosRecebidosContext from "../../contexts/HabitosRecebidosContext";

import Input from "./Input";
import CarregarHabitos from "./CarregarHabitos"

export default function TelaHabitos() {
  const [visivel, setVisivel] = useState(true);
  const [habito, setHabito] = useState({ name: "", days: [] });
  const { token } = useContext(TokenContext);
  const {setHabitosRecebidos} = useContext(HabitosRecebidosContext);

  let primeiroRender = useRef(true);

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
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        config
      );
      promise.then((response) => {
        setHabitosRecebidos(response.data);
      });
    }
  }, [token.token, setHabitosRecebidos]);

  return (
    <Container>
      <Titulo>
        <h1>Meus hábitos</h1>
        <div onClick={() => setVisivel(!visivel)}>
          <p>+</p>
        </div>
      </Titulo>

      <Criar>
        <Input
          visivel={visivel}
          setVisivel={setVisivel}
          setHabito={setHabito}
          habito={habito}
        />
      </Criar>

      <Descricao>
        <CarregarHabitos setHabito={setHabito} />
      </Descricao>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  background-color: #f2f2f2;
  overflow: auto;

  .clicado {
    background-color: #cfcfcf;
    color: #ffffff;
  }
`;

const Titulo = styled.div`
  font-family: "Lexend Deca";
  max-width: 350px;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  h1 {
    font-size: 22.976px;
    color: #126ba5;
  }

  div {
    width: 40px;
    height: 100%;
    background: #52b6ff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 27px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 2px;
  }
`;

const Descricao = styled.div`
  margin-top: 30px;
  max-width: 350px;
  width: 100%;
  font-family: "Lexend Deca";
  font-size: 18px;
  color: #666666;
`;

const Criar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  width: 100%;

  input {
    padding-top: 5px;
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding-left: 12px;
    margin-bottom: 8px;
  }

  input::placeholder {
    font-family: "Lexend Deca";
    font-size: 20px;
    color: #dbdbdb;
  }

  div {
    width: 100%;
    display: flex;
  }

  div button {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca";
    font-size: 20px;
    color: #dbdbdb;
    margin-right: 3px;
    padding-bottom: 2px;
  }
`;
