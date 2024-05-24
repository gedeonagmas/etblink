import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import { useLocation } from "react-router-dom";
import { useReadQuery } from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewsDetail = () => {
  const location = useLocation();
  const newsId = location?.state
    ? location?.state.id
    : location?.search?.split("?id=")[1];
  const { data, isFetching, isError } = useReadQuery({
    url: `/user/news?_id=${newsId}&visible=true`,
    tag: ["news"],
  });
  const [news, setNews] = useState();
  const {
    data: local,
    isFetching: localIsFetching,
    isError: localIsError,
  } = useReadQuery({
    url: `/user/news?_id[ne]=${newsId}&visible=true&category=local&limits=5`,
    tag: ["news"],
  });

  const {
    data: global,
    isFetching: globalIsFetching,
    isError: globalIsError,
  } = useReadQuery({
    url: `/user/news?_id[ne]=${newsId}&visible=true&category=global&limits=5`,
    tag: ["news"],
  });

  const {
    data: slides,
    isFetching: slidesIsFetching,
    isError: slidesIsError,
  } = useReadQuery({
    url: `/user/news?_id[ne]=${newsId}&visible=true&limits=20`,
    tag: ["news"],
  });

  useEffect(() => {
    if (data) {
      setNews(data?.data[0]);
    }
  }, [data]);
  console.log(news, "news");

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full relative bg-gray-50 bg-dark h-auto">
      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read the data</p>}
      {news ? (
        <div className="w-full">
          <div
            style={{
              backgroundImage: `url(${news?.newsPhoto})`,
              backgroundRepeat: false,
            }}
            className="h-[70vh] bg-cover bg-center relative z-20 w-full"
          >
            <div className="absolute bottom-0 text-2xl h-auto px-4 w-full bg-black text-white">
              <Ticker show={true} isNewsTicker={true} slideSpeed={30}>
                <NewsTicker
                  id="1"
                  title={
                    <div
                      className="ql-editors"
                      dangerouslySetInnerHTML={{
                        __html:
                          news?.description?.length > 200
                            ? news?.description?.substring(0, 150) + "..."
                            : news?.description,
                      }}
                    ></div>
                  }
                />
              </Ticker>
            </div>
          </div>

          <div className="w-full px-main h-auto flex flex-col lg:flex-row gap-10">
            <div className="h-auto flex flex-col gap-4 w-full lg:w-[65%]">
              <div className="flex w-full mt-6 items-center justify-between">
                <p className="flex items-center justify-center gap-2 w-auto py-2  rounded-lg">
                  <svg
                    class="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="flex gap-2">
                    <p>{news?.createdAt?.split("-")[1]}</p>
                    <p>
                      {new Date(news?.createdAt).toLocaleString("default", {
                        month: "long",
                      })}
                    </p>
                  </div>
                </p>

                {/* <div className="flex items-center pr-3 justify-between w-auto gap-10">
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
                  </a>
                </div> */}
              </div>

              <p className="font-bold mt-2 text-lg">{news?.title}</p>

              <img
                src={news?.newsPhoto}
                alt=""
                className="h-[500px] w-full mt-2 rounded-sm"
              />
              <div
                className="ql-editors"
                dangerouslySetInnerHTML={{
                  __html:
                    news?.description?.length > 200
                      ? news?.description?.substring(0, 150) + "..."
                      : news?.description,
                }}
              ></div>

              <p className="font-bold mt-10 text-lg">Read More</p>
              <div className="w-full slider-container relative">
                <Slider
                  ref={(slider) => {
                    sliderRef = slider;
                  }}
                  {...settings}
                >
                  {slides &&
                    slides?.data?.length > 0 &&
                    slides?.data?.map((e) => {
                      return (
                        <a
                          href={`/news-detail?id=${e?._id}`}
                          key={e?._id}
                          className="flex flex-col gap-3 items-center justify-between w-full h-auto"
                        >
                          <img
                            src={e?.newsPhoto}
                            alt=""
                            className="h-32 w-full rounded-sm"
                          />
                          <div className="flex text-xs self-end gap-2">
                            <p>{e?.createdAt?.split("-")[1]}</p>
                            <p>
                              {new Date(e?.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}
                            </p>
                          </div>
                          <p className="">{e?.title}</p>
                        </a>
                      );
                    })}
                </Slider>
                <div className="absolute -top-8 right-2 flex gap-2 items-center justify-center">
                  <button className="button" onClick={previous}>
                    <svg
                      class="w-4 h-4 text-gray-800 dark:text-white"
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
                  <button className="button" onClick={next}>
                    <svg
                      class="w-4 h-4 text-gray-800 dark:text-white"
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

            <div className="flex flex-col gap-4 pr-[7%] w-full lg:w-[35%]">
              <p className="text-lg mt-6 font-bold py-2 border-b-2">
                Local news
              </p>
              <div className="flex flex-col gap-6">
                {local &&
                  local?.data?.length > 0 &&
                  local?.data?.map((e) => {
                    return (
                      <a
                        href={`/news-detail?id=${e?._id}`}
                        key={e?._id}
                        className="flex border-b-2 py-3 items-center justify-between w-full h-auto"
                      >
                        <p className="">{e?.title}</p>
                        <div className="flex flex-col gap-1 text-xs">
                          <img
                            src={e?.newsPhoto}
                            alt=""
                            className="h-12 w-32 rounded-sm"
                          />
                          <div className="flex text-xs self-end gap-2">
                            <p>{news?.createdAt?.split("-")[1]}</p>
                            <p>
                              {new Date(news?.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </div>

              <p className="text-lg mt-6 font-bold py-2 border-b-2">
                International news
              </p>
              <div className="flex flex-col gap-6">
                {global &&
                  global?.data?.length > 0 &&
                  global?.data?.map((e) => {
                    return (
                      <a
                        href={`/news-detail?id=${e?._id}`}
                        key={e?._id}
                        className="flex border-b-2 py-3 items-center justify-between w-full h-auto"
                      >
                        <p className="">{e?.title}</p>
                        <div className="flex flex-col gap-1 text-xs">
                          <img
                            src={e?.newsPhoto}
                            alt=""
                            className="h-12 w-32 rounded-sm"
                          />
                          <div className="flex text-xs self-end gap-2">
                            <p>{news?.createdAt?.split("-")[1]}</p>
                            <p>
                              {new Date(news?.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewsDetail;
