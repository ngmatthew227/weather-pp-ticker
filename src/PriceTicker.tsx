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
  signal?: {
    action: "buy" | "sell" | "";
    high: number;
    low: number;
    target: number;
    cutoff: number;
    open_price: number;
  };
}

const PriceTicker = (props: PriceTickerProps) => {
  return (
    <>
      <div className="flex items-center text-xl font-bold text-white text-left">
        {props.product}
        <div className="ml-2 text-lg font-bold text-white">{props.price}</div>
        {props.change && props.change > 0 ? <div className="text-sm font-bold ml-1 text-green-500">{props.change}</div> : <div className="text-sm font-bold ml-1 text-red-500">{props.change}</div>}
      </div>
      <LineChart width={250} height={50} data={props.data} className="bg-black/20">
        <YAxis domain={["dataMin", "dataMax"]} scale={"linear"} dataKey={"value"} tick={false} axisLine={false} width={2} />
        <Line type="linear" dataKey="value" stroke="orange" dot={false} />
      </LineChart>
    </>
  );
};

export default PriceTicker;
