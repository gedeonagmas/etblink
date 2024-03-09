// import SportsHandBall from "@mui/icons-material/SportsHandBall";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Sponsors from "../components/Sponsors";
import YoutubeItems from "../components/YoutubeItems";
import CompanyItems from "../components/CompanyItems";
import Banner from "../components/Banner";

const Home = () => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "440px",
  };
  const slideImages = ["build4.jpg", "build1.jpg", "build3.jpg"];

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
        <div className="w-full pb-8 h-full">
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
                    className="object-cover object-bottom relative items-start justify-start"
                  ></div>
                </div>
              ))}
            </Slide>

            {/* hero page content */}
            <div className="flex absolute top-60 ml-main z-10 w-[440px]  h-auto gap-2 items-start justify-start">
              <div className="absolute -mt-32 p-5 rounded-sm bg-black/35 mx-auto">
                <h1 className="mb-2 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
                  Your investment
                </h1>
                <h1 className="mb-6 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
                  destination
                </h1>

                <p className=" text-sm font-normal text-gray-200 text-dark">
                  Here at ETBLINK we focus on markets where technology, <br />
                  innovation, and capital can unlock long-term value.
                </p>
              </div>
            </div>
            <div className="w-full px-main relative pt-10 bg-cover h-[100%] bg-no-repeat md:py-0 bg-[url('/bg3.jpg')] bg-dark bg-bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="w-full gap-5 py-5 md:py-0 flex px-4 flex-col items-center justify-center bg-main-black text-white">
                <div className="w-full flex justify-between items-center">
                  <p className="font-bold text-gray-200">
                    Top listed magazines
                  </p>
                </div>

                <div className="w-full relative my-2 flex gap-2 items-center justify-center bg-main-black text-white">
                  {/* <div className="rotate-[115deg] absolute -left-5 top-20 z-10 w-10 h-[2px] bg-[#00aeff]"></div> */}
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

              <div className="w-full text-[13px] h-full place-items-center relative">
                <div className="hidden md:block h-[250px] w-full  absolute -top-[170px] right-0">
                  <div className="relative w-full h-full ">
                    <div className="absolute right-0 top-0 z-30 bg-white bg-dark w-full">
                      <p className="px-4 pt-2">Recently added business</p>
                      <ul
                        className="flex flex-wrap border-b border-dark py-[2px] -mb-px font-medium text-center"
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
                      className="bg-gray-50 h-[210px] overflow-y-scroll overflow-hidden"
                    >
                      <div
                        className="hidden h-full  bg-dark"
                        id="profiles"
                        role="tabpanel"
                        aria-labelledby="profiles-tab"
                      >
                        <div className="flex w-full pt-[68px]  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                          <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
                            etblink
                          </p>

                          <p className="">ethiopian business link portals</p>
                          <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                            Visit{" "}
                          </p>
                        </div>
                        <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                          <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
                            etblink
                          </p>

                          <p className="">ethiopian business link portals</p>
                          <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                            Visit{" "}
                          </p>
                        </div>
                        <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                          <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
                            etblink
                          </p>

                          <p className="">ethiopian business link portals</p>
                          <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                            Visit{" "}
                          </p>
                        </div>

                        <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                          <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
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

                <div className="grid grid-cols-3 bg-gray-800 mt-10 grid-rows-3 text-sm w-full h-[87%]  text-gray-300">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="flex border border-gray-700 flex-col gap-2 p-2  w-full h-full items-center justify-center"
                      >
                        <svg
                          className={`w-6 h-6 ${
                            i === 1 || i === 3 || i === 7
                              ? "text-yellow-300"
                              : null
                          }`}
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
                            d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
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

        <Banner />
        <div className="w-full px-main py-8 flex bg-gray-100 bg-dark text-dark flex-col items-center justify-center">
          <p className="self-start  font-bold">Paid Lists</p>
          <div className="grid mt-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  w-full place-items-centers gap-7">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((e, i) => {
              return <CompanyItems value={i} />;
            })}
          </div>

          <YoutubeItems />
          <Sponsors />
        </div>
      </div>
    </>
  );
};

export default Home;


