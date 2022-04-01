import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";

import HabitoRecebido from "./HabitoRecebido";
import Lixeira from "../../assets/images/Lixeira.svg";
import TokenContext from "../../contexts/TokenContext";
import HabitosRecebidosContext from "../../contexts/HabitosRecebidosContext";

export default function CarregarHabitos(props) {
  const { setHabito } = props;
  const { token } = useContext(TokenContext);
  const {habitosRecebidos, setHabitosRecebidos} = useContext(HabitosRecebidosContext);

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

  function removerHabito(habito) {
    //Muito cuidado com escopo dessa funcao
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    const temCerteza = window.confirm("Você tem certeza?");

    if (temCerteza === false) return <></>;
    if (temCerteza === true) {
      const promiseDeleta = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`,
        config
      );
      promiseDeleta.then((response) => {
        console.log(habitosRecebidos)
        const promiseAtualiza = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
          config
        );

        promiseAtualiza.then((response) => {
          setHabito({ name: "", days: [] });
          setHabitosRecebidos(response.data);
        });
        promiseAtualiza.catch((err) => {
          alert("Ops, parece que algo deu errado!");
        });
      });

      promiseDeleta.catch((err) => {
        console.log(err.response);
      });
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
    cursor: pointer;
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
