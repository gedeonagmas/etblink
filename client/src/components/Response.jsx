import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const Response = ({ response, setPending, redirectTo, type }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    response.status === "pending" ? setPending(true) : setPending(false);

    response.status === "fulfilled"
      ? (setError(false),
        setSuccess(true),
        setSuccessMessage(response?.data?.message),
        type === "login"
          ? (localStorage.setItem("jwt", response?.data?.token),
            localStorage.setItem("user", JSON.stringify(response?.data?.data)),
            redirectTo.length > 0
              ? navigate(redirectTo, { replace: true })
              : null)
          : redirectTo && redirectTo?.length > 0
          ? navigate(redirectTo)
          : setTimeout(() => {
              setSuccess(false);
            }, 4000))
      : null;

    response.status === "rejected"
      ? (setError(true), setErrorMessage([response?.error?.data?.message]))
      : setError(false);
  }, [response]);

  return (
    <div>
      {error && errorMessage && (
        <div className="flex items-start justify-center z-50 fixed w-auto top-44 right-4 flex-col shadow-sm shadow-black gap-2  h-auto py-8 px-2 rounded-md bg-red-200 border border-red-500">
          <p className="underline text-[14px] font-bold text-red-600">
            Error Messages {"("}
            {errorMessage?.length}
            {")"}
          </p>

          {errorMessage?.map((err, i) => {
            return (
              <p key={i} className="text-[14px] text-red-500">
                {i + 1}. {err} <br />
              </p>
            );
          })}

          <Close
            fontSize="small"
            onClick={() => setError(false)}
            className="absolute top-2 right-2 cursor-pointer"
          />
        </div>
      )}
      {success && successMessage && (
        <div className="flex items-start justify-center fixed w-auto top-44 z-50 max-w-[400px] right-4 flex-col shadow-sm shadow-black gap-2  h-auto py-8 px-2 rounded-md bg-emerald-200 border border-emerald-500">
          <p className="text-[14px] font-bold text-emerald-500">
            {successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default Response;
