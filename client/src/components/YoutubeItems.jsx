import { ArrowForward } from "@mui/icons-material";
import "./bubble.css";
import { useLazyReadQuery } from "../features/api/apiSlice";
import { useEffect, useState } from "react";

const YoutubeItems = () => {
  const [
    trigger,
    { data: youtube, isFetching: youtubeFetching, isError: youtubeError },
  ] = useLazyReadQuery();

  const [category, setCategory] = useState("business");
  useEffect(() => {
    trigger({
      url: `/user/youtubes?category=${category}&limits=4`,
      tag: ["youtubes"],
    });
  }, [category]);

  const clickHandler = (id) => {
    ["business", "how-it-made", "life-experience", "interview"].map((e) => {
      const ids = document.getElementById(e);
      ids?.classList?.remove("text-[rgb(252,45,45)]");
      ids?.classList?.add("text-gray-500");
      if (e === id) {
        ids?.classList?.remove("text-gray-500");
        ids?.classList?.add("text-[rgb(252,45,45)]");
      }
    });
  };
  console.log(youtube, "youtube");
  return (
    <div className="w-full bg-gray-200 bg-dark px-4 mt-10 py-10 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid cols-5 place-items-center gap-3">
      <div className="flex pr-7  w-full justify-start gap-4 flex-col items-enter">
        <a
          href="https://www.youtube.com/etblink?watch"
          className="flex  cursor-pointer gap-2 items-center justify-start"
        >
          <svg
            className="w-8 h-8 text-[rgb(252,45,45)]"
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
          <p className="text-sm font-bold">OUR YOUTUBE'S</p>
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
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
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>

        {["business", "how-it-made", "life-experience", "interview"]?.map(
          (e) => {
            return (
              <div
                onClick={() => {
                  setCategory(e);
                  clickHandler(e);
                }}
                className="flex cursor-pointer w-full border-b border-gray-400 py-1  gap-2 items-center justify-start"
              >
                <svg
                  className={`w-6 h-6 ${
                    e === "business" ? "text-[rgb(252,45,45)]" : "text-gray-500"
                  }`}
                  id={e}
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
                <p className="text-sm">{e?.split("-")?.join(" ")}</p>
              </div>
            );
          }
        )}

        <div className="flex justify-between w-full items-center">
          {/* <div className="flex border rounded-full px-1 w-full border-gray-400 py-[1px]  gap-1 items-center justify-start"> */}
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
          {/* <span class="status online"></span>

            <p className="text-sm">live</p> */}
          {/* </div> */}
          {/* <div className="flex w-full ml-4 border-gray-400 py-1  gap-1 items-center justify-start">
            <p className="text-[13px]">Starts From 8:00 PM</p>
          </div> */}
        </div>
      </div>

      {youtube && youtube?.data && youtube?.data?.length > 0 ? (
        youtube?.data?.map((e, i) => {
          return (
            <div
              key={i}
              className="flex w-full rounded-sm relative justify-start py-4 gap-1 flex-col items-enter"
            >
              {/* <img src="./image-3.jpg" alt="" className="w-full" /> */}
              {/* <YouTube
                videoId={e}
                opts={opts}
                onReady={videoReady}
              /> */}
              {/* <div className="w-full"> ?autoplay=0&mute=1*/}
              <iframe
                src={`https://www.youtube.com/embed/${e?.videoId}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
              {/* </div> */}
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
                {e?.title?.length > 20
                  ? e?.title?.substring(0, 20) + "..."
                  : e?.title}
              </p>
              <p className="text-sm mt-2">
                {e?.subtitle?.length > 27
                  ? e?.subtitle?.substring(0, 27) + "..."
                  : e?.subtitle}
              </p>
            </div>
          );
        })
      ) : (youtube && youtube?.message) || youtube?.data?.length === 0 ? (
        <div className="w-full items-center justify-center flex">
          There is no video to display!
        </div>
      ) : null}
    </div>
  );
};

export default YoutubeItems;
