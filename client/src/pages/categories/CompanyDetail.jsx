import { Visibility } from "@mui/icons-material";
import { Carousel, Rating } from "flowbite-react";
import { useState } from "react";
import Map from "../../components/Map";
const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
];

const CompanyDetail = () => {
  const [rating, setRating] = useState("3.5");
  return (
    <div className="relative overflow-hidden z-20">
      <div
        style={{ backgroundImage: "url('./image-4.jpg')" }}
        className="h-[82vh] px-main relative w-full"
      >
        <div className="absolute px-2 shadow-lg bg-gray-500/50 bottom-0 py-4 h-auto flex items-end justify-between w-[60%]">
          <div className="w-auto gap-6 flex flex-col lg:flex-row items-end justify-center">
            <img src="./image-3.jpg" alt="" className="h-32 w-40 rounded-md" />
            <div className="flex flex-col gap-2 text-white">
              <p className="font-bold text-xl">ETBlink ethiopia</p>
              <p className="mt-2">ethiopian business link</p>
              <p className="flex  ">
                <svg
                  class="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z" />
                </svg>
                +251 954104637{" "}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <p className="py-2  px-3 cursor-pointer rounded-sm border border-gray-200 text-white flex items-endjustify-end gap-2">
              <svg
                class="w-5 h-5 text-white"
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
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>{" "}
              save
            </p>
            <p className="py-2  px-3 cursor-pointer rounded-sm border border-gray-200  text-white flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-white"
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
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>{" "}
              save
            </p>
            <p className="py-2 px-3 cursor-pointer rounded-sm border border-gray-200  text-white flex items-center justify-center  gap-2">
              <svg
                class="w-6 h-6 text-white"
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
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>{" "}
              save
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-0">
        <div className="h-auto px-main mt-4 py-4 flex flex-col gap-10 bg-yellow-500f w-full lg:w-[67%]">
          <div className="flex flex-col lg:flex-row text-sm items-center justify-between">
            {/* <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
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
                  d="m11.5 11.5 2 2M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.2-5.3a1.5 1.5 0 0 1 2 2L10 17Zm-5 3h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                />
              </svg>
              Hotel
            </p> */}
            <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
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
                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
                />
              </svg>
              London
            </p>
            <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
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
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              4 hours ago
            </p>
            <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              2300 views
            </p>
            <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-yellow-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
              4.5
            </p>
            <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
              </svg>
              456 saves
            </p>
            <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
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
                  d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3l-2.9 2.5c-.3.3-.8.1-.8-.3V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
                />
              </svg>
              chat
            </p>
          </div>

          <div className="">
            <p className="text-xl font-bold">About us</p>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              porro ipsam, sequi non numquam ipsa illo ad recusandae unde ex,
              repellat, nisi beatae adipisci! Est minus atque quam sit. Ratione?
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem necessitatibus odio omnis optio qui quasi, suscipit
              libero maiores molestias dolorum velit totam inventore quidem sed
              aut voluptatum laborum labore illo.
            </p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              porro ipsam, sequi non numquam ipsa illo ad recusandae unde ex,
              repellat, nisi beatae adipisci! Est minus atque quam sit. Ratione?
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem necessitatibus odio omnis optio qui quasi, suscipit
              libero maiores molestias dolorum velit totam inventore quidem sed
              aut voluptatum laborum labore illo.
            </p>
          </div>

          {/* carousel */}
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              <img src="./image-1.jpg" alt="..." />
              <img src="./image-2.jpg" alt="..." />
              <img src="./image-3.jpg" alt="..." />
              <img src="./image-1.jpg" alt="..." />
              <img src="./image-1.jpg" alt="..." />
            </Carousel>
          </div>

          {/* services */}
          <div className="w-full">
            <p className="text-xl mt-10 font-bold">Services</p>
            <div className="grid grid-cols-1 w-full mt-7 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-4 items-start justify-start">
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-start justify-start">
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-start justify-start">
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Checked state
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* services */}
          <div className="w-full">
            <p className="text-xl mt-10 font-bold">Videos</p>
            <div className="grid grid-cols-1 gap-7 w-full mt-5 sm:grid-cols-2 md:grid-cols-3">
              {[0, 1, 2].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex w-full rounded-sm relative justify-start py-4 gap-1 flex-col items-enter"
                  >
                    <img src="./image-3.jpg" alt="" className="w-full h-28" />
                    <p className="font-bold text-sm mt-1">Video title</p>
                    <p className="text-sm">Videos sub title description</p>
                    <div className="flex gap-2 items-center justify-between w-full">
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ratings */}
          <div className="w-full">
            <p className="text-xl mt-10 font-bold">Add Review and Rating</p>
            <div className="flex flex-col mt-7 gap-2">
              <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
              <Rating size="md">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
              <Rating size="lg">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
            </div>
            <p className="text-lg mt-7 font-bold">Rate us</p>

            <div>
              <div className="flex my-4 items-center gap-2 w-full">
                <label className="w-72 gap-2 flex items-center" for="file">
                  Your rating{" "}
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                </label>
                <input
                  value={rating}
                  className="ml-2 text-yellow-500 w-full"
                  type="range"
                  id="points"
                  min="1"
                  max="5"
                  step="0.1"
                  color="red"
                  onChange={(e) => setRating(e.target.value)}
                />
                <p className="">{rating}</p>
              </div>
              <div className="w-full mt-3 flex gap-10 justify-between items-center">
                <div class="mb-5 w-full">
                  <label
                    for="email"
                    class="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your full name
                  </label>
                  <input
                    type="text"
                    id="text"
                    class="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div class="mb-5 w-full">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gra0y-50 rounded-lg border border-gray-300 focus:ring-blue-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
              <button className="w-40 mt-5 py-3 rounded-lg font-bold bg-blue-500 text-white">
                Submit
              </button>
            </div>
            <p className="text-lg mt-10 font-bold">Peoples who rate us</p>

            <div className="mt-10">
              <div class="flex items-center mb-4">
                <img
                  class="w-10 h-10 me-4 rounded-full"
                  src="./gedi.jpg"
                  alt=""
                />
                <div class="font-medium dark:text-white">
                  <p>
                    Jese Leos{" "}
                    <time
                      datetime="2014-08-16 19:00"
                      class="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      gedeonagmas@gmail.com
                    </time>
                  </p>
                </div>
              </div>
              <div className="w-full ml-14 flex justify-start gap-3 items-center">
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <p>4.5</p>
              </div>
              <p className="mt-1 ml-14">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
                quisquam aliquam ratione omnis voluptate pariatur? Nostrum amet,
                pariatur obcaecati debitis corporis distinctio illo suscipit
                iusto numquam deserunt optio omnis cum!
              </p>
            </div>

            <div className="mt-10">
              <div class="flex items-center mb-4">
                <img
                  class="w-10 h-10 me-4 rounded-full"
                  src="./gedi.jpg"
                  alt=""
                />
                <div class="font-medium dark:text-white">
                  <p>
                    Jese Leos{" "}
                    <time
                      datetime="2014-08-16 19:00"
                      class="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      gedeonagmas@gmail.com
                    </time>
                  </p>
                </div>
              </div>
              <div className="w-full flex ml-14 justify-start gap-3 items-center">
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <p>4.5</p>
              </div>
              <p className="mt-1 ml-14">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
                quisquam aliquam ratione omnis voluptate pariatur? Nostrum amet,
                pariatur obcaecati debitis corporis distinctio illo suscipit
                iusto numquam deserunt optio omnis cum!
              </p>
            </div>

            <div className="mt-10">
              <div class="flex items-center mb-4">
                <img
                  class="w-10 h-10 me-4 rounded-full"
                  src="./gedi.jpg"
                  alt=""
                />
                <div class="font-medium dark:text-white">
                  <p>
                    Jese Leos{" "}
                    <time
                      datetime="2014-08-16 19:00"
                      class="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      gedeonagmas@gmail.com
                    </time>
                  </p>
                </div>
              </div>
              <div className="w-full flex ml-14 justify-start gap-3 items-center">
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <p>4.5</p>
              </div>
              <p className="mt-1 ml-14">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
                quisquam aliquam ratione omnis voluptate pariatur? Nostrum amet,
                pariatur obcaecati debitis corporis distinctio illo suscipit
                iusto numquam deserunt optio omnis cum!
              </p>
            </div>
          </div>
        </div>

        <div className="flex relative lg:-mt-52  mt-10 pl-4 py-4 pr-[7%] flex-col gap-10 w-full shadow-lg lg:w-[33%] bg-white bg-dark">
          <div className="w-full p-5 rounded-md border shadow-xl shadow-gray-300">
            <div className="flex mb-7 items-centere justify-between">
              <p className="flex text-sm gap-1 items-center">
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Business info
              </p>

              <p className="flex text-sm gap-1 items-center">
                <svg
                  class="w-5 h-5 text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 0 0-.8 1.6L6.6 12l-4.4 6.4A1 1 0 0 0 3 20h13.2c.3 0 .6-.2.8-.4l4.8-7a1 1 0 0 0 0-1.2l-4.8-7a1 1 0 0 0-.8-.4H3Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Get directions
              </p>
            </div>
            <Map markers={[...markers]} height="35vh" />

            <div className="mt-7 gap-2 flex flex-col">
              <p className="flex text-sm gap-2 items-center">
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                New york
              </p>
              <p className="flex text-sm gap-2 items-center">
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                New york
              </p>
              <p className="flex text-sm gap-2 items-center">
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                New york
              </p>
              <p className="flex text-sm gap-2 items-center">
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                New york
              </p>
            </div>

            <p className="text-lg mt-7 ">Follow us</p>
            <div className="flex mt-4 items-center justify-between w-full">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V6.6a.6.6 0 0 1 .6-.6h.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 5.9c-.7.3-1.5.5-2.4.6a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4.1 4.1 0 0 0-6.7 1.2 4 4 0 0 0-.2 2.5 11.7 11.7 0 0 1-8.5-4.3 4 4 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5a4 4 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.8c-1.8 1.3-4 2-6.1 1.7a11.7 11.7 0 0 0 10.7 1A11.5 11.5 0 0 0 20 8.5V8a10 10 0 0 0 2-2.1Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 5.9c-.7.3-1.5.5-2.4.6a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4.1 4.1 0 0 0-6.7 1.2 4 4 0 0 0-.2 2.5 11.7 11.7 0 0 1-8.5-4.3 4 4 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5a4 4 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.8c-1.8 1.3-4 2-6.1 1.7a11.7 11.7 0 0 0 10.7 1A11.5 11.5 0 0 0 20 8.5V8a10 10 0 0 0 2-2.1Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 5.9c-.7.3-1.5.5-2.4.6a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4.1 4.1 0 0 0-6.7 1.2 4 4 0 0 0-.2 2.5 11.7 11.7 0 0 1-8.5-4.3 4 4 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5a4 4 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.8c-1.8 1.3-4 2-6.1 1.7a11.7 11.7 0 0 0 10.7 1A11.5 11.5 0 0 0 20 8.5V8a10 10 0 0 0 2-2.1Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
            <p className="flex text-sm gap-2 items-center">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Openning Hours
            </p>

            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
            <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
              <p className="font-semibold">Monday</p>
              <p>2:00 AM - 12:00 AM</p>
            </div>
          </div>

          <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
            <p className="flex text-sm gap-2 items-center">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Contact Business
            </p>

            <div class="flex items-center mt-6 mb-4">
              <img
                class="w-12 h-12 me-4 rounded-full"
                src="./gedi.jpg"
                alt=""
              />
              <div class="font-medium dark:text-white">
                <p>
                  Jese Leos{" "}
                  <time
                    datetime="2014-08-16 19:00"
                    class="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    gedeonagmas@gmail.com
                  </time>
                </p>
              </div>
            </div>

            <div>
              <label
                for="first_name"
                class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm mt-4 font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
              />
            </div>

            <label
              for="message"
              class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <button className="py-3 w-full bg-red-500 text-white rounded-md text-white mt-4">
              Submit
            </button>
          </div>

          <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
            <p className="flex text-sm gap-2 items-center">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sales Agent
            </p>

            <div className="flex w-full mt-5 flex-col items-center justify-center">
              <img
                src="./gedi.jpg"
                alt=""
                className="w-24 h-24 rounded-full border border-dark border-gray-200"
              />
              <p className="text-xl mt-2 font-bold">Gedeon</p>
              <p className="text-xl font-bold -mt-1">Agmas</p>
              <p className="text-sm mt-1">22 companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
