import React, { useEffect, useState } from "react";
import Facebook from "@material-ui/icons/Facebook";
import Email from "@material-ui/icons/Email";
import EnhancedEncryption from "@material-ui/icons/EnhancedEncryption";
import Person from "@material-ui/icons/Person";
import ViewHeadlineSharp from "@material-ui/icons/Gavel";
import { Close } from "@material-ui/icons";
import LoadingButton from "./loading/LoadingButton";
import { useUserLoginMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, loginResponse] = useUserLoginMutation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [pending, setPending] = useState(false);

  const loginHandler = () => {
    loginData({ email: userName, password });
  };

  useEffect(() => {
    console.log(loginResponse, "login response");
    loginResponse.status === "pending" ? setPending(true) : setPending(false);
    loginResponse.status === "fulfilled"
      ? (setError(false),
        sessionStorage.setItem(
          "gsm-user",
          JSON.parse(JSON.stringify(loginResponse?.data))
        ),
        sessionStorage.setItem("gsm-user", JSON.stringify(loginResponse?.data)),
        navigate("/dashboard", { replace: true }))
      : null;

    loginResponse.status === "rejected"
      ? (setError(true), setErrorMessage([loginResponse?.error?.data?.msg]))
      : setError(false);
  }, [loginResponse]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="bg-blue-500 px-6 py-4 md:px-12 md:py-10 text-white font-bold flex flex-col items-center justify-center rounded-xl h-auto w-auto">
        <div className="flex items-center justify-center gap-4">
          <div className="p-2 rounded-full w-auto h-auto bg-white text-black">
            <ViewHeadlineSharp />
          </div>

          <p className="uppercase font-semibold text-2xl tracking-wide">
            gsm law firm
          </p>
        </div>

        <div className="rounded-lg p-6 md:p-10 flex flex-col gap-3 mt-6 bg-white relative h-full w-full">
          {error && errorMessage && (
            <div className=" absolute left-0 top-0 px-4 py-2 h-auto bg-red-200 text-red-500 rounded-lg rounded-b-none text-center border w-full border-red-500">
              <Close
                onClick={() => setError(false)}
                className="absolute right-1 top-1 cursor-pointer hover:text-red-400 text-red-500"
              />

              <p className="text-xs">Invalid user name or password</p>
            </div>
          )}
          <div className="flex flex-col md:items-center md:flex-row gap-x-4 gap-y-2">
            <p className="font-bold text-lg text-gray-800">Sign in </p>
            <p className="text-xs text-gray-600">
              Don't have an account?{" "}
              <span className="text-gray-800 font-bold underline ml-1 cursor-pointer">
                Register
              </span>{" "}
              here for free!
            </p>
          </div>

          <p className="w-full mt-1 text-xs text-black py-2 px-1 border-b-2 border-gray-400">
            Sign in easily with your social account!
          </p>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 w-full">
            <div className="flex cursor-pointer text-xs items-center justify-center gap-4 bg-blue-600 rounded-sm px-2 py-[4px] text-white">
              <Facebook className="" />{" "}
              <p className=" ">Sign in with facebook</p>
            </div>
            <div className="flex cursor-pointer text-xs items-center justify-center gap-4 bg-red-600 rounded-sm px-2 py-[4px] text-white">
              <Email className="" /> <p className=" ">Sign in with google</p>
            </div>
          </div>

          <p className="w-full mt-3 text-xs text-black py-2 px-1 border-b-2 border-gray-400">
            Sign in with your regular account!
          </p>

          <div className="flex flex-col justify-between w-full">
            <div className="flex text-xs relative text-gray-500 h-8 border border-gray-400 items-center justify-center gap-4  rounded-sm px-2 py-[2px] ">
              <Person className="" />{" "}
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="w-full focus:outline-none h-full py-1 px-2"
                placeholder="user name"
              />
            </div>

            <div className="flex text-xs relative text-gray-500 mt-2 h-8 border border-gray-400 items-center justify-center gap-4  rounded-sm px-2 py-[2px] ">
              <EnhancedEncryption className="" />{" "}
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full focus:outline-none h-full py-1 px-2"
                placeholder="password"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row  justify-between mt-3 text-gray-500">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <p className="text-xs">save password on computer</p>
            </div>
            <p className="text-xs cursor-pointer self-end md:self-start mt-2 md:mt-0">
              forget your password?
            </p>
          </div>

          <LoadingButton
            pending={pending}
            onClick={loginHandler}
            title="Sign in."
            color="bg-blue-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
