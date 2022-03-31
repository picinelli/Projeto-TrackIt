import { ThreeDots } from "react-loader-spinner";
import { useState, useContext } from "react";
import styled from "styled-components";
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";

import "../../assets/css/style.css";

export default function Input(props) {
  const { visivel, setVisivel, setHabito, habito, setHabitosRecebidos } = props;
  const [clicado, setClicado] = useState(false);
  const { token } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  if (visivel === false) return <></>;

  return (
    <Container>
      <input
        type="text"
        placeholder="nome do hábito"
        value={habito.name}
        onChange={(e) => setHabito({ ...habito, name: e.target.value })}
        disabled={loading}
        required
      ></input>
      <div>
        <button
          className={habito.days.includes("0") ? "clicado" : " "}
          day="0"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          D
        </button>
        <button
          className={habito.days.includes("1") ? "clicado" : " "}
          day="1"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          S
        </button>
        <button
          className={habito.days.includes("2") ? "clicado" : " "}
          day="2"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          T
        </button>
        <button
          className={habito.days.includes("3") ? "clicado" : " "}
          day="3"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          Q
        </button>
        <button
          className={habito.days.includes("4") ? "clicado" : " "}
          day="4"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          Q
        </button>
        <button
          className={habito.days.includes("5") ? "clicado" : " "}
          day="5"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          S
        </button>
        <button
          className={habito.days.includes("6") ? "clicado" : " "}
          day="6"
          disabled={loading}
          onClick={(e) => verificarClicado(e)}
        >
          S
        </button>
      </div>
      <Salvar>
        <p disabled={loading} onClick={() => {setVisivel(!visivel)}}>Cancelar</p>
        <Botao />
      </Salvar>
    </Container>
  );

  function Botao() {
    if (loading === false) {
      return (
        <aside type="submit" placeholder="Entrar" onClick={salvar}>
          <p>Salvar</p>
        </aside>
      );
    }
    return (
      <aside className="opacidade" type="submit" placeholder="Entrar" disabled>
        <ThreeDots color="#FFFFFF" />
      </aside>
    );
  }

  function salvar() {
    setLoading(true);
    //Envia o habito para a API
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      habito,
      config
    );
    promise.then((response) => {
      axios
        .get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
          config
        )
        //Recarrega a lista de habitos caso o habito seja enviado com sucesso
        .then((response) => {
          setHabito({name: "", days: []})
          setVisivel(!visivel)
          setLoading(false);
          setHabitosRecebidos(response.data);
        })
        .catch((err) =>{
          setLoading(false);
          alert(`Ops, parece que algo deu errado!`)
          console.log(err.response)
        })
    })
    //Retorna alert caso o post falhe
    promise.catch((err) => {
      setLoading(false);
      alert(`Ops, parece que algo deu errado!`)
    })
  }

  function verificarClicado(e) {
    for (let i = 0; i < habito.days.length; i++) {
      if (habito.days[i] === e.target.attributes.day.value) {
        habito.days.splice(i, 1);
        return setClicado(!clicado);
      }
    }

    setHabito({
      ...habito,
      days: [...habito.days, e.target.attributes.day.value],
    });
    return setClicado(!clicado);
  }
}

const Container = styled.main`
  max-width: 350px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
`;

const Salvar = styled.div`
  max-width: 310px;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 35px;

  aside {
    width: 84px;
    height: 100%;
    background-color: #52b6ff;
    border-radius: 5px;
    font-family: "Lexend Deca";
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25px;

    p {
      color: #ffffff;
    }
  }

  p {
    font-family: "Lexend Deca";
    font-size: 16px;
    line-height: 20px;
    color: #52b6ff;
  }
`;
