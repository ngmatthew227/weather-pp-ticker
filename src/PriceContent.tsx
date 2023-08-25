import { useEffect, useState } from "react";
import PriceTicker from "./PriceTicker";
import useUpdateTimeStore from "./useUpdateTimeStore";

interface CommonDataType {
  price: number;
  change: number;
  data: {
    time: string;
    value: number;
  }[];
}

const PriceContent = () => {
  const [btc_usdt, setBTC_USDT] = useState<CommonDataType | null>(null);
  const [hsi, setHSI] = useState<CommonDataType | null>(null);
  const setUpdateNormally = useUpdateTimeStore((state) => state.setUpdateNormally);

  const BTC_USDT_API_URL = "https://api.gemini.com/v2/ticker/btcusdt";

  const HSI_API_URL = "https://futu.matt-site.xyz/hsi-data";

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
    };
    const fetchHSI = async () => {
      const res = await fetch(HSI_API_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Key: "wehdqjfowdueqfighwehbfhweuoigyuifoweui2356468732fghu2i364786",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      setHSI({
        price: data.price,
        change: data.change,
        data: data.data,
      });
    };
    fetchHSI();
    fetchBTC_USDT();
    // run the function every 2 mins:
    const interval = setInterval(() => {
      try {
        fetchBTC_USDT();
        fetchHSI();
        setUpdateNormally(true);
      } catch (error) {
        setUpdateNormally(false);
      }
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PriceTicker product="BTC/USDT" price={btc_usdt?.price} change={btc_usdt?.change} data={btc_usdt?.data} />
      <PriceTicker product="HSI" price={hsi?.price} change={hsi?.change} data={hsi?.data} />
    </>
  );
};

export default PriceContent;
