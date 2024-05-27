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

const Boosting = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [boostingData, boostingResponse] = useCreateBoostMutation();
  const [boostPending, setBoostPending] = useState(false);

  const [boostInfo, setBoostInfo] = useState();
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

  //bank information
  const [bankValidationError, setBankValidationError] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [yourName, setYourName] = useState("");
  const [bankAmount, setBankAmount] = useState("");
  const [bankDate, setBankDate] = useState("");
  const [tranRef, setTranRef] = useState("");

  ////check information
  const [checkValidationError, setCheckValidationError] = useState(false);
  const [checkBankName, setCheckBankName] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkYourName, setCheckYourName] = useState("");
  const [checkAmount, setCheckAmount] = useState("");
  const [checkDate, setCheckDate] = useState("");

  const {
    data: boosts,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/boosts", tag: ["boosts"] });

  const {
    data: currentCompany,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useReadQuery({
    url: `/user/companies?_id=${user?.user?._id}`,
    tag: ["companies"],
  });

  const [
    getBoostedCompany,
    {
      data: boostedCompany,
      isFetching: boostedCompanyFetching,
      isError: boostedCompanyError,
    },
  ] = useLazyReadQuery();

  useEffect(() => {
    getBoostedCompany({
      // url: `/user/boosthistories?isBoosted=true&isSubscribed=true&boostStartDate[lt]=${Date.now()}&subscriptionEndDate[gt]=${Date.now()}`,
      url: `/user/boosthistories?endDate[gt]=${Date.now()}`,
      tag: ["boosts"],
    });
  }, []);

  const {
    data: boostHistory,
    isFetching: historyFetching,
    isError: historyError,
  } = useReadQuery({
    url: `/user/boosthistories?populatingType=boosthistories&populatingValue=company,boost`,
    tag: ["boosthistories"],
  });

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
    if (boostedCompany?.data?.length < 6) {
      setMinStartDate(new Date()?.toISOString()?.split("T")[0]);
    } else {
      let minDate = boostedCompany?.data[0]?.endDate;
      boostedCompany?.data?.map((e) => {
        if (minDate > e?.endDate) {
          minDate = e?.endDate;
        } else {
          return true;
        }
      });
      minDate &&
        setMinStartDate(new Date(minDate)?.toISOString()?.split("T")[0]);
    }
  }, [boostedCompany]);

  useEffect(() => {
    if (startDate?.length > 1) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }, [startDate]);

  useEffect(() => {
    if (boostingResponse?.status === "fulfilled") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [boostingResponse]);

  const paymentTypeHandler = () => {
    boostInfo &&
      setDuration({
        type: boostInfo?.duration?.split(" ")[1],
        value: boostInfo?.duration?.split(" ")[0] * 1,
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
      default:
        break;
    }
  };

  const payFromOnlineHandler = () => {
    return (
      <Pay
        startDate={startDate}
        endDate={endDate?.split("/")?.join("-")}
        boost={boostInfo?._id}
        company={currentCompany?.data[0]?._id}
        name={currentCompany?.data[0]?.name}
        email={user?.email}
        amount={boostInfo?.amount}
        payFrom={payFrom}
        title="Pay and Boost"
        serviceType="boosting"
      />
    );
  };

  const payFromDepositHandler = () => {
    boostingData({
      startDate,
      endDate: endDate?.split("/")?.join("-"),
      boost: boostInfo?._id,
      company: currentCompany?.data[0]?._id,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: boostInfo?.amount,
      payFrom,
      serviceType: "boosting",
    });
  };

  const payFromBankHandler = () => {
    boostingData({
      startDate,
      endDate: endDate?.split("/")?.join("-"),
      boost: boostInfo?._id,
      company: currentCompany?.data[0]?._id,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: boostInfo?.amount,
      payFrom,
      serviceType: "boosting",
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
    boostingData({
      startDate,
      endDate: endDate?.split("/")?.join("-"),
      boost: boostInfo?._id,
      company: currentCompany?.data[0]?._id,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: boostInfo?.amount,
      payFrom,
      serviceType: "boosting",
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
      <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
        <div className="relative rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] h-[450px] bg-white bg-dark">
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
                  {boostInfo?.name}
                </p>
              </div>
              <div className="w-full items-center justify-center">
                <p className="">Amount</p>
                <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                  {boostInfo?.amount} birr
                </p>
              </div>
            </div>
            <div className="w-full gap-5 flex items-center justify-center">
              <div className="w-44 items-center justify-center">
                <p className="mt-3">Duration</p>
                <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                  {boostInfo?.duration}
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
              pending={boostPending}
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
                  Pay and Boost
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
              Pay and Boost
            </button>
          )}
        </div>
      </div>
    );
  };

  // console.log(boostedCompany, "boosted");
  console.log(startDate.length > 0, "boosted");

  return (
    <section class="bg-white dark:bg-gray-900 relative">
      <Response response={boostingResponse} setPending={setBoostPending} />

      <div class="py-2 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
        <div class="mx-auto mb-5 lg:mb-8">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Boost your company.
          </h2>
          <p class="font-light text-gray-600 sm:text-lg dark:text-gray-400">
            Here at ETBLINK we will put your company in the first place to
            increase your accessability in all over across the world.
          </p>
        </div>

        {/* {!currentCompany?.data[0]?.isSubscribed && (
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
            <span class="sr-only">Warning</span>
            <div>
              To boost your company please first pay your service fee and come
              back again!
            </div>
          </div>
        )} */}

        {currentCompany?.data[0]?.subscriptionEndDate < Date.now() ||
        !currentCompany?.data[0]?.isSubscribed ? (
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
              <span class="font-medium">Warning! </span> Please first pay your
              service fee here.
              <a
                href="/dashboard/company/subscription"
                className="mx-2 font-bold hover:text-blue-500 underline text-blue-600"
              >
                Pay now
              </a>
              then come back again to boost.
            </div>
          </div>
        ) : null}

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
          {boostedCompany?.data?.length < 6 ? (
            <div>
              Your can start your boosting from
              <span className="font-bold px-2">Now ({minStartDate})</span>
            </div>
          ) : (
            <div>
              Your boosting will start from
              <span className="font-bold px-2">{minStartDate}</span>
              because for the movement our space are filled by other companies.
            </div>
          )}
        </div>

        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read the data</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 place-items-center lg:grid-cols-3 my-2">
          {boosts && boosts?.data?.length > 0 ? (
            boosts?.data?.map((e) => {
              return (
                <div class="flex mt-5 flex-col p-4 w-full items-center justify-center gap-2 hover:bg-gray-200 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                  <h3 class="text-xl font-semibold">{e?.name}</h3>
                  <div class="flex justify-center items-baseline">
                    <span class="mr-2 text-2xl font-extrabold">
                      {e?.amount} birr
                    </span>
                  </div>
                  <div class="flex justify-center items-baseline">
                    <span class="mr-2 text-xl font-extrabold">
                      {e?.duration}
                    </span>
                  </div>
                  <button
                    disabled={
                      currentCompany?.data[0]?.subscriptionEndDate <
                        Date.now() || !currentCompany?.data[0]?.isSubscribed
                        ? true
                        : false
                    }
                    onClick={() => {
                      setBoostInfo(e);
                      setPaymentTypePopup(true);
                      // setBoostInfo(e);
                      // setDuration({
                      //   type: e?.duration?.split(" ")[1],
                      //   value: e?.duration?.split(" ")[0] * 1,
                      // });
                      // setBoostPopup(true);
                    }}
                    className={`text-white w-32 py-2 px-2 ${
                      !currentCompany?.data[0]?.isSubscribed
                        ? "bg-red-400 "
                        : "bg-main hover:bg-red-500"
                    } rounded-lg `}
                  >
                    Get Started
                  </button>
                </div>
              );
            })
          ) : (boosts && boosts?.message) || boosts?.data?.length === 0 ? (
            <div className="w-full items-center justify-center flex">
              There is no boost history!
            </div>
          ) : null}
        </div>

        <p className="font-light py-2 mt-10 text-lg">
          Companies in our boosted list.
        </p>
        <div class="relative overflow-x-auto mt-2 overflow-y-auto h-[300px]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-3">
                  No
                </th>
                <th scope="col" class="px-3 py-3">
                  Logo
                </th>
                <th scope="col" class="px-3 py-3">
                  Company
                </th>
                <th scope="col" class="px-3 py-3">
                  Boost type
                </th>
                <th scope="col" class="px-3 py-3">
                  Started Date
                </th>
                <th scope="col" class="px-3 py-3">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              {boostHistory && boostHistory?.data?.length > 0 ? (
                boostHistory?.data?.map((e, i) => {
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td
                        scope="row"
                        class="px-3 py-4 w-3  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        class="px-2 py-4 w-14  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={e?.company?.logo}
                          alt=""
                          className="w-11 h-11 rounded-full border object-fill object-center"
                        />
                      </td>
                      <td class="px-3 w-52  py-4">{e?.company?.name}</td>
                      <td class="px-3 w-28 py-4">{e?.boost?.name}</td>
                      <td class="px-3 py-4">
                        {formatDate(e?.startDate, "history")}
                      </td>
                      <td class="px-3 py-4">
                        {formatDate(e?.endDate, "history")}
                      </td>
                    </tr>
                  );
                })
              ) : (boostHistory && boostHistory?.message) ||
                boostHistory?.data?.length === 0 ? (
                <div>Be the first one to boost your Company.</div>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {paymentTypePopup && (
        <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] h-[450px] bg-white bg-dark">
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setPayFrom("");
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
            <p className="text-lg mt-4 font-bold">Select your payment type.</p>
            <div className="w-full py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center justify-between">
              <div className="rounded-lg hover:bg-gray-200 p-4 flex items-center gap-4 border">
                <input
                  onChange={(e) =>
                    e.target.checked ? setPayFrom("online") : ""
                  }
                  type="radio"
                  name="paymentType"
                  id=""
                />
                <p className="text-xl font-bold">Online</p>
              </div>
              <div
                className={`rounded-lg hover:bg-gray-200 p-4 flex items-center gap-4 border ${
                  currentCompany?.data[0]?.currentBalance < boostInfo?.amount &&
                  "bg-red-100"
                }`}
              >
                <input
                  disabled={
                    currentCompany?.data[0]?.currentBalance < boostInfo?.amount
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
                <p className="text-xl font-bold">Deposit</p>
              </div>
              <div className="rounded-lg hover:bg-gray-200 p-4 flex items-center gap-4 border">
                <input
                  onChange={(e) => (e.target.checked ? setPayFrom("bank") : "")}
                  type="radio"
                  name="paymentType"
                  id=""
                />
                <p className="text-xl font-bold">Bank</p>
              </div>
              <div className="rounded-lg hover:bg-gray-200 p-4 flex items-center gap-4 border">
                <input
                  onChange={(e) =>
                    e.target.checked ? setPayFrom("check") : ""
                  }
                  type="radio"
                  name="paymentType"
                  id=""
                />
                <p className="text-xl font-bold">Check</p>
              </div>
            </div>

            <div className="w-full flex items-center gap-5 justify-end">
              <button
                onClick={() => {
                  setPayFrom("");
                  setPaymentTypePopup(false);
                }}
                className="px-5 hover:bg-gray-300 py-3 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={paymentTypeHandler}
                className={`px-5 py-3 rounded-lg ${
                  payFrom?.length > 0 ? "bg-main" : "bg-red-300"
                } text-white`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {onlinePopup && boostInfo && onlineAndDepositComponent()}
      {depositPopup && boostInfo && onlineAndDepositComponent()}

      {bankPopup && boostInfo && (
        <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative h-[500px] overflow-y-scroll rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] bg-white bg-dark">
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
                    {boostInfo?.name}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="">Amount</p>
                  <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {boostInfo?.amount} birr
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center">
                <div className="w-44 items-center justify-center">
                  <p className="mt-3">Duration</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {boostInfo?.duration}
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
                  pending={boostPending}
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

      {checkPopup && boostInfo && (
        <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative h-[500px] overflow-y-scroll rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] bg-white bg-dark">
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
                    {boostInfo?.name}
                  </p>
                </div>
                <div className="w-full items-center justify-center">
                  <p className="">Amount</p>
                  <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {boostInfo?.amount} birr
                  </p>
                </div>
              </div>
              <div className="w-full gap-5 flex items-center justify-center">
                <div className="w-44 items-center justify-center">
                  <p className="mt-3">Duration</p>
                  <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
                    {boostInfo?.duration}
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
                  pending={boostPending}
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

export default Boosting;
