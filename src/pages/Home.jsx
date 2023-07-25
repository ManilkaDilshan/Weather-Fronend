import Inputs from "../components/Inputs";
import TimeAndLocation from "../components/TimeAndLocation"; // Fixed the import statement
import Details from "../components/Details";
import Forecast from "../components/Forecast";
import getFormattedWeatherData from "../services/weatherService";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
    UilPower
  } from "@iconscout/react-unicons";

function findTemp(weather, units, setTemp) {
    const threshold = units === "metric" ? 20 : 68;
        if (weather.temp <= threshold) {
            setTemp('low');
        } else {
            setTemp('high');
        }
}

const Home = () => {
    const [query, setQuery] = useState({ q: "colombo" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    const [temp, setTemp] = useState('');
    const { logout } = useContext(UserContext);

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                setWeather(data);
            });
        };
        fetchWeather();
    }, [query, units]);

    const formatBackground = () => {
        if (!weather) return "from-cyan-700 to-blue-700";
        const threshold = units === "metric" ? 20 : 60;
        if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

        return "from-yellow-700 to-orange-700";
    };

    useEffect(() => {
        if (weather) {
            findTemp(weather, units, setTemp);
        }
    }, [weather, units]);

    async function logoutUser() {
        await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/logout`,
            {
                method: "POST"
            }
        ).then(() => {
          logout();
        });
      }

    return (
        <div className={`bg-gradient-to-br ${formatBackground()} py-5`}>
            <div className="a justify-end md:relative lg:absolute right-0 top-0">
          <button
            onClick={logoutUser}
            className="text-white font-semibold p-4"
          >
            <UilPower />
          </button>
        </div>
            <div
            className="mx-auto max-w-screen-md py-5 px-32 h-fit shadow-gray-400 bg-white bg-opacity-20 rounded-xl shadow-sm backdrop-filter backdrop-blur-sm"
        >
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} temp={temp} />

            {weather && (
                <div>
                    <TimeAndLocation weather={weather} />
                    <Details weather={weather} unit={units} />

                    <Forecast title="hourly forecast" items={weather.hourly} />
                    <Forecast title="daily forecast" items={weather.daily} temp={temp} units={units} />
                </div>
            )}
        </div>
        </div>
    );
}

export default Home;
