import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import logoImage from "../../assets/images/LogoTrackit.svg";

export default function Cadastro() {
  const [infoCadastro, setInfoCadastro] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function cadastrar(e) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      infoCadastro
    );
    promise.then(() => {
      navigate("/");
      setLoading(false);
    });
    promise.catch((err) => {
      setLoading(false);
      console.log(err.response);
      alert("Algo deu errado, tente novamente!");
    });
  }

  return (
    <Container>
      <img src={logoImage} alt={logoImage}></img>
      <form onSubmit={cadastrar}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setInfoCadastro({ ...infoCadastro, email: e.target.value });
          }}
          required
          disabled={loading}
        ></input>
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => {
            setInfoCadastro({ ...infoCadastro, password: e.target.value });
          }}
          required
          disabled={loading}
        ></input>
        <input
          type="text"
          placeholder="nome"
          onChange={(e) => {
            setInfoCadastro({ ...infoCadastro, name: e.target.value });
          }}
          required
          disabled={loading}
        ></input>
        <input
          type="url"
          placeholder="foto"
          onChange={(e) => {
            setInfoCadastro({ ...infoCadastro, image: e.target.value });
          }}
          required
          disabled={loading}
        ></input>
        <Botao />
      </form>
      <Link to="/">
        <h2>Já tem uma conta? Faça login!</h2>
      </Link>
    </Container>
  );

  function Botao() {
    if (loading === false) {
      return (
        <button type="submit" placeholder="Entrar">
          <p>Cadastrar</p>
        </button>
      );
    }
    return (
      <button className="opacidade" type="submit" placeholder="Entrar" disabled>
        <ThreeDots color="#FFFFFF" />
      </button>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  width: 100%;

  img {
    margin-top: 100px;
    margin-bottom: 50px;
  }

  form {
    max-width: 100%;
    width: 305px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100%;
    height: 45px;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    padding-left: 12px;
    margin-bottom: 5px;
  }

  input::placeholder {
    font-family: "Lexend Deca";
    font-size: 18px;
    color: #dbdbdb;
  }

  button {
    width: 100%;
    height: 45px;
    background: #52b6ff;
    border-radius: 5px;
    border: 0px;
    font-family: "Lexend Deca";
    font-size: 21px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  h2 {
    margin-top: 25px;
    font-family: "Lexend Deca";
    font-size: 14px;
    text-decoration-line: underline;
    color: #52b6ff;
  }
`;
