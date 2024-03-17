import { Search } from "@mui/icons-material";
import { DarkThemeToggle } from "flowbite-react";
// import SportsHandBall from "@mui/icons-material/SportsHandBall";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [currencies, setCurrencies] = useState(true);
  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 100) {
        setCurrencies(false);
      } else {
        setCurrencies(true);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  return (
    // fixed bg-white bg-dark top-0 left-0 w-full z-50 h-auto
    <div className="fixed w-full z-40 bg-white bg-dark">
      <div className="w-full flex flex-col lg:flex-row ">
        {/* <div className="relative pl-main bg-main-black w-full lg:w-[78%]">
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
                // style={{ width: "100%", background: "blue" }}
              >
                <div className="place-items-center py-[6px] pr-10 gap-x-24 gap-y-2  grid grid-cols-1 xl:grid-cols-2  items-center justify-center  h-auto">
                  <div className="w-full bg-main-black text-white dark:text-gray-200 py-2 h-[86px]  flex gap-2 ">
                    <img
                      src="./ad1.jpg"
                      alt=""
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                  <div className="h-[70%] hidden lg:block w-[2px] absolute bg-blue-800"></div>
                  <div className="w-full bg-main-black text-white dark:text-gray-200 p-2 h-[86px]  flex gap-2 ">
                    <img
                      src="./ad3.jpeg"
                      alt=""
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slide>{" "}
        </div> */}

        {/* advert action button and social media */}
        {/* <div className="w-full px-main md:px-4  bg-main-black text-white dark:text-gray-200 p-2 h-auto  flex gap-2 "> */}
        {/* <div className="flex w-full py-3 lg:py-0 pl-4 pr-main bg-main-black justify-center flex-col gap-3 items-center">
          <p
            href="#"
            className="inline-flex hover:bg-yellow-400 cursor-pointer  text-white rounded-full gap-2 px-4 py-[5px] border-2 border-white mt-1 text-[14px] font-bold items-center"
          >
            Advert here
            <svg
              class="w-4 h-4"
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
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4"
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
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4 "
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
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4"
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
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4 "
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
        </div> */}
        {/* </div> */}
      </div>

      <div className="w-full text-sm text-white py-[5px] lg:px-[18%] bg-[rgb(5,4,4)] flex gap-4 justify-between items-center">
        {/* <img src="etblogo.jpg" alt="" className="rounded-sm h-[30px]" /> */}
        <div className="flex w-full items-center gap-2 justify-end">
          <div className="me-2" role="presentation">
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
              className="z-30 -mt-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700"
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
          </div>
          <p>Login</p>
          <p className="text-gray-600">|</p>
          <p>Register</p>
          <div className="top-2 right-2 z-50">
            <DarkThemeToggle />
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="border-b relative shadow-2xl  py-2 md:py-1 border-gray-200 dark:border-gray-700">
        <ul
          className="flex mx-20  relative gap-1 flex-wrap items-center justify-center -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <div className="hidden xl:block">
            <div
              className={`${
                currencies ? "block" : "hidden"
              } h-auto absolute shadow-2xl shadow-gray-500 z-20 right-2 -top-[20px] w-[65px]`}
            >
              <p className="absolute z-20  top-4 left-2 text-white">Today</p>
              <svg
                id="trapezoid"
                viewbox="0 0 100 100"
                preserveAspectRatio="none"
                width="100%"
                className="absoluted -mt-2"
              >
                <path
                  d="M0,5 L110,30 L660,65 L0,56z"
                  fill="rgb(252,45,45)"
                ></path>
              </svg>
              <div className="bg-gray-200 bg-dark text-[13px] shadow-2xl -mt-[94px] w-full pb-2">
                <div className="flex py-1 relative border-b border-gray-400 font-semibold w-full px-1 flex-col border-dark items-center justify-center">
                  <div className="flex  w-full gap-1 items-center justify-center">
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
                  </div>
                  <p className="font-normal text-[13px]">52.64</p>
                </div>
                <div className="flex py-1 font-semibold w-full flex-col border-b border-gray-400 border-dark items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <svg
                      class="w-4 h-4 "
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
                        d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                      />
                    </svg>
                  </div>
                  <p className="font-normal">56.75</p>
                </div>
                <div className="flex text-sm font-semibold w-full py-1 flex-col border-b border-gray-400 border-dark items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <svg
                      class="w-4 h-4 "
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
                        d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                      />
                    </svg>
                  </div>
                  <p className="font-normal">62.50</p>
                </div>
                <div className="flex text-sm font-semibold w-full py-1 flex-col border-b border-gray-400 border-dark items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <svg
                      class="w-4 h-4 "
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
                        d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                      />
                    </svg>
                  </div>
                  <p className="font-normal">72.50</p>
                </div>
                <div className="flex text-sm font-semibold w-full py-1 flex-col items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <svg
                      class="w-4 h-4 "
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
                        d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                      />
                    </svg>
                  </div>
                  <p className="font-normal">52.32</p>
                </div>
                <div className="absolute shadow-2xl bottom-0 w-full h-1 rounded-sm bg-[rgb(252,45,45)] "></div>
              </div>
            </div>
          </div>
          
          <li className="me-2">
            <div className="flex relative items-center justify-center gap-6">
              {/*  */}
              <div className="flex absolute z-20 shadow-sm -top-[75px] -left-24 lg:-left-20 h-auto w-[120px] gap-3 items-center justify-center">
                <img
                  src="./logo.png"
                  alt=""
                  className="w-[200px] h-[112px] border-2 lg:border-0 bg-white dark:bg-gray-500 rounded-sm"
                />
              </div>
            </div>
          </li>
          <li className="me-2 ml-14" role="presentation">
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
              onClick={() => {
                const ids = document.getElementById("resource-dropdown");
                ids?.classList?.value.includes("hidden")
                  ? ids?.classList.remove("hidden")
                  : ids?.classList?.add("hidden");
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
          <li className="me-2">
            <div className="flex w-full py-3 relative lg:py-0 pl-4 pr-main justify-center flex-col gap-3 items-center">
              <div className="flex flex-col lg:flex-row w-auto h-auto absolute -right-20 lg:-right-32 z-20 items-center justify-center gap-2">
                <a
                  href="#"
                  className="h-6 w-6  flex items-center justify-center  rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
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
                <a
                  href="#"
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
                  <svg
                    className="w-5 h-5 "
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
                <a
                  href="#"
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
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
                <a
                  href="#"
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
                  <svg
                    className="w-5 h-5 "
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
