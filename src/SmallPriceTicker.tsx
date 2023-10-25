import DownSign from "../public/graph-line-down-svgrepo-com.svg";
import UpSign from "../public/graph-line-svgrepo-com.svg";

interface SmallPriceTickerProps {
  product: string;
  price: number | undefined;
  change: number | undefined;
  changePercent: string | undefined;
}

const SmallPriceTicker = (props: SmallPriceTickerProps) => {
  return (
    // background color => white with 20% opacity, border radius => 5px
    <div className="bg-white/20 rounded-md drop-shadow-2xl p-1">
      <div className="flex items-center font-bold text-white text-left">
        {props.product.split(".")[1].substring(0, 6)}
        {props.change && props.change > 0 && <img src={UpSign} className="h-[17px]" />}
        {props.change && props.change < 0 && <img src={DownSign} className="h-[17px]" />}
        <div className="ml-auto text-xs justify-end">{props.changePercent}</div>
      </div>
      <div className="flex items-baseline ">
        <div className="text-xl font-bold text-white">{props.price?.toFixed(1)}</div>
        {/* format change into max 2 decimal */}
        {props.change && props.change > 0 ? (
          <div className="text-sm font-bold ml-auto text-green-500">{props.change.toFixed(1)}</div>
        ) : (
          <div className="text-sm font-bold ml-auto text-red-500">{props.change?.toFixed(1)}</div>
        )}
      </div>
    </div>
  );
};

export default SmallPriceTicker;
