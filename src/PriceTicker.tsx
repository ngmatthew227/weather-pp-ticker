import { Line, LineChart, YAxis } from "recharts";
import SellLogo from "../public/graph-line-down-svgrepo-com.svg";
import BuyLogo from "../public/graph-line-svgrepo-com.svg";

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
      <div className="flex items-center text-2xl font-bold text-white text-left">
        {props.product}
        {props.signal && props.signal.action === "buy" && <img src={BuyLogo} className="h-[30px]" />}
        {props.signal && props.signal.action === "sell" && <img src={SellLogo} className="h-[30px]" />}
        {props.signal && props.signal.action !== "" && (
          <>
            <div className="text-sm mr-2 text-green-300">{props.signal.target}</div>
            <div className="text-sm text-red-300">{props.signal.cutoff}</div>
          </>
        )}
      </div>
      <div className="flex">
        <div className="text-xl font-bold text-white">{props.price}</div>
        {props.change && props.change > 0 ? <div className="text-lg font-bold ml-1 text-green-500">{props.change}</div> : <div className="text-lg font-bold ml-1 text-red-500">{props.change}</div>}
      </div>
      <LineChart width={250} height={50} data={props.data} className="bg-black/20">
        <YAxis domain={["dataMin", "dataMax"]} scale={"linear"} dataKey={"value"} tick={false} axisLine={false} width={2} />
        <Line type="linear" dataKey="value" stroke="orange" dot={false} />
      </LineChart>
    </>
  );
};

export default PriceTicker;
