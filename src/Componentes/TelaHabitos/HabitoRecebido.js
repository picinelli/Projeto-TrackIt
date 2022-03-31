export default function HabitoRecebido(props) {
  const {habito} = props;
  
  return (
    <>
    <h1>{habito.name}</h1>
    <button className={habito.days.includes(0) ? "clicado" : " "} day="0">D</button>
    <button className={habito.days.includes(1) ? "clicado" : " "} day="1">S</button>
    <button className={habito.days.includes(2) ? "clicado" : " "} day="2">T</button>
    <button className={habito.days.includes(3) ? "clicado" : " "} day="3">Q</button>
    <button className={habito.days.includes(4) ? "clicado" : " "} day="4">Q</button>
    <button className={habito.days.includes(5) ? "clicado" : " "} day="5">S</button>
    <button className={habito.days.includes(6) ? "clicado" : " "} day="6">S</button>
    </>
  )
}