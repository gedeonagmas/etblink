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
                className="flex w-full flex-col items-start rounded-lg hover:bg-red-100 dark:hover:bg-gray-600 bg-white bg-dark border-dark border shadow-xl p-4 justify-start"
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

      <div className="w-full h-auto bg-black text-white px-main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col py-10 items-start justify-between">
        <div className="">
          <p className="text-xl font-bold mt-5 uppercase">Services</p>
          <ul className="mt-5 text-sm flex flex-col gap-1">
            <li>Services</li>
            <li>Pricint plan</li>
            <li>Customers</li>
            <li>Blog</li>
          </ul>
        </div>{" "}
        <div className="">
          <p className="text-xl font-bold mt-5 uppercase">Services</p>
          <ul className="mt-5 text-sm flex flex-col gap-1">
            <li>Services</li>
            <li>Pricint plan</li>
            <li>Customers</li>
            <li>Top companies</li>
          </ul>
        </div>
        <div className=" border-r w-44 h-44 border-dotted">
          <p className="text-xl font-bold mt-5 uppercase">Blog</p>
          <ul className="mt-5 text-sm flex flex-col gap-1">
            <li>Services</li>
            <li>Pricint plan</li>
          </ul>
        </div>
        {/* <div className="h-52 -ml-14 border-gray-700 w-[1px] border border-dotted"></div> */}
        <div className="mt-7 ml-5">
          <div className="flex flex-col items-start gap-4 justify-start">
            <div className="w-52 px-2 py-1 cursor-pointer hover:border-gray-400 h-auto rounded-lg border">
              <img
                src="./appstores.png"
                alt=""
                className="w-full h-12 rounded-lg"
              />
            </div>
            <div className="w-52 px-2 py-1 cursor-pointer hover:border-gray-400 h-auto rounded-lg border">
              <img
                src="./google.png"
                alt=""
                className="w-full h-12 rounded-lg"
              />
            </div>
          </div>

          <div className="flex w-auto mt-5 h-auto items-center justify-center gap-4">
            <a href="#" className="h-6 w-6  flex items-center justify-center">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="h-6 w-6 flex items-center justify-center">
              <svg
                className="w-6 h-6 "
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

              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="h-6 w-6 flex items-center justify-center">
              <svg
                class="w-4 h-4 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.8 10.5 20.7 2h-3l-5.3 6.5L7.7 2H1l7.8 11-7.3 9h3l5.7-7 5.1 7H22l-8.2-11.5Zm-2.4 3-1.4-2-5.6-7.9h2.3l4.5 6.3 1.4 2 6 8.5h-2.3l-4.9-7Z"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="h-6 w-6 flex items-center justify-center">
              <svg
                className="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.5 8.8v1.7a3.7 3.7 0 0 1 3.3-1.7c3.5 0 4.2 2.2 4.2 5v5.7h-3.2v-5c0-1.3-.2-2.8-2.1-2.8-1.9 0-2.2 1.3-2.2 2.6v5.2H9.3V8.8h3.2ZM7.2 6.1a1.6 1.6 0 0 1-2 1.6 1.6 1.6 0 0 1-1-2.2A1.6 1.6 0 0 1 6.6 5c.3.3.5.7.5 1.1Z"
                  clipRule="evenodd"
                />
                <path d="M7.2 8.8H4v10.7h3.2V8.8Z" />
              </svg>

              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
        <div className="ml-5">
          <p className="text-xl font-bold mt-5 uppercase">Contact us</p>
          <input
            type="text"
            placeholder="email"
            className="py-1 px-2 w-52 rounded-sm focus:outline-none bg-white text-black my-2"
          />
          <p className="mt-2 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            ullam neque dolores facere earum reprehenderit nemo quos at.
          </p>
        </div>
      </div>
      <div className="px-main flex text-white pb-4 bg-black w-full text-sm items-center justify-between">
        <div className="mt-5">
          <p className="text-lg font-bold uppercase">
            About skylight technologies
          </p>
          <p className="text-xs">
            Copyright Skylight technologies @2024 Technology share company in
            ethiopia Technology share company in ethiopia
          </p>
          <p className="text-xs">
            Technology share company in ethiopia Technology share company in
            ethiopia Technology share company in ethiopia Technology share
            company in ethiopia
          </p>
        </div>
        <div className="mt-5">
          {/* <img
              src="./logo.png"
              alt=""
              className="w-[200px] h-[65px] bg-gray-500 rounded-sm"
            /> */}
          <p className="text-2xl font-extrabold uppercase italic">Skylight</p>
          <p className="ml-10 text-sm">Technologies</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
