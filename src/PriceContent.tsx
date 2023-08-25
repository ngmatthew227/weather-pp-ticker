import { useEffect, useState } from "react";
import PriceTicker from "./PriceTicker";
import useUpdateTimeStore from "./useUpdateTimeStore";

interface BtcUsdtDataType {
  price: number;
  change: number;
  data: {
    time: string;
    value: number;
  }[];
}

const PriceContent = () => {
  const [btc_usdt, setBTC_USDT] = useState<BtcUsdtDataType | null>(null);
  const setUpdateDateTime = useUpdateTimeStore((state) => state.setUpdateDateTime);

  const BTC_USDT_API_URL = "https://api.gemini.com/v2/ticker/btcusdt";

  useEffect(() => {
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
      });
      setUpdateDateTime(new Date());
    };
    fetchBTC_USDT();
    // run the function every 2 mins:
    const interval = setInterval(() => {
      fetchBTC_USDT();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PriceTicker product="BTC/USDT" price={btc_usdt?.price} change={btc_usdt?.change} data={btc_usdt?.data} />
      <PriceTicker product="HSI" price={btc_usdt?.price} change={btc_usdt?.change} data={btc_usdt?.data} />
    </>
  );
};

export default PriceContent;
