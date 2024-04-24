import React, { useEffect, useState } from "react";
import {
  useCreateBoostMutation,
  useLazyReadQuery,
  useReadQuery,
} from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import { Datepicker } from "flowbite-react";
import Pay from "../../Pay";

const Boosting = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [depositData, depositResponse] = useCreateBoostMutation();
  const [depositPending, setDepositPending] = useState(false);
  const [boostPopup, setBoostPopup] = useState(true);
  const [boostInfo, setBoostInfo] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("- - -");
  const [duration, setDuration] = useState({ type: "", value: 0 });
  const [minStartDate, setMinStartDate] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pay, setPay] = useState(false);

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
    if (startDate?.length > 1 && paymentMethod?.length > 1) {
      setPay(true);
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      setPay(false);
    }
  }, [startDate, paymentMethod]);

  useEffect(() => {
    if (currentCompany?.data[0]?.currentBalance < boostInfo?.amount) {
      setPaymentMethod("new-payment");
    } else {
      setPaymentMethod("");
    }
  }, [currentCompany, boostInfo]);

  const depositHandler = () => {
    boostInfo &&
      depositData({
        startDate,
        endDate: endDate?.split("/")?.join("-"),
        boost: boostInfo?._id,
        company: currentCompany?.data[0]?._id,
        name: currentCompany?.data[0]?.name,
        email: user?.email,
        amount: boostInfo?.amount,
        paymentMethod,
        type: "boost",
      });
  };

  useEffect(() => {
    if (depositResponse?.status === "fulfilled") {
      setStartDate("");
      setEndDate("- - -");
      setBoostPopup(false);
    }
  }, [depositResponse]);

  console.log(boostedCompany, "boosted");
  return (
    <section class="bg-white dark:bg-gray-900 relative">
      <Response response={depositResponse} setPending={setDepositPending} />

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
                      setDuration({
                        type: e?.duration?.split(" ")[1],
                        value: e?.duration?.split(" ")[0] * 1,
                      });
                      setBoostPopup(true);
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
      {boostPopup && boostInfo && (
        <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[500px] h-auto bg-white bg-dark">
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setBoostPopup(false);
                setEndDate("- - -");
                setStartDate("");
                setPay(false);
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
              {errorMessage && (
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
                    {paymentMethod?.length < 1 && (
                      <p className="text-sm">
                        - Please choose a payment method.
                      </p>
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
              {/* <Datepicker
                onChange={(e) => setStartDate(e.target.value)}
                minDate={new Date(2023, 0, 1)}
                maxDate={new Date(2024, 2, 30)}
                labelTodayButton="Today"
                labelClearButton="Cancel"
              /> */}
              <input
                onChange={(e) => setStartDate(e.target.value)}
                min={minStartDate}
                type="date"
                name=""
                id=""
                // data-date-format="DD MMMM YYYY"
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
              <div className="w-full gap-5 flex items-center justify-center">
                <div className="w-full items-center justify-center">
                  <p className="mt-5 pt-5 border-t">
                    Payment method{" "}
                    <span className="text-xs font-light">
                      {" "}
                      (
                      {currentCompany?.data[0]?.currentBalance <
                      boostInfo?.amount
                        ? "You don't have enough balance for direct payment"
                        : null}
                      )
                    </span>
                  </p>
                  <div className="w-full mt-2 flex gap-4 items-center justify-center">
                    <p
                      className={`py-2 ${
                        currentCompany?.data[0]?.currentBalance <
                        boostInfo?.amount
                          ? "bg-red-200"
                          : null
                      }  flex items-center gap-3 px-3 rounded-lg border border-gray-300 w-full focus:outline-black`}
                    >
                      <input
                        disabled={
                          currentCompany?.data[0]?.currentBalance <
                          boostInfo?.amount
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value === "on" ? "deposit" : ""
                          )
                        }
                        type="radio"
                        name="boost"
                        id=""
                      />
                      From deposit
                    </p>

                    <p className="py-2 flex items-center gap-3 px-3 rounded-lg border border-gray-300 w-full focus:outline-black">
                      <input
                        checked={
                          currentCompany?.data[0]?.currentBalance <
                            boostInfo?.amount || paymentMethod === "new-payment"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value === "on" ? "new-payment" : ""
                          )
                        }
                        type="radio"
                        name="boost"
                        id=""
                      />
                      New payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {pay && paymentMethod === "new-payment" ? (
              <Pay
                startDate={startDate}
                endDate={endDate?.split("/")?.join("-")}
                boost={boostInfo?._id}
                company={currentCompany?.data[0]?._id}
                name={currentCompany?.data[0]?.name}
                email={user?.email}
                amount={boostInfo?.amount}
                paymentMethod={paymentMethod}
                title="Pay and Boost"
                type="boost"
              />
            ) : pay && paymentMethod === "deposit" ? (
              <LoadingButton
                pending={depositPending}
                onClick={depositHandler}
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
              // <button
              //   onClick={depositHandler}
              //   className="flex  cursor-default gap-2 items-center justify-center h-10 mt-2 rounded-lg w-full  text-white bg-main hover:bg-red-500"
              //   type="submit"
              // >
              //   <svg
              //     class="w-6 h-6 "
              //     aria-hidden="true"
              //     xmlns="http://www.w3.org/2000/svg"
              //     width="24"
              //     height="24"
              //     fill="currentColor"
              //     viewBox="0 0 24 24"
              //   >
              //     <path
              //       fill-rule="evenodd"
              //       d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
              //       clip-rule="evenodd"
              //     />
              //   </svg>
              //   Pay and Boost
              // </button>
              <button
                onClick={() => {
                  if (startDate?.length > 1 && paymentMethod?.length > 1) {
                    setPay(true);
                  } else {
                    setErrorMessage(true);
                  }
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

            {/* <LoadingButton
              pending={boostPending}
              onClick={boostHandler}
              title="Pay and Boost"
              color="bg-main"
              width="w-full sm:rounded-lg sm:border sm:py-3 mt-5 sm:px-5 sm:hover:bg-red-500"
            /> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Boosting;
