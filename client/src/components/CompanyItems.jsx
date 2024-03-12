import { useState } from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const CompanyItems = ({ value, phoneNo }) => {
  const [phone, setPhone] = useState(phoneNo);
  return (
    <div
      key={value}
      className="w-full relative h-auto bg-white dark:bg-gray-700 rounded-md shadow-xl shadow-gray-200 flex flex-col items-start text-sm justify-start"
    >
      {/* <p className="mt-7 font-bold">Ethiopian business link portal</p> */}

      {/* rotated banner */}
      {/* <div className="flex rotate-[270deg] absolute z-20 -left-[38px] -top-[11px] gap-x-3">
        <svg color="blue" width="100" height="100" viewBox="-150 -150 400 400">
          <polygon
            points=" 200 200,0 0, 200 0,"
            fill={
              value === 0 || value === 5 || value === 7
                ? "#00A9A8"
                : value === 1 || value === 4 || value === 9
                ? "#FFA500"
                : "#FF5A1F"
            }
          />
        </svg>
        <p className="absolute rotate-45 top-11 left-16 text-white">0{ value}</p>
      </div> */}
      {/* <div
        className={`absolute ${
          value === 0
            ? "bg-yellow-400"
            : value === 1
            ? "bg-red-500"
            : value === 2
            ? "bg-emerald-400"
            : "bg-white"
        } top-0 left-0 h-[8px] rounded-md rounded-b-none w-full `}
      ></div> */}
      {/* <p className="text-dark text-gray-500 text-dark mt-2">
        Ethiopian business
      </p> */}
      <div className="w-full relative rounded-xl   flex items-center justify-center gap-4">
        <div className="relative w-full">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-full brightness-[0.5] h-[190px] rounded-b-none rounded-xl"
          />
          <div className="absolute top-4 left-2 rounded-full shadow-lg px-5 py-2 bg-white text-black">
            Open
          </div>
          <p className="absolute px-2 py-1 rounded-md bg-main ml-1 gap-1 shadow-lg bottom-1 text-white flex items-center justify-center left-2">
            {" "}
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
            2.5k
          </p>

          <p className="absolute mr-1 gap-1 shadow-lg bottom-1 text-white flex items-center justify-center right-2">
            {" "}
            <svg
              className="w-5 h-5 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
            </svg>
            1.2k
          </p>
        </div>
        <div className="absolute bg-white bg-dark w-[130px] h-[130px] top-[125px] rounded-l-mds border-[6px] border-spacing-7 z-10  border-gray-200 rounded-full   flex items-center justify-center">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-full h-full rounded-full"
          />
          <div className="w-4 absolute top-1 -right-1 h-4 bg-emerald-400 p-1 border-2 border-white rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col gap- w-full mt-16 items-center justify-center">
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
        <p className="text-[20px] flex items-center justify-center mt-3 font-semibold text-gray-700">
          Healthy Food <VerifiedOutlinedIcon className="text-emerald-400" />
        </p>
        <p className="text-[15px] font-light mt-2">Outdoor, luxury for you</p>

        <div className="w-full px-4 py-2 border-b border-gray-200 mt-2 text-gray-500 dark:text-white flex items-center justify-between">
          <div className="flex -ml-2 items-center text-[16px] font-light  gap-1 justify-center">
            <svg
              class="w-8 h-8 "
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
            Adiss ababa
          </div>
          <div className="flex gap-1 items-center text-[16px] font-light justify-center">
            <svg
              class="w-8 h-8"
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
                setPhone("+251 954104637");
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
      <div className="flex my-3 w-full items-center justify-between px-5 ">
        <div className="flex items-center px-3  text-[14px]  gap-2 justify-center">
          <div className="p-2 bg-[rgb(252,45,45)] rounded-full text-white">
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
              />
            </svg>{" "}
          </div>
          Chat
        </div>

        <button
          className={`py-[8px] px-10 ${
            value === 1
              ? "bg-[#00aeff]"
              : value === 2
              ? "bg-emerald-500"
              : "bg-orange-500"
          }  text-white rounded-sm`}
        >
          Detail{" "}
        </button>
      </div>
    </div>
  );
};

export default CompanyItems;
