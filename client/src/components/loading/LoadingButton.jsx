import React from "react";
import "./loading.css";
import Loading from "./Loading";

const LoadingButton = (props) => {
  return (
    <div className="w-auto ">
      {props.pending && <Loading width={props.width} color={props.color} />}
      {!props.pending && (
        <button
          onClick={() => props.onClick()}
          className={`flex gap-2 ${props.width} mt-2 ${props.color} text-white py-2 px-4 items-center justify-center rounded-sm`}
        >
          {props.title}
        </button>
      )}
    </div>
  );
};

export default LoadingButton;
