// import SportsHandBall from "@mui/icons-material/SportsHandBall";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Sponsors from "../components/Sponsors";
import YoutubeItems from "../components/YoutubeItems";
import CompanyItems from "../components/CompanyItems";
import Banner from "../components/Banner";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {
  CreateOutlined,
  Outlet,
  TransferWithinAStationOutlined,
  TransferWithinAStationTwoTone,
} from "@mui/icons-material";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "440px",
  };
  const slideImages = ["etblink.jpg", "etblink2.jpg", "etblink3.jpg"];

  // const hoverHandler = (id) => {
  //   const ids = document.getElementById(id);
  //   ids?.classList?.value?.includes("hidden")
  //     ? ids?.classList?.remove("hidden")
  //     : ids?.classList?.add("hidden");
  // };

  return (
    <>
      {/* <Header /> */}
      <div className="relative pt-14 lg:pt-24 rounded-lg bg-gray-50 bg-dark">
        {/* slides */}
        <div className="w-full pb-11 h-full">
          <div
            style={{ width: "100%", height: "100%" }}
            className="slide-container relative w-full h-full"
          >
            <Slide
              autoplay={false}
              infinite={true}
              duration={4000}
              arrows={false}
              transitionDuration={1000}
              indicators={false}
              pauseOnHover={false}
              responsive={true}
            >
              {slideImages.map((slideImage, index) => (
                <div key={index}>
                  <div
                    style={{
                      ...divStyle,
                      backgroundImage: `url(${slideImage})`,
                      width: "100%",
                    }}
                    className="object-cover object-bottom relative items-start justify-start"
                  ></div>
                </div>
              ))}
            </Slide>

            {/* hero page content */}
            <div className="flex absolute top-60 ml-0 lg:ml-[8%] z-30 w-[440px]  h-auto gap-2 items-start justify-start">
              <div className="absolute -mt-32 p-5 rounded-sm bg-black/35 mx-auto">
                <h1 className="mb-2 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
                  Your investment
                </h1>
                <h1 className="mb-6 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
                  destination
                </h1>

                <p className=" text-sm mx-1 lg:mx-0 font-normal text-gray-200 text-dark">
                  Here at ETBLINK we focus on markets where technology, <br />
                  innovation, and capital can unlock long-term value.
                </p>
              </div>
            </div>
            <div className="w-full px-main relative pt-10 bg-cover h-[100%] bg-no-repeat md:py-0 bg-[url('/bg3.jpg')] bg-dark bg-bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="absolute shadow-xl grid  w-full grid-cols-4 text-gray-500 mx-1 lg:mx-[7.5%] lg:w-[55.5%] -top-10 left-0 h-[70px] rounded-lg border border-gray-300 bg-white bg-dark z-20">
                <div className="flex p-2 items-center justify-start border-r">
                  <svg
                    class="w-6 h-6 "
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
                      d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"
                    />
                  </svg>
                  <input
                    type="text"
                    className="h-full border-0 bg-dark focus:outline-none focus:ring-0 outline-none w-32"
                    placeholder="Keywords"
                  />
                </div>
                <div className="flex p-2 items-center justify-start border-r">
                  <svg
                    class="w-6 h-6 "
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
                      d="M5 11.2v.8l7 4 7-4v-.8m-14 5v.8l7 4 7-4v-1M12 3 5 7l7 4 7-4-7-4Z"
                    />
                  </svg>
                  <input
                    type="text"
                    className="h-full border-0 bg-dark focus:outline-none focus:ring-0 outline-none w-32"
                    placeholder="Filter by category"
                  />
                </div>
                <div className="flex p-2 items-center justify-start border-r">
                  <svg
                    class="w-6 h-6 "
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
                  <input
                    type="text"
                    className="h-full border-0 bg-dark focus:outline-none focus:ring-0 outline-none w-32"
                    placeholder="Location"
                  />
                </div>
                <div className="flex p-2 cursor-pointer items-center justify-center rounded-r-lg text-white bg-[rgb(252,45,45)]">
                  <p className="text-lg  text-center uppercase">Search</p>
                </div>
              </div>
              {/* <div className="w-full mt-10 gap-5 py-5 md:py-0 flex px-4 flex-col items-center justify-center bg-main-black text-white">
                <div className="w-full flex justify-between items-center">
                  <p className="font-bold text-gray-200">
                    Top listed magazines
                  </p>
                </div>

                <div className="w-full relative my-2 flex gap-2 items-center justify-center bg-main-black text-white">
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine2.jpg"
                      alt=""
                      className="h-24 rounded-sm w-24"
                    />
                    <div className="w-28 shadow-2xl shadow-blue-500 h-14 px-1 py-1 text-center rounded-sm bg-[#00aeff] text-white">
                      <p className="font-bold text-sm">Addiss</p>
                      <p className="text-sm cursor-pointer flex items-center justify-center">
                        read more
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
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine1.jpg"
                      alt=""
                      className="h-24 rounded-sm w-24"
                    />
                    <div className="w-28 h-14 shadow-2xl shadow-blue-600 px-1 py-1 text-center rounded-sm bg-blue-500 text-white">
                      <p className="font-bold text-sm">Reporter</p>
                      <p className="text-sm cursor-pointer flex items-center justify-center">
                        read more{" "}
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
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine3.jpg"
                      alt=""
                      className="h-24 rounded-sm w-24"
                    />
                    <div
                      style={{ background: "orange" }}
                      className="w-28 h-14 px-1 shadow-2xl shadow-yellow-500 py-1 text-center rounded-sm  text-white"
                    >
                      <p className="font-bold text-sm">Tribune</p>
                      <p className="text-sm flex cursor-pointer items-center justify-center">
                        read more{" "}
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
              </div> */}

              <div className="absolute hidden lg:flex right-0 text-[13px] py-2 lg:-top-[150px] z-30 mr-main w-[380px] h-auto justify-end items-center">
                <div className="absolute right-0 top-0 z-30 bg-dark w-full">
                  <p className="px-4 mt-1 pt-2">Recently added business</p>
                  <ul
                    className="flex w-[380px] flex-wrap border-b border-dark py-[2px] -mb-px font-medium text-center"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-contents"
                    role="tablist"
                  >
                    <li className="me-1" role="presentation">
                      <button
                        className="inline-block pr-2 pl-4 py-1 rounded-t-lg"
                        id="profiles-tab"
                        data-tabs-target="#profiles"
                        type="button"
                        role="tab"
                        aria-controls="profiles"
                        aria-selected="true"
                      >
                        Importers
                      </button>
                    </li>
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block px-2 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        Exporters
                      </button>
                    </li>
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block px-2 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="settings-tab"
                        data-tabs-target="#settings"
                        type="button"
                        role="tab"
                        aria-controls="settings"
                        aria-selected="false"
                      >
                        Banks
                      </button>
                    </li>
                    <li role="presentation">
                      <button
                        className="inline-block px-2 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="contacts-tab"
                        data-tabs-target="#contacts"
                        type="button"
                        role="tab"
                        aria-controls="contacts"
                        aria-selected="false"
                      >
                        Hotels
                      </button>
                    </li>
                  </ul>
                </div>
                <div
                  id="default-tab-contents"
                  className="bg-white bg-dark relative w-full shadow-2xl h-[205px] "
                >
                  <div
                    className="hidden relative h-full w-full"
                    id="profiles"
                    role="tabpanel"
                    aria-labelledby="profiles-tab"
                  >
                    <div className="flex pt-[68px] w-full px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                      <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                        etblink
                      </p>

                      <p className="">ethiopian business link portals</p>
                      <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                        Visit{" "}
                      </p>
                    </div>
                    <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                      <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                        etblink
                      </p>

                      <p className="">ethiopian business link portals</p>
                      <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                        Visit{" "}
                      </p>
                    </div>
                    <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                      <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                        etblink
                      </p>

                      <p className="">ethiopian business link portals</p>
                      <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                        Visit{" "}
                      </p>
                    </div>

                    <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                      <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                        etblink
                      </p>

                      <p className="">ethiopian business link portals</p>
                      <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                        Visit{" "}
                      </p>
                    </div>
                  </div>

                  <div
                    className="hidden h-full p-4 bg-gray-50 bg-dark"
                    id="dashboard"
                    role="tabpanel"
                    aria-labelledby="dashboard-tab"
                  >
                    <p className="text-sm mt-12 text-gray-500 text-dark">
                      This is some placeholder content the{" "}
                      <strong className="font-medium text-gray-800 dark:text-white">
                        Dashboard tabs associated content
                      </strong>
                      . Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control the content visibility and styling.
                    </p>
                  </div>

                  <div
                    className="hidden p-4 h-full bg-gray-50 bg-dark"
                    id="settings"
                    role="tabpanel"
                    aria-labelledby="settings-tab"
                  >
                    <p className="text-sm mt-12 text-gray-500 text-dark">
                      This is some placeholder content the{" "}
                      <strong className="font-medium text-gray-800 dark:text-white">
                        Settings tabs associated content
                      </strong>
                      . Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control the content visibility and styling.
                    </p>
                  </div>

                  <div
                    className="hidden p-4 h-full bg-gray-50 bg-dark"
                    id="contacts"
                    role="tabpanel"
                    aria-labelledby="contacts-tab"
                  >
                    <p className="text-sm mt-12 text-gray-500 text-dark">
                      This is some placeholder content the{" "}
                      <strong className="font-medium text-gray-800 dark:text-white">
                        Contacts tabs associated content
                      </strong>
                      . Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control the content visibility and styling.
                    </p>
                  </div>

                  <div
                    className="hidden p-4 h-full bg-gray-50 bg-dark"
                    id="embassies"
                    role="tabpanel"
                    aria-labelledby="embassies-tab"
                  >
                    <p className="text-sm mt-12 text-gray-500 text-dark">
                      This is some placeholder content the{" "}
                      <strong className="font-medium text-gray-800 dark:text-white">
                        Contacts tabs associated content
                      </strong>
                      . Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control the content visibility and styling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* small advert */}
            <div className="w-full h-52  mt-4 px-main place-items-center grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
              <div className="flex rounded-md h-[70px] border border-gray-200 shadow-2xl px-2 gap-2 w-full items-center justify-start">
                <p className="text-3xl font-bold uppercase text-main">
                  ETB <span className="text-gray-600">LINK</span>
                </p>
                <p className="text-lgs text-gray-500 font-semibold">
                  Advert your service here
                </p>
              </div>
              <img
                src="./skylight.jpg"
                alt=""
                className="rounded-sm h-[70px] w-full"
              />
              <div
                src="./hi.gif"
                alt=""
                className="rounded-sm items-center uppercase justify-center flex bg-black text-white text-2xl h-[70px] w-full"
              >
                Well come to <span className="text-main ml-3">etblink</span>
              </div>
            </div>

            {/* services */}
            <div className="flex flex-col lg:flex-row px-main gap-3 mt-10 lg:-mt-5 items-center justify-between">
              <div className="flex flex-col lg:flex-row gap-5 w-[300px]  items-center justify-center">
                <div className="flex  shadow-2xl w-[200px] rounded-l-none px-7 py-4  bg-main text-white rounded-lg flex-col items-center justify-center gap-1">
                  <svg
                    class="w-10 h-10"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
                  </svg>

                  <p className="text-lg mt-2 font-light">Global</p>
                  <p className="text-sm -mt-2">2.1k+ listed</p>
                </div>
                <div className="flex shadow-2xl w-[200px] rounded-l-none px-7 py-4  bg-emerald-500 text-white rounded-lg flex-col items-center justify-center gap-1">
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
                      d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6"
                    />
                  </svg>

                  <p className="text-lg mt-2 font-light">Local</p>
                  <p className="text-sm -mt-2">3k+ listed</p>
                </div>
              </div>
              <div className="w-1 bg-gray-200 bg-dark hidden lg:block h-20 my-2 mx-2 rounded-full"></div>
              {/* service types  */}
              <div className="grid grid-cols-2 text-[15px] mt-3 lg:mt-0 md:grid-cols-4 place-items-center gap-10 ml-6 lg:grid-cols-6">
                <div className="flex  rounded-lg flex-col items-center justify-center">
                  <div className=" rounded-full bg-white bg-dark shadow-sm">
                    <img
                      src="./etbagreeculture.png"
                      alt=""
                      className="w-[65px] h-[65px]"
                    />
                  </div>

                  <p className="mt-2 font-bold">Agriculture</p>
                  <p className="-mt-1 font-poppins text-sm">232+ listed</p>
                </div>
                <div className="flex rounded-lg flex-col items-center justify-center">
                  <div className="rounded-full bg-white bg-dark shadow-sm">
                    <img
                      src="./etbconstruction.png"
                      alt=""
                      className="w-[65px] h-[65px]"
                    />
                  </div>

                  <p className="mt-2 font-bold">Construction</p>
                  <p className="-mt-1 font-poppins text-sm">240+ listed</p>
                </div>
                <div className="flex rounded-lg flex-col items-center justify-center">
                  <div className="p-2h rounded-full bg-white bg-dark shadow-sm">
                    <img
                      src="./etbembassy.png"
                      alt=""
                      className="w-[65px] h-[65px]"
                    />
                  </div>

                  <p className="mt-2 font-bold">Embassy</p>
                  <p className="-mt-1 font-poppins text-sm">96+ listed</p>
                </div>
                <div className="flex rounded-lg flex-col items-center justify-center">
                  <div className="p-2h rounded-full bg-white bg-dark shadow-sm">
                    <img
                      src="./etbgovernmentoffice.png"
                      alt=""
                      className="w-[65px] h-[65px]"
                    />
                  </div>

                  <p className="mt-2 font-bold">Government...</p>
                  <p className="-mt-1 font-poppins text-sm">10+ listed</p>
                </div>
                <div className="flex rounded-lg flex-col items-center justify-center">
                  <div className="p-2h rounded-full bg-white bg-dark shadow-sm">
                    <img
                      src="./etbtourism.png"
                      alt=""
                      className="w-[65px] h-[65px]"
                    />
                  </div>

                  <p className="mt-2 font-bold">Tourism</p>
                  <p className="-mt-1 font-poppins text-sm">22+ listed</p>
                </div>
                <div className="flex rounded-lg flex-col items-center justify-center">
                  <div className="p-2h rounded-full bg-white bg-dark shadow-sm">
                    <img
                      src="./etbexport.png"
                      alt=""
                      className="w-[65px] h-[65px]"
                    />
                  </div>

                  <p className="mt-2 font-bold">Export</p>
                  <p className="-mt-1 font-poppins text-sm">198+ listed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-main">
          <Banner />
        </div>

        <div className="w-full  py-20 flex  bg-dark text-dark flex-col items-center justify-center">
          <p className="text-4xl text-center font-semibold text-gray-700">
            Top & Popular <span className="text-main">Listings</span>
          </p>
          <p className="text-[17px] px-main mt-3 py-3 font-light text-gray-500">
            <center>
              At Vero Eos Et Accusamus Et Iusto Odio Dignissimos Ducimus Qui
              Blanditiis Praesentium Voluptatum Deleniti Atque Corrupti Quos
              Dolores Et Quas Molestias Excepturi
            </center>
          </p>
          <div className="grid px-main mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full place-items-centers gap-7">
            {[0, 1, 2, 3, 4, 5].map((e, i) => {
              return (
                <CompanyItems value={i} phoneNo="+251 9541**" type="large" />
              );
            })}
          </div>

          <YoutubeItems />

          <div className="w-full  py-8 flex flex-col items-center justify-center">
            <p className="text-4xl font-semibold text-gray-700">
              Latest <span className="text-main">News</span>
            </p>
            <p className="text-[17px] mt-3 py-1 font-light text-gray-500">
              our top news
            </p>
            <div className="grid px-main grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex w-full rounded-sm relative justify-start py-4 flex-col items-enter"
                  >
                    <img src="./build1.jpg" className="w-full rounded-sm" />
                    <p className="flex items-center justify-start gap-2 text-main text-[12px] mt-1">
                      jan 22, 2024
                    </p>
                    <p className="font-bold flex items-center text-lg justify-start gap-2">
                      News title text
                    </p>
                    <p className="text-sm">
                      News sub title and video description
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full px-main mt-3 gap-4 center">
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
                  d="m15 19-7-7 7-7"
                />
              </svg>
              <div className="w-full h-1 rounded-full bg-main"></div>
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
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <Sponsors />

          <div className="flex flex-col lg:flex-row w-full mt-16 gap-6 px-main">
            <div className="flex flex-col flex-[70%] shadow-lg bg-white bg-dark p-4 items-center justify-start border-t-4 border-main">
              <p className="text-xl self-start font-bold text-main py-3">
                Ethiopian business link news
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 w-full">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="flex w-full rounded-sm relative justify-start py-4 flex-col items-start"
                    >
                      <img
                        src="./build1.jpg"
                        controls
                        autoplay
                        muted
                        className="w-full h-24"
                      />
                      <p className="flex items-center justify-start gap-2 text-main text-[12px]">
                        jan 22, 2024
                      </p>
                      <p className="font-bold flex items-center justify-start gap-2">
                        News title text
                      </p>
                      <p className="text-sm">News sub title</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col shadow-lg bg-white items-start border-t-4 border-main bg-dark p-4 gap-4 flex-[30%]">
              <div className="flex flex-col  w-full justify-start">
                <p className="text-xl self-start font-bold text-main py-4">
                  Etb business link
                </p>
                <div className="flex items-center justify-between w-full">
                  <p className="flex items-center gap-1">
                    <svg
                      class="w-4 h-4 text-main"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    etb business
                  </p>
                  <p className="flex items-center gap-1">
                    <svg
                      class="w-4 h-4 text-main"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    etb business
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="flex items-center gap-1">
                    <svg
                      class="w-4 h-4 text-main"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    etb business
                  </p>
                  <p className="flex items-center gap-1">
                    <svg
                      class="w-4 h-4 text-main"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    etb business
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start mt-5 border-t-4 border-main w-full justify-start">
                <p className="text-xl self-start font-bold text-main py-4">
                  Etblink
                </p>
                <div className="flex items-center justify-between w-full">
                  <p className=" ">
                    Ethiopian business <br /> link portal
                  </p>
                  <button className="py-1 px-6 rounded-md text-white bg-main">
                    More
                  </button>
                </div>
                {/* <div className="flex items-center mt-20 justify-between w-full">
                  <div className="flex gap-2 items-center justify-center">
                    <img
                      src="./build1.jpg"
                      alt=""
                      className="h-24 w-20 rounded-sm"
                    />
                    <div className="text-sm shadow-sm rounded-sm">
                      <p>etblink</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <img
                      src="./build1.jpg"
                      alt=""
                      className="h-24 w-20 rounded-sm"
                    />
                    <div className="text-sm shadow-sm rounded-sm">
                      <p>etblink</p>
                    </div>
                  </div>
                </div> */}

                <div className="w-full relative mt-8 my-2 flex gap-2 items-center justify-center text-white">
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine2.jpg"
                      alt=""
                      className="h-20 rounded-sm shadow-xl border border-gray-400 border-b-0 w-24"
                    />
                    <div className="w-28 shadow-2xl  h-12  px-1 py-1 text-center rounded-sm bg-[#00aeff] text-white">
                      <p className="font-bold text-sm">Addiss zemen</p>
                      <p className="text-sm cursor-pointer gap-1 flex items-center justify-center">
                        more
                        <svg
                          class="w-5 h-5"
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
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine1.jpg"
                      alt=""
                      className="h-20 rounded-sm shadow-xl border border-gray-400 border-b-0 w-24"
                    />
                    <div className="w-28 shadow-2xl h-12  px-1 py-1 text-center rounded-sm bg-emerald-500 text-white">
                      <p className="font-bold text-sm">Reporter</p>
                      <p className="text-sm cursor-pointer gap-1 flex items-center justify-center">
                        more
                        <svg
                          class="w-5 h-5"
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
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine3.jpg"
                      alt=""
                      className="h-20 rounded-sm shadow-xl border border-gray-400 border-b-0 w-24"
                    />
                    <div className="w-28 shadow-2xl h-12  px-1 py-1 text-center rounded-sm bg-yellow-400 text-white">
                      <p className="font-bold text-sm">Fortune</p>
                      <p className="text-sm rounded-sm cursor-pointer gap-1 flex items-center justify-center">
                        more
                        <svg
                          class="w-5 h-5"
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
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Outlet />
      <Footer /> */}
    </>
  );
};

export default Home;
