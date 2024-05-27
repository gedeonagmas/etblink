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

const Subscription = () => {
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

  const {
    data: subscriptionHistory,
    isFetching: historyFetching,
    isError: historyError,
  } = useReadQuery({
    url: `/user/subscriptionhistories?company=${user?.user?._id}&populatingType=subscriptionhistories&populatingValue=company,subscription`,
    tag: ["subscriptionhistories"],
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
    if (
      subscriptionHistory?.data?.length === 0 ||
      subscriptionHistory?.message
    ) {
      setMinStartDate(new Date()?.toISOString()?.split("T")[0]);
    } else if (subscriptionHistory?.data?.length > 0) {
      let minDate = subscriptionHistory?.data[0]?.endDate;
      subscriptionHistory?.data?.map((e) => {
        if (minDate > e?.endDate) {
          minDate = e?.endDate;
        } else {
          return true;
        }
      });
      minDate &&
        setMinStartDate(new Date(minDate)?.toISOString()?.split("T")[0]);
    }
  }, [subscriptionHistory]);

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
        company={currentCompany?.data[0]?._id}
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
      company: currentCompany?.data[0]?._id,
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
      company: currentCompany?.data[0]?._id,
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
      company: currentCompany?.data[0]?._id,
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

  // console.log(boostedCompany, "boosted");
  console.log(startDate.length > 0, "boosted");

  return (
    <section class="bg-white dark:bg-gray-900 relative">
      <Response
        response={subscriptionResponse}
        setPending={setSubscriptionPending}
      />

      <div class="py-2 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
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
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {subscriptions && subscriptions?.data?.length > 0 ? (
            subscriptions?.data?.map((e) => {
              return (
                <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                  <h3 class="mb-4 text-2xl font-semibold">{e?.type}</h3>
                  <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    {e?.description}
                  </p>
                  <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-5xl font-extrabold">
                      {e?.amount}
                    </span>
                    <span class="text-gray-500 dark:text-gray-400">
                      / for {e?.For} {e?.duration}
                    </span>
                  </div>
                  <ul role="list" class="mb-8 space-y-4 text-left">
                    {e?.features?.map((f) => {
                      return (
                        <li class="flex items-center space-x-3">
                          <svg
                            class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span>{f}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={() => {
                      setSubscriptionInfo(e);
                      setPaymentTypePopup(true);
                    }}
                    className={`text-white w-full rounded-lg py-2 px-2 bg-main hover:bg-red-500 `}
                  >
                    Get Started
                  </button>
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

        <p className="font-light py-2 mt-10 text-lg">
          Your Previous renewal history.
        </p>
        <div class="relative overflow-x-auto mt-2 overflow-y-auto h-[300px]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-3">
                  No
                </th>
                <th scope="col" class="px-3 py-3">
                  Subscription type
                </th>
                <th scope="col" class="px-3 py-3">
                  Amount
                </th>
                <th scope="col" class="px-3 py-3">
                  Duration
                </th>
                <th scope="col" class="px-3 py-3">
                  Started Date
                </th>
                <th scope="col" class="px-3 py-3">
                  End Date
                </th>
                <th scope="col" class="px-3 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptionHistory && subscriptionHistory?.data?.length > 0 ? (
                subscriptionHistory?.data?.map((e, i) => {
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td
                        scope="row"
                        class="px-3 py-4 w-3  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {i + 1}
                      </td>
                      <td class="px-3 w-52  py-4">{e?.subscription?.type}</td>
                      <td class="px-3 w-52  py-4">{e?.subscription?.amount}</td>
                      <td class="px-3 w-28 py-4">
                        {e?.subscription?.For + " " + e?.subscription?.duration}
                      </td>
                      <td class="px-3 py-4">
                        {formatDate(e?.startDate, "history")}
                      </td>
                      <td class="px-3 py-4">
                        {formatDate(e?.endDate, "history")}
                      </td>
                      <td class="px-3 w-52  py-4">
                        {e?.company?.subscriptionStatus}
                      </td>
                    </tr>
                  );
                })
              ) : (subscriptionHistory && subscriptionHistory?.message) ||
                subscriptionHistory?.data?.length === 0 ? (
                <div>There is no renewal history.</div>
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

      {onlinePopup && subscriptionInfo && onlineAndDepositComponent()}
      {depositPopup && subscriptionInfo && onlineAndDepositComponent()}

      {bankPopup && subscriptionInfo && (
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
    </section>
  );
};

export default Subscription;

// import React, { useEffect, useState } from "react";
// import {
//   useCreateBoostMutation,
//   useLazyReadQuery,
//   useReadQuery,
// } from "../../../features/api/apiSlice";
// import Loading from "../../../components/loading/Loading";
// import Response from "../../../components/Response";
// import LoadingButton from "../../../components/loading/LoadingButton";
// import Pay from "../../Pay";

// const Subscription = () => {
//   const user = JSON.parse(localStorage.getItem("etblink_user"));
//   const [depositData, depositResponse] = useCreateBoostMutation();
//   const [depositPending, setDepositPending] = useState(false);
//   const [subscriptionPopup, setSubscriptionPopup] = useState(true);
//   const [subscriptionInfo, setSubscriptionInfo] = useState();
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("- - -");
//   const [duration, setDuration] = useState({ type: "", value: 0 });
//   const [minStartDate, setMinStartDate] = useState(0);
//   const [errorMessage, setErrorMessage] = useState(false);
//   const [pay, setPay] = useState(false);
//   const [showError, setShowError] = useState(false);

//   const {
//     data: subscriptions,
//     isFetching,
//     isError,
//   } = useReadQuery({ url: "/user/subscriptions", tag: ["subscriptions"] });

//   const {
//     data: currentCompany,
//     isFetching: userIsFetching,
//     isError: userIsError,
//   } = useReadQuery({
//     url: `/user/companies?_id=${user?.user?._id}`,
//     tag: ["companies"],
//   });

//   const {
//     data: subscriptionHistory,
//     isFetching: historyFetching,
//     isError: historyError,
//   } = useReadQuery({
//     url: `/user/subscriptionhistories?company=${user?.user?._id}&populatingType=subscriptionhistories&populatingValue=company,subscription`,
//     tag: ["subscriptionhistories"],
//   });

//   const formatDate = (e, type) => {
//     if (type === "history") {
//       return new Date(e).toISOString()?.split("T")[0];
//     } else {
//       return new Date(e).toString().split("GMT")[0];
//     }
//   };

//   useEffect(() => {
//     if (startDate) {
//       const a = startDate.split("-");
//       console.log(a, duration, "start data");
//       setEndDate(
//         duration?.type === "month"
//           ? `${a[0] * 1}/${a[1] * 1 + duration?.value}/${a[2] * 1}`
//           : duration?.type === "year"
//           ? `${a[0] * 1 + duration?.value}/${a[1] * 1}/${a[2] * 1}`
//           : null
//       );
//     } else {
//       setEndDate("- - -");
//     }
//   }, [startDate]);

//   console.log(endDate, "end date");
//   useEffect(() => {
//     if (startDate?.length > 1 && paymentMethod?.length > 1) {
//       setPay(true);
//       setErrorMessage(false);
//     } else {
//       setErrorMessage(true);
//       setPay(false);
//     }
//   }, [startDate, paymentMethod]);

//   useEffect(() => {
//     if (currentCompany?.data[0]?.currentBalance < subscriptionInfo?.amount) {
//       setPaymentMethod("new-payment");
//     } else {
//       setPaymentMethod("");
//     }
//   }, [currentCompany, subscriptionInfo]);

//   useEffect(() => {
//     if (
//       subscriptionHistory?.data?.length === 0 ||
//       subscriptionHistory?.message
//     ) {
//       setMinStartDate(new Date()?.toISOString()?.split("T")[0]);
//     } else if (subscriptionHistory?.data?.length > 0) {
//       let minDate = subscriptionHistory?.data[0]?.endDate;
//       subscriptionHistory?.data?.map((e) => {
//         if (minDate > e?.endDate) {
//           minDate = e?.endDate;
//         } else {
//           return true;
//         }
//       });
//       minDate &&
//         setMinStartDate(new Date(minDate)?.toISOString()?.split("T")[0]);
//     }
//   }, [subscriptionHistory]);

//   const depositHandler = () => {
//     subscriptionInfo &&
//       depositData({
//         startDate,
//         endDate: endDate?.split("/")?.join("-"),
//         boost: subscriptionInfo?._id,
//         company: currentCompany?.data[0]?._id,
//         name: currentCompany?.data[0]?.name,
//         email: user?.email,
//         amount: subscriptionInfo?.amount,
//         paymentMethod,
//         serviceType: "serviceFee",
//       });
//   };

//   useEffect(() => {
//     if (depositResponse?.status === "fulfilled") {
//       setStartDate("");
//       setEndDate("- - -");
//       setSubscriptionPopup(false);
//     }
//   }, [depositResponse]);

//   console.log(subscriptionHistory, "boosted");
//   return (
//     <section class="bg-white dark:bg-gray-900 relative">
//       <Response response={depositResponse} setPending={setDepositPending} />

//       <div class="py-2 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
// <div
//   class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
//   role="alert"
// >
//   <svg
//     class="flex-shrink-0 inline w-4 h-4 me-3"
//     aria-hidden="true"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//   >
//     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//   </svg>
//   <span class="sr-only">Note</span>
//   {subscriptionHistory?.data?.length === 0 ||
//   subscriptionHistory?.message ? (
//     <div>
//       Your can start your first service from
//       <span className="font-bold px-2">Now ({minStartDate})</span>
//     </div>
//   ) : (
//     <div>
//       Your next service will start from
//       <span className="font-bold px-2">{minStartDate}</span>
//       because your previous service is not expired.
//     </div>
//   )}
// </div>
//         {isFetching && <Loading />}
//         {isError && <p>Something went wrong unable to read the data</p>}
//         <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
//           <div class="mx-auto mb-5 lg:mb-8">
//             <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
//               Boost your company.
//             </h2>
//             <p class="font-light text-gray-600 sm:text-lg dark:text-gray-400">
//               Here at ETBLINK we will put your company in the first place to
//               increase your accessability in all over across the world.
//             </p>
//           </div>
//   <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
//     {subscriptions && subscriptions?.data?.length > 0 ? (
//       subscriptions?.data?.map((e) => {
//         return (
//           <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//             <h3 class="mb-4 text-2xl font-semibold">{e?.type}</h3>
//             <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
//               {e?.description}
//             </p>
//             <div class="flex justify-center items-baseline my-8">
//               <span class="mr-2 text-5xl font-extrabold">
//                 {e?.amount}
//               </span>
//               <span class="text-gray-500 dark:text-gray-400">
//                 / for {e?.For} {e?.duration}
//               </span>
//             </div>
//             <ul role="list" class="mb-8 space-y-4 text-left">
//               {e?.features?.map((f) => {
//                 return (
//                   <li class="flex items-center space-x-3">
//                     <svg
//                       class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clip-rule="evenodd"
//                       ></path>
//                     </svg>
//                     <span>{f}</span>
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               onClick={() => {
//                 setSubscriptionInfo(e);
//                 setDuration({
//                   type: e?.For,
//                   value: e?.duration * 1,
//                 });
//                 setSubscriptionPopup(true);
//               }}
//               className={`text-white w-full rounded-lg py-2 px-2 bg-main hover:bg-red-500 `}
//             >
//               Get Started
//             </button>
//           </div>
//         );
//       })
//     ) : (subscriptions && subscriptions?.message) ||
//       subscriptions?.data?.length === 0 ? (
//       <div className="w-full items-center justify-center flex">
//         There is no subscription history!
//       </div>
//     ) : null}
//   </div>
//         </div>
//         <p className="font-light py-2 mt-10 text-lg">
//           Your previous renewal history.
//         </p>
// <div class="relative overflow-x-auto mt-2 overflow-y-auto h-[300px]">
//   <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//     <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//       <tr>
//         <th scope="col" class="px-3 py-3">
//           No
//         </th>
//         <th scope="col" class="px-3 py-3">
//           Subscription type
//         </th>
//         <th scope="col" class="px-3 py-3">
//           Amount
//         </th>
//         <th scope="col" class="px-3 py-3">
//           Duration
//         </th>
//         <th scope="col" class="px-3 py-3">
//           Started Date
//         </th>
//         <th scope="col" class="px-3 py-3">
//           End Date
//         </th>
//         <th scope="col" class="px-3 py-3">
//           Status
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {subscriptionHistory && subscriptionHistory?.data?.length > 0 ? (
//         subscriptionHistory?.data?.map((e, i) => {
//           return (
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//               <td
//                 scope="row"
//                 class="px-3 py-4 w-3  font-medium text-gray-900 whitespace-nowrap dark:text-white"
//               >
//                 {i + 1}
//               </td>
//               <td class="px-3 w-52  py-4">{e?.subscription?.type}</td>
//               <td class="px-3 w-52  py-4">{e?.subscription?.amount}</td>
//               <td class="px-3 w-28 py-4">
//                 {e?.subscription?.For + " " + e?.subscription?.duration}
//               </td>
//               <td class="px-3 py-4">
//                 {formatDate(e?.startDate, "history")}
//               </td>
//               <td class="px-3 py-4">
//                 {formatDate(e?.endDate, "history")}
//               </td>
//               <td class="px-3 w-52  py-4">
//                 {e?.company?.subscriptionStatus}
//               </td>
//             </tr>
//           );
//         })
//       ) : (subscriptionHistory && subscriptionHistory?.message) ||
//         subscriptionHistory?.data?.length === 0 ? (
//         <div>There is no renewal history.</div>
//       ) : null}
//     </tbody>
//   </table>
// </div>
//       </div>
//       {subscriptionPopup && subscriptionInfo && (
//         <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
//           <div className="relative rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[500px] h-auto bg-white bg-dark">
//             <svg
//               class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
//               aria-hidden="true"
//               onClick={() => {
//                 setSubscriptionPopup(false);
//                 setShowError(false);
//                 setEndDate("- - -");
//                 setStartDate("");
//                 setPay(false);
//                 setPaymentMethod("");
//               }}
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M6 18 17.94 6M18 18 6.06 6"
//               />
//             </svg>

//             <div className="flex relative mb-5 flex-col gap-3">
//               {errorMessage && showError && (
//                 <div
//                   id="alert-2"
//                   class="flex absolute top-0 left-20 items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                   role="alert"
//                 >
//                   <svg
//                     class="flex-shrink-0 w-4 h-4"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                   </svg>
//                   <span class="sr-only">Info</span>
//                   <div class="ms-3 text-sm font-medium">
//                     {startDate?.length < 1 && (
//                       <p className="text-sm">- Please select a start date.</p>
//                     )}
//                     {paymentMethod?.length < 1 && (
//                       <p className="text-sm">
//                         - Please choose a payment method.
//                       </p>
//                     )}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => setErrorMessage(false)}
//                     class="ms-auto -mx-1.5 ml-2 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
//                     data-dismiss-target="#alert-2"
//                     aria-label="Close"
//                   >
//                     <span class="sr-only">Close</span>
//                     <svg
//                       class="w-3 h-3"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 14 14"
//                     >
//                       <path
//                         stroke="currentColor"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               )}
//               <p className="">Select start date</p>
//               <input
//                 onChange={(e) => setStartDate(e.target.value)}
//                 min={minStartDate}
//                 type="date"
//                 name=""
//                 id=""
//                 className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
//               />
//               <div className="w-full mt-3 gap-5 flex items-center justify-center">
//                 <div className="w-full items-center justify-center">
//                   <p className="">Plan Name</p>
//                   <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
//                     {subscriptionInfo?.type}
//                   </p>
//                 </div>
//                 <div className="w-full items-center justify-center">
//                   <p className="">Amount</p>
//                   <p className="py-2 mt-2 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
//                     {subscriptionInfo?.amount} birr
//                   </p>
//                 </div>
//               </div>
//               <div className="w-full gap-5 flex items-center justify-center">
//                 <div className="w-44 items-center justify-center">
//                   <p className="mt-3">Duration</p>
//                   <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
//                     {subscriptionInfo?.For + " " + subscriptionInfo?.duration}
//                   </p>
//                 </div>
//                 <div className="w-full items-center justify-center">
//                   <p className="mt-3">End Date</p>
//                   <p className="py-2 px-3 mt-2 rounded-lg border border-gray-300 w-full focus:outline-black">
//                     {endDate}
//                     <span className=" mx-2">
//                       (
//                       {endDate != "- - -"
//                         ? formatDate(endDate)?.split(" ").splice(0, 4).join(" ")
//                         : null}
//                       )
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div className="w-full gap-5 flex items-center justify-center">
//                 <div className="w-full items-center justify-center">
//                   <p className="mt-5 pt-5 border-t">
//                     Payment method{" "}
//                     <span className="text-xs font-light">
//                       {" "}
//                       (
//                       {currentCompany?.data[0]?.currentBalance <
//                       subscriptionInfo?.amount
//                         ? "You don't have enough balance for direct payment"
//                         : null}
//                       )
//                     </span>
//                   </p>
//                   <div className="w-full mt-2 flex gap-4 items-center justify-center">
//                     <p
//                       className={`py-2 ${
//                         currentCompany?.data[0]?.currentBalance <
//                         subscriptionInfo?.amount
//                           ? "bg-red-200"
//                           : null
//                       }  flex items-center gap-3 px-3 rounded-lg border border-gray-300 w-full focus:outline-black`}
//                     >
//                       <input
//                         disabled={
//                           currentCompany?.data[0]?.currentBalance <
//                           subscriptionInfo?.amount
//                             ? true
//                             : false
//                         }
//                         onChange={(e) =>
//                           setPaymentMethod(
//                             e.target.value === "on" ? "deposit" : ""
//                           )
//                         }
//                         type="radio"
//                         name="boost"
//                         id=""
//                       />
//                       From deposit
//                     </p>

//                     <p className="py-2 flex items-center gap-3 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
//                       <input
//                         checked={
//                           currentCompany?.data[0]?.currentBalance <
//                             subscriptionInfo?.amount ||
//                           paymentMethod === "new-payment"
//                             ? true
//                             : false
//                         }
//                         onChange={(e) =>
//                           setPaymentMethod(
//                             e.target.value === "on" ? "new-payment" : ""
//                           )
//                         }
//                         type="radio"
//                         name="boost"
//                         id=""
//                       />
//                       New payment
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {pay && paymentMethod === "new-payment" ? (
//               <Pay
//                 startDate={startDate}
//                 endDate={endDate?.split("/")?.join("-")}
//                 boost={subscriptionInfo?._id}
//                 company={currentCompany?.data[0]?._id}
//                 name={currentCompany?.data[0]?.name}
//                 email={user?.email}
//                 amount={subscriptionInfo?.amount}
//                 paymentMethod={paymentMethod}
//                 title="Pay and Subscribe"
//                 type="subscription"
//               />
//             ) : pay && paymentMethod === "deposit" ? (
//               <LoadingButton
//                 pending={depositPending}
//                 onClick={depositHandler}
//                 title={
//                   <p className="flex gap-2 items-center justify-center rounded-lg w-full  text-white bg-main">
//                     <svg
//                       class="w-6 h-6 "
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
//                         clip-rule="evenodd"
//                       />
//                     </svg>
//                     Pay and Subscribe
//                   </p>
//                 }
//                 color="bg-main"
//                 width="w-full sm:py-2"
//               />
//             ) : (
//               <button
//                 onClick={() => {
//                   setShowError(true);
//                   if (startDate?.length > 1 && paymentMethod?.length > 1) {
//                     setPay(true);
//                   } else {
//                     setErrorMessage(true);
//                   }
//                 }}
//                 className="flex  cursor-default gap-2 items-center justify-center h-10 mt-2 rounded-lg w-full  text-white bg-red-400"
//                 type="submit"
//               >
//                 <svg
//                   class="w-6 h-6 "
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 Pay and Subscribe
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Subscription;
