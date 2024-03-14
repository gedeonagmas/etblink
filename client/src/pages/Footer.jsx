import Sponsors from "../components/Sponsors";

const Footer = () => {
  return (
    <div className="">
      {/* sellers */}
      <div
        style={{}}
        className="w-full px-main flex flex-col items-center justify-between h-auto mt-10"
      >
        <div className="w-full flex items-center justify-between h-auto">
          <div className="w-full items-center justify-center flex flex-col">
            <p className="text-4xl font-semibold text-gray-700">
              Our top <span className="text-main">Sellers</span>
            </p>
            <p className="text-[17px] mt-3 py-1 font-light text-gray-500">
              our top sellers
            </p>
          </div>

          {/* <div className="flex items-center justify-center gap-3">
            <p className="text-xs px-4 py-2 rounded-sm cursor-pointer flex items-center justify-center">
              Visit all{" "}
              <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </p>
            <svg
              className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
                d="m15 19-7-7 7-7"
              />
            </svg>

            <svg
              className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
                d="m9 5 7 7-7 7"
              />
            </svg>
          </div> */}
        </div>

        <div className="w-full relative h-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-5">
          <div className="absolute shadow-2xl rounded-full  z-20 top-[140px] -left-6">
            <svg
              class="w-14 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-red-500 border border-gray-300 rounded-full h-14 bg-gray-300/50"
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
                d="m15 19-7-7 7-7"
              />
            </svg>
          </div>
          {[0, 1, 2, 3].map((e, i) => {
            return (
              <div
                key={i}
                className="flex w-full flex-col items-start rounded-lg hover:bg-red-100 bg-white border shadow-xl p-4 justify-start"
              >
                <div className="flex w-full items-center justify-between">
                  <img
                    src="./gedi.jpg"
                    alt=""
                    className="w-28 h-28 rounded-full border border-dark border-gray-200"
                  />
                  <div className="flex items-center gap-2 justify-center flex-col">
                    <img
                      src={`${
                        i % 2 === 0 ? "./etbetio.png" : "./etbengland.png"
                      }`}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover border border-dark border-gray-200"
                    />
                    <p className="px-4 py-1 text-sm rounded-full text-white bg-emerald-500">
                      Active
                    </p>
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="text-xl mt-4 font-bold">Gedeon Agmas</p>
                <div class="w-full max-w-sm">
                  <div class="mb-2 flex justify-between items-center">
                    <label
                      for="website-url"
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Call on +2510954104637
                    </label>
                  </div>
                  <div class="flex mt-4 items-center">
                    <span class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
                      KEY
                    </span>
                    <div class="relative w-full">
                      <input
                        id="website-url"
                        type="text"
                        aria-describedby="helper-text-explanation"
                        class="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value="2345712546375XCD7645"
                        readonly
                        disabled
                      />
                    </div>
                    <button
                      data-tooltip-target="tooltip-website-url"
                      data-copy-to-clipboard-target="website-url"
                      class="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
                      type="button"
                    >
                      <span id="default-icon">
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                      <span
                        id="success-icon"
                        class="hidden inline-flex items-center"
                      >
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      </span>
                    </button>
                    <div
                      id="tooltip-website-url"
                      role="tooltip"
                      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                      <span id="default-tooltip-message">Copy link</span>
                      <span id="success-tooltip-message" class="hidden">
                        Copied!
                      </span>
                      <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="absolute shadow-2xl rounded-full  z-20 top-[148px] -right-6">
            <svg
              class="w-14 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-red-500 border border-gray-300 rounded-full h-14 bg-gray-300/50"
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
                d="m9 5 7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(109, 179, 242, .9), rgba(109, 179, 242, .6)), url('./etblink.jpg')",
          backgroundSize: "cover, contain",
          backgroundPosition: "center, right bottom",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
        className="flex px-main bg-re bg-no-repeat bg-opacity-20 bg-cover flex-col gap-2 w-full mt-10 object-bottom bg-blue-500/20 py-10 text-white"
      >
        <p className="text-lg">
          ETBLINK <span className="text-sm">ethiopian business link</span>
        </p>
        <div className="w-full  mt-5 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 h-auto">
          {[0, 1, 2, 3].map((e) => {
            return (
              <div
                key={e}
                className="rounded-lg relative mt-24 hover:bg-gray-500 flex flex-col items-center justify-center"
              >
                <div className="absolute -top-24 left-2 w-24 h-24 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center p-2  mt-5">
                  About us
                </div>
                <div className="rounded-lg w-full p-4 relative mt-10 hover:bg-gray-500 flex flex-col items-start justify-start">
                  <p>Ethiopian business link we are here.</p>
                  <ul className="mt-4 flex flex-col gap-1">
                    <li>
                      Consult
                      <span className="ml-5 text-sm">Consulting service</span>
                    </li>
                    <li>
                      Promotion <span className="ml-5 text-sm"> business</span>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* <Sponsors /> */}

      {/* <hr class="my-6  border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
      <div className="w-full flex flex-col py-10 items-start">
        {/* <div className="grid px-main text-sm grid-cols-1 py-5 px-2 bg-gray-100 md:grid-cols-2 w-full lg:grid-cols-3 self-end">
          <div className="flex items-center gap-2 justify-start">
            <svg
              class="w-10 h-10 "
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
                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
              />
            </svg>
            <div className="gap-2">
              <p className="text-gray-500 text-dark">Location</p>
              <p className="font-bold mt-1">Addis Ababa, Ethiopia</p>
            </div>
          </div>
          <div className="flex items-center  gap-2 justify-start">
            <svg
              class="w-10 h-10"
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
                d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
              />
            </svg>

            <div className="gap-2">
              <p className="text-gray-500 text-dark">Call Now</p>
              <p className="font-bold mt-1">+2510954104637</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-start">
            <svg
              class="w-10 h-10"
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
                stroke-width="2"
                d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>

            <div className="gap-2">
              <p className="text-gray-500 text-dark">Email</p>
              <p className="font-bold mt-1">skylighttech@gmail.com</p>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 text-lg font-light px-main gap-10 md:grid-cols-2 py-5 lg:grid-cols-3 xl:grid-cols-4 w-full bg-black text-white">
          {/* <div className="flex w-full -mt-28 p-2 bg-main rounded-sm gap-2">
            <div className="w-[150px] hover:border-red-600 relative shadow-md  flex flex-col text-center bg-white h-auto bg-dark border border-gray-200 border-dark rounded-lg ">
              <div
                className="relative flex flex-col items-center justify-center"
                href="#"
              >
                <img
                  class="rounded-t-lg h-20 w-full"
                  src="./image-1.jpg"
                  alt=""
                />
                <div className="absolute bg-white flex text-black items-center justify-center z-10 mt-20 w-14 h-14 p-2 rounded-full border shadow-xl">
                  <svg
                    class="w-10 h-10"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div class="rounded-b-lg w-full bg-blue-500/50 text-white">
                <p href="#">
                  <h5 class="mt-8 text-lg font-bold tracking-tight ">Basic</h5>
                </p>
                <p class="mb-1 text-2xl font-bold ">$250</p>
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>

                <p
                  href="#"
                  class="inline-flex cursor-pointer mb-2 items-center px-5 mt-2 rounded-md py-2 text-sm font-medium text-center text-white bg-blue-500"
                >
                  more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </p>
              </div>
            </div>

            <div className="w-[150px] hover:border-red-600 relative shadow-md  flex flex-col text-center bg-white h-auto bg-dark border border-gray-200 border-dark rounded-lg ">
              <div
                className="relative flex flex-col items-center justify-center"
                href="#"
              >
                <img
                  class="rounded-t-lg h-20 w-full"
                  src="./image-1.jpg"
                  alt=""
                />
                <div className="absolute bg-white flex text-black items-center justify-center z-10 mt-20 w-14 h-14 p-2 rounded-full border shadow-xl">
                  <svg
                    class="w-10 h-10"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div class="rounded-b-lg w-full bg-emerald-500/50 text-white">
                <p href="#">
                  <h5 class="mt-8 text-lg font-bold tracking-tight ">
                    Premium
                  </h5>
                </p>
                <p class="mb-1 text-2xl font-bold ">$250</p>
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>

                <p
                  href="#"
                  class="inline-flex cursor-pointer mb-2 items-center px-5 mt-2 rounded-md py-2 text-sm font-medium text-center text-white bg-emerald-500"
                >
                  more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div> */}
          <div className="">
            <img src="./logo.png" alt="" className="bg-white rounded-sm" />
            {/* <p className="text-2xl text-main font-bold mt-5">About us</p>
            <p className="mt-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing.
            </p> */}

            <p className="text-2xl text-main font-bold mt-5">Contact us</p>
            <p className=" flex items-center gap-2 mt-2">
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
                  stroke-width="2"
                  d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              +251 954104637
            </p>

            <p className="flex items-center gap-2 mt-2">
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
                  d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                />
              </svg>
              skylight@gmail.com
            </p>
            <img
              src="./etbvisa.png"
              alt=""
              className="mt-5 rounded-md bg-black h-10"
            />
          </div>
          <div className="">
            <p className="text-2xl text-main font-bold mt-5">Quick Links</p>
            <ul className="mt-5 flex flex-col gap-1">
              <li>About Us</li>
              <li>Services</li>
              <li>E-Learing</li>
              <li>FAQs</li>
              <li>Blog</li>
              <li>News</li>
              <li>Services</li>

            </ul>
          </div>{" "}
          <div className="">
            <p className="text-2xl text-main font-bold mt-5">Services</p>
            <ul className="mt-5 flex flex-col gap-1">
              <li>About Us</li>
              <li>Services</li>
              <li>E-Learing</li>
              <li>FAQs</li>
              <li>Blog</li>
              <li>News</li>
              <li>Companies</li>
            </ul>
          </div>
          <div className="">
            <p className="text-2xl text-main font-bold mt-5">Comment us</p>
            <div className="mt-5 flex flex-col gap-2">
              <div class="max-w-sm mx-auto">
                <label
                  for="email-address-icon"
                  class="block mb-2 text-sm font-medium "
                >
                  Your Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email-address-icon"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 "
                    placeholder="skylight@gmail.com"
                  />
                </div>
              </div>

              <div class="max-w-sm mx-auto">
                <label
                  for="email-address-icon"
                  class="block mt-3 mb-2 text-sm font-medium "
                >
                  Your Comment
                </label>

                <textarea
                  id="message"
                  rows="2"
                  cols="28"
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                <button className="py-2 rounded-md bg-main px-5 mt-3">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="sm:flex px-main py-10 text-lg bg-gray-800 text-white sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Skylight technologies™
          </a>
          . All Rights Reserved.
        </span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Facebook page</span>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 21 16"
            >
              <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
            </svg>
            <span class="sr-only">Discord community</span>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fill-rule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Twitter page</span>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">GitHub account</span>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Dribbble account</span>
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
