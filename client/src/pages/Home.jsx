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
import { useEffect, useRef, useState } from "react";
import {
  useCompanyAggregateQuery,
  useReadQuery,
  useRecentlyAddedCompanyQuery,
} from "../features/api/apiSlice";
import Loading from "../components/loading/Loading";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const {
    data: company,
    isFetching: companyFetching,
    isError: companyError,
  } = useReadQuery({
    url: "/user/companies?isBoosted[eq]=true&limit=6&page=1",
    tag: ["companies"],
  });

  const {
    data: recentCompany,
    isFetching: recentCompanyFetching,
    isError: recentCompanyError,
  } = useRecentlyAddedCompanyQuery();

  const {
    data: newses,
    isFetching: newsFetching,
    isError: newsError,
  } = useReadQuery({
    url: "/user/news?limits=12",
    tag: ["news"],
  });

  const {
    data: aggregateData,
    isFetching: aggregateFetching,
    isError: aggregateError,
  } = useCompanyAggregateQuery();

  const {
    data: places,
    isFetching: placesIsFetching,
    isError: placesIsError,
  } = useReadQuery({ url: "/user/places", tag: ["places"] });

  const [companies, setCompanies] = useState([]);
  const [news, setNews] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (company?.data) {
      setCompanies(company?.data);
    }
  }, [company]);

  useEffect(() => {
    if (newses?.data) {
      setNews(newses?.data);
    }
  }, [newses]);

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "440px",
  };
  const slideImages = ["etblink.jpg", "etblink2.jpg", "etblink3.jpg"];

  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(category === "global" ? `/global` : "/local", {
      state: { type: category, city, country, name },
    });
  };

  useEffect(() => {
    if (category === "local" && places?.data) {
      setCity(places?.data[0]?.city[0]);
    } else if (category === "global" && places?.data) {
      setCountry(places?.data[0]?.country[0]);
    }
  }, [category, places]);
  console.log(name, category, "hhhhhhhhhh");
  const categoryTemplate = (image, name, value, type) => {
    return (
      <div
        onClick={() => {
          setName(name);
          setCategory(type);
          setCity(" ");
          setCountry(" ");
          navigate(category === "global" ? `/global` : "/local", {
            state: { type: category, city, country, name },
          });
        }}
        className="flex cursor-pointer relatives p-2 text-center bg-blue-500d rounded-lg flex-col items-center justify-center"
      >
        <div className="w-fulls self-center items-center flex justify-center px-2 h-[70px]s p-2 rounded-full bg-white bg-dark shadow-sm">
          <img src={image} alt={name} className="w-[65px] h-[65px]" />
        </div>

        <p className="mt-2 font-bold">{name}</p>
        <p className="-mt-1 font-poppins text-sm">
          {value >= 1000
            ? parseFloat(value / 1000).toFixed(1) + "K"
            : value >= 1000000
            ? parseFloat(value / 1000000).toFixed(2) + "M"
            : value}
          + listed
        </p>
      </div>
    );
  };

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  console.log(recentCompany, "recent company");
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
            <div className="flex absolute top-60 ml-0d ml-[8%] z-30 w-[540px]  h-auto gap-2 items-start justify-start">
              <div className="absolute -mt-32 p-5  rounded-sm bg-black/35 mx-auto">
                <h1 className="mb-2 tracking-wider text-2xl md:text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
                  Connecting Businesses
                </h1>
                <h1 className="mb-6 mt-4 tracking-wider text-2xl md:text-4xl font-extrabold leading-none text-white dark:text-gray-300 ">
                  Worldwide
                </h1>

                <p className=" text-sm mx-1 mr-3 w-[320px] lg:w-[450px] lg:mx-0 font-normal text-gray-200 text-dark">
                  Unlock endless opportunities with our B2B portal - Connecting
                  businesses, fostering partnerships, and showcasing your
                  services or products!
                </p>
              </div>
            </div>

            <div className="w-full px-main relative pt-10 bg-cover h-[100%] bg-no-repeat md:py-0 bg-[url('/bg3.jpg')] bg-dark bg-bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="absolute shadow-xl grid  w-[85%] lg:w-[calc(100%-620px)]  grid-cols-2 md:grid-cols-4  -top-10 right-[8%] left-[8%] h-[84px] text-gray-500 rounded-lg border border-gray-300 bg-white bg-dark z-20">
                <div className="flex flex-col p-2 items-center gap-1 justify-start border-r">
                  <svg
                    class="w-7 h-7"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm5.01 1H5v2.01h2.01V8Zm3 0H8v2.01h2.01V8Zm3 0H11v2.01h2.01V8Zm3 0H14v2.01h2.01V8Zm3 0H17v2.01h2.01V8Zm-12 3H5v2.01h2.01V11Zm3 0H8v2.01h2.01V11Zm3 0H11v2.01h2.01V11Zm3 0H14v2.01h2.01V11Zm3 0H17v2.01h2.01V11Zm-12 3H5v2.01h2.01V14ZM8 14l-.001 2 8.011.01V14H8Zm11.01 0H17v2.01h2.01V14Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="h-10 border-0 bg-dark text-center focus:outline-none focus:ring-0 outline-none w-32"
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col p-2 items-center gap-1 justify-start border-r">
                  <svg
                    class="w-7 h-7 "
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
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    name=""
                    id=""
                    className="h-10 border-0 text-center items-center bg-dark focus:outline-none focus:ring-0 outline-none w-32"
                  >
                    <option selected disabled value="">
                      Category
                    </option>
                    <option value="local">Local</option>
                    <option value="global">Global</option>
                  </select>
                </div>
                <div className="flex bg-white md:bg-transparent flex-col p-2 gap-1 items-center justify-start border-r">
                  <svg
                    class="w-7 h-7 "
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
                  <select
                    onChange={(e) =>
                      category === "local"
                        ? setCity(e.target.value)
                        : category === "global"
                        ? setCountry(e.target.value)
                        : null
                    }
                    name=""
                    id=""
                    className="h-10 border-0 bg-dark focus:outline-none focus:ring-0 outline-none w-32"
                  >
                    <option selected disabled value="">
                      {category === "local"
                        ? "Cities"
                        : category === "global"
                        ? "Country"
                        : "Location"}
                    </option>
                    {category === "local" &&
                    places?.data &&
                    places?.data[0]?.city
                      ? places?.data[0]?.city?.map((c, i) => {
                          return (
                            <option
                              selected={i === 0 ? true : false}
                              value={c.toString()}
                            >
                              {c}
                            </option>
                          );
                        })
                      : category === "global" &&
                        places?.data &&
                        places?.data[0]?.country
                      ? places?.data[0]?.country?.map((co, j) => {
                          return (
                            <option
                              selected={j === 0 ? true : false}
                              value={co.toString()}
                            >
                              {co}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div
                  onClick={searchHandler}
                  className="flex flex-col h-[78px] p-2 cursor-pointer items-center hover:bg-red-500 justify-center rounded-r-lg text-white bg-[rgb(252,45,45)]"
                >
                  <p className="text-lg  text-center uppercase">Search</p>
                </div>
              </div>

              {recentCompany && (
                <div className="absolute hidden lg:flex right-0 text-[13px] py-2 lg:-top-[150px] z-30 mr-main w-[380px] h-auto justify-end items-center">
                  <div className="absolute right-0 top-0 z-30 bg-dark w-full">
                    <p className="px-4 mt-1 pt-2">Recently added business</p>
                    <ul
                      className="flex w-[380px] flex-wrap border-b border-dark py-[2px] -mb-px font-medium text-center"
                      id="default-tab"
                      data-tabs-toggle="#default-tab-contents"
                      role="tablist"
                    >
                      {Object.keys(recentCompany)?.map((e) => {
                        return (
                          <li className="me-1" role="presentation">
                            <button
                              className="inline-block pr-2 pl-4 py-1 rounded-t-lg"
                              id="profiles-tab"
                              data-tabs-target={`#${e}`}
                              type="button"
                              role="tab"
                              aria-controls={`${e}`}
                              aria-selected="true"
                            >
                              {e}
                            </button>
                          </li>
                        );
                      })}

                      {/* <li className="me-2" role="presentation">
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
                      </li> */}
                    </ul>
                  </div>
                  <div
                    id="default-tab-contents"
                    className="bg-white bg-dark relative w-full shadow-2xl h-[205px] "
                  >
                    {recentCompany &&
                    recentCompany?.importers &&
                    recentCompany?.importer?.length > 0
                      ? recentCompany?.importer?.map((e) => {
                          return (
                            <div
                              className="hidden relative h-full w-full"
                              id="importer"
                              role="tabpanel"
                              aria-labelledby="importer-tab"
                            >
                              <div className="flex pt-[68px] w-full px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                                <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                                  etblink
                                </p>

                                <p className="">
                                  ethiopian business link portals
                                </p>
                                <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                                  Visit{" "}
                                </p>
                              </div>
                              <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                                <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                                  etblink
                                </p>

                                <p className="">
                                  ethiopian business link portals
                                </p>
                                <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                                  Visit{" "}
                                </p>
                              </div>
                              <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                                <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                                  etblink
                                </p>

                                <p className="">
                                  ethiopian business link portals
                                </p>
                                <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                                  Visit{" "}
                                </p>
                              </div>

                              <div className="flex w-full  px-4 justify-between py-1 border-t border-dark border-gray-300 gap-2 items-center">
                                <p className="px-2 py-[2px] rounded-full border border-main text-main font-bold">
                                  etblink
                                </p>

                                <p className="">
                                  ethiopian business link portals
                                </p>
                                <p className=" text-blue-500 cursor-pointer flex items-center justify-center">
                                  Visit{" "}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : null}

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
                        this one for the next. The tab JavaScript swaps classes
                        to control the content visibility and styling.
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
                        this one for the next. The tab JavaScript swaps classes
                        to control the content visibility and styling.
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
                        this one for the next. The tab JavaScript swaps classes
                        to control the content visibility and styling.
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
                        this one for the next. The tab JavaScript swaps classes
                        to control the content visibility and styling.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* small advert */}
            <div className="w-full h-52 mt-28 md:mt-8 lg:mt-4 px-main place-items-center grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
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
            <div className="flex flex-col xl:flex-row px-main gap-3 mt-10 lg:-mt-5 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-5 w-full xl:w-[290px]  items-center justify-center">
                {aggregateData &&
                  aggregateData?.type &&
                  aggregateData?.type?.map((e) => {
                    if (e?._id !== null)
                      return (
                        <div
                          onClick={() => {
                            navigate(
                              e?._id === "global" ? `/global` : "/local"
                            );
                          }}
                          className={`flex cursor-pointer shadow-2xl w-full xl:w-[210px] rounded-l-none px-7 py-4 ${
                            e?._id === "local" ? "bg-main" : "bg-emerald-500"
                          } text-white rounded-lg flex-col items-center justify-center gap-1`}
                        >
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

                          <p className="text-lg mt-2 font-light">
                            {e?._id === "local"
                              ? "Local"
                              : e?._id === "global"
                              ? "Global"
                              : null}
                          </p>
                          <p className="text-sm -mt-2">
                            {e?.total >= 1000
                              ? parseFloat(e?.total / 1000).toFixed(1) + "K"
                              : e?.total >= 1000000
                              ? parseFloat(e?.total / 1000000).toFixed(2) + "M"
                              : e?.total}
                            + listed
                          </p>
                        </div>
                      );
                  })}
              </div>
              <div className="w-1 bg-gray-200 bg-dark hidden xl:block h-20 my-2 mx-2 rounded-full"></div>
              {/* service types  */}

              <div className="w-full max-w-[100%] relative lg:w-[90%]s xl:w-[70%] gap-2">
                <button
                  onClick={previous}
                  className="absolute button shadow-2xl rounded-full  z-20 top-[65px] -left-3"
                >
                  <svg
                    class="w-7 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-gray-500 border border-gray-300 rounded-full h-7 bg-gray-300/50"
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
                </button>
                <Slider
                  ref={(slider) => {
                    sliderRef = slider;
                  }}
                  {...settings}
                >
                  {" "}
                  {/* <div className="w-full flex"></div> */}
                  {aggregateData &&
                    aggregateData?.category &&
                    aggregateData?.category?.map((e) => {
                      // if (e?._id === "Agriculture") {
                      if (e?._id !== null)
                        return (
                          <div
                            onClick={() => {
                              navigate(
                                e?.type === "global" ? `/global` : "/local",
                                {
                                  state: {
                                    type: e?.type,
                                    category: e?._id,
                                  },
                                }
                              );
                            }}
                            className="flex cursor-pointer relatives p-2 text-center bg-blue-500d rounded-lg flex-col items-center justify-center"
                          >
                            <div className="w-fulls self-center items-center flex justify-center px-2 h-[70px]s p-2 rounded-full bg-white bg-dark shadow-sm">
                              <img
                                src={e?.categoryImage}
                                alt={e?._id}
                                className="w-[65px] h-[65px]"
                              />
                            </div>

                            <p className="mt-2 font-bold">{e?._id}</p>
                            <p className="-mt-1 font-poppins text-sm">
                              {e?.total >= 1000
                                ? parseFloat(e?.total / 1000).toFixed(1) + "K"
                                : e?.total >= 1000000
                                ? parseFloat(e?.total / 1000000).toFixed(2) +
                                  "M"
                                : e?.total}
                              + listed
                            </p>
                          </div>
                        );

                      // }
                      // if (e?._id === "Construction") {
                      //   return categoryTemplate(
                      //     "./etbconstruction.png",
                      //     e?._id,
                      //     e?.total
                      //   );
                      // }
                      // if (e?._id === "Embassy") {
                      //   return categoryTemplate(
                      //     "./etbembassy.png",
                      //     e?._id,
                      //     e?.total
                      //   );
                      // }
                      // if (e?._id === "Government") {
                      //   return categoryTemplate(
                      //     "./etbgovernmentoffice.png",
                      //     e?._id,
                      //     e?.total
                      //   );
                      // }
                      // if (e?._id === "Tourism") {
                      //   return categoryTemplate(
                      //     "./etbtourism.png",
                      //     e?._id,
                      //     e?.total
                      //   );
                      // }
                      // if (e?._id === "Exporter") {
                      //   return categoryTemplate(
                      //     "./etbexport.png",
                      //     e?._id,
                      //     e?.total
                      //   );
                      // }
                    })}
                </Slider>
                <button
                  onClick={next}
                  className="absolute button shadow-2xl rounded-full  z-20 top-[65px] -right-3"
                >
                  <svg
                    class="w-7 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-gray-500 border border-gray-300 rounded-full h-7 bg-gray-300/50"
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
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-main">
          <Banner />
        </div>

        <div className="w-full px-main py-20 flex  bg-dark text-dark flex-col items-center justify-center">
          <p className="text-4xl text-center font-semibold text-gray-700">
            Join Thousands of Global{" "}
            <span className="text-main">Businesses</span> Who Trust in Us
          </p>
          <p className="text-[17px] text-center mt-3 py-3 font-light text-gray-500">
            Ethiopian Business Directory (ETB Link) is a comprehensive online
            platform that facilitates connections between businesses and
            potential customers, wholesalers, retailers, manufacturers, and
            service providers in Ethiopia. And as will as wholesalers and
            manufacturers worldwide
          </p>

          <div className="grid mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full place-items-centers gap-7">
            {/* {companyFetching ? (
              <Loading />
            ) : companyError ? (
              <p>Something went error unable to read the data.</p>
            ) :  */}
            {companies?.length > 0 ? (
              companies?.map((e, i) => {
                return (
                  <CompanyItems
                    value={e._id}
                    phoneNo="+251 9541**"
                    type="large"
                    data={e}
                  />
                );
              })
            ) : (
              <p></p>
            )}
          </div>

          {/* {youtubeFetching ? (
            <Loading />
          ) : youtubeError ? (
            <p>Something went error unable to read the data.</p>
            ) : */}

          <YoutubeItems />

          <div className="w-full  py-8 flex flex-col items-center justify-center">
            <p className="text-4xl font-semibold text-gray-700">
              Latest <span className="text-main">News</span>
            </p>
            <p className="text-[17px] mt-3 py-1 font-light text-gray-500">
              our top news
            </p>
            <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* {newsFetching ? (
                <Loading />
              ) : newsError ? (
                <p>Something went error unable to read the data.</p>
                ) : */}

              {news?.length > 0 ? (
                news?.map((e, i) => {
                  if (i < 3) {
                    return (
                      <div
                        key={e?._id}
                        className="flex w-full rounded-sm relative justify-start py-4 flex-col items-enter"
                      >
                        <img
                          src={e?.newsPhoto}
                          className="w-full lg:w-[400px] h-[230px] rounded-sm"
                        />
                        <p className="flex items-center justify-start gap-2 text-main text-[12px] mt-1">
                          {format(e?.date)}
                        </p>
                        <p className="font-bold flex items-center text-lg justify-start gap-2">
                          {e?.title}
                        </p>
                        <p className="text-sm">{e?.subtitle}</p>
                      </div>
                    );
                  }
                })
              ) : news?.length < 0 ? (
                <p>There is no data to display.</p>
              ) : null}
              {/* {[0, 1, 2].map((e, i) => {
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
              })} */}
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

          <div className="flex flex-col lg:flex-row w-full mt-16 gap-6">
            <div className="flex flex-col flex-[70%] shadow-lg bg-white bg-dark p-4 items-center justify-start border-t-4 border-main">
              <p className="text-xl self-start font-bold text-main py-3">
                Ethiopian business link news
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 w-full">
                {newsFetching ? (
                  <Loading />
                ) : newsError ? (
                  <p>Something went error unable to read the data.</p>
                ) : news?.length > 0 ? (
                  news?.map((e, i) => {
                    if (i >= 3) {
                      return (
                        <div
                          key={e?._id}
                          className="flex w-full rounded-sm relative justify-start py-4 flex-col items-enter"
                        >
                          <img
                            src={e?.newsPhoto}
                            className="w-full h-[120px] rounded-sm"
                          />
                          <p className="flex items-center justify-start gap-2 text-main text-[12px] mt-1">
                            {format(e?.date)}
                          </p>
                          <p className="font-bold flex items-center text-lg justify-start gap-2">
                            {e?.title}
                          </p>
                          <p className="text-sm">{e?.subtitle}</p>
                        </div>
                      );
                    }
                  })
                ) : news?.length < 0 ? (
                  <p>There is no data to display.</p>
                ) : null}
                {/* {[0, 1, 2, 3, 4, 5, 6, 7].map((e, i) => {
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
                })} */}
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
