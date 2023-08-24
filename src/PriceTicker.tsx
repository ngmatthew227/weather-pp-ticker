import { Line, LineChart, YAxis } from "recharts";

interface PriceTickerProps {
  product: string;
  price: number | undefined;
  change: number | undefined;
  data:
    | {
        time: string;
        value: number;
      }[]
    | undefined;
}

const PriceTicker = (props: PriceTickerProps) => {
  return (
    <>
      <div className="text-2xl font-bold text-white text-left">{props.product}</div>
      <div className="flex">
        <div className="text-xl font-bold text-white">{props.price}</div>
        {props.change && props.change > 0 ? <div className="text-lg font-bold ml-1 text-green-500">{props.change}</div> : <div className="text-lg font-bold ml-1 text-red-500">{props.change}</div>}
      </div>
      <LineChart width={250} height={50} data={props.data}>
        <YAxis domain={["dataMin", "dataMax"]} scale={"linear"} dataKey={"value"} tick={false} axisLine={false} width={2} />
        <Line type="linear" dataKey="value" stroke="#8884d8" dot={false} />
      </LineChart>
    </>
  );
};

export default PriceTicker;