// import SportsHandBall from "@mui/icons-material/SportsHandBall";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
// import Sponsors from "../components/Sponsors";
// import YoutubeItems from "../components/YoutubeItems";
// import CompanyItems from "../components/CompanyItems";
// import Banner from "../components/Banner";

// const Home = () => {
//   const divStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundSize: "cover",
//     height: "440px",
//   };
//   const slideImages = ["build4.jpg", "build1.jpg", "build3.jpg"];

//   // const hoverHandler = (id) => {
//   //   const ids = document.getElementById(id);
//   //   ids?.classList?.value?.includes("hidden")
//   //     ? ids?.classList?.remove("hidden")
//   //     : ids?.classList?.add("hidden");
//   // };

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="relative rounded-lg bg-gray-50 bg-dark">
//         {/* slides */}
//         <div className="w-full pb-10 h-full">
//           <div
//             style={{ width: "100%", height: "100%" }}
//             className="slide-container relative w-full h-full bg-blue-500"
//           >
//             <Slide
//               autoplay={false}
//               infinite={true}
//               duration={4000}
//               arrows={false}
//               transitionDuration={1000}
//               indicators={false}
//               pauseOnHover={false}
//               responsive={true}
//             >
//               {slideImages.map((slideImage, index) => (
//                 <div key={index}>
//                   <div
//                     style={{
//                       ...divStyle,
//                       backgroundImage: `url(${slideImage})`,
//                       width: "100%",
//                     }}
//                     className="object-cover object-bottom relative items-start justify-start"
//                   ></div>
//                 </div>
//               ))}
//             </Slide>

//             {/* hero page content */}
//             <div className="flex absolute top-60 ml-main z-10 w-[440px]  h-auto gap-2 items-start justify-start">
//               <div className="absolute -mt-32 p-5 rounded-sm bg-black/35 mx-auto">
//                 <h1 className="mb-2 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
//                   Your investment
//                 </h1>
//                 <h1 className="mb-6 tracking-wider text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
//                   destination
//                 </h1>

//                 <p className=" text-sm font-normal text-gray-200 text-dark">
//                   Here at ETBLINK we focus on markets where technology, <br />
//                   innovation, and capital can unlock long-term value.
//                 </p>
//               </div>
//             </div>
//             <div className="w-full px-main relative pt-10 bg-cover h-[100%] bg-no-repeat md:py-0 bg-[url('/bg3.jpg')] bg-dark bg-bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//               <div className="w-full gap-5 py-5 md:py-0 flex px-4 flex-col items-center justify-center bg-main-black text-white">
//                 <div className="w-full flex justify-between items-center">
//                   <p className="font-bold text-gray-200">
//                     Top listed magazines
//                   </p>
//                 </div>

