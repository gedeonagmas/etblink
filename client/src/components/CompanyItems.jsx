import { useEffect, useState } from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import "./bubble.css";
import { Link } from "react-router-dom";
import {
  useCreateSaveMutation,
  useDeleteSaveMutation,
  useReadQuery,
} from "../features/api/apiSlice";
import { SavedSearch } from "@mui/icons-material";
import { io } from "socket.io-client";
import Response from "./Response";

const CompanyItems = ({ value, phoneNo, type, data, disabled }) => {
  const [phone, setPhone] = useState(phoneNo);
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [removeData, removeResponse] = useDeleteSaveMutation();
  const [saveData, saveResponse] = useCreateSaveMutation();

  const { data: companies } = useReadQuery({
    url: `/user/users?user=${value}`,
    tag: ["users"],
  });

  const {
    data: saves,
    isFetching: savesIsFetching,
    isError: savesIsError,
  } = useReadQuery({
    url:
      user?.role === "company"
        ? `/user/saves?company=${value}&saver=${user?.user?._id}&populatingType=saves&populatingValue=company,saver`
        : `/user/saves?company=${value}&saver=${user?.user?._id}&populatingType=saves&populatingValue=company,saver`,
    tag: ["save", "company"],
  });

  const {
    data: views,
    isFetching: viewsIsFetching,
    isError: viewsIsError,
  } = useReadQuery({
    url:
      user?.role === "company"
        ? `/user/views?company=${value}&viewer=${user?.user?._id}&populatingType=saves&populatingValue=company,viewer`
        : `/user/views?company=${value}&viewer=${user?.user?._id}&populatingType=saves&populatingValue=company,viewer`,
    tag: ["view", "company"],
  });

  const removeHandler = () => {
    removeData({
      company: value,
      saver: user?.user?._id,
      role: user?.role,
      tag: ["save", "company"],
    });
  };

  const saveHandler = () => {
    saveData({
      company: value,
      saver: user?.user?._id,
      role: user?.role,
      tag: ["save", "company"],
    });
  };

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const [savePending, setSavePending] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);

  useEffect(() => {
    socket?.emit("connect-user", user?.email);
    socket?.on("aaa", (val) => {
      setOnlineUsers(val);
    });
  }, [socket]);

  const openClosedHandler = (workingDays) => {
    // const day =workingDays&& Object.keys(workingDays)?.filter((e) =>
    //   e
    //     ?.toLowerCase()
    //     ?.startsWith(new Date()?.toString()?.split(" ")[0]?.toLowerCase())
    // );

    // console.log(workingDays[day[0]]?.from, "ddddddddddd");
    return "Open";
  };

  const sizeHandler = (text, size) => {
    return text?.length > size ? text?.substring(0, size) + "..." : text;
  };

  const detailHandler = (id, types) => {
    const ids = document.getElementById(id);
    console.log(id, types);
    types === "hide"
      ? ids?.classList?.add("hidden")
      : ids?.classList?.remove("hidden");
  };

  // console.log(onlineUsers, companies?.data[0]?.email, "users");
  // console.log(views, "views");
  // console.log(user?.user?._id, "current user");
  console.log(value, "company");
  return (
    <div
      key={value}
      className="w-full relative h-auto bg-white dark:bg-gray-700 rounded-md shadow-xl shadow-gray-200 flex flex-col items-start text-sm justify-start"
    >
      <Response response={saveResponse} setPending={setSavePending} />

      <div className="w-full relative rounded-xl   flex items-center justify-center gap-4">
        <div className="relative w-full">
          <img
            src={data?.banner}
            alt=""
            className={`w-full brightness-[0.5] ${
              type === "large" ? "h-[190px]" : "h-[140px]"
            } rounded-b-none rounded-xl`}
          />
          <div className="absolute top-4 border-4 border-gray-300 border-dashed left-2 rounded-full shadow-lg px-4 py-1 bg-white text-black">
            {openClosedHandler(data?.workingDays)}
          </div>
          <Link
            to={user?.user?._id === value ? "/dashboard/views" : ""}
            className={`absolute px-1 py-1  ${
              user?.role === "company"
                ? "cursor-pointer hover:bg-red-500"
                : "cursor-default"
            } rounded-md bg-main ml-1 gap-1 shadow-lg bottom-1 text-white flex items-center justify-center left-2`}
          >
            {views?.message ? (
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {data?.views?.total}
          </Link>
          <div
            onClick={() => {
              if (!disabled) {
                saves?.data?.length > 0 ? removeHandler() : saveHandler();
              }
            }}
            className={`absolute border ${
              !disabled && "cursor-pointer"
            } hover:bg-gray-300/20 rounded-lg px-1 py-1 mr-1 gap-1 shadow-lg bottom-1 text-white flex items-center justify-center right-2`}
          >
            {saves?.data?.length > 0 ? (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
              </svg>
            ) : (
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            )}
            {data?.saves?.total}
          </div>
        </div>
        <div
          className={`absolute bg-white bg-dark ${
            type === "large"
              ? "w-[130px] top-[125px] h-[130px]  border-[6px]"
              : "w-[80px] top-[100px] h-[80px] border-[4px]"
          } border-spacing-7 z-10  border-gray-200 rounded-full   flex items-center justify-center`}
        >
          <img src={data?.logo} alt="" className="w-full h-full rounded-full" />
          <div
            className={`${
              type === "large"
                ? "w-5 h-5 top-1 right-2"
                : "w-4 h-4 top-2 -right-1"
            } absolute ${
              onlineUsers?.includes(companies?.data[0]?.email)
                ? "bg-emerald-400"
                : "bg-gray-300"
            } p-1 border-2 border-white rounded-full`}
          ></div>
        </div>
      </div>

      <div
        className={`flex flex-col gap- w-full ${
          type === "large" ? "mt-16" : "mt-10"
        } items-center justify-center`}
      >
        <div class="flex mt-3 items-center">
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <div className="text-[20px] relative px-2 flex items-center text-center justify-center gap-3 mt-3 font-semibold text-gray-700 dark:text-gray-100">
          {sizeHandler(data?.name, 30)}{" "}
          {/* <span
            onMouseOver={() => detailHandler(data?._id, "hide")}
            onMouseLeave={() => detailHandler(data?._id, "show")}
            className="-ml-3"
          >
            ...
          </span> */}
          <svg
            class="w-6 h-6 text-emerald-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
              clip-rule="evenodd"
            />
          </svg>
          {/* <p
            id={data?._id}
            className="absolute hidden text-[16px] -bottom-2 bg-white w-full shadow-lg left-2 border rounded-sm px-2 py-1 text-start"
          >
            {data?.name}
          </p> */}
        </div>
        <p className="text-[15px] font-light mt-2">
          {sizeHandler(data?.title, 30)}
        </p>

        <div
          className={`w-full px-4 py-2 border-b border-gray-200 mt-2 text-gray-500 dark:text-white flex ${
            type === "large" ? "flex-row items-center" : "flex-col items-start"
          } justify-between`}
        >
          <div className="flex -ml-2 items-center text-[16px] font-light  gap-1 justify-center">
            <svg
              class={`${type === "large" ? "w-8 h-8" : "w-6 h-6"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
              />
            </svg>
            {sizeHandler(data?.address, 15)}
          </div>
          <div className="flex -ml-2 gap-1 items-center text-[16px] font-light justify-center">
            <svg
              class={`${type === "large" ? "w-8 h-8" : "w-7 h-7"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z"
              />
            </svg>
            <p className="">{phone}</p>
            <p
              id={value}
              onClick={() => {
                setPhone(data?.phone);
                const id = document.getElementById(value);
                id?.classList?.add("hidden");
              }}
              className="text-sm px-2 py-[2px] rounded-md cursor-pointer bg-[rgb(252,45,45)] text-white"
            >
              show
            </p>
          </div>
        </div>
      </div>
      <div className="flex my-3 w-full items-center justify-between px-3 ">
        <a
          href="/dashboard/message"
          className={`flex items-center ${
            type === "large" ? "px-2" : "px-1"
          } rounded-full hover:bg-orange-500 hover:text-white border border-gray-300 cursor-pointer text-[14px]  justify-center`}
        >
          {onlineUsers?.includes(companies?.data[0]?.email) ? (
            <span class="status online"></span>
          ) : (
            <span class="w-5 my-2 mx-2 h-5 bg-main rounded-full border"></span>
          )}
          <p className="mr-3">chat</p>
        </a>

        <a
          href={`/company?id=${value}`}
          state={{ id: value }}
          className={` ${
            type === "large" ? "py-[8px] px-10" : "px-4"
          } py-[6px] ${
            value === 1
              ? "bg-[#00aeff]"
              : value === 2
              ? "bg-emerald-500"
              : "bg-orange-500"
          }  text-white rounded-s cursor-pointer`}
        >
          Detail
        </a>
      </div>
    </div>
  );
};

export default CompanyItems;
