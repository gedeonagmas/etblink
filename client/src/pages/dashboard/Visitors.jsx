import React from "react";
import { More, MoreVert } from "@mui/icons-material";
import gedi from "../../assets/gedi.jpg";
import Promotion from "../../components/Promotion";
const Visitors = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-5">
      <div className="flex flex-col border-r pr-4 w-full lg:flex-[70%]">
        <Promotion />
        <div className="mt-5 bg-gray-100 dark:bg-gray-700 p-2 grid gap-5 grid-cols-3 md:grid-cols-5 lg:grid-cols-6 rounded-sm">
          {[1, 2, 3, 4, 5, 6].map((e, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between p-2 h-full bg-dark bg-white"
              >
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div
                    className={`flex py-1 px-1 text-white text-dark ${
                      i === 1
                        ? "bg-emerald-400"
                        : i === 2
                        ? "bg-pink-500"
                        : i === 3
                        ? "bg-yellow-400"
                        : i === 4
                        ? "bg-blue-500"
                        : i === 5
                        ? "bg-emerald-500"
                        : "bg-indigo-500"
                    } rounded-sm`}
                  >
                    <svg
                      class="w-6 h-6 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">Income</p>
                  <p className=" font-bold">$35.9k</p>
                </div>
                <div className="flex flex-col h-full items-start justify-between">
                  <MoreVert fontSize="small" />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-lg text-gray-500">Your saves</p>
        <div className="flex bg-gray-100 dark:bg-gray-700 flex-col gap-2 p-2 w-full mt-2">
          {[1, 2, 3, 4, 5].map((e, i) => {
            return (
              <div
                key={i}
                className="flex p-4 bg-white bg-dark border border-dark hover:border-main rounded-xl items-center justify-between"
              >
                <svg
                  class="w-7 h-7 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-lg font-semibold">Skylight technologies</p>
                  <p className="text-sm">ethiopian business link</p>
                </div>

                <div className="flex text-sm flex-col gap-1 items-start">
                  <p className="font-semibold">Technology company</p>
                  <p className="">2 days ago</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex-[30%]">
        <div className="bg-white bg-dark border-dark py-4 px-2 mt-3 border-b-2 border-gray-100">
          <p className="text-xl text-gray-400 font-bold">Your Balance</p>
          <div className="flex w-full items-center justify-between mt-4">
            <p className="text-xl font-bold">$2190.19</p>
            <div className="flex items-center gap-1 text-emerald-500 text-lg font-semibold">
              <svg
                class="w-6 h-6"
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
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
              9.14%
            </div>
            <div className="flex items-center gap-1 text-main text-lg font-semibold">
              <svg
                class="w-6 h-6 "
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
                  d="M12 19V5m0 14-4-4m4 4 4-4"
                />
              </svg>
              9.14%
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-4 p-2">
          <div className="">
            <p className="text-gray-400 mb-1 text-lg">Currency</p>
            <p className="mb-1 text-lg">USD/Birr</p>
          </div>
          <div className="">
            <p className="text-gray-400 mb-1 text-lg">Status</p>
            <p className="mb-1 text-lg">Active</p>
          </div>
          <div className="">
            <p className="text-gray-400 mb-1 text-lg">Expired on</p>
            <p className="mb-1 text-lg">
              Jan 24,2024{" "}
              {/* <span className="ml-2 text-main text-sm">2 days left</span> */}
            </p>
          </div>
        </div>

        <p className="text-xl text-gray-400 font-bold mt-5">Your messages</p>
        <div className="gap-1 flex flex-col">
          {[1, 2, 3, 4, 5, 6].map((e, i) => {
            return (
              <div className="flex relative w-full bg-gray-100 dark:bg-gray-700 p-2 items-center rounded-xl gap-3 mt-3">
                <div className="w-[14%] relative">
                  <img src={gedi} alt="" className="w-10 h-10 rounded-full" />
                </div>

                <div className="flex w-[86%] flex-col">
                  <p className="font-bold">Gedion</p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consecte adipisicing elit.
                  </p>
                  <p className="text-xs self-end">jan 21,2024</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Visitors;