//                 <div className="w-full relative my-2 flex gap-2 items-center justify-center bg-main-black text-white">
//                   {/* <div className="rotate-[115deg] absolute -left-5 top-20 z-10 w-10 h-[2px] bg-[#00aeff]"></div> */}
//                   <div className="flex flex-col items-center justify-center w-auto">
//                     <img
//                       src="./magazine2.jpg"
//                       alt=""
//                       className="h-24 rounded-sm w-24"
//                     />
//                     <div className="w-28 shadow-2xl shadow-blue-500 h-14 px-1 py-1 text-center rounded-sm bg-[#00aeff] text-white">
//                       <p className="font-bold text-sm">Addiss</p>
//                       <p className="text-sm cursor-pointer flex items-center justify-center">
//                         read more
//                         <svg
//                           className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 18 18"
//                         >
//                           <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                           />
//                         </svg>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center justify-center w-auto">
//                     <img
//                       src="./magazine1.jpg"
//                       alt=""
//                       className="h-24 rounded-sm w-24"
//                     />
//                     <div className="w-28 h-14 shadow-2xl shadow-blue-600 px-1 py-1 text-center rounded-sm bg-blue-500 text-white">
//                       <p className="font-bold text-sm">Reporter</p>
//                       <p className="text-sm cursor-pointer flex items-center justify-center">
//                         read more{" "}
//                         <svg
//                           className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 18 18"
//                         >
//                           <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                           />
//                         </svg>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center justify-center w-auto">
//                     <img
//                       src="./magazine3.jpg"
//                       alt=""
//                       className="h-24 rounded-sm w-24"
//                     />
//                     <div
//                       style={{ background: "orange" }}
//                       className="w-28 h-14 px-1 shadow-2xl shadow-yellow-500 py-1 text-center rounded-sm  text-white"
//                     >
//                       <p className="font-bold text-sm">Tribune</p>
//                       <p className="text-sm flex cursor-pointer items-center justify-center">
//                         read more{" "}
//                         <svg
//                           className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 18 18"
//                         >
//                           <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                           />
//                         </svg>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full p-4 bg-white dark:bg-gray-700">
//                 <div className="w-full flex justify-between items-center">
//                   <p className="font-bold text-dark">Our galleries</p>
//                   {/* <p className="text-xs cursor-pointer flex items-center justify-center">
//                       View all{" "}
//                       <svg
//                         className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 18"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                         />
//                       </svg>
//                     </p> */}
//                 </div>
//                 <div className="w-full mt-2 grid grid-cols-2 gap-2">
//                   <div>
//                     <img
//                       className="h-[108px] w-full rounded-lg"
//                       src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div>
//                     <img
//                       className="h-[108px] w-full rounded-lg"
//                       src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div>
//                     <img
//                       className="h-[108px] w-full rounded-lg"
//                       src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div>
//                     <img
//                       className="h-[108px] w-full rounded-lg"
//                       src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
//                       alt=""
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full text-[13px] h-full place-items-center relative">
//                 <div className="hidden md:block h-[250px] w-full  absolute -top-[170px] right-0">
//                   <div className="relative w-full h-full ">
//                     <div className="absolute right-0 top-0 z-30 bg-white bg-dark w-full">
//                       <p className="px-4 pt-2">Recently added business</p>
//                       <ul
//                         className="flex flex-wrap border-b border-dark py-[2px] -mb-px font-medium text-center"
//                         id="default-tab"
//                         data-tabs-toggle="#default-tab-contents"
//                         role="tablist"
//                       >
//                         <li className="me-1" role="presentation">
//                           <button
//                             className="inline-block pr-2 pl-4 py-1 rounded-t-lg"
//                             id="profiles-tab"
//                             data-tabs-target="#profiles"
//                             type="button"
//                             role="tab"
//                             aria-controls="profiles"
//                             aria-selected="true"
//                           >
//                             Importers
//                           </button>
//                         </li>
//                         <li className="me-2" role="presentation">
//                           <button
//                             className="inline-block px-2 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
//                             id="dashboard-tab"
//                             data-tabs-target="#dashboard"
//                             type="button"
//                             role="tab"
//                             aria-controls="dashboard"
//                             aria-selected="false"
//                           >
//                             Exporters
//                           </button>
//                         </li>
//                         <li className="me-2" role="presentation">
//                           <button
//                             className="inline-block px-2 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
//                             id="settings-tab"
//                             data-tabs-target="#settings"
//                             type="button"
//                             role="tab"
//                             aria-controls="settings"
//                             aria-selected="false"
//                           >
//                             Banks
//                           </button>
//                         </li>
//                         <li role="presentation">
//                           <button
//                             className="inline-block px-2 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
//                             id="contacts-tab"
//                             data-tabs-target="#contacts"
//                             type="button"
//                             role="tab"
//                             aria-controls="contacts"
//                             aria-selected="false"
//                           >
//                             Hotels
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                     <div
//                       id="default-tab-contents"
//                       className="bg-gray-50 h-[210px] overflow-y-scroll overflow-hidden"
//                     >
//                       <div
//                         className="hidden h-full  bg-dark"
//                         id="profiles"
//                         role="tabpanel"
//                         aria-labelledby="profiles-tab"
//                       >
//                         <div className="flex w-full pt-[68px]  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
//                           <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
//                             etblink
//                           </p>

//                           <p className="">ethiopian business link portals</p>
//                           <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
//                             Visit{" "}
//                           </p>
//                         </div>
//                         <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
//                           <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
//                             etblink
//                           </p>

