import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import { useLocation } from "react-router-dom";
import { useReadQuery } from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

const JobDetail = () => {
  const location = useLocation();
  const jobsId = location?.state
    ? location?.state.id
    : location?.search?.split("?id=")[1];
  const { data, isFetching, isError } = useReadQuery({
    url: `/user/jobs?_id=${jobsId}&visible=true`,
    tag: ["jobs"],
  });
  const [jobs, setJobs] = useState();
  const {
    data: local,
    isFetching: localIsFetching,
    isError: localIsError,
  } = useReadQuery({
    url: `/user/jobs?_id[ne]=${jobsId}&visible=true&limits=5`,
    tag: ["jobs"],
  });

  // const {
  //   data: global,
  //   isFetching: globalIsFetching,
  //   isError: globalIsError,
  // } = useReadQuery({
  //   url: `/user/jobs?_id[ne]=${jobsId}&category=global&limits=5`,
  //   tag: ["jobs"],
  // });

  // const {
  //   data: slides,
  //   isFetching: slidesIsFetching,
  //   isError: slidesIsError,
  // } = useReadQuery({
  //   url: `/user/jobs?_id[ne]=${jobsId}&limits=20`,
  //   tag: ["jobs"],
  // });

  useEffect(() => {
    if (data) {
      setJobs(data?.data[0]);
    }
  }, [data]);
  console.log(jobs, "jobs");

  // let sliderRef = useRef(null);
  // const next = () => {
  //   sliderRef.slickNext();
  // };
  // const previous = () => {
  //   sliderRef.slickPrev();
  // };

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  return (
    <div className="w-full relative bg-gray-50 pt-28 bg-dark h-auto">
      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read the data</p>}
      {jobs ? (
        <div className="w-full">
          <div className="w-full px-main h-auto flex flex-col lg:flex-row gap-10">
            <div className="h-auto flex flex-col gap-4 w-full lg:w-[65%]">
              <div className="flex w-full mt-6 items-center justify-between">
                <p className="flex items-center justify-center gap-2 w-auto py-2  rounded-lg"></p>
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="flex items-center gap-1 text-sm">
                  <svg
                    class="w-5   h-5 "
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
                  {format(jobs?.createdAt)}
                </p>
                <p className="text-xl font-bold">{jobs?.title}</p>
                <p className="text-sm">{jobs?.subTitle}</p>
                <div
                  className="ql-editor -ml-3"
                  dangerouslySetInnerHTML={{ __html: jobs?.description }}
                ></div>
              </div>

              {/* <p className="font-bold mt-10 text-lg">Read More</p>
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
              </div> */}
            </div>

            <div className="flex flex-col gap-4 pr-[7%] w-full lg:w-[35%]">
              <p className="text-lg mt-6 font-bold py-2 border-b-2">
                Latest jobs
              </p>
              <div className="flex flex-col gap-6">
                {local &&
                  local?.data?.length > 0 &&
                  local?.data?.map((e) => {
                    return (
                      <a
                        href={`/job-detail?id=${e?._id}`}
                        key={e?._id}
                        className="flex border-b-2 py-3 items-center justify-between w-full h-auto"
                      >
                        <p className="">
                          {e?.title?.length > 15
                            ? e?.title?.substring(0, 15) + "..."
                            : e?.title}
                        </p>
                        <div className="flex flex-col gap-1 text-xs">
                          <p>
                            {e?.subTitle?.length > 15
                              ? e?.subTitle?.substring(0, 15) + "..."
                              : e?.subTitle}
                          </p>
                          <div className="flex text-xs self-end gap-2">
                            <p>{format(e?.createdAt)}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </div>

              {/* <p className="text-lg mt-6 font-bold py-2 border-b-2">
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
              </div> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JobDetail;
