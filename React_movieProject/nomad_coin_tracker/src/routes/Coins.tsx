import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    align-items: center;
    padding: 10px;
    transition: color 0.2s ease-in;
    display: flex;
  }
  &:hover {
    a {
      color:${props=>props.theme.accentColor}
    }
  }
`;


const Title = styled.h1`
  font-size: 48pt;
  color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,

}
function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })()
  }, []);
  console.log(coins);
  return <Container>
    <Header>
      <Title>코인</Title> 
    </Header>
    {loading ? (
      <Loader>Loading... </Loader>
    ): (<CoinsList>
      {coins.map((coin) =>(
        <Coin key={coin.id}>
          <Link to={{
            pathname: `/${coin.id}`,
            // state: {name: coin.name}
          }}>
          <Img
            src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
          />
            {coin.name} &rarr;
          </Link>
        </Coin>
       
      ))}
    </CoinsList>
    )}
  </Container>
}
export default Coins;