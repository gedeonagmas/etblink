import React, { useEffect, useState } from "react";
import {
  useCreateBoostMutation,
  useLazyReadQuery,
  useReadQuery,
} from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Pay from "../../Pay";

import { format } from "timeago.js";
import Pop from "../../../components/Pop";
import Tables from "../../../components/Tables";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import ProfilePicture from "../../../components/ProfilePicture";
import { DoneRounded } from "@mui/icons-material";

const Subscription = ({ type }) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [subscriptionData, subscriptionResponse] = useCreateBoostMutation();
  const [subscriptionPending, setSubscriptionPending] = useState(false);

  const [subscriptionInfo, setSubscriptionInfo] = useState();
  const [payFrom, setPayFrom] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("- - -");
  const [duration, setDuration] = useState({ type: "", value: 0 });
  const [minStartDate, setMinStartDate] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  const [showError, setShowError] = useState(false);
  const [paymentTypePopup, setPaymentTypePopup] = useState(false);

  const [onlinePopup, setOnlinePopup] = useState(false);
  const [bankPopup, setBankPopup] = useState(false);
  const [checkPopup, setCheckPopup] = useState(false);
  const [depositPopup, setDepositPopup] = useState(false);
  const [freePopup, setFreePopup] = useState(false);

  //bank information
  const [bankValidationError, setBankValidationError] = useState(false);
  const [freeValidationError, setFreeValidationError] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [yourName, setYourName] = useState("");
  const [bankAmount, setBankAmount] = useState("");
  const [bankDate, setBankDate] = useState("");
  const [tranRef, setTranRef] = useState("");

  //check information
  const [checkValidationError, setCheckValidationError] = useState(false);
  const [checkBankName, setCheckBankName] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkYourName, setCheckYourName] = useState("");
  const [checkAmount, setCheckAmount] = useState("");
  const [checkDate, setCheckDate] = useState("");

  //custom
  const [planName, setPlanName] = useState("custom");
  const [planDuration, setPlanDuration] = useState({
    type: "month",
    value: "",
  });
  const [planAmount, setPlanAmount] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [company, setCompany] = useState("");

  const {
    data: subscriptions,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/subscriptions", tag: ["subscriptions"] });

  const {
    data: currentCompany,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useReadQuery({
    url: `/user/companies?_id=${user?.user?._id}`,
    tag: ["companies"],
  });

  // const {
  //   data: subscriptionHistory,
  //   isFetching: historyFetching,
  //   isError: historyError,
  // } = useReadQuery({
  //   url: `/user/subscriptionhistories?company=${
  //     type === "default" ? user?.user?._id : company
  //   }&populatingType=subscriptionhistories&populatingValue=company,subscription`,
  //   tag: ["subscriptionhistories"],
  // });

  const [
    triggerHistory,
    {
      data: subscriptionHistory,
      isFetching: historyFetching,
      isError: historyError,
    },
  ] = useLazyReadQuery();

  const [pageTwo, setPageTwo] = useState(1);
  const [totalPageTwo, setTotalPageTwo] = useState(1);

  useEffect(() => {
    setTotalPageTwo(Math.ceil(subscriptionHistory?.total / 10));
  }, [subscriptionHistory]);

  useEffect(() => {
    triggerHistory({
      url: `/user/subscriptionhistories?company=${
        type === "default" ? user?.user?._id : company
      }&page=${pageTwo}&populatingValue=company,subscription`,
      tag: ["subscriptionhistories"],
    });
  }, [pageTwo]);

  const formatDate = (e, type) => {
    if (type === "history") {
      return new Date(e).toISOString()?.split("T")[0];
    } else {
      return new Date(e).toString().split("GMT")[0];
    }
  };

  useEffect(() => {
    if (startDate) {
      const a = startDate.split("-");
      setEndDate(
        duration?.type === "month"
          ? `${a[0] * 1}/${a[1] * 1 + duration?.value}/${a[2] * 1}`
          : duration?.type === "year"
          ? `${a[0] * 1 + duration?.value}/${a[1] * 1}/${a[2] * 1}`
          : null
      );
    } else {
      setEndDate("- - -");
    }
  }, [startDate]);

  useEffect(() => {
    if (
      subscriptionHistory?.data?.length === 0 ||
      subscriptionHistory?.message
    ) {
      const date = new Date()?.toISOString()?.split("T")[0];
      setMinStartDate(
        `${date?.split("-")[0]}-${date?.split("-")[1]}-${
          date?.split("-")[2] * 1 + 1
        }`
      );
    } else if (subscriptionHistory?.data?.length > 0) {
      let minDate = subscriptionHistory?.data[0]?.endDate;
      subscriptionHistory?.data?.map((e) => {
        if (minDate > e?.endDate) {
          minDate = e?.endDate;
        } else {
          return true;
        }
      });
      const date = minDate && new Date(minDate)?.toISOString()?.split("T")[0];
      setMinStartDate(
        `${date?.split("-")[0]}-${date?.split("-")[1]}-${
          date?.split("-")[2] * 1 + 1
        }`
      );
    }
  }, [subscriptionHistory]);

  useEffect(() => {
    if (planName === "free") {
      setPlanAmount(0);
      setPayFrom("free");
    }
  }, [planName]);

  useEffect(() => {
    if (startDate?.length > 1) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }, [startDate]);

  useEffect(() => {
    if (subscriptionResponse?.status === "fulfilled") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [subscriptionResponse]);

  useEffect(() => {
    setSubscriptionInfo({
      name: planName,
      amount: planAmount,
      duration: `${planDuration?.value} ${planDuration?.type}`,
    });
  }, [planName, planAmount, planDuration]);

  console.log(subscriptionInfo, "info");

  const paymentTypeHandler = () => {
    subscriptionInfo &&
      setDuration({
        type: subscriptionInfo?.duration?.split(" ")[1],
        value: subscriptionInfo?.duration?.split(" ")[0] * 1,
      });

    switch (payFrom) {
      case "online":
        setOnlinePopup(true);
        break;
      case "deposit":
        setDepositPopup(true);
        break;
      case "bank":
        setBankPopup(true);
        break;
      case "check":
        setCheckPopup(true);
        break;
      case "free":
        setFreePopup(true);
        break;
      default:
        break;
    }
  };

  const payFromOnlineHandler = () => {
    return (
      <Pay
        startDate={startDate}
        endDate={endDate?.split("/")?.join("-")}
        subscription={subscriptionInfo?._id}
        company={type === "default" ? currentCompany?.data[0]?._id : company}
        name={currentCompany?.data[0]?.name}
        email={user?.email}
        amount={subscriptionInfo?.amount}
        payFrom={payFrom}
        title="Pay and Subscribe"
        serviceType="serviceFee"
      />
    );
  };

  const payFromDepositHandler = () => {
    subscriptionData({
      startDate,
      endDate: endDate?.split("/")?.join("-"),
      subscription: subscriptionInfo?._id,
      company: type === "default" ? currentCompany?.data[0]?._id : company,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: subscriptionInfo?.amount,
      payFrom,
      serviceType: "serviceFee",
    });
  };

  const payFromBankHandler = () => {
    subscriptionData({
      startDate,
      endDate: endDate?.split("/")?.join("-"),
      subscription: subscriptionInfo?._id,
      company: type === "default" ? currentCompany?.data[0]?._id : company,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: subscriptionInfo?.amount,
      payFrom,
      serviceType: "serviceFee",
      bankDetail: {
        bankName,
        accountNumber,
        yourName,
        bankAmount,
        bankDate,
        tranRef,
      },
    });
  };

  const payFromCheckHandler = () => {
    subscriptionData({
      startDate,
      endDate: endDate?.split("/")?.join("-"),
      subscription: subscriptionInfo?._id,
      company: type === "default" ? currentCompany?.data[0]?._id : company,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: subscriptionInfo?.amount,
      payFrom,
      serviceType: "serviceFee",
      checkDetail: {
        checkBankName,
        checkNumber,
        checkYourName,
        checkAmount,
        checkDate,
      },
    });
  };

  const onlineAndDepositComponent = () => {
    return (
      <div className="fixed top-0 left-0 z-20 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
        <div className="relative rounded-lg p-5 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] h-[450px] bg-white bg-dark">
          <svg
            class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
            aria-hidden="true"
            onClick={() => {
              payFrom === "online"
                ? setOnlinePopup(false)
                : payFrom === "deposit"
                ? setDepositPopup(false)
                : null;
              setShowError(false);
              setEndDate("- - -");
              setStartDate("");
            }}
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>

          <div className="flex relative mb-5 flex-col gap-3">
            {errorMessage && showError && (
              <div
                id="alert-2"
                class="flex absolute top-0 left-20 items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div class="ms-3 text-sm font-medium">
                  {startDate?.length < 1 && (
                    <p className="text-sm">- Please select a start date.</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(false)}
                  class="ms-auto -mx-1.5 ml-2 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-2"
                  aria-label="Close"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}
            <p className="">Select start date</p>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              min={minStartDate}
              type="date"
              name=""
              id=""
              className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
            />
            <div className="w-full mt-3 gap-5 flex items-center justify-center">
              <div className="w-full items-center justify-center">
                <p className="">Plan Name</p>
                <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                  {subscriptionInfo?.name}
                </p>
              </div>
              <div className="w-full items-center justify-center">
                <p className="">Amount</p>
                <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                  {subscriptionInfo?.amount} birr
                </p>
              </div>
            </div>
            <div className="w-full gap-5 flex items-center justify-center">
              <div className="w-44 items-center justify-center">
                <p className="mt-3">Duration</p>
                <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                  {subscriptionInfo?.duration}
                </p>
              </div>
              <div className="w-full items-center justify-center">
                <p className="mt-3">End Date</p>
                <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                  {endDate}
                  <span className=" mx-2">
                    (
                    {endDate != "- - -"
                      ? formatDate(endDate)?.split(" ").splice(0, 4).join(" ")
                      : null}
                    )
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full gap-5 flex items-center justify-center"></div>
          </div>
          {startDate?.length > 0 && payFrom === "online" ? (
            payFromOnlineHandler()
          ) : startDate?.length > 0 && payFrom === "deposit" ? (
            <LoadingButton
              pending={subscriptionPending}
              onClick={payFromDepositHandler}
              title={
                <p className="flex gap-2 items-center justify-center rounded-lg w-full  text-white bg-main">
                  <svg
                    class="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Pay and Subscribe
                </p>
              }
              color="bg-main"
              width="w-full sm:py-2"
            />
          ) : (
            <button
              onClick={() => {
                setShowError(true);
              }}
              className="flex  cursor-default gap-2 items-center justify-center h-10 mt-2 rounded-lg w-full  text-white bg-red-400"
              type="submit"
            >
              <svg
                class="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                  clip-rule="evenodd"
                />
              </svg>
              Pay and Subscribe
            </button>
          )}
        </div>
      </div>
    );
  };

  //custom

  const [
    trigger,
    { data: companies, isFetching: companyIsFetching, isError: companyIsError },
  ] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(companies?.total / 10));
  }, [companies]);

  useEffect(() => {
    trigger({
      url: `/user/users?role=company&populatingValue=user&limit=10&page=${page}`,
      tag: ["companies"],
    });
  }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/users?role=company&searchField=email&searchValue=${search}&populatingValue=user&limit=10&page=${page}`,
      tag: ["companies"],
    });
  }, [search]);

  console.log(company, "company");
  const columns = [
    {
      name: "NAME",
      selector: (row) => row?.user?.name,
      cell: (row) => <div className="">{row?.user?.name}</div>,
      sortable: true,
    },
    {
      name: "PROFILE",
      cell: (row) => <ProfilePicture user={row} />,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      cell: (row) => <div className="">{row.email}</div>,
      sortable: true,
    },

    {
      name: "REGISTERED AT",
      selector: (row) => row.createdAt,
      cell: (row) => <div className="">{format(row.createdAt)}</div>,
      sortable: true,
    },

    {
      name: "STATUS",
      selector: (row) => row.isActive,
      cell: (row) => (
        <div className="">{row?.isActive === true ? "Active" : "Freezed"}</div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-1 justify-between items-center">
          {/* <button
            onClick={() => {
              setPopup(true);
              setId(row._id);
              setValue(row?.isActive ? false : true);
            }}
            className="px-1 py-1 w-16 bg-main text-white rounded-lg"
          >
            {row?.isActive ? "Freeze" : "Activate"}
          </button> */}
          <button
            onClick={() => {
              console.log(row, "rrrrrrrrrr");
              // setSubscriptionInfo({
              //   name: planName,
              //   amount: planAmount,
              //   duration: `${planDuration?.type} ${planDuration.duration}`,
              // });
              setCompany(row?.user?._id);
              setPaymentTypePopup(true);
            }}
            className="py-1 px-2 bg-emerald-500 text-white rounded-lg"
          >
            Subscribe
          </button>
          {/* <button
            onClick={() => {
              setUser(row);
              setAdd(true);
            }}
            className="px-1 py-1 w-14 bg-emerald-500 text-white rounded-lg"
          >
            Detail
          </button> */}
        </div>
      ),
      sortable: true,
    },
  ];

  // console.log(boostedCompany, "boosted");
  console.log(startDate, endDate, subscriptionInfo, "boosted");

  return (
    <section class="bg-white pr-3 lg:pr-10 dark:bg-gray-900 relative">
      <Response
        response={subscriptionResponse}
        setPending={setSubscriptionPending}
      />

      <div class="py-2 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
        {currentCompany?.data[0]?.profileFill < 90 ? (
          <div
            class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Warning! </span> Your profile must be
              greater than 90%
              <a
                href="/dashboard/company/profile"
                className="mx-2 font-bold hover:text-blue-500 underline text-blue-600"
              >
                Fill now
              </a>
              then come back again to subscribe.
            </div>
          </div>
        ) : null}{" "}
        {type !== "custom" && (
          <div
            class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Note</span>
            {subscriptionHistory?.data?.length === 0 ||
            subscriptionHistory?.message ? (
              <div>
                Your can start your first service from
                <span className="font-bold px-2">Now ({minStartDate})</span>
              </div>
            ) : (
              <div>
                Your next service will start from
                <span className="font-bold px-2">{minStartDate}</span>
                because your previous service is not expired.
              </div>
            )}
          </div>
        )}
        <div class="mx-auto mb-5 lg:mb-8">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Extend your service.
          </h2>
          <p class="font-light text-gray-600 sm:text-lg dark:text-gray-400">
            Here at ETBLINK we will put your company in the first place to
            increase your accessability in all over across the world.
          </p>
        </div>
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read the data</p>}
        {type === "default" && (
          <div class="grid grid-cols-1 md:grid-cols-2 pr-3 lg:grid-cols-3 py-4 bg-gray-200">
            {subscriptions && subscriptions?.data?.length > 0 ? (
              subscriptions?.data?.map((e, i) => {
                return (
                  <div className="relative flex flex-col items-center justify-center w-[350px]">
                    <div
                      className={`h-6 rounded-lg rounded-b-none z-10 w-[240px] ${
                        i === 0
                          ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                          : i === 1
                          ? "to-orange-500 from-yellow-400"
                          : i === 2
                          ? "from-pink-600 to-red-600"
                          : "from-emerald-600 to-pink-600"
                      } bg-gradient-to-tr`}
                    ></div>
                    <div className="flex flex-col z-20 rounded-b-none bg-white relative mt-0 w-[280px] items-start justify-start gap-2 rounded-xl shadow-xl">
                      <div className="flex h-[92px] w-full flex-col items-center justify-center">
                        <p className="text-4xl text-black font-extrabold uppercase">
                          {e?.name}
                        </p>
                        <p className="text-xs text-gray-400 uppercase">
                          price is only for {e?.duration}
                        </p>
                      </div>
                    </div>{" "}
                    <div
                      className={`h-[72px] shadow-2xl flex flex-col items-center justify-center text-white font-extrabold text-xl rounded-lg absolute z-20 top-[116px] w-[300px] ${
                        i === 0
                          ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                          : i === 1
                          ? "to-orange-500 from-yellow-400"
                          : i === 2
                          ? "from-pink-600 to-red-600"
                          : "from-emerald-600 to-pink-600"
                      } bg-gradient-to-tr`}
                    >
                      <p>
                        {e?.amount} birr
                        <span className="ml-2 text-center align-middle text-sm">
                          for Local companies
                        </span>
                      </p>
                      <p>
                        $ {e?.amount}
                        <span className="ml-2 text-center align-middle text-sm">
                          for Global companies
                        </span>
                      </p>
                    </div>
                    <div className=" rounded-xl mt-12 flex flex-col items-center justify-center px-4 bg-blue pb-4 pt-8 w-[280px] bg-white">
                      {e?.features?.map((f) => {
                        return (
                          <div className="flex w-full mt-3 items-center justify-between">
                            <div className="flex items-center justify-start gap-3">
                              <div
                                className={`w-3 h-3 ${
                                  i === 0
                                    ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                                    : i === 1
                                    ? "to-orange-500 from-yellow-400"
                                    : i === 2
                                    ? "from-pink-600 to-red-600"
                                    : "from-emerald-600 to-pink-600"
                                }  bg-gradient-to-tr rounded-full`}
                              ></div>
                              <p className="text-gray-600">{f}</p>
                            </div>
                            <div>
                              <DoneRounded
                                fontSize="small"
                                className="text-emerald-500"
                              />
                            </div>
                          </div>
                        );
                      })}

                      <button
                        disabled={
                          currentCompany?.data[0]?.profileFill < 90
                            ? true
                            : false
                        }
                        onClick={() => {
                          setSubscriptionInfo(e);
                          setPaymentTypePopup(true);
                        }}
                        className={`rounded-full mt-5 cursor-pointer ${
                          i === 0 && currentCompany?.data[0]?.profileFill >= 90
                            ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                            : i === 1 &&
                              currentCompany?.data[0]?.profileFill >= 90
                            ? "to-orange-500 from-yellow-400"
                            : i === 2 &&
                              currentCompany?.data[0]?.profileFill >= 90
                            ? "from-pink-400 to-red-600"
                            : "from-red-400 to-pink-600"
                        } hover:text-gray-300 absolutes bottom-3 left-16 w-36 bg-gradient-to-tr text-white text-lg font-bold flex items-center justify-center uppercase py-2`}
                      >
                        SUBSCRIBE
                      </button>
                    </div>
                    <div
                      className={`h-6 rounded-lg rounded-t-none z-10 w-[240px] ${
                        i === 0
                          ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                          : i === 1
                          ? "to-orange-500 from-yellow-400"
                          : i === 2
                          ? "from-pink-600 to-red-600"
                          : "from-emerald-600 to-pink-600"
                      } bg-gradient-to-tr`}
                    ></div>
                  </div>
                );
              })
            ) : (subscriptions && subscriptions?.message) ||
              subscriptions?.data?.length === 0 ? (
              <div className="w-full items-center justify-center flex">
                There is no subscription history!
              </div>
            ) : null}
          </div>
        )}
        <div className="w-full">
          {type === "custom" && (
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              id="default-search"
              class="block w-full max-w-md px-4 h-12 my-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
          )}
          {isFetching && <Loading />}
          {isError && <p>Something went wrong unable to read boost data</p>}
          {type === "custom" && companies && companies?.data?.length > 0 ? (
            <div className="z-10">
              <Tables
                data={companies?.data}
                columns={columns}
                title="companies"
              />
              <div className="py-10">
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
          ) : (companies && companies?.message) ||
            companies?.data?.length === 0 ? (
            <div>There is no data to display.</div>
          ) : null}
        </div>
        <p className="font-light py-2 mt-10 text-lg">
          Your Previous renewal history.
        </p>
        {historyFetching && <Loading />}
        <div class="relative overflow-x-auto mt-2 overflow-y-auto">
          <table class="w-full border relative border-gray-300  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 border-b uppercase bg-red-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  No
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Logo
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Name
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Phone
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Type
                </th>{" "}
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Method
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Started Date
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  End Date
                </th>
                <th scope="col" class="px-3 border-l border-gray-300 py-4">
                  Approved
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptionHistory && subscriptionHistory?.data?.length > 0 ? (
                subscriptionHistory?.data?.map((e, i) => {
                  return (
                    <tr
                      class={`${
                        i % 2 === 1
                          ? "bg-gray-100 dark:bg-gray-700 dark:border-gray-700"
                          : "bg-gray-200 dark:bg-gray-600 dark:border-gray-700"
                      } ${
                        i === subscriptionHistory?.data?.length - 1
                          ? "border-b-0"
                          : "border-b"
                      } `}
                    >
                      <td
                        scope="row"
                        class="px-3 border-l border-gray-300 py-1 w-3  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        class="px-2 py-1 w-14 border-l border-gray-300  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={e?.company?.logo}
                          alt=""
                          className="w-11 h-11 rounded-full border object-fill object-center"
                        />
                      </td>
                      <td class="px-3 border-l border-gray-300 w-52  py-1">
                        {e?.company?.name}
                      </td>
                      <td class="px-3 border-l border-gray-300 w-32  py-1">
                        {e?.company?.phone}
                      </td>
                      <td class="px-3 border-l border-gray-300 w-28 py-1">
                        {e?.subscription?.name}
                      </td>
                      <td class="px-3 border-l border-gray-300 w-28 py-1">
                        {e?.payFrom}
                      </td>
                      <td class="px-3 border-l border-gray-300 py-1">
                        {formatDate(e?.startDate, "history")}
                      </td>
                      <td class="px-3 border-l border-gray-300 py-1">
                        {formatDate(e?.endDate, "history")}
                      </td>
                      <td class="px-3 border-l border-gray-300 w-28 py-1">
                        {e?.approved ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })
              ) : (subscriptionHistory && subscriptionHistory?.message) ||
                subscriptionHistory?.data?.length === 0 ? (
                <div className="py-2">
                  Be the first one to boost your Company.
                </div>
              ) : null}
            </tbody>
          </table>
          <div className="py-3">
            <ResponsivePagination
              total={totalPageTwo}
              current={pageTwo}
              onPageChange={(currentPage) => setPageTwo(currentPage)}
              previousLabel="Previous"
              previousClassName="w-24"
              nextClassName="w-24"
              nextLabel="Next"
            />
          </div>
        </div>
      </div>

      {paymentTypePopup && subscriptionInfo && (
        <div className="fixed z-20 top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative rounded-lg p-5 z-40 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] h-[450px] overflow-auto xl:overflow-hidden bg-white bg-dark">
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setPayFrom("");
                setPlanName("custom");
                setPlanAmount("");
                setPlanDuration({ type: "month", value: "" });
                setPaymentTypePopup(false);
              }}
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            {type === "custom" && (
              <div className="w-full">
                <p className="text-lg mt-4 font-bold">
                  Enter payment information.{" "}
                  <span className="text-sm font-normal text-red-500">
                    (all fields are required)
                  </span>
                </p>
                <div className="flex gap-2 mt-2 flex-col">
                  <div className="flex flex-col items-start gap-2 w-full justify-between">
                    <div className="w-full flex gap-5 justify-start items-center">
                      <div className="flex w-full flex-col gap-1">
                        <p className="text-sm">Type</p>
                        <select
                          onChange={(e) => setPlanName(e.target.value)}
                          name=""
                          id=""
                          className="h-10 border border-gray-300 text-sm rounded-sm"
                          placeholder="amount"
                        >
                          <option selected value="custom">
                            Custom
                          </option>
                          <option value="free">Free</option>
                        </select>
                      </div>

                      <div
                        className={`flex ${
                          planName === "free" ? "bg-red-300" : ""
                        } w-full flex-col gap-1`}
                      >
                        <p className="text-sm">Amount</p>
                        <input
                          disabled={planName === "free" ? true : false}
                          type="number"
                          value={planAmount}
                          onChange={(e) =>
                            setPlanAmount(
                              planName === "free" ? 0 : e.target.value
                            )
                          }
                          name=""
                          id=""
                          min={1}
                          className="h-10 border border-gray-300 text-sm rounded-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-5 justify-between w-full ">
                      <div className="flex w-full flex-col gap-1">
                        <p className="text-sm">Duration Type</p>
                        <select
                          onChange={(e) =>
                            setPlanDuration({
                              ...planDuration,
                              type: e.target.value,
                            })
                          }
                          name=""
                          id=""
                          className="h-10 border border-gray-300 rounded-sm"
                          placeholder="month"
                        >
                          <option selected value="month">
                            Month
                          </option>
                          <option value="year">Year</option>
                        </select>
                      </div>
                      <div className="flex flex-col w-full gap-1">
                        <p className="text-sm">Duration</p>
                        <input
                          type="number"
                          onChange={(e) =>
                            setPlanDuration({
                              ...planDuration,
                              value: e.target.value,
                            })
                          }
                          name=""
                          min={1}
                          id=""
                          className="h-10 border border-gray-300 rounded-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {planName !== "free" && (
              <div className="w-full">
                <p className="text-lg mt-4 font-bold">
                  Select your payment type.
                </p>
                <p className="my-3">
                  Select your payment method. You can deposit into your ETBLINK
                  account online, via bank transfer, or by check. Choose the
                  option that is most convenient for you.
                </p>
                <p className="my-3">
                  የመክፈያ ዘዴዎን ይምረጡ። በኦለይን፣ በባንክ ማስተላለፍ ወይም በቼክ ወደ ኢቲቢ ሊነክ ማስገባት
                  ይችላሉ። ለእርስዎ በጣም ምቹ የሆነውን አማራጭ ይምረጡ.
                </p>

                <p className="my-3">
                  If you pay online or directly from your deposit, your boost
                  service will start automatically. Otherwise, your service will
                  start within 24 hours.
                </p>
                <div className="w-full py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center justify-between">
                  <div className="rounded-lg hover:bg-blue-600 bg-[#00aeff] text-white cursor-default p-2 flex items-center gap-4 border">
                    <input
                      onChange={(e) =>
                        e.target.checked ? setPayFrom("online") : ""
                      }
                      type="radio"
                      name="paymentType"
                      id=""
                    />
                    <p className="">Online</p>
                  </div>
                  <div
                    className={`rounded-lg hover:bg-yellow-500 relative cursor-default bg-yellow-400 text-white p-2 flex items-center gap-4 border ${
                      currentCompany?.data[0]?.currentBalance <
                        subscriptionInfo?.amount && "bg-red-100"
                    }`}
                  >
                    <input
                      disabled={
                        currentCompany?.data[0]?.currentBalance <
                        subscriptionInfo?.amount
                          ? true
                          : false
                      }
                      // onChange={(e) =>
                      //   setPayFrom(e.target.value === "on" ? "deposit" : "")
                      // }
                      onChange={(e) =>
                        e.target.checked ? setPayFrom("deposit") : ""
                      }
                      type="radio"
                      name="paymentType"
                      id=""
                    />
                    <p className="">Deposit</p>
                    {currentCompany?.data[0]?.currentBalance <
                      subscriptionInfo?.amount && (
                      <svg
                        class="w-6 h-6 absolute top-2 left-1 text-main"
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
                          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="rounded-lg hover:bg-emerald-600 bg-emerald-500 text-white cursor-default p-2 flex items-center gap-4 border">
                    <input
                      onChange={(e) =>
                        e.target.checked ? setPayFrom("bank") : ""
                      }
                      type="radio"
                      name="paymentType"
                      id=""
                    />
                    <p className="">Bank</p>
                  </div>
                  <div className="rounded-lg hover:bg-red-500 bg-main text-white cursor-default p-2 flex items-center gap-4 border">
                    <input
                      onChange={(e) =>
                        e.target.checked ? setPayFrom("check") : ""
                      }
                      type="radio"
                      name="paymentType"
                      id=""
                    />
                    <p className="">Check</p>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex items-center mt-3 gap-5 justify-end">
              <button
                onClick={() => {
                  setPayFrom("");
                  setPlanName("custom");
                  setPlanAmount("");
                  setPlanDuration({ type: "month", value: "" });
                  setPaymentTypePopup(false);
                }}
                className="px-5 hover:bg-gray-300 py-3 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (type === "default") {
                    paymentTypeHandler();
                  } else if (type === "custom") {
                    if (
                      planName === "custom" &&
                      payFrom &&
                      planAmount &&
                      planDuration.type &&
                      planDuration.value
                    ) {
                      paymentTypeHandler();
                    } else if (
                      planName === "free" &&
                      planDuration.type &&
                      planDuration.value
                    ) {
                      paymentTypeHandler();
                    } else {
                      return;
                    }
                  }
                }}
                className={`px-5 py-3 rounded-lg bg-main cursor-pointer text-white`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {onlinePopup && subscriptionInfo && onlineAndDepositComponent()}

      {depositPopup && subscriptionInfo && onlineAndDepositComponent()}

      {bankPopup && subscriptionInfo && (
        <div className="fixed top-0 left-0 items-center z-20 justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative h-[500px] overflow-y-scroll rounded-lg p-5 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] bg-white bg-dark">
            {bankValidationError && (
              <p className="fixed top-10 lg:top-2 mt-28 right-20 lg:right-80 text-sm p-2 rounded-lg border border-red bg-red-200 text-red-500 font-bold">
                All fields are required. Please Fill out the form correctly.
              </p>
            )}
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setBankValidationError(false);
                setBankPopup(false);
              }}
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <div
              class="flex items-center p-4 mt-6 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Note! </span> Please first pay your
                service payment from bank. then come back again and fill the
                following form based on your bank payment information.
              </div>
            </div>
            <p className="text-lg mt-3 font-bold">Boosting Plan Information</p>
            <div className="flex relative mt-3 mb-5 flex-col gap-3">
              <p className="">Select start date</p>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                min={minStartDate}
                type="date"
                name=""
                id=""
                className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
              />
              <div className="w-full mt-3 gap-5 flex items-center justify-center">
                <div className="w-full items-center justify-center">
                  <p className="">Plan Name</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.name}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="">Amount</p>
                  <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.amount} birr
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center">
                <div className="w-44 items-center justify-center">
                  <p className="mt-3">Duration</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.duration}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="mt-3">End Date</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {endDate}
                    <span className=" mx-2">
                      (
                      {endDate != "- - -"
                        ? formatDate(endDate)?.split(" ").splice(0, 4).join(" ")
                        : null}
                      )
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center"></div>
            </div>
            <p className="text-lg mt-3 font-bold">Bank Payment information.</p>
            <div className="mb-5 mt-3">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bank Name
              </label>
              <input
                onChange={(e) => setBankName(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bank Name"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Account Number
              </label>
              <input
                onChange={(e) => setAccountNumber(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Account Number"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Full Name
              </label>
              <input
                onChange={(e) => setYourName(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your full name"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                onChange={(e) => setBankAmount(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setBankDate(e.target.value)}
                type="date"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tran Ref(Transfer reference)
              </label>
              <input
                onChange={(e) => setTranRef(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="FT24543f32232"
              />
            </div>
            <div className="w-full flex items-center gap-5 justify-end">
              <button
                onClick={() => {
                  setBankPopup(false);
                }}
                className="px-5 hover:bg-gray-300 py-3 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              {bankName.length < 1 ||
              yourName.length < 1 ||
              accountNumber.length < 1 ||
              bankAmount.length < 1 ||
              bankDate.length < 1 ||
              tranRef.length < 1 ||
              startDate.length < 1 ? (
                <button
                  onClick={() => {
                    if (
                      bankName.length < 1 ||
                      yourName.length < 1 ||
                      accountNumber.length < 1 ||
                      bankAmount.length < 1 ||
                      bankDate.length < 1 ||
                      tranRef.length < 1 ||
                      startDate.length < 1
                    ) {
                      setBankValidationError(true);
                    } else {
                      setBankValidationError(false);
                    }
                  }}
                  className={`w-52 py-3 rounded-lg bg-red-400 cursor-default text-white`}
                >
                  Submit
                </button>
              ) : (
                <LoadingButton
                  pending={subscriptionPending}
                  onClick={payFromBankHandler}
                  title={
                    <p className="flex gap-2 items-center justify-center rounded-lg w-full  text-white bg-main">
                      <svg
                        class="w-6 h-6 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Submit
                    </p>
                  }
                  color="bg-main"
                  width="w-52 sm:py-3"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {checkPopup && subscriptionInfo && (
        <div className="fixed top-0 left-0 z-20 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative h-[500px] overflow-y-scroll rounded-lg p-5 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] bg-white bg-dark">
            {checkValidationError && (
              <p className="fixed top-10 lg:top-2 mt-28 right-20 lg:right-80 text-sm p-2 rounded-lg border border-red bg-red-200 text-red-500 font-bold">
                All fields are required. Please Fill out the form correctly.
              </p>
            )}
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setCheckValidationError(false);
                setCheckPopup(false);
              }}
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <div
              class="flex items-center p-4 mt-6 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Note! </span> Please first write a
                check and give it to etblink. then come back again and fill the
                following form based on your bank payment information.
              </div>
            </div>
            <p className="text-lg mt-3 font-bold">Boosting Plan Information</p>
            <div className="flex relative mt-3 mb-5 flex-col gap-3">
              <p className="">Select start date</p>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                min={minStartDate}
                type="date"
                name=""
                id=""
                className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
              />
              <div className="w-full mt-3 gap-5 flex items-center justify-center">
                <div className="w-full items-center justify-center">
                  <p className="">Plan Name</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.name}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="">Amount</p>
                  <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.amount} birr
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center">
                <div className="w-44 items-center justify-center">
                  <p className="mt-3">Duration</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.duration}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="mt-3">End Date</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {endDate}
                    <span className=" mx-2">
                      (
                      {endDate != "- - -"
                        ? formatDate(endDate)?.split(" ").splice(0, 4).join(" ")
                        : null}
                      )
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center"></div>
            </div>
            <p className="text-lg mt-3 font-bold">Check Payment information.</p>
            <div className="mb-5 mt-3">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bank Name
              </label>
              <input
                onChange={(e) => setCheckBankName(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bank Name"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Check Number
              </label>
              <input
                onChange={(e) => setCheckNumber(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Check Number"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Full Name
              </label>
              <input
                onChange={(e) => setCheckYourName(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your full name"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                onChange={(e) => setCheckAmount(e.target.value)}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setCheckDate(e.target.value)}
                type="date"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full flex items-center gap-5 justify-end">
              <button
                onClick={() => {
                  setCheckPopup(false);
                }}
                className="px-5 hover:bg-gray-300 py-3 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              {checkBankName.length < 1 ||
              checkYourName.length < 1 ||
              checkNumber.length < 1 ||
              checkAmount.length < 1 ||
              checkDate.length < 1 ||
              startDate.length < 1 ? (
                <button
                  onClick={() => {
                    if (
                      checkBankName.length < 1 ||
                      checkYourName.length < 1 ||
                      checkNumber.length < 1 ||
                      checkAmount.length < 1 ||
                      checkDate.length < 1 ||
                      startDate.length < 1
                    ) {
                      setCheckValidationError(true);
                    } else {
                      setCheckValidationError(false);
                    }
                  }}
                  className={`w-52 py-3 rounded-lg bg-red-400 cursor-default text-white`}
                >
                  Submit
                </button>
              ) : (
                <LoadingButton
                  pending={subscriptionPending}
                  onClick={payFromCheckHandler}
                  title={
                    <p className="flex gap-2 items-center justify-center rounded-lg w-full  text-white bg-main">
                      <svg
                        class="w-6 h-6 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Submit
                    </p>
                  }
                  color="bg-main"
                  width="w-52 sm:py-3"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {freePopup && subscriptionInfo && (
        <div className="fixed top-0 left-0 z-20 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative h-[500px] overflow-y-scroll rounded-lg p-5 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] bg-white bg-dark">
            {freeValidationError && (
              <p className="fixed top-10 lg:top-2 mt-28 right-20 lg:right-80 text-sm p-2 rounded-lg border border-red bg-red-200 text-red-500 font-bold">
                Start Date is required. Please choose.
              </p>
            )}
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setFreeValidationError(false);
                setFreePopup(false);
              }}
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <div
              class="flex items-center p-4 mt-6 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Note! </span> Please first write a
                check and give it to etblink. then come back again and fill the
                following form based on your bank payment information.
              </div>
            </div>
            <p className="text-lg mt-3 font-bold">
              Subscription Plan Information
            </p>
            <div className="flex relative mt-3 mb-5 flex-col gap-3">
              <p className="">Select start date</p>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                min={minStartDate}
                type="date"
                name=""
                id=""
                className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
              />
              <div className="w-full mt-3 gap-5 flex items-center justify-center">
                <div className="w-full items-center justify-center">
                  <p className="">Plan Name</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.name}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="">Amount</p>
                  <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                    0 birr
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center">
                <div className="w-44 items-center justify-center">
                  <p className="mt-3">Duration</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {subscriptionInfo?.duration}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="mt-3">End Date</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {endDate}
                    <span className=" mx-2">
                      (
                      {endDate != "- - -"
                        ? formatDate(endDate)?.split(" ").splice(0, 4).join(" ")
                        : null}
                      )
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center"></div>
            </div>

            <div className="w-full flex items-center gap-5 justify-end">
              <button
                onClick={() => {
                  setFreePopup(false);
                }}
                className="px-5 hover:bg-gray-300 py-3 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              {startDate.length < 1 ? (
                <button
                  onClick={() => {
                    if (startDate.length < 1) {
                      setFreeValidationError(true);
                    } else {
                      setFreeValidationError(false);
                    }
                  }}
                  className={`w-52 py-3 rounded-lg bg-red-400 cursor-default text-white`}
                >
                  Submit
                </button>
              ) : (
                <LoadingButton
                  pending={subscriptionPending}
                  onClick={payFromCheckHandler}
                  title={
                    <p className="flex gap-2 items-center justify-center rounded-lg w-full  text-white bg-main">
                      <svg
                        class="w-6 h-6 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Submit
                    </p>
                  }
                  color="bg-main"
                  width="w-52 sm:py-3"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Subscription;
