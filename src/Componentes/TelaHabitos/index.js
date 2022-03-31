import styled from "styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import TokenContext from "../../contexts/TokenContext";

import Input from "./Input";
import HabitoRecebido from "./HabitoRecebido";
import Lixeira from "../../assets/images/Lixeira.svg";

export default function TelaHabitos() {
  const [visivel, setVisivel] = useState(true);
  const [habito, setHabito] = useState({ name: "", days: [] });
  const [habitosRecebidos, setHabitosRecebidos] = useState([]);
  const [recarregar, setRecarregar] = useState(false);
  const { token } = useContext(TokenContext);

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
      console.log("cheguei aqui");
      const promise = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        config
      );
      promise.then((response) => {
        setHabitosRecebidos(response.data);
      });
    }
  }, [token.token]);

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
          setHabitosRecebidos={setHabitosRecebidos}
        />
      </Criar>

      <Descricao>
        <CarregarHabitos />
      </Descricao>
    </Container>
  );

  function CarregarHabitos() {
    if (habitosRecebidos.length < 1) {
      return (
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </p>
      );
    }
    return (
      <>
        {habitosRecebidos.map((habito) => {
          return (
            <ContainerRecebido key={habito.id + habito.name}>
              <img
                src={Lixeira}
                alt={Lixeira}
                onClick={() => {
                  removerHabito(habito);
                }}
              ></img>
              <HabitoRecebido habito={habito} />
            </ContainerRecebido>
          );
        })}
      </>
    );
  }

  function removerHabito(habito) {
    console.log(habito);
    //Muito cuidado com escopo dessa funcao
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    const temCerteza = window.confirm("Você tem certeza?");

    if (temCerteza === false) return <></>;
    if (temCerteza === true) {
      axios
        .delete(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`,
          config
        )
        .then(
          axios
            .get(
              "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
              config
            )
            .then((response) => {
              setHabito({ name: "", days: [] });
              setHabitosRecebidos(response.data);
              setRecarregar(!recarregar);
            })
            .catch((err) => {
              alert("Ops, parece que algo deu errado!");
            })
        ).catch(err => {console.log(err.response)})
    }
  }
}

const ContainerRecebido = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  padding: 15px 20px;
  word-wrap: break-word;
  margin-bottom: 10px;
  position: relative;

  img {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  button {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca";
    font-size: 20px;
    color: #dbdbdb;
    margin-right: 3px;
    margin-top: 8px;
    padding-bottom: 2px;
  }
`;

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
