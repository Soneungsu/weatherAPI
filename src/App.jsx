import React, { useState, useEffect } from "react";
import WeatherBox from "./component/Weather.jsx";
import WeatherBtn from "./component/WeatherBtn.jsx";
import cities from "./data/cities.jsx";
import { Header } from "./component/Header.jsx";
import { ClipLoader } from "react-spinners";
import "./global.scss";

const API_KEY = "949477a686fc137619db603eaed963ae";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null); // 초기값을 null로 설정
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState(""); // API 에러를 처리할 상태 추가

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  useEffect(() => {
    setLoading(true);
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (newCity) => {
    if (newCity === "current") {
      setCity(null);
    } else {
      setCity(newCity);
    }
  };

  return (
    <>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c7b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          {apiError ? (
            <p>{apiError}</p>
          ) : (
            <>
              <Header />
              <WeatherBox weather={weather} />
              <WeatherBtn
                cities={cities}
                selectedCity={city}
                handleCityChange={handleCityChange}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default App;
