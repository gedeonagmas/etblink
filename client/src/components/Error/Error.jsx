import { Close } from "@mui/icons-material";
import React from "react";

const Error = (props) => {
  return (
    <div className="flex items-start justify-center z-50 fixed w-auto top-44 right-4 flex-col shadow-sm shadow-black gap-2  h-auto py-8 px-2 rounded-md bg-red-200 border border-red-500">
      <p className="underline text-[14px] font-bold text-red-600">
        Error Messages {"("}
        {props?.errorMessage?.length}
        {")"}
      </p>

      {props?.errorMessage?.map((err, i) => {
        return (
          <p key={i} className="text-[14px] text-red-500">
            {i + 1}. {err} <br />
          </p>
        );
      })}

      <Close
        fontSize="small"
        onClick={() => props.setError(false)}
        className="absolute top-2 right-2 cursor-pointer"
      />
    </div>
  );
};

export default Error;
