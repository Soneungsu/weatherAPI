import { useEffect, useState } from "react";
import WeatherBox from "./component/Weather.jsx";
import WeatherBtn from "./component/WeatherBtn.jsx";
import cities from "./data/cities.jsx";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import "./global.scss";

function App() {
  const API_KEY = "949477a686fc137619db603eaed963ae";
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    try {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherByCity = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    try {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      console.log("data:", data);
      setWeather(data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    city === "" ? getCurrentLocation() : getWeatherByCity();
  }, []);

  useEffect(() => {
    // console.log(city);
    getWeatherByCity();
  }, [city]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  };

  return (
    <>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherBtn cities={cities} setCity={setCity} />
      </div>
    </>
  );
}

export default App;
