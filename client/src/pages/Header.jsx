
import { Search } from "@mui/icons-material";
import { DarkThemeToggle } from "flowbite-react";
// import SportsHandBall from "@mui/icons-material/SportsHandBall";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";

const Header = () => {
  // const divStyle = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundSize: "cover",
  //   height: "480px",
  // };
  const slideImages = ["image-1.jpg", "image-a.jpg", "image-b.jpg"];

  // const hoverHandler = (id) => {
  //   const ids = document.getElementById(id);
  //   ids?.classList?.value?.includes("hidden")
  //     ? ids?.classList?.remove("hidden")
  //     : ids?.classList?.add("hidden");
  // };
  return (
    // fixed bg-white bg-dark top-0 left-0 w-full z-50 h-auto
    <div className="">
      <div className="w-full flex flex-col md:flex-row ">
        <div className="relative w-full md:w-[60%]">
          <Slide
            autoplay={false}
            infinite={true}
            duration={3000}
            arrows={false}
            transitionDuration={5000}
            indicators={false}
            pauseOnHover={false}
            responsive={true}
          >
            {slideImages.map((slideImage, index) => (
              <div
                key={index}
                className=""
                style={{ width: "100%", background: "blue" }}
              >
                <div className="place-items-center px-main gap-x-10 gap-y-2 bg-main-black  grid grid-cols-1 xl:grid-cols-2  items-center justify-center w-full h-auto">
                  <div className="w-full bg-main-black text-white dark:text-gray-200 p-2 h-[60px]  flex gap-2 ">
                    <img
                      src="./image1.jpg"
                      alt=""
                      className="w-36 h-auto rounded-sm"
                    />
                    <div>
                      <a href="#">
                        <h5 className="mb-1 text-sm font-semibold tracking-tight ">
                          Samteck law firm
                        </h5>
                      </a>
                      <p className="mb-[5px] flex mt-1 text-xs font-normal">
                        Go to our guideline
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
                    </div>
                  </div>

                  <div className="w-full bg-main-black text-white dark:text-gray-200 p-2 h-[60px]  flex gap-2 ">
                    <img
                      src="./image-1.jpg"
                      alt=""
                      className="w-36 h-auto rounded-sm"
                    />
                    <div>
                      <a href="#">
                        <h5 className="mb-1 text-sm font-semibold tracking-tight ">
                          Samteck law firm
                        </h5>
                      </a>
                      <p className="mb-[5px] flex mt-1 text-xs font-normal">
                        Go to our guideline
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slide>{" "}
        </div>

        {/* advert action button and social media */}
        <div className="w-full px-main md:px-4  bg-main-black text-white dark:text-gray-200 p-2 h-auto  flex gap-2 ">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <p className="text-[12px] -mt-1 font-light">
                want to advert your services and products?
              </p>
              <a
                href="#"
                className="inline-flex mt-1 text-[12px] font-semibold items-center hover:underline"
              >
                Advert here
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
              </a>
            </div>

            {/* social media */}
            <div className="flex items-center xl:pr-[7%] justify-center gap-6">
              <a href="#" className="">
                <svg
                  className="w-5 h-5"
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
              <a href="#" className="">
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
              <a href="#" className="">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="">
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
        </div>
      </div>

      {/* <div className="w-full text-sm text-white py-2 pr-20 bg-gray-900 flex gap-4 justify-end items-end">
        <p>Login</p>
        <p>Sign up</p>
      </div> */}

      {/* tabs */}
      <div className="border-b relative py-2 md:py-1 border-gray-200 dark:border-gray-700">
        <ul
          className="flex relative gap-1 flex-wrap items-center justify-center -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {/* currencies */}
          <div className="hidden xl:flex absolute bg-gray-200 bg-dark text-dark z-10 -bottom-[214px] right-[7%] w-auto h-auto flex-col items-center justify-center rounded-sm shadow-2xl ">
            <div className="flex text-sm font-semibold w-full px-1 py-2 flex-col border-t-2 border-dark items-center justify-center">
              <div className="flex w-full items-center justify-start">
                <svg
                  className="w-4 h-4"
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
                    d="M8 17.3a5 5 0 0 0 2.6 1.7c2.2.6 4.5-.5 5-2.3.4-2-1.3-4-3.6-4.5-2.3-.6-4-2.7-3.5-4.5.5-1.9 2.7-3 5-2.3 1 .2 1.8.8 2.5 1.6m-3.9 12v2m0-18v2.2"
                  />
                </svg>
                <p className="">USD</p>
              </div>
              <p className="font-normal">52.34 birr</p>
            </div>
            <div className="flex text-sm font-semibold w-full p-1 flex-col border-t-2 border-dark items-center justify-center">
              <div className="flex w-full items-center justify-start">
                <svg
                  className="w-4 h-4"
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
                    d="M8 17.3a5 5 0 0 0 2.6 1.7c2.2.6 4.5-.5 5-2.3.4-2-1.3-4-3.6-4.5-2.3-.6-4-2.7-3.5-4.5.5-1.9 2.7-3 5-2.3 1 .2 1.8.8 2.5 1.6m-3.9 12v2m0-18v2.2"
                  />
                </svg>
                <p className="">EURO</p>
              </div>
              <p className="font-normal">52.34 birr</p>
            </div>
            <div className="flex text-sm font-semibold w-full p-1 flex-col border-t-2 border-dark items-center justify-center">
              <div className="flex w-full items-center justify-start">
                <svg
                  className="w-4 h-4"
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
                    d="M8 17.3a5 5 0 0 0 2.6 1.7c2.2.6 4.5-.5 5-2.3.4-2-1.3-4-3.6-4.5-2.3-.6-4-2.7-3.5-4.5.5-1.9 2.7-3 5-2.3 1 .2 1.8.8 2.5 1.6m-3.9 12v2m0-18v2.2"
                  />
                </svg>
                <p className="">POUND</p>
              </div>
              <p className="font-normal">52.34 birr</p>
            </div>
            <div className="flex text-sm font-semibold w-full p-1 flex-col border-t-2 border-dark items-center justify-center">
              <div className="flex w-full items-center justify-start">
                <svg
                  className="w-4 h-4"
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
                    d="M8 17.3a5 5 0 0 0 2.6 1.7c2.2.6 4.5-.5 5-2.3.4-2-1.3-4-3.6-4.5-2.3-.6-4-2.7-3.5-4.5.5-1.9 2.7-3 5-2.3 1 .2 1.8.8 2.5 1.6m-3.9 12v2m0-18v2.2"
                  />
                </svg>
                <p className="">RYAD</p>
              </div>
              <p className="font-normal">52.34 birr</p>
            </div>
          </div>{ " " }
          
          <li className="me-2">
            <div className="flex items-center justify-center gap-6">
              {/* <img src="./gedi.jpg" alt="" className="w-10 h-8 rounded-sm" /> */}
              <div className="flex gap-3 items-center justify-center">
                <svg
                  className="w-5 h-5  dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <p className="title ">ETBLINK</p>
                {/* <p className="small ">ethiopian business link</p> */}
              </div>
            </div>
          </li>
          <li className="me-2 ml-2" role="presentation">
            <Link to="/" className="inline-block p-2 rounded-t-lg">
              Home
            </Link>
          </li>
          <li className="me-2 ml-2" role="presentation">
            <Link to="/local" className="inline-block p-2 rounded-t-lg">
              Local
            </Link>
          </li>
          <li className="me-2 ml-2" role="presentation">
            <Link to="/global" className="inline-block p-2 rounded-t-lg">
              Global
            </Link>
          </li>
          <li className="me-2 ml-2" role="presentation">
            <Link to="/news" className="inline-block p-2 rounded-t-lg">
              News
            </Link>
          </li>
          <li className="me-2 ml-2" role="presentation">
            <Link to="/job" className="inline-block p-2 rounded-t-lg">
              Job
            </Link>
          </li>
          <li className="me-2 relative" role="presentation">
            <button
              onMouseOver={() => {
                const ids = document.getElementById("resource-dropdown");
                ids?.classList?.remove("hidden");
              }}
              className="focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
            >
              Resources{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* <div className="absolute top-20 left-20 z-50 w-52 h-44 bg-red-400"></div> */}

            <div
              id="resource-dropdown"
              onMouseOver={() => {
                const ids = document.getElementById("resource-dropdown");
                ids?.classList?.remove("hidden");
              }}
              onMouseLeave={() => {
                const ids = document.getElementById("resource-dropdown");
                ids?.classList?.add("hidden");
              }}
              className="z-50 absolute hidden h-auto p-2 divide-y divide-gray-100 rounded-lg shadow w-auto "
            >
              <div className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-[210px] dark:bg-gray-700">
                <ul
                  className="py-2 text-start w-full h-auto text-sm text-gray-700 dark:text-gray-200"
                  // aria-labelledby="dropdownDelayButton"
                >
                  <li className="w-full ">
                    <Link
                      to="/investment"
                      className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Investment opportunities
                    </Link>
                  </li>
                  <li
                    onMouseOver={() => {
                      const ids = document.getElementById("license-dropdown");
                      ids?.classList?.remove("hidden");
                    }}
                    className="w-full"
                  >
                    <a
                      href="#"
                      className=" flex gap-2 items-center justify-start w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      License and related{" "}
                      <svg
                        className="w-[24px] h-[24px] text-gray-800 dark:text-white"
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
                          d="m10 16 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="w-full">
                    <Link
                      to="/legal"
                      className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Legal advisers
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="/immigration"
                      className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Immigration Information
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="/government"
                      className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Government office
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                id="license-dropdown"
                onMouseLeave={() => {
                  const ids = document.getElementById("license-dropdown");
                  ids?.classList?.add("hidden");
                }}
                className="z-50 hidden px-4 border-none -mt-[150px] ml-[200px]"
              >
                <div className=" bg-white  rounded-lg shadow w-40 dark:bg-gray-700">
                  <ul className="py-2 text-start w-full h-auto text-sm text-gray-700 dark:text-gray-200">
                    <li className="w-full ">
                      <Link
                        to="/license-register"
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        New registration
                      </Link>
                    </li>
                    <li className="w-full ">
                      <Link
                        to="/license-renew"
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Renew
                      </Link>
                    </li>
                    <li className="w-full ">
                      <Link
                        to="/upgrade"
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Upgrade
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="me-2" role="presentation">
            <Link
              to="/donates"
              className="inline-block p-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Donates
            </Link>
          </li>
          <li className="me-2" role="presentation">
            <div className="flex items-center border pr-2 rounded-md border-dark justify-center">
              <Search sx={{ width: 20, height: 20 }} className="m-1" />
              <input
                type="text"
                className="px-2 py-1 bg-dark h-[18px] border-transparent focus:border-transparent focus:ring-0 pr-2 border-none border-gray-300 border-dark bg-none w-[75px] focus:w-40 outline-none"
                placeholder="search"
              />
            </div>
          </li>
          <li className="me-2" role="presentation">
            <button
              id="dropdownDelayButton"
              data-dropdown-toggle="dropdownDelay"
              data-dropdown-delay="500"
              data-dropdown-trigger="hover"
              className="focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
            >
              Languages{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownDelay"
              className="z-30 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-start text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDelayButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    English
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Amharic
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Affan oromo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Tigirigna
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="me-2" role="presentation">
            <Link
              to="/login"
              className="inline-block p-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Login
            </Link>
          </li>
          <li className="me-2" role="presentation">
            <Link
              to="/signup"
              className="inline-block p-1 rounded-md  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Sign up
            </Link>
          </li>
          <li className="me-2" role="presentation">
            <div className="top-2 right-2 z-50">
              <DarkThemeToggle />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
