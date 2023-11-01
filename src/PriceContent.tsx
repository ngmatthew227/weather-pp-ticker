import { useEffect, useState } from "react";
import PriceTicker from "./PriceTicker";
import SmallPriceTicker from "./SmallPriceTicker";
import useProductStore from "./useProductStore";
import useUpdateTimeStore from "./useUpdateTimeStore";

interface CommonDataType {
  price?: number;
  change?: number;
  data?: {
    time: string;
    value: number;
  }[];
  signal?: {
    action: "buy" | "sell";
    high: number;
    low: number;
    target: number;
    cutoff: number;
    open_price: number;
  };
}


interface PriceContentType {
  code: string;
  last_price: number;
  change: number;
  change_percent: string;
  high_price: number;
  low_price: number;
  open_price: number;
  prev_close_price: number;
  update_time: string;
  volume: number;
}

const PriceContent = () => {
  const [btc_usdt, setBTC_USDT] = useState<CommonDataType | null>(null);
  const [priceData, setPriceData] = useState<[PriceContentType] | null>(null);

  const setUpdateNormally = useUpdateTimeStore((state) => state.setUpdateNormally);
  const { products, intervalIds, addIntervalId } = useProductStore((state) => state);

  const BTC_USDT_API_URL = "https://api.gemini.com/v2/ticker/btcusdt";
  const HSI_API_URL = "https://futu.matt-site.xyz/get-snapshot";

  const fetchBTC_USDT = async () => {
    const res = await fetch(BTC_USDT_API_URL);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const change = (data.bid - data.open).toFixed(2);

    const currTime = new Date();
    const last24HoursPrice = data.changes.map((item: string, idx: number) => {
      return {
        time: new Date(currTime.getTime() - (idx + 1) * 60 * 60 * 1000),
        value: Number(item),
      };
    });

    setBTC_USDT({
      price: data.bid,
      change: Number(change),
      data: last24HoursPrice,
      signal: data.signal,
    });
  };
  const fetchPriceData = async () => {
    const params = new URLSearchParams({ codes: products.join(",") });
    const res = await fetch(`${HSI_API_URL}?${params}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Key: "wehdqjfowdueqfighwehbfhweuoigyuifoweui2356468732fghu2i364786",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setPriceData(data);
  };

  const runIntervalJob = () => {
    const intervalTmpId = setInterval(() => {
      try {
        fetchPriceData();
        fetchBTC_USDT();
        setUpdateNormally(true);
      } catch (error) {
        setUpdateNormally(false);
      }
    }, 3000);
    addIntervalId(intervalTmpId);
  };

  useEffect(() => {
    runIntervalJob();
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [products]);

  return (
    <>
      <PriceTicker product="BTC/USDT" price={btc_usdt?.price} change={btc_usdt?.change} data={btc_usdt?.data} />
      <div className="grid grid-cols-2 gap-1">
        {priceData?.map((item, idx) => {
          return <SmallPriceTicker key={idx} product={item.code} price={item.last_price} change={item.change} changePercent={item.change_percent} />;
        })}
      </div>
    </>
  );
};

export default PriceContent;
