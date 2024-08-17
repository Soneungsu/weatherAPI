import React from "react";

const WeatherBox = (props) => {
  //   console.log(props.weather);
  return (
    <div className="weather-box">
      <div>{props.weather?.name}</div>
      <h2>{props.weather?.main.temp} / 230화씨</h2>
      <h3>{props.weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
