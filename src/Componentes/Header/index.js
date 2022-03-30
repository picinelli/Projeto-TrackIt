import styled from 'styled-components'
import {useState, useContext} from 'react'
import TokenContext from '../../contexts/TokenContext'

import Image from '../../assets/images/SpongeBob.jpg'

export default function Header() {
  const {token, setToken} = useContext(TokenContext)
  const {image} = token

  console.log(token)

  if(window.location.pathname === "/" || window.location.pathname === "/cadastro") {
    return <></>
  }

  return (
    <Container>
      <h1>TrackIt</h1>
      <img src={image} alt={image}></img>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 70px;
  background: #126BA5;
  box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px 0px 18px;
  position: fixed;

    h1 {
      font-family: 'Playball';
      font-size: 38.982px;
      color: #FFFFFF;
    }

    img {
      width: 51px;
      border-radius: 100px;
    }
`