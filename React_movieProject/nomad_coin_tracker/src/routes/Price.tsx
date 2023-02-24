import {useQuery} from 'react-query'
import { fetchCoinTickers } from "./Api";
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const PriceView = styled.div`
    justify-content: space-between;
    background-color: ${props=>props.theme.boxColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 5px;
`
const PriceItem = styled.span`
    display:flex;
    justify-content: space-between;
`

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
interface ICoinId{
    coinId:string;
}


function Price({coinId}:ICoinId){
    const {isLoading, data}=useQuery<PriceData>(["tickers",coinId], 
    ()=>fetchCoinTickers(coinId),
    {
        refetchInterval: 5000,
    }
    )
    return(
        <Container>
            
            {isLoading?"Loading...":
                <>
                <PriceView>
                        <PriceItem>
                            <span>Price:</span>
                            <span>{data?.quotes.USD.price}</span>
                        </PriceItem>
                </PriceView>
                <PriceView>
                    <PriceItem>
                        <span>Percent Change 30min:</span>
                        <span>{data?.quotes.USD.percent_change_30m}%</span>
                    </PriceItem>
                </PriceView>
                <PriceView>
                    <PriceItem>
                        <span>Percent Change 1hour:</span>
                        <span>{data?.quotes.USD.percent_change_1h}%</span>
                    </PriceItem>
                </PriceView>
                <PriceView>
                    <PriceItem>
                        <span>Percent Change 24h:</span>
                        <span>{data?.quotes.USD.percent_change_24h}%</span>
                    </PriceItem>
                </PriceView>
                
                <PriceView>
                    <PriceItem>
                        <span>Maximum Price:</span>
                        <span>{data?.quotes.USD.ath_price}</span>
                    </PriceItem>
                </PriceView>
                <PriceView>
                    <PriceItem>
                        <span>Maximum Price Date:</span>
                        <span>{data?.quotes.USD.ath_date}</span>
                    </PriceItem>
                </PriceView>
                        </>
                }
                
                </Container>
    )
}

export default Price;