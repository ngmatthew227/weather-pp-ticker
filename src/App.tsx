import { Suspense, lazy, useState } from "react";
import "./App.css";
import PriceContent from "./PriceContent";
import useUpdateTimeStore from "./useUpdateTimeStore";

const WeatherContent = lazy(() => import("./WeatherContent"));

function App() {
  const updateDateTime = useUpdateTimeStore((state) => state.updateDateTime);

  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);



  return (
    <>
      <div className="bg-[#525456] w-[450px] h-[300px] p-2">
        {/* Card Header */}
        <div className="text-base mt-1 font-bold flex justify-between border-b border-[#ffc001] ">
          <div className="text-white text-4xl">{ctime}</div>
          <div className="text-white" >{`Last update time: ${updateDateTime.toTimeString().split(" ")[0]}`}</div>
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
