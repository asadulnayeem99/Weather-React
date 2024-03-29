/* eslint-disable no-unused-vars */
// import React from 'react';
import {
  faMagnifyingGlass,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [text, setText] = useState("");
  const [cityName, setCityName] = useState("Enter City Name");
  const [Humidity, setHumidity] = useState("0");
  const [windSpeed, setWindSpeed] = useState("0");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState("../../public/assets/react.svg");

  const weatherIcons = {
    Clear: "../../public/assets/image/clear.png",
    Clouds: "../../public/assets/image/cloud.png",
    Rain: "../../public/assets/image/rain.png",
    Snow: "../../public/assets/image/snow.png",
    Drizzle: "../../public/assets/image/drizzle.png",
    // Add more weather conditions and corresponding image URLs as needed
  };

  const change = (e) => {
    setText(e.target.value);
  };

  const fetchWeather = async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=86d434c60dd5805401af28ecb1b6bf68`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const cityName = data.name;
        const Temp = data.main.temp;
        const hum = data.main.humidity;
        const desc = data.weather[0].description;
        const pic = data.weather[0].icon;
        const tem = Number((Temp - 273.15).toFixed(2));
        console.log(tem);
        setWeatherData(tem);
        setCityName(data.name);
        setHumidity(hum);
        setWindSpeed(data.wind.speed);
        console.log(data.weather[0].main);
        setCondition(data.weather[0].main);
        getWeatherIcon(condition);
        console.log(condition, "after");
      });
  };

  const getWeatherIcon = (condition) => {
    if (weatherIcons.hasOwnProperty(condition)) {
      console.log(weatherIcons[condition]);
      let i = weatherIcons[condition];
      console.log(`"${i}"`);
      setImage(weatherIcons[condition]);
      console.log(image, "image");
    } else {
      setImage("../assets/react.svg"); // Use a default image if the condition is not found
    }
  };

  return (
    <div className="h-[400px] mt-5 p-2 m-auto rounded-2xl w-[300px] bg-blue-900">
      <div className="flex mt-2 p-3 flex-row gap-3 justify-center ">
        <div>
          <input
            className="rounded-2xl p-3 text-[15px] text-blue h-8"
            type="text"
            onChange={change}
            placeholder="City"
          />
        </div>
        <div
          onClick={fetchWeather}
          className="h-8 w-8 rounded-full cursor-pointer bg-white flex justify-center items-center"
        >
          <FontAwesomeIcon className="text-[10px]" icon={faMagnifyingGlass} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <img className="w-[120px] mt-8 h-[120px]" src={image} alt="" />
        </div>
        <div className="text-[50px] text-white">
          <span>{weatherData}</span> &deg;C
        </div>
        <div className="text-white">{cityName}</div>
      </div>
      <div className="flex mt-6 justify-between p-4 flex-row">
        <div className="flex gap-2 flex-row">
          <div className="icon">
            <FontAwesomeIcon
              className="text-white text-[27px] "
              icon={faWater}
            />
          </div>
          <div className="text-white">
            <span className="text-[20px]">{Humidity}%</span>
            <br />
            <span className="text-[12px]  text-white">Humidity</span>
          </div>
        </div>

        <div className="flex gap-2 flex-row">
          <div>
            <FontAwesomeIcon className="text-white text-[27px]" icon={faWind} />
          </div>

          <div className="text-white">
            <span className="text-[20px]">{windSpeed}</span> km/h
            <br />
            <span className="text-sm text-[12px] text-white">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