//                           <p className="">ethiopian business link portals</p>
//                           <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
//                             Visit{" "}
//                           </p>
//                         </div>
//                         <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
//                           <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
//                             etblink
//                           </p>

//                           <p className="">ethiopian business link portals</p>
//                           <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
//                             Visit{" "}
//                           </p>
//                         </div>

//                         <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
//                           <p className="px-2 py-[2px] rounded-full border border-orange-400 text-orange-400 font-bold">
//                             etblink
//                           </p>

//                           <p className="">ethiopian business link portals</p>
//                           <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
//                             Visit{" "}
//                           </p>
//                         </div>
//                       </div>

//                       <div
//                         className="hidden h-full p-4 bg-gray-50 bg-dark"
//                         id="dashboard"
//                         role="tabpanel"
//                         aria-labelledby="dashboard-tab"
//                       >
//                         <p className="text-sm mt-12 text-gray-500 text-dark">
//                           This is some placeholder content the{" "}
//                           <strong className="font-medium text-gray-800 dark:text-white">
//                             Dashboard tabs associated content
//                           </strong>
//                           . Clicking another tab will toggle the visibility of
//                           this one for the next. The tab JavaScript swaps
//                           classes to control the content visibility and styling.
//                         </p>
//                       </div>

//                       <div
//                         className="hidden p-4 h-full bg-gray-50 bg-dark"
//                         id="settings"
//                         role="tabpanel"
//                         aria-labelledby="settings-tab"
//                       >
//                         <p className="text-sm mt-12 text-gray-500 text-dark">
//                           This is some placeholder content the{" "}
//                           <strong className="font-medium text-gray-800 dark:text-white">
//                             Settings tabs associated content
//                           </strong>
//                           . Clicking another tab will toggle the visibility of
//                           this one for the next. The tab JavaScript swaps
//                           classes to control the content visibility and styling.
//                         </p>
//                       </div>

//                       <div
//                         className="hidden p-4 h-full bg-gray-50 bg-dark"
//                         id="contacts"
//                         role="tabpanel"
//                         aria-labelledby="contacts-tab"
//                       >
//                         <p className="text-sm mt-12 text-gray-500 text-dark">
//                           This is some placeholder content the{" "}
//                           <strong className="font-medium text-gray-800 dark:text-white">
//                             Contacts tabs associated content
//                           </strong>
//                           . Clicking another tab will toggle the visibility of
//                           this one for the next. The tab JavaScript swaps
//                           classes to control the content visibility and styling.
//                         </p>
//                       </div>

//                       <div
//                         className="hidden p-4 h-full bg-gray-50 bg-dark"
//                         id="embassies"
//                         role="tabpanel"
//                         aria-labelledby="embassies-tab"
//                       >
//                         <p className="text-sm mt-12 text-gray-500 text-dark">
//                           This is some placeholder content the{" "}
//                           <strong className="font-medium text-gray-800 dark:text-white">
//                             Contacts tabs associated content
//                           </strong>
//                           . Clicking another tab will toggle the visibility of
//                           this one for the next. The tab JavaScript swaps
//                           classes to control the content visibility and styling.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 bg-gray-800 mt-10 grid-rows-3 text-sm w-full h-[87%]  text-gray-300">
//                   {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
//                     return (
//                       <div
//                         key={i}
//                         className="flex border border-gray-700 flex-col gap-2 p-2  w-full h-full items-center justify-center"
//                       >
//                         <svg
//                           className={`w-6 h-6 ${
//                             i === 1 || i === 3 || i === 7
//                               ? "text-yellow-300"
//                               : null
//                           }`}
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
//                           />
//                         </svg>
//                         <p className="">Importers</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Banner />
//         <div className="w-full px-main py-16 flex bg-gray-100 bg-dark text-dark flex-col items-center justify-center">
//           <p className="self-start  font-bold">Paid Lists</p>
//           <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full place-items-centers gap-16">
//             {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
//               return <CompanyItems value={i} />;
//             })}
//           </div>

//           <YoutubeItems />
//           <Sponsors />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;