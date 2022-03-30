import styled from "styled-components";
import { useState } from "react";

import Input from "./Input"

export default function TelaHabitos() {
  const [visivel, setVisivel] = useState(true);
  const [habito, setHabito] = useState({name: "", days: []})
  console.log(habito)

  return (
    <Container>
      <Titulo>
        <h1>Meus hábitos</h1>
        <div>
          <p onClick={() => setVisivel(!visivel)}>+</p>
        </div>
      </Titulo>

      <Criar>
        <Input visivel={visivel} setHabito={setHabito} habito={habito} />
      </Criar>

      <Descricao>
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </p>
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
  height: 100vh;
  padding-top: 100px;
  background-color: wheat;
`;

const Titulo = styled.div`
  font-family: "Lexend Deca";
  max-width: 350px;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;

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
  max-width: 310px;
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

  .clicado {
  background-color: #CFCFCF;
  color: #FFFFFF;
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

