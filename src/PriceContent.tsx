import { useEffect, useState } from "react";
import PriceTicker from "./PriceTicker";
import useAlertStore from "./useAlertStore";
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

const PriceContent = () => {
  const [btc_usdt, setBTC_USDT] = useState<CommonDataType | null>(null);
  const [hsi, setHSI] = useState<CommonDataType | null>(null);
  const showMsg = useAlertStore((state) => state.showMsg);

  const setUpdateNormally = useUpdateTimeStore((state) => state.setUpdateNormally);

  const BTC_USDT_API_URL = "https://api.gemini.com/v2/ticker/btcusdt";
  const HSI_API_URL = "https://futu.matt-site.xyz/hsi-data";
  // const HSI_SINGAL_API_URL = "https://futu.matt-site.xyz/hsi-signal";

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
        signal: data.signal,
      });
    };
    const fetchHSI = async () => {
      const timeoutPromise = new Promise<Response>((resolve, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 3000);
      });

      const fetchPromise = await fetch(HSI_API_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Key: "wehdqjfowdueqfighwehbfhweuoigyuifoweui2356468732fghu2i364786",
        },
      });

      try {
        const res = await Promise.race([fetchPromise, timeoutPromise]) as Response;
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        setHSI({
          price: data.price,
          change: data.change,
          data: data.data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchHSI();
    fetchBTC_USDT();

    // run the function every 10 secs
    const interval = setInterval(() => {
      try {
        fetchBTC_USDT();
        fetchHSI();
        setUpdateNormally(true);
      } catch (error) {
        setUpdateNormally(false);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PriceTicker product="BTC/USDT" price={btc_usdt?.price} change={btc_usdt?.change} data={btc_usdt?.data} />
      <PriceTicker product="HSI" price={hsi?.price} change={hsi?.change} data={hsi?.data} signal={hsi?.signal} />
    </>
  );
};

export default PriceContent;
