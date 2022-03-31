import styled from "styled-components";
import { useContext } from "react";
import TokenContext from "../../contexts/TokenContext";

export default function Header() {
  const { token } = useContext(TokenContext);
  const { image } = token;

  console.log(token);

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/cadastro"
  ) {
    return <></>;
  }

  return (
    <Container>
      <h1>TrackIt</h1>
      <img src={image} alt={image}></img>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 70px;
  background: #126ba5;
  box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px 0px 18px;
  position: fixed;
  z-index: 3;

  h1 {
    font-family: "Playball";
    font-size: 38.982px;
    color: #ffffff;
  }

  img {
    width: 51px;
    border-radius: 100px;
  }
`;
