import { useNavigate } from "react-router-dom";

const NewsItem = ({ value }) => {
  const navigate = useNavigate();
  return (
    <div
      key={value}
      className="w-full relative h-auto bg-white dark:bg-gray-700 rounded-md shadow-md shadow-gray-400 flex flex-col items-start justify-start"
    >
      <div className="w-full relative  flex items-center justify-center">
        <div className="relative w-full">
          <img src="./image-1.jpg" alt="" className="w-full h-52 rounded-md" />
        </div>
      </div>

      <div className="flex w-auto self-center bg-white rounded-md text-gray-600 items-center justify-center -mt-16 z-20 relative">
        <div className="flex px-3 py-1 rounded-md rounded-r-none text-sm text-white bg-main flex-col items-center justify-center">
          <p>30</p>
          <p>May</p>
        </div>
        <div className="flex py-1 rounded-lg text-sm  gap-1 items-center justify-center">
          <svg
            class="w-7 h-7"
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
              d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <p>Admin</p>
        </div>

        <div className="flex py-1 ml-5 pr-2 rounded-lg text-sm gap-1 items-center justify-center">
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
              stroke-width="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <p> Views(3.2k)</p>
        </div>
      </div>
      <div className="p-4 mt-5 bg-white bg-dark relative flex flex-col gap-3 items-start rounded-md">
        <p className="px-4 flex items-center justify-center gap-2 w-auto py-2 bg-main rounded-lg text-white">
          <svg
            class="w-6 h-6 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
              clip-rule="evenodd"
            />
          </svg>
          jan 22 2024
        </p>
        <p className="font-bold">
          Ethiopian business link is launch a new portal
        </p>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div
          onClick={() => navigate("/news-detail")}
          className="flex gap-2 cursor-pointer mt-2 rounded-full py-[6px] px-3 items-center justify-center"
        >
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
          Read more
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
