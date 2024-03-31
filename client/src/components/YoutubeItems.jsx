import { Visibility } from "@mui/icons-material";
import "./bubble.css";

const YoutubeItems = () => {
  return (
    <div className="w-full bg-gray-200 bg-dark mt-10 py-10 px-main h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid cols-5 place-items-center gap-3">
      <div className="flex pr-7  w-full justify-start gap-4 flex-col items-enter">
        <p className="text-lg font-bold">Our you tubes</p>
        {/* <p className="text-sm">our latest videos</p> */}

        <div className="flex py-1 border-b-2 border-gray-700 items-center justify-between">
          <div className="flex  gap-1 items-center justify-center">
            <svg
              className="w-6 h-6 text-[rgb(252,45,45)]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
                clipRule="evenodd"
              />
            </svg>
            <p className=" font-bold">YOUTUBE</p>
          </div>
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

        <div className="flex w-full border-b border-gray-400 py-1  gap-1 items-center justify-start">
          <svg
            className="w-6 h-6 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">How it made</p>
        </div>

        <div className="flex w-full border-b border-gray-400 py-1  gap-1 items-center justify-start">
          <svg
            className="w-6 h-6 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">Interview</p>
        </div>
        <div className="flex w-full border-b border-gray-400 py-1  gap-1 items-center justify-start">
          <svg
            className="w-6 h-6 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">Life Experience</p>
        </div>

        <div className="flex justify-between w-full items-center">
          <div className="flex border rounded-full px-1 w-full border-gray-400 py-[1px]  gap-1 items-center justify-start">
            {/* <svg
              className="w-6 h-6 text-green-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
                clipRule="evenodd"
              />
            </svg> */}
            <span class="status online"></span>

            <p className="text-sm">live</p>
          </div>
          <div className="flex w-full ml-4 border-gray-400 py-1  gap-1 items-center justify-start">
            <p className="text-[13px]">Starts From 8:00 PM</p>
          </div>
        </div>
      </div>

      {[0, 1, 2, 3].map((e, i) => {
        return (
          <div
            key={i}
            className="flex w-full rounded-sm relative justify-start py-4 gap-1 flex-col items-enter"
          >
            {/* <img src="./image-3.jpg" alt="" className="w-full" /> */}
            <video
              src="video.mp4"
              controls
              autoplay
              muted
              className="w-full h-40"
            ></video>
            <p className="font-bold flex items-center justify-start gap-2 text-sm mt-4">
              {" "}
              <svg
                className="w-6 h-6 text-[rgb(252,45,45)]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
                  clipRule="evenodd"
                />
              </svg>
              Video title
            </p>
            <p className="text-sm mt-2">
              Videos sub title and video description
            </p>
            {/* <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex items-center justify-center gap-2">
                <Visibility sx={{ width: 20, height: 20 }} />{" "}
                <p className="text-xs">2500 views</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                </svg>

                <p className="text-xs">2000 likes</p>
              </div>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default YoutubeItems;
