import { useNavigate } from "react-router-dom";

const NewsItem = ({ value }) => {
  const navigate = useNavigate();
  return (
    <div
      key={value}
      className="w-full relative h-auto bg-white dark:bg-gray-700 rounded-md shadow-md shadow-gray-400 flex flex-col items-start justify-start"
    >
      <div className="w-full relative  flex items-center justify-center">
        <div className="relative max-w-xs overflow-hidden rounded-md bg-cover bg-no-repeat w-full">
          <img
            src="./image-1.jpg"
            alt=""
            className="w-[300px] h-52 transition duration-300 ease-in-out hover:scale-125 rounded-md rounded-b-none"
          /> 
        </div>
      </div>

      <div className="flex w-auto self-center bg-white rounded-sm text-gray-600 items-center justify-center -mt-16 z-20 relative">
        <div className="flex px-3 py-1 rounded-sm rounded-r-none text-sm text-white bg-main flex-col items-center justify-center">
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
      <div className="mt-3 bg-white bg-dark px-5 relative flex flex-col gap-3 items-start rounded-t-none rounded-md">
        <div className="w-full border-b  py-5 border-gray-300">
          <p className="font-bold  border-gray-300">
            Ethiopian business link is launch a new portal check
          </p>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consect adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisi.
          </p>
        </div>
        <div
          onClick={() => navigate("/news-detail")}
          className="flex gap-2 cursor-pointer w-full shadow-sm rounded-full px-5 items-center justify-between pb-4 pt-1"
        >
          Read more
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
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
