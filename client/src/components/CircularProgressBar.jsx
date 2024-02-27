import React from "react";

const CircularProgressBar = (props) => {
  return (
    <div
      className={`absolute ${props.width} ${props.height} flex items-center justify-center rounded-full ${props.strokeColor}`}
    >
      <div
        className={`flex bg-white ${props.strokeWidth} ${props.strokeHeight} items-center justify-center h-20 rounded-full bg-blue-500`}
      >
        {props.text}
      </div>
    </div>
  );
};

export default CircularProgressBar;
