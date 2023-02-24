import { useQuery } from "react-query";
import { Routes, Route, useLocation, useParams,Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./Api";
import Chart from "./Chart";
import Price from "./Price";
import {Helmet} from 'react-helmet'

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props=>props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  gap: 1em;
display:flex;
flex-wrap:wrap;
`;
const OverviewItem = styled.div`
  margin:10px;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color:${props=>props.theme.boxColor};
  font-family: 'Cairo', sans-serif;
`;
const Tabs=styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`
const Tab=styled.span<{isActive:boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size:12px;
    font-weight:400;
    background-color: ${props=>props.theme.boxColor};
    padding: 7px 0px;
    border-radius: 10px;

    a{
        display:block;
        color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor}
    }
`
const HomeBtn = styled.div`
    width:110px;
    height:50px;
    background-color:${props=>props.theme.boxColor};
    border-radius:10px;
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
        display:block;
        color:${props=>props.theme.textColor}
    }
    &:hover{
        a{
            color:${(props)=>props.theme.accentColor}
        }
    }
`
const Img = styled.img`
    width:30px;
    height:30px;
    margin-right: 10px;
`

interface RouteParams {
  coinId: string;
}
interface RouteState {
  state:{
    name: string;
  }
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
    const { coinId } = useParams<keyof RouteParams>() as RouteParams;
    const { state } = useLocation() as RouteState;
    const priceMatch=useMatch('/:coinId/price')
    const chartMatch = useMatch('/:coinId/chart') 
    const {isLoading: infoLoading, data:infoData}=useQuery<InfoData>(["info", coinId], ()=>fetchCoinInfo(coinId))
    const {isLoading: tickersLoading, data:tickersData}=useQuery<PriceData>(["tickers",coinId], 
    ()=>fetchCoinTickers(coinId),
    {
        refetchInterval: 5000,
    }
    )

  const loading=infoLoading||tickersLoading;
  return (
    <Container>
        <Helmet>
            <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
            </title>
        </Helmet>
      <Header>
      <HomeBtn>
            <Link to='/'>
                GO HOME
            </Link>
        </HomeBtn>
        <Title>
        <Img src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`} />
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to='chart'>
                    Chart
                </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to='price'>
                    Price
                </Link>
              </Tab>
          </Tabs>

          <Routes>
            <Route path={`price`} element={<Price coinId={coinId!}/>} />
            <Route path={`chart`} element={<Chart coinId={coinId!}/>} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;