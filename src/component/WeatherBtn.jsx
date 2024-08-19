import React from "react";

const WeatherBtn = (props) => {
  return (
    <div>
      {props.cities.map((item, index) => {
        return (
          <button key={index} onClick={() => props.setCity(item)}>
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default WeatherBtn;
