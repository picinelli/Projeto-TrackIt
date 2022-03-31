import styled from "styled-components";

export default function Hoje() {
  return(
    <>
    <Fundo>
      <Container>
        <Data>Segunda, 17/05</Data>
        <ProgressoTexto>Nenhum hábito concluído ainda</ProgressoTexto>
        <ContainerHabito>
          <h1>Ler 1 capítulo de livraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao</h1>
          <p>Sequência atual: 3 dias</p>
          <p>Seu recorde: 5 dias</p>
          <ion-icon name="checkbox"></ion-icon>
        </ContainerHabito>
        <ContainerHabito>
          <h1>Ler 1 capítulo de livraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao</h1>
          <p>Sequência atual: 3 dias</p>
          <p>Seu recorde: 5 dias</p>
          <ion-icon name="checkbox"></ion-icon>
        </ContainerHabito>
        <ContainerHabito>
          <h1>Ler 1 capítulo de livraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao</h1>
          <p>Sequência atual: 3 dias</p>
          <p>Seu recorde: 5 dias</p>
          <ion-icon name="checkbox"></ion-icon>
        </ContainerHabito>
      </Container>
    </Fundo>
    </>
  )
}

const Fundo = styled.main`
  background-color: #F2F2F2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const ProgressoTexto = styled.p`
  margin-top: 10px;
  font-family: 'Lexend Deca';
  font-size: 18px;
  color: #BABABA;
  margin-bottom: 30px;
`

const Container = styled.div`
  max-width: 340px;
  width: 100%;
`

const Data = styled.div`
  padding-top: 110px;
  font-family: 'Lexend Deca';
  font-size: 23px;
  color: #126BA5;
`

const ContainerHabito = styled.div`
  padding: 15px 88px 15px 15px;
  margin-bottom: 15px;
  max-width: 340px;
  width: 100%;
  background: #FFFFFF;
  border-radius: 5px;
  font-family: 'Lexend Deca';
  font-size: 20px;
  color: #666666;
  position: relative;

  h1 {
    margin-bottom: 5px;
    word-break: break-all;
  }

  p {
    font-size: 13px;
  }

  ion-icon {
    color: #8FC549;
    font-size: 85px;
    position: absolute;
    right: 5px;
    top: 5px;
  }
`