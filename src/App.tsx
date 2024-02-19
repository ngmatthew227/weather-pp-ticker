import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import PriceContent from "./PriceContent";
import useUpdateTimeStore from "./useUpdateTimeStore";
import useAlertStore from "./useAlertStore";

const WeatherContent = lazy(() => import("./WeatherContent"));

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const updateNormally = useUpdateTimeStore((state) => state.updateNormally);
  const { showMsg } = useAlertStore();

  let time = new Date().toLocaleString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleString();
    setTime(time);
  };
  setInterval(UpdateTime);

  useEffect(() => {
    const handleOnline = () => {
      showMsg("You are now online");
    };
    const handleOffline = () => {
      showMsg("You are now offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <div className="bg-[#6c6c6c]/50 bg-opti w-[450px] h-[300px] p-2">
        {/* Card Header */}
        <div className="text-base mt-1 font-bold flex justify-between border-b border-[#ffc001] ">
          <div className="text-white text-4xl">{ctime}</div>
          <span className="flex justify-center items-center">
            <span className={`animate-ping absolute h-4 w-4 rounded-full ${updateNormally ? "bg-green-400" : "bg-red-400"}  opacity-40`}></span>
            <span className={`relative rounded-full h-3 w-3 ${updateNormally ? "bg-green-500" : "bg-red-500"}`}></span>
          </span>
        </div>
        {/* Card Content */}
        <div className="flex flex-row p-2">
          {/* Left Content */}
          <div className="w-[40%] h-[100%] text left">
            <Suspense fallback={<div>Loading...</div>}>
              <WeatherContent />
            </Suspense>
          </div>
          {/* Right Content */}
          <div className="w-[60%] h-[100%]">
            <Suspense fallback={<div>Loading...</div>}>
              <PriceContent />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
