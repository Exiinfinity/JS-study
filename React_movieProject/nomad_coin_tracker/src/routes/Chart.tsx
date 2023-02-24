import { useQuery } from "react-query";
import { fetchCoinHistory } from "./Api";
import ApexChart from 'react-apexcharts'

interface IHistorical{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps{
    coinId:string;
}

function Chart({coinId}:ChartProps){
    const {isLoading, data}=useQuery<IHistorical[]>(['ohlcv', coinId], 
    ()=> 
    fetchCoinHistory(coinId),
    {
        refetchInterval:5000,
    }
    )

    return <div> {isLoading? "Loading chart..." : <ApexChart 
    type="candlestick" 
    series={[{
        data:data?.map((data)=>{
            return{
                x:data.time_open,
                y:[data.open.toFixed(3),data.high.toFixed(3),data.low.toFixed(3),data.close.toFixed(3)]
            }
        })
    }] as unknown as number[]}
    options={{
        theme:{
            mode:"dark"
        },
        chart:{
            type: 'candlestick',
        height: 300,
        width: 500,
        toolbar:{
            show:false,
        },
        background:"transparent"
    },

    yaxis:{show:false},
    xaxis:{
        labels:{show:false},
        axisTicks:{show:false},
        axisBorder:{show:false},
        type:"datetime",
        
    },
}}/>}</div>
    
}

export default Chart;