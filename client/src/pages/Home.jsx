import { Visibility } from "@mui/icons-material";
// import SportsHandBall from "@mui/icons-material/SportsHandBall";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Sponsors from "../components/Sponsors";

const Home = () => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "480px",
  };
  const slideImages = ["image-1.jpg", "image-a.jpg", "image-b.jpg"];

  // const hoverHandler = (id) => {
  //   const ids = document.getElementById(id);
  //   ids?.classList?.value?.includes("hidden")
  //     ? ids?.classList?.remove("hidden")
  //     : ids?.classList?.add("hidden");
  // };

  return (
    <>
      {/* <Header /> */}
      <div className="relative rounded-lg bg-gray-50 bg-dark">
        {/* slides */}
        <div className="w-full h-full">
          <div
            style={{ width: "100%", height: "100%" }}
            className="slide-container relative w-full h-full bg-blue-500"
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
                    className="object-fill brightness-[0.4] object-center"
                  ></div>
                </div>
              ))}
            </Slide>
            {/* hero page content */}
            <div className="flex top-[12%] md:top-[22%]  z-10 w-full h-auto gap-2 absolute  items-center justify-center">
              <div className="px-4 -mt-20 mx-auto max-w-screen-xl text-center">
                <h1 className="mb-4 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 md:text-5xl lg:text-6xl">
                  Your investment destination
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-300 text-dark lg:text-xl sm:px-16 lg:px-48">
                  Here at ETBLINK we focus on markets where technology,
                  innovation, and capital can unlock long-term value and drive
                  economic growth.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                  <a
                    href="#"
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white dark:text-gray-200 rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-0 dark:focus:ring-blue-900"
                  >
                    Get started
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 hover:dark:bg-gray-300 focus:ring-0"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-main relative pt-10 bg-cover h-[100%] bg-no-repeat md:py-0 bg-[url('/bg3.jpg')] bg-dark bg-bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="w-full gap-5 py-5 md:py-0 flex px-4 flex-col items-center justify-center bg-main-black text-white">
                <div className="w-full flex justify-between items-center">
                  <p className="font-bold text-gray-200">
                    Top listed magazines
                  </p>
                </div>

                <div className="w-full my-2 flex gap-4 items-center justify-center bg-main-black text-white">
                  <div className="flex flex-col items-center justify-center w-auto">
                    <img
                      src="./magazine2.jpg"
                      alt=""
                      className="h-32 rounded-sm w-24"
                    />
                    <div className="w-28 h-14 px-1 py-1 text-center rounded-sm bg-[#00aeff] text-white">
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
                      className="h-32 rounded-sm w-24"
                    />
                    <div className="w-28 h-14 px-1 py-1 text-center rounded-sm bg-blue-500 text-white">
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
                      className="h-32 rounded-sm w-24"
                    />
                    <div className="w-28 h-14 px-1 py-1 text-center rounded-sm bg-yellow-400 text-white">
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
              </div>

              <div className="w-full p-4 bg-white dark:bg-gray-700">
                <div className="w-full flex justify-between items-center">
                  <p className="font-bold text-dark">Our galleries</p>
                  {/* <p className="text-xs cursor-pointer flex items-center justify-center">
                      View all{" "}
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
                    </p> */}
                </div>
                <div className="w-full mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <img
                      className="h-[108px] w-full rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-[108px] w-full rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-[108px] w-full rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-[108px] w-full rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="w-full h-full place-items-center relative">
                <div className="hidden md:block h-[222px] w-full  absolute -top-[222px] right-0">
                  <div className="relative w-full h-full ">
                    <div className="absolute right-0 top-0 z-30 bg-white bg-dark w-full">
                      <p className="px-4 pt-2 pb-1">Recently added business</p>
                      <ul
                        className="flex flex-wrap border-b border-dark py-[2px] -mb-px text-sm font-medium text-center"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-contents"
                        role="tablist"
                      >
                        <li className="me-2" role="presentation">
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
                      className="bg-gray-50 h-full"
                    >
                      <div
                        className="hidden h-full  bg-dark"
                        id="profiles"
                        role="tabpanel"
                        aria-labelledby="profiles-tab"
                      >
                        <div className="flex w-full pt-[70px]  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-3 items-center">
                          <img
                            src="./gedi.jpg"
                            alt=""
                            className="h-7 my-2 w-7 rounded-full"
                          />
                          <p className="text-sm">Ethiopian business link</p>
                          <p className="text-sm">Bahirdar</p>
                          <p className="text-xs text-blue-500 cursor-pointer flex items-center justify-center">
                            Visit{" "}
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
                        <div className="flex w-full px-4 justify-between py-1 border-t border-dark border-gray-300 gap-3 items-center">
                          <img
                            src="./gedi.jpg"
                            alt=""
                            className="h-7 my-2 w-7 rounded-full"
                          />
                          <p className="text-sm">Ethiopian business link</p>
                          <p className="text-sm">Bahirdar</p>
                          <p className="text-xs text-blue-500 cursor-pointer flex items-center justify-center">
                            Visit{" "}
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
                        <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-3 items-center">
                          <img
                            src="./gedi.jpg"
                            alt=""
                            className="h-7 my-2 w-7 rounded-full"
                          />
                          <p className="text-sm">Ethiopian business link</p>
                          <p className="text-sm">Bahirdar</p>
                          <p className="text-xs text-blue-500 cursor-pointer flex items-center justify-center">
                            Visit{" "}
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
                          . Clicking another tab will toggle the visibility of
                          this one for the next. The tab JavaScript swaps
                          classes to control the content visibility and styling.
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
                          . Clicking another tab will toggle the visibility of
                          this one for the next. The tab JavaScript swaps
                          classes to control the content visibility and styling.
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
                          . Clicking another tab will toggle the visibility of
                          this one for the next. The tab JavaScript swaps
                          classes to control the content visibility and styling.
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
                          . Clicking another tab will toggle the visibility of
                          this one for the next. The tab JavaScript swaps
                          classes to control the content visibility and styling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 bg-gray-800 grid-rows-3 text-sm w-full h-full  text-gray-300">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="flex border border-slate-900 flex-col gap-2 p-4 w-full h-full items-center justify-center"
                      >
                        <svg
                          className="w-8 h-8"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M8.7 8.7c1.1-1 2.2-2 3.3-2.7m0 0c3.1-2 6-2.6 7.4-1.3 1.8 1.8 0 6.6-4 10.7-4.1 4-8.9 5.8-10.7 4C3.4 18 4 15.2 6 12m6-6C9 4 6 3.3 4.7 4.6c-1.8 1.8 0 6.6 4 10.7M12 6c1.2.7 2.3 1.7 3.4 2.7m2.7 3.4c2 3 2.6 6 1.3 7.3C18 20.7 15 20 12 18m2-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                          />
                        </svg>
                        <p className="">Importers</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* banner */}
        <div
          style={{ width: "100%", height: "100%" }}
          className="slide-container mt-10 relative w-full h-full bg-blue-500"
        >
          <Slide
            autoplay={false}
            infinite={true}
            duration={1000}
            arrows={false}
            transitionDuration={4000}
            indicators={false}
            pauseOnHover={false}
            responsive={true}
          >
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div>
                  <div className="flex dark:text-gray-300 flex-col md:flex-row gap-2 px-main py-10 rounded-lg bg-indigo-600 text-white items-start md:items-center justify-between w-full">
                    <img
                      src="./add2.jpg"
                      alt=""
                      className="w-full md:w-52 h-20 rounded-sm"
                    />
                    {/* <House sx={{width:56,height:56}}/> */}
                    <div className="flex flex-col items-start">
                      <p className="text-2xl mt-3 md:mt-0 font-bold">
                        Ethiopian business link portal
                      </p>
                      <p className="text-sm max-w-[400px] mt-2">
                        your business link portal. you can advert here with out
                        limit. feel free to contact and work with us.
                      </p>
                    </div>
                    <button className="py-2 mt-3 md:mt-0 px-2 w-40 rounded-md text-white bg-yellow-400 font-bold">
                      Work with us
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        </div>

        {/* paid lists */}
        <div className="w-full px-main py-16 flex bg-gray-200 bg-dark text-dark flex-col items-center justify-center">
          <p className="self-start  font-bold">Paid Lists</p>
          <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full place-items-centers gap-12">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
              return (
                <div
                  key={i}
                  className="w-full relative  py-8 px-6 h-auto bg-white dark:bg-gray-700 rounded-sm flex flex-col items-start text-sm justify-start"
                >
                  <p className="font-bold">
                    Ethiopian business link portal your alliance
                  </p>

                  <div
                    className={`absolute ${
                      i === 0
                        ? "bg-yellow-400"
                        : i === 1
                        ? "bg-red-500"
                        : i === 2
                        ? "bg-emerald-500"
                        : "bg-white"
                    } top-0 left-0 h-[3px] rounded-sm rounded-b-none w-full `}
                  ></div>
                  <p className="text-dark mt-2">Ethiopian business link</p>
                  <div className="w-full relative my-3 shadow-lgd py-6  flex items-center justify-center gap-4">
                    <div className="relative w-full">
                      <img
                        src="./image-1.jpg"
                        alt=""
                        className="w-full brightness-[0.5] h-28 rounded-sm"
                      />
                      <p className="absolute gap-1 shadow-lg bottom-1 text-white flex items-center justify-center left-2">
                        {" "}
                        <svg
                          className="w-6 h-6 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        2500
                      </p>

                      <p className="absolute gap-1 shadow-lg bottom-1 text-white flex items-center justify-center right-2">
                        {" "}
                        <svg
                          className="w-6 h-6 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                        </svg>
                        1200
                      </p>
                    </div>
                    <div className="absolute bg-white bg-dark w-24 top-[90px] z-10 h-24 border border-dark rounded-full shadow-sm   flex items-center justify-center">
                      <img
                        src="./image-1.jpg"
                        alt=""
                        className="w-full h-full rounded-full"
                      />
                      <div className="w-5 absolute top-2 right-0 h-5 bg-emerald-400 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  <div className="flex w-full mt-10 items-center justify-between">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Addiss ababa
                    </div>
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z" />
                      </svg>
                      +251 954104637
                    </div>
                  </div>

                  <div className="flex mt-3 w-full items-center justify-between">
                    <div className="flex items-center gap-1 justify-center">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                      4.5
                    </div>

                    <div className="flex gap-1 items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.6l-2.9 2.6c-1 .9-2.5.2-2.5-1.1V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Chat
                    </div>

                    <div className="flex gap-2 rounded-sm py-[6px] px-2 bg-main text-white items-center justify-center">
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
                      Detail
                    </div>
                  </div>
                  {/* <div className="flex mt-3 w-full items-center justify-between">
                    <p className="text-sm">Local</p>
                    <a
                      href="#"
                      className="inline-flex text-xs font-medium items-center text-white px-4 rounded-sm py-1 bg-blue-600 hover:underline"
                    >
                      visit
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
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>

        {/* youtube videos */}
        <div className="w-full bg-gray-200 bg-dark px-main py-10 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid cols-5 place-items-center gap-10">
          <div className="flex w-full justify-start gap-1 flex-col items-enter">
            <p className="text-lg">Our you tubes</p>
            <p className="text-sm">our latest you tube videos</p>

            <p className="text-xs mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              eaque rem laudantium cum reprehenderit commodi.
            </p>
            <p className="text-xs bg-blue-500 text-white px-4 py-2 rounded-sm mt-4 cursor-pointer flex items-center justify-center">
              Visit our channel{" "}
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

          {[0, 1, 2, 3].map((e, i) => {
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

        

        {/* brands */}
        <Sponsors />

        {/* footers */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
