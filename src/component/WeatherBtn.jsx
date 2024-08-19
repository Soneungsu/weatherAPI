import React from "react";

const WeatherBtn = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className="main-container">
      <button
        className={`button ${
          selectedCity === null ? "button-selected" : "button-outline-warning"
        }`}
        onClick={() => handleCityChange("current")}
      >
        현재 위치
      </button>

      {cities.map((city, index) => (
        <button
          key={index}
          className={`button ${
            selectedCity === city ? "button-selected" : "button-outline-warning"
          }`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default WeatherBtn;
