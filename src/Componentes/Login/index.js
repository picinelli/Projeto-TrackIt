import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import TokenContext from "../../contexts/TokenContext"

import logoImage from "../../assets/images/LogoTrackit.svg";

export default function Login() {
  const [infoLogin, setInfoLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false)
  const {token, setToken} = useContext(TokenContext)
  const navigate = useNavigate()

  // if(token !== null) navigate('/habitos')

  function atualizarInfoLogin(e) {
    e.preventDefault();

    setLoading(true)
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      infoLogin
    );
    promise.then((response) => {
      setLoading(false)
      navigate('/habitos')
      setToken(response.data)
      console.log(token)
    });
    promise.catch((err) => {
      setLoading(false)
      console.log(err.response)
      alert('Parece que algo deu errado, Tente novamente!')
    })
  }

  return (
    <Container>
      <img src={logoImage} alt={logoImage}></img>
      <form onSubmit={atualizarInfoLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) =>
            setInfoLogin({ ...infoLogin, email: e.target.value })
          }
          disabled={loading}
          required
        ></input>
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => {
            setInfoLogin({ ...infoLogin, password: e.target.value });
          }}
          disabled={loading}
          required
        ></input>
        <Botao />
      </form>
      <Link to="/cadastro">
        <h2>Não tem uma conta? Cadastre-se!</h2>
      </Link>
    </Container>
  );

  function Botao() {
    if (loading === false) {
      return (
        <button type="submit" placeholder="Entrar">
          <p>Entrar</p>
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
  max-width: 100vw;
  width: 100%;
  height: 100vh;
  background: #FFFFFF;

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
