const CompanyItems = ({ value }) => {
  return (
    <div
      key={value}
      className="w-full relative  py-1 px-6 h-auto bg-white dark:bg-gray-700 rounded-md shadow-md shadow-gray-400 flex flex-col items-start text-sm justify-start"
    >
      <p className="mt-7 font-bold">Ethiopian business link portal</p>

      <div className="flex rotate-[270deg] absolute z-20 -left-[38px] -top-[11px] gap-x-3">
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
          {/* <circle cx="100" cy="100" r="6" fill="red"></circle> */}
        </svg>
        <p className="absolute rotate-45 top-11 left-16 text-white">0{ value}</p>
      </div>
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
      <p className="text-dark text-gray-500 text-dark mt-2">
        Ethiopian business
      </p>
      <div className="w-full relative my-3 shadow-lgd py-2  flex items-center justify-center gap-4">
        <div className="relative w-full">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-full brightness-[0.5] h-[90px] rounded-sm"
          />
          <p className="absolute text-[13px] gap-1 shadow-lg bottom-1 text-white flex items-center justify-center left-2">
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
            2500
          </p>

          <p className="absolute text-[13px] gap-1 shadow-lg bottom-1 text-white flex items-center justify-center right-2">
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
            1200
          </p>
        </div>
        <div className="absolute bg-white bg-dark w-[60px] top-[67px] z-10 h-[60px] border border-dark rounded-full shadow-sm   flex items-center justify-center">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-full h-full rounded-full"
          />
          <div className="w-4 absolute top-1 -right-1 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* <div className="flex w-full mt-10 items-center justify-between">
        <div className="flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              clipRule="evenodd"
            />
          </svg>
          Addiss ababa
        </div>
        <div className="flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z" />
          </svg>
          +251 954104637
        </div>
      </div>

      <div className="flex mt-3 w-full items-center justify-between">
        <div className="flex px-2 py-1 text-white bg-yellow-400 rounded-full items-center gap-1 justify-center">
          <svg
            className="w-6 h-6 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
          </svg>
          4.5
        </div>

        <div className="flex gap-1 items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.6l-2.9 2.6c-1 .9-2.5.2-2.5-1.1V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z"
              clipRule="evenodd"
            />
          </svg>
          Chat
        </div>

        <div className="flex gap-2 rounded-full py-[6px] px-3 bg-main text-white items-center justify-center">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
          Detail
        </div>
      </div> */}
      <div className="flex mt-5 w-full items-center justify-between">
        <div className="flex items-center gap-1 justify-center">
          <svg
            className="w-4 h-4 text-gray-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              clipRule="evenodd"
            />
          </svg>
          Addiss ababa
        </div>
        <div className="flex gap-1 items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.6l-2.9 2.6c-1 .9-2.5.2-2.5-1.1V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z"
              clipRule="evenodd"
            />
          </svg>
          Chat
        </div>
      </div>
      <div className="flex my-2 w-full items-center justify-between">
        <div class="flex items-center">
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          {/* <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg> */}
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          {/* <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg> */}
          <svg
            class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.5
          </p>
        </div>

        <button
          className={`py-[2px] px-4 ${
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

// const CompanyItems = ({ value }) => {
//   return (
//     <div
//       key={value}
//       className="w-full relative  py-8 px-10 h-auto bg-white dark:bg-gray-700 rounded-md shadow-md shadow-gray-400 flex flex-col items-start text-sm justify-start"
//     >
//       <p className="font-bold">Ethiopian business link portal your alliance</p>

//       <div class="flex rotate-[270deg] absolute z-20 -left-[112px] -top-[37px] gap-x-3">
//         <svg width="100" height="100" viewBox="-150 -150 400 400">
//           <polygon
//             points=" 200 200,0 0, 200 0,"
//             onclick="rotate()"
//             mydatadeg="0"
//           />
//           <circle cx="100" cy="100" r="6" fill="red"></circle>
//         </svg>
//       </div>
//       <div
//         className={`absolute ${
//           value === 0
//             ? "bg-yellow-400"
//             : value === 1
//             ? "bg-red-500"
//             : value === 2
//             ? "bg-emerald-400"
//             : "bg-white"
//         } top-0 left-0 h-[8px] rounded-md rounded-b-none w-full `}
//       ></div>
//       <p className="text-dark text-gray-500 text-dark mt-2">
//         Ethiopian business link
//       </p>
//       <div className="w-full relative my-3 shadow-lgd py-6  flex items-center justify-center gap-4">
//         <div className="relative w-full">
//           <img
//             src="./image-1.jpg"
//             alt=""
//             className="w-full brightness-[0.5] h-28 rounded-sm"
//           />
//           <p className="absolute gap-1 shadow-lg bottom-1 text-white flex items-center justify-center left-2">
//             {" "}
//             <svg
//               className="w-6 h-6 "
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             2500
//           </p>

//           <p className="absolute gap-1 shadow-lg bottom-1 text-white flex items-center justify-center right-2">
//             {" "}
//             <svg
//               className="w-6 h-6 "
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
//             </svg>
//             1200
//           </p>
//         </div>
//         <div className="absolute bg-white bg-dark w-20 top-[90px] z-10 h-20 border border-dark rounded-full shadow-sm   flex items-center justify-center">
//           <img
//             src="./image-1.jpg"
//             alt=""
//             className="w-full h-full rounded-full"
//           />
//           <div className="w-5 absolute top-2 right-0 h-5 bg-emerald-400 rounded-full border-2 border-white"></div>
//         </div>
//       </div>
//       <div className="flex mt-10 w-full items-center justify-between">
//         <div className="flex items-center gap-1 justify-center">
//           <svg
//             className="w-4 h-4 text-gray-600 dark:text-white"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Addiss ababa
//         </div>
//         <div className="flex gap-1 items-center justify-center">
//           <svg
//             className="w-4 h-4 text-gray-600 dark:text-white"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.6l-2.9 2.6c-1 .9-2.5.2-2.5-1.1V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Chat
//         </div>
//       </div>
//       <div className="flex mt-5 w-full items-center justify-between">
//         <div class="flex items-center">
//           <svg
//             class="w-4 h-4 text-yellow-300 me-1"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 22 20"
//           >
//             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//           </svg>
//           <svg
//             class="w-4 h-4 text-yellow-300 me-1"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 22 20"
//           >
//             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//           </svg>
//           <svg
//             class="w-4 h-4 text-yellow-300 me-1"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 22 20"
//           >
//             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//           </svg>
//           <svg
//             class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 22 20"
//           >
//             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//           </svg>
//           <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//             4.5
//           </p>
//         </div>

//         <button
//           className={`py-[2px] px-4 ${
//             value === 1
//               ? "bg-[#00aeff]"
//               : value === 2
//               ? "bg-emerald-500"
//               : "bg-orange-500"
//           }  text-white rounded-sm`}
//         >
//           Read more{" "}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompanyItems;
