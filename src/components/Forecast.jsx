/* eslint-disable react/prop-types */
import { iconUrlFromCode } from "../services/weatherService";
import {
    UilTemperature,
    UilTear,
    UilWind
  } from "@iconscout/react-unicons";
import { useState } from "react";

function Forecast({ title, items, temp = null, units = null }) {
    const [showMore, setShowMore] = useState(false);

    if (!items || !Array.isArray(items) || items.length === 0) {
        return null;
    }

    const numToShow = showMore ? items.length : 3;

    console.log(units);

    if (title === 'daily forecast') {
        return (
            <div>
                <div className="justify-start mt-6">
                    <p className="text-white font-medium uppercase">{title}</p>
                </div>
                <hr className="my-2" />

                <div className="text-white divide-y">
                    {items.slice(0, numToShow).map((item) => (
                        <div key={item.id} className="flex flex-row items-center">
                            <p className="text-sm font-bold w-1/4">{item.title}</p>
                            <div className="flex flex-grow justify-between items-center"><img src={iconUrlFromCode(item.icon)} className="w-12 my-1" alt={item.title} />
                            <p className="font-medium flex gap-1"><UilWind />{`${item.wind.toFixed()}`} {units === 'metric'? 'm/s' : 'MPH'}</p>
                            <p className="font-medium flex gap-1"><UilTemperature />{`${item.temp.toFixed()}°`}</p>
                            <p className="font-medium flex gap-1"><UilTear />{`${item.humidity.toFixed()}%`}</p></div>
                        </div>
                    ))}
                </div>

                {items.length > 3 && (
                    <div className="flex items-center justify-center mt-4">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className={`px-4 py-2 focus:outline-none ${temp === 'high' ? 'text-red-300 hover:text-red-100' : 'text-blue-300 hover:text-blue-100'}`}
                        >
                            {showMore ? "See Less" : "See More"}
                        </button>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <div className="flex items-center justify-start mt-6">
                    <p className="text-white font-medium uppercase">{title}</p>
                </div>
                <hr className="my-2" />

                <div className="flex flex-row items-center justify-between text-white">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col items-center justify-center">
                            <p className="font-light text-sm">{item.title}</p>
                            <img src={iconUrlFromCode(item.icon)} className="w-12 my-1" alt={item.title} />
                            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Forecast;
