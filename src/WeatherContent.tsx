import { useEffect, useState } from "react";
import ProductManageModal from "./ProductManageModal";

interface RainfallData {
  unit: string;
  place: string;
  max: number;
  min?: number;
  main: string;
}

interface WeatherApiResponse {
  rainfall: {
    data: RainfallData[];
    startTime: string;
    endTime: string;
  };
  icon: number[];
  iconUpdateTime: string;
  uvindex: {
    data: {
      place: string;
      value: number;
      desc: string;
    }[];
    recordDesc: string;
  };
  updateTime: string;
  temperature: {
    data: {
      place: string;
      value: number;
      unit: string;
    }[];
    recordTime: string;
  };
  warningMessage: string;
  mintempFrom00To09: string;
  rainfallFrom00To12: string;
  rainfallLastMonth: string;
  rainfallJanuaryToLastMonth: string;
  tcmessage: string;
  humidity: {
    recordTime: string;
    data: {
      unit: string;
      value: number;
      place: string;
    }[];
  };
}

const WeatherContent = () => {
  const WARNING_MSG_MAP = {
    cold: "Cold Weather Warning",
    firer: "Red Fire Danger Warning",
    firey: "Yellow Fire Danger Warning",
    frost: "Frost Warning",
    landslip: "Landslip Warning",
    ntfl: "Special Announcement on Flooding in Northern New Territories",
    raina: "Amber Rainstorm Warning Signal",
    rainb: "Black Rainstorm Warning Signal",
    rainr: "Red Rainstorm Warning Signal",
    sms: "Strong Monsoon Signal",
    tc1: "Tropical Cyclone Signal No. 1",
    tc3: "Tropical Cyclone Signal No. 3",
    tc8b: "No. 8 Southeast Gale or Storm Signal",
    tc8c: "No. 8 Northwest Gale or Storm Signal",
    tc8ne: "No. 8 Northeast Gale or Storm Signal",
    tc9: "Increasing Gale or Storm Signal No. 9",
    tc10: "Hurricane Signal No. 10",
    ts: "Thunderstorm Warning",
    "tsunami-warn": "Tsunami Warning",
    vhot: "Very Hot Weather Warning",
  };

  const WEATHER_API_URL = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [warning, setWarning] = useState<string[] | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setWeatherData(responseData);
        if (responseData.warningMessage && responseData.warningMessage.length > 0) {
          // simaple message: The Thunderstorm Warning was issued at 11:30 a.m. It will remain effective until 1:30 p.m. today. Isolated thunderstorms are expected to occur over New Territories West.
          const warningArray: string[] = [];
          responseData.warningMessage.forEach((ele: string) => {
            for (const [key, value] of Object.entries(WARNING_MSG_MAP)) {
              if (ele.includes(value)) {
                warningArray.push(key);
              }
            }
          });
          if (warningArray.length > 0) {
            setWarning(warningArray);
          } else {
            setWarning([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex text-white">
        <img className="h-[60px] w-[60px] mr-1" src={`/weather-icon/pic${weatherData?.icon[0] ? weatherData?.icon[0] : "50"}.png`} alt="weather icon" />
        <div className="text-4xl font-bold">{weatherData?.temperature.data[1].value}°C</div>
      </div>
      <div className="flex text-white">
        <img className="h-[60px] w-[60px] ml-1" src={`/weather-icon/pic82.png`} alt="weather icon" />
        <div className="text-4xl font-bold">{weatherData?.humidity.data[0].value}%</div>
      </div>
      <div className="flex mt-1">
        {warning &&
          warning.length > 0 &&
          warning.map((ele, idx) => {
            return <img className="h-[40px] w-[40px] mr-1" src={`/warning-icon/${ele}.gif`} alt="warning icon" key={idx} />;
          })}
      </div>
      <button className="flex text-xs bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={() => setModalOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wrench" viewBox="0 0 16 16">
          <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11l.471.242z" />
        </svg>
      </button>
      {modalOpen && <ProductManageModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default WeatherContent;
