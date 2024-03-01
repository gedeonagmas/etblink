import { useNavigate } from "react-router-dom";

const CompanyItemsCompany = ({ value }) => {
  const navigate = useNavigate();
  return (
    <div
      key={value}
      className="w-full relative  py-8 px-6 h-auto bg-white dark:bg-gray-700 rounded-md shadow-md shadow-gray-400 flex flex-col items-start text-sm justify-start"
    >
      <p className="font-bold">Ethiopian business link portal your alliance</p>

      <div
        className={`absolute ${
          value === 0
            ? "bg-emerald-400"
            : ""
        } top-0 left-0 h-[8px] rounded-sm rounded-b-none w-full `}
      ></div>
      <p className="text-dark mt-2">Ethiopian business link</p>
      <div className="w-full relative my-2 shadow-lgd py-2  flex items-center justify-center gap-2">
        <div className="relative w-full">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-full brightness-[0.5] h-20 rounded-sm"
          />
          <p className="absolute text-xs gap-1 shadow-lg bottom-1 text-white flex items-center justify-center left-2">
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

          <p className="absolute text-xs gap-1 shadow-lg bottom-1 text-white flex items-center justify-center right-2">
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
        <div className="absolute bg-white bg-dark w-16 top-[55px] z-10 h-16 border border-dark rounded-full shadow-sm   flex items-center justify-center">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-full h-full rounded-full"
          />
          <div className="w-4 absolute top-1 right-0 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
        </div>
      </div>
      {/* <p className="mt-10">local company from ethiopia</p> */}
      <div className="flex flex-col gap-2 w-full mt-5 items-start justify-between">
        <div className="flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-800 dark:text-white"
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
            className="w-5 h-5 text-gray-800 dark:text-white"
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
            className="w-5 h-5 "
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
            className="w-5 h-5 text-gray-800 dark:text-white"
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
      <div onClick={()=>navigate('/company-detail')} className="flex gap-2 mt-2 self-end rounded-full py-[6px] px-3 bg-main text-white items-center justify-center">
        <svg
          className="w-5 h-5"
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
    </div>
  );
};

export default CompanyItemsCompany;
