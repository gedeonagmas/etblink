import { Visibility } from "@mui/icons-material";
import { Carousel, Rating } from "flowbite-react";
import { useState, useEffect } from "react";
import Map from "../../components/Map";
import { useLocation } from "react-router-dom";
import {
  useCreateMutation,
  useReadQuery,
  useCreateRateMutation,
  useReadRateQuery,
  useLazyReadRateQuery,
  useSendEmailMutation,
  useCreateSaveMutation,
  useCreateViewMutation,
  useLazyReadQuery,
  useDeleteMutation,
} from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";
import { format } from "timeago.js";
import ResponsivePagination from "react-responsive-pagination";
import "./pagination.css";
import Pop from "../../components/Pop";

const CompanyDetail = (props) => {
  const location = useLocation();
  const companyId = location?.state
    ? location?.state.id
    : location?.search?.split("?id=")[1];
  const currentUser = JSON.parse(localStorage.getItem("etblink_user"));
  const [emailData, emailResponse] = useSendEmailMutation();
  const { data, isFetching, isError } = useReadQuery({
    url: `/user/users?user[eq]=${companyId}&populatingType=users&populatingValue=user`,
    tag: ["companies", "users"],
  });

  console.log(companyId, "id", location, "location", data, "data");
  // const {
  //   data: rates,
  //   isFetching: rateIsFetching,
  //   isError: rateIsError,
  // } = useReadRateQuery({ id: data?.data[0]?.user?._id });

  const [rateData, rateResponse] = useCreateRateMutation();
  const [saveData, saveResponse] = useCreateSaveMutation();
  const [viewData, viewResponse] = useCreateViewMutation();
  const [removeData, removeResponse] = useDeleteMutation();

  const [company, setCompany] = useState({});
  const [pending, setPending] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const [savePending, setSavePending] = useState(false);
  const [viewPending, setViewPending] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [rating, setRating] = useState("3.5");
  const [from, setFrom] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [popup, setPopup] = useState(false);
  const [detail, setDetail] = useState("");
  const [removePending, setRemovePending] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setCompany(data?.data[0]?.user);
    }
  }, [data]);

  const rateHandler = () => {
    rateData({
      fullName,
      rater: currentUser?.user?._id,
      message,
      type: "company",
      accepter: data?.data[0]?.user?._id,
      value: rating,
      role: currentUser?.role,
      for: "company",
      tag: ["companies", "rates"],
    });
  };

  const sendEmailHandler = () => {
    if (
      from?.length > 0 &&
      subject?.length > 0 &&
      message?.length > 0 &&
      fullName?.length > 0
    ) {
      setEmailError(false);
      emailData({ from, to: data?.data[0]?.email, subject, message, fullName });
    } else {
      setEmailError(true);
    }
  };

  const saveHandler = () => {
    saveData({
      company: location?.state?.id,
      saver: currentUser?.user,
      role: currentUser?.role,
      tag: ["companies,save"],
    });
  };

  const viewHandler = () => {
    viewData({
      company: companyId,
      viewer: currentUser?.user,
      role: currentUser?.role,
      tag: ["companies,view"],
    });
  };

  useEffect(() => {
    location && currentUser && viewHandler();
  }, []);

  useEffect(() => {
    var maps = company?.maps;
    var htmlObject = document.getElementById("iframe-div");
    if (maps) {
      htmlObject.innerHTML = maps;
    }
  }, [company]);

  const [
    saleTrigger,
    { data: sales, isFetching: salesIsFetching, isError: salesIsErr },
  ] = useLazyReadQuery();

  useEffect(() => {
    if (company?.sales) {
      saleTrigger({
        url: `/user/users?_id[eq]=${company?.sales}&populatingValue=user`,
        tag: ["users"],
      });
    }
  }, [company]);

  const [
    rateTrigger,
    { data: rates, isFetching: ratedIsFetching, isError: rateIsErr },
  ] = useLazyReadQuery();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    rateTrigger({
      url: `/user/rates?accepter[eq]=${companyId}&populatingType=rates&populatingValue=rater&page=${page}&limit=6`,
      tag: ["companies", "users"],
    });
  }, [companyId, page]);

  const removeHandler = () => {
    detail &&
      removeData({
        url: `/user/rates?id=${detail?._id}`,
        tag: ["rates"],
      });
  };

  useEffect(() => {
    if (removeResponse.status === "fulfilled") {
      setPopup(false);
      setDetailPopup(false);
    }
  }, [removeResponse]);

  useEffect(() => {
    setTotalPage(Math.ceil(rates?.total / 6));
  }, [rates]);

  // console.log(data, "sales data");
  return (
    <div className="relative overflow-hidden z-20">
      <Response response={rateResponse} setPending={setPending} />
      <Response response={emailResponse} setPending={setEmailPending} />
      <Response response={saveResponse} setPending={setSavePending} />
      {/* <Response response={viewResponse} setPending={setViewPending} /> */}

      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read the data</p>}
      {company ? (
        <div className="w-full h-auto">
          <div
            style={{ backgroundImage: `url(${company?.banner})` }}
            className="h-[82vh] px-main bg-center relative bg-cover w-full"
          >
            <div className="absolute px-4 shadow-lg bg-gray-500/50 bottom-0 py-4 h-auto flex items-end justify-between w-[80%] md:w-[60%]">
              <div className="w-auto gap-6 flex flex-col lg:flex-row items-end justify-center">
                <img
                  src={company?.logo}
                  alt=""
                  className="h-32 w-40 rounded-md"
                />
                <div className="flex w-full flex-col gap-2 text-white">
                  <p className="font-bold text-xl">{company?.name}</p>
                  <p className="mt-2">{company?.title}</p>
                  <p className="flex  ">
                    <svg
                      class="w-5 h-5 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z" />
                    </svg>
                    {company?.phone}
                  </p>
                </div>
              </div>
              <LoadingButton
                pending={savePending}
                onClick={saveHandler}
                title={
                  <div className="flex gap-4 text-sm items-center justify-center">
                    <svg
                      class="w-5 h-5 text-white"
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
                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                      />
                    </svg>{" "}
                    Save
                  </div>
                }
                color="bg-main"
                width="w-36 sm:rounded-full sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
              />
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-0">
            <div className="h-auto px-main mt-4 py-4 flex flex-col gap-10 bg-yellow-500f w-full lg:w-[67%]">
              <div className="flex flex-col lg:flex-row text-sm items-center justify-between">
                <p className="py-2  px-3 rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z"
                      clip-rule="evenodd"
                    />
                    <path d="M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z" />
                  </svg>

                  {company?.category}
                </p>
                {/* <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  4 hours ago
                </p> */}
                <p className="py-2  px-3 rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
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
                      d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                    />
                  </svg>

                  {company?.subCategory}
                </p>
                <p className="py-2  px-3 rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
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

                  {company?.type === "local"
                    ? company?.city
                    : company?.type === "global"
                    ? company?.country
                    : company?.address}
                </p>
                {/* <p className="py-2  px-3 rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-red-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                  </svg>
                  {company?.saves?.total} saves
                </p> */}
                <a
                  href="/dashboard/message"
                  className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2"
                >
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
                      d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3l-2.9 2.5c-.3.3-.8.1-.8-.3V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
                    />
                  </svg>
                  chat
                </a>
              </div>

              <div className="">
                <p className="text-xl font-bold">About us</p>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: company?.description }}
                ></div>
              </div>

              {/* carousel */}
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                  {company?.galleries?.map((e) => {
                    return (
                      <img
                        src={e}
                        alt="..."
                        className="object-cover object-center h-full w-full"
                      />
                    );
                  })}
                </Carousel>
              </div>

              {/* services */}
              <div className="w-full">
                <p className="text-xl mt-10 font-bold">Services</p>
                <div className="grid grid-cols-1 w-full mt-7 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex flex-col gap-4 items-start justify-start">
                    {company?.services?.map((e, i) => {
                      return (
                        <div key={i} class="flex items-center">
                          <input
                            checked
                            id="checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-main bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="checked-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {e}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* videos */}
              <div className="w-full">
                <p className="text-xl mt-10 font-bold">Videos</p>
                {/* <div className="grid grid-cols-1 gap-7 w-full mt-5 sm:grid-cols-2 md:grid-cols-3"> */}
                <div className="flex w-full mt-5 rounded-lg border relative justify-start py-4 gap-1 flex-col items-enter">
                  {company?.video && (
                    <video
                      src={company?.video}
                      alt=""
                      className="w-full rounded-lg"
                      controls
                    />
                  )}
                </div>
                {/* </div> */}
              </div>

              {/* ratings */}
              <div className="w-full relative">
                <p className="text-xl mt-10 font-bold">Add Review and Rating</p>
                <p className="text-lg mt-7 font-bold">Rate us</p>

                <div>
                  <div className="flex my-4 items-center gap-2 w-full">
                    <label
                      className="w-[300px] gap-2 flex items-center"
                      for="file"
                    >
                      Your rating{" "}
                      <Rating>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                      </Rating>
                    </label>
                    <input
                      value={rating}
                      className="ml-2 text-yellow-500 w-full"
                      type="range"
                      id="points"
                      min="1"
                      max="5"
                      step="0.1"
                      color="red"
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <p className="">{rating}</p>
                  </div>
                  <div className="w-full mt-3 flex gap-10 justify-between items-center">
                    <div class="mb-5 w-full">
                      <label
                        for="email"
                        class="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your full name
                      </label>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        id="text"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>
                    {/* <div class="mb-5 w-full">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                      />
                    </div> */}
                  </div>
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gra0y-50 rounded-lg border border-gray-300 focus:ring-blue-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                  <div className="mt-6">
                    <LoadingButton
                      pending={pending}
                      onClick={rateHandler}
                      title="Submit"
                      color="bg-main"
                      width="w-52"
                    />
                  </div>
                </div>
                <p className="text-lg mt-10 font-bold">Peoples who rate us</p>

                <div className="flex flex-col">
                  {rates?.data &&
                    rates?.data?.map((e) => {
                      return (
                        <div className="mt-10">
                          <div class="flex items-center gap-2 mb-4">
                            {e?.rater?.logo ? (
                              <img
                                src={e?.rater?.logo}
                                className="w-10 h-10 rounded-full border"
                              />
                            ) : e?.rater?.profilePicture ? (
                              <img
                                src={e?.rater?.profilePicture}
                                className="w-10 h-10 rounded-full border"
                              />
                            ) : (
                              <div className="w-10 h-10 text-center flex items-center justify-center text-xl font-bold rounded-full bg-main text-white">
                                {e?.fullName?.substring(0, 1)}
                              </div>
                            )}
                            <div class="font-medium dark:text-white">
                              <p>
                                {e?.fullName}
                                <time
                                  datetime="2014-08-16 19:00"
                                  class="block text-sm text-gray-500 dark:text-gray-400"
                                >
                                  {format(e?.updatedAt)}
                                </time>
                              </p>
                            </div>
                          </div>
                          <div className="w-full ml-14 flex justify-start gap-3 items-center">
                            <Rating>
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star filled={false} />
                            </Rating>
                            <p>{e?.value}</p>
                          </div>
                          <p className="mt-1 ml-14">{e?.message}</p>
                          {currentUser?.user?._id === e?.rater?._id && (
                            <div className="w-full justify-end flex">
                              <button
                                onClick={() => {
                                  setDetail(e);
                                  setPopup(true);
                                }}
                                className="self-end rounded-sm w-20 py-1 mb-2 text-white bg-main mt-2"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                  <div className="py-3">
                    <ResponsivePagination
                      total={totalPage}
                      current={page}
                      onPageChange={(currentPage) => setPage(currentPage)}
                      previousLabel="Previous"
                      previousClassName="w-24"
                      nextClassName="w-24"
                      nextLabel="Next"
                    />
                  </div>
                </div>
              </div>
            </div>
            {popup && (
              <Pop
                content="Are you sure you want to remove your rating?"
                cancel={setPopup}
                trigger={
                  <LoadingButton
                    pending={removePending}
                    onClick={removeHandler}
                    title="Yes, I'm Sure"
                    color="bg-main"
                    width="w-36 sm:rounded-full sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
                  />
                }
              />
            )}
            <div className="flex relative lg:-mt-52  mt-10 pl-4 py-4 pr-[7%] flex-col gap-10 w-full shadow-lg lg:w-[33%] bg-white bg-dark">
              <div className="w-full p-5 rounded-md border shadow-xl shadow-gray-300">
                <div className="flex mb-7 items-centere justify-between">
                  <p className="flex text-sm gap-1 items-center">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Business info
                  </p>

                  <p className="flex text-sm gap-1 items-center">
                    <svg
                      class="w-5 h-5 text-red-500"
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
                    Get directions
                  </p>
                </div>
                {/* <Map markers={[...markers]} height="35vh" /> */}
                <div id="iframe-div" className="relative">
                  {/* <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${company?.latitude}!2d-${company?.longitude}!3d2.1022195001665533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10a06c0a948cf5d5%3A0x108270c99e90f0b3!2sAfrica!5e0!3m2!1sen!2set!4v1710817332813!5m2!1sen!2set`}
                    width="100%"
                    height="300"
                    // style="border:0;"

                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                  {/* <iframe
                    width="100%"
                    id="iframe"
                    height="300"
                    src="https://maps.google.com/maps?q=9.0087841,38.7879883&hl=es;&z=9&amp;output=embed"
                  ></iframe> */}
                </div>
                <div className="mt-7 gap-2 justify-start items-center flex flex-col">
                  <p className="py-2 w-full rounded-sm flex items-center justify-start  gap-2">
                    <svg
                      class="w-6 h-6 text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    {company?.address}
                  </p>

                  <p className="py-2  rounded-sm flex items-center justify-start w-full  gap-2">
                    <svg
                      class="w-6 h-6 text-emerald-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {company?.views?.total} views
                  </p>
                  <p className="py-2  rounded-sm flex items-center justify-start w-full  gap-2">
                    <svg
                      class="w-6 h-6 -mt-[7px] text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                    {company?.rating?.average} ratings
                  </p>
                  <p className="py-2  rounded-sm flex items-center justify-start w-full  gap-2">
                    <svg
                      class="w-6 h-6 text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                    </svg>
                    {company?.saves?.total} saves
                  </p>
                  <a
                    href="/dashboard/message"
                    className="py-2  rounded-sm cursor-pointer flex items-center justify-start w-full  gap-2"
                  >
                    <svg
                      class="w-6 h-6 text-[#00aeff]"
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
                        d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3l-2.9 2.5c-.3.3-.8.1-.8-.3V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
                      />
                    </svg>
                    chat now
                  </a>
                </div>
                <p className="text-lg mt-7 ">Follow us</p>
                <div className="flex mt-4 items-center justify-between w-full">
                  <a
                    href={`//${company?.socialMedias?.facebook}`}
                    className="cursor-pointer hover:text-red-500"
                    target="_blank"
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
                  </a>
                  <a
                    href={`//${company?.socialMedias?.instagram}`}
                    className="cursor-pointer hover:text-red-500"
                    target="_blank"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href={`//${company?.socialMedias?.twitter}`}
                    className="cursor-pointer hover:text-red-500"
                    target="_blank"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                  </a>

                  <a
                    href={`//${company?.socialMedias?.linkedin}`}
                    className="cursor-pointer hover:text-red-500"
                    target="_blank"
                  >
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
                </div>
              </div>

              <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
                <p className="flex text-sm gap-2 items-center">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Opening Hours
                </p>

                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Sunday</p>
                  <p>
                    {company?.workingDays?.sunday?.from} -{" "}
                    {company?.workingDays?.sunday?.to}
                  </p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Monday</p>
                  {company?.workingDays?.monday?.from} -{" "}
                  {company?.workingDays?.monday?.to}
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Tuesday</p>
                  {company?.workingDays?.tuesday?.from} -{" "}
                  {company?.workingDays?.tuesday?.to}
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Wednesday</p>
                  {company?.workingDays?.wednesday?.from} -{" "}
                  {company?.workingDays?.wednesday?.to}
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Thursday</p>
                  {company?.workingDays?.thursday?.from} -{" "}
                  {company?.workingDays?.thursday?.to}
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Friday</p>
                  {company?.workingDays?.friday?.from} -{" "}
                  {company?.workingDays?.friday?.to}
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Saturday</p>
                  {company?.workingDays?.saturday?.from} -{" "}
                  {company?.workingDays?.saturday?.to}
                </div>
              </div>

              <div className="w-full relative text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
                <p className="flex text-sm gap-2 items-center">
                  <svg
                    class="w-5 h-5 text-emerald-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Contact Business
                </p>

                <div class="flex flex-col xl:flex-row items-center gap-2 mt-3 mb-4">
                  <div className="xl:self-start w-12 h-12">
                    <img
                      class="w-12 h-12  rounded-full"
                      src={company?.logo}
                      alt=""
                    />
                  </div>
                  <div class="font-medium dark:text-white">
                    <p>
                      {company?.name}
                      <time
                        datetime="2014-08-16 19:00"
                        class="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        {data?.data[0]?.email}
                      </time>
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    for="first_name"
                    class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name
                  </label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm mt-2 font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setFrom(e.target.value)}
                    type="email"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm mt-4 font-medium text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <input
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Subject..."
                    required
                  />
                </div>

                <label
                  for="message"
                  class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  rows="4"
                  class="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your message here..."
                ></textarea>
                {emailError && (
                  <p className="flex w-full mb-2 border border-red-500 p-2 rounded-lg bg-red-200 text-red-500 text-sm gap-2 items-center">
                    All fields are required!
                  </p>
                )}
                <LoadingButton
                  pending={emailPending}
                  onClick={sendEmailHandler}
                  title="Submit"
                  color="bg-main"
                  width="w-full"
                />
              </div>

              {sales && sales?.data[0] && (
                <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
                  <p className="flex text-sm gap-2 items-center">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Sales Agent
                  </p>

                  <div className="flex w-full mt-5 flex-col items-center justify-center">
                    <div class="flex flex-col gap-3 items-center mb-4">
                      <img
                        class="w-24 h-24 me-4 rounded-full"
                        src={sales?.data[0]?.user?.profilePicture}
                        alt=""
                      />
                      <div class="font-medium gap-1 flex flex-col dark:text-white">
                        <p className="text-xl font-bold">
                          {sales?.data[0]?.user?.firstName}{" "}
                          {sales?.data[0]?.user?.lastName}
                        </p>
                        <p className="">{sales?.data[0]?.email}</p>
                        <p>{sales?.data[0]?.user?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>There is no data to display</p>
      )}
    </div>
  );
};

export default CompanyDetail;
