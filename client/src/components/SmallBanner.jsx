import React from "react";

const SmallBanner = () => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-[20%]">
      <div className="flex w-full mb-1 justify-between items-center">
        <p className="font-bold">Featured</p>
        <div className="flex gap-2 items-center justify-center">
          <svg
            class="w-6 h-6 text-gray-400 dark:text-white"
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
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
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
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </div>
      </div>
      <div className="">
        <img src="./sofi.jpeg" alt="" className="w-full h-[500px]" />
      </div>
    </div>
  );
};

export default SmallBanner;
