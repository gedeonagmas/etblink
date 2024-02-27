import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const CircularProgress = (props) => {
  return (
    <CircularProgressbar
      value={props.value}
      className="h-12 w-12"
      strokeWidth={props.strokeWidth}
      styles={buildStyles({
        pathColor: `#0000001`,
        textColor: "red",
        trailColor: "rgb(209 213 219)",
        backgroundColor: "#3e98c7",
      })}
    />
  );
};

export default CircularProgress;
