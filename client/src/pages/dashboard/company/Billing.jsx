import React, { useEffect, useState } from "react";
import {
  useCreateBoostMutation,
  useReadQuery,
} from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";
import Pay from "../../Pay";
import { format } from "timeago.js";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";

const Billing = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [fundData, fundResponse] = useCreateBoostMutation();
  const [fundPending, setFundPending] = useState(false);

  const [payFrom, setPayFrom] = useState("");
  const [amount, setAmount] = useState(0);
  const [fundPopup, setFundPopup] = useState(false);
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
    data: currentCompany,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useReadQuery({
    url: `/user/companies?_id=${user?.user?._id}`,
    tag: ["companies"],
  });

  const {
    data: paymentHistory,
    isFetching: historyFetching,
    isError: historyError,
  } = useReadQuery({
    url: `/user/payments?company=${user?.user?._id}&populatingType=payments&populatingValue=company`,
    tag: ["payments"],
  });

  useEffect(() => {
    if (amount?.toString()[0] === "0") {
      setAmount("");
    }
  }, [amount]);

  useEffect(() => {
    if (fundResponse?.status === "fulfilled") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [fundResponse]);

  const paymentTypeHandler = () => {
    switch (payFrom) {
      case "online":
        setOnlinePopup(true);
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
        company={currentCompany?.data[0]?._id}
        name={currentCompany?.data[0]?.name}
        email={user?.email}
        amount={amount}
        payFrom={payFrom}
        title="Pay and Fund"
        serviceType="fund"
      />
    );
  };

  const payFromBankHandler = () => {
    fundData({
      company: currentCompany?.data[0]?._id,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: bankAmount * 1,
      payFrom,
      serviceType: "fund",
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
    fundData({
      company: currentCompany?.data[0]?._id,
      name: currentCompany?.data[0]?.name,
      email: user?.email,
      amount: checkAmount * 1,
      payFrom,
      serviceType: "fund",
      checkDetail: {
        checkBankName,
        checkNumber,
        checkYourName,
        checkAmount,
        checkDate,
      },
    });
  };

  const onlineComponent = () => {
    return (
      <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
        <div className="relative rounded-lg px-5 pt-20 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[600px] h-[450px] bg-white bg-dark">
          <svg
            class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
            aria-hidden="true"
            onClick={() => {
              payFrom === "online" && setOnlinePopup(false);
              setShowError(false);
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

          <p className="text-lg font-bold mb-3">Online payment</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            asperiores nulla nobis. Possimus earum provident, obcaecati id quos
            iure porro sunt ad officia saepe esse commodi nesciunt, vitae,
            deleniti expedita.
          </p>
          <div className="flex mt-5 relative mb-5 flex-col gap-3">
            {showError && (
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
                  {amount * 1 < 1 && (
                    <p className="text-sm">- Amount must be greater than 0.</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowError(false);
                  }}
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
            <p className="">Enter Amount(Birr)</p>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              min={1}
              type="number"
              placeholder="Amount in birr"
              className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
            />
          </div>
          {payFrom === "online" && amount * 1 > 0 ? (
            payFromOnlineHandler()
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
              Pay and Fund
            </button>
          )}
        </div>
      </div>
    );
  };

  console.log(amount, "amount");

  return (
    <div className="w-full  h-auto flex flex-col items-start justify-start">
      <Response response={fundResponse} setPending={setFundPending} />

      <div className="flex gap-10 items-center mt-2">
        <div className="px-5 py-2 gap-y-3 flex flex-col rounded-lg border">
          <p className="text-lg">Current Balance</p>
          <p className="text-xl font-bold">
            {currentCompany?.data[0]?.currentBalance} birr
          </p>
        </div>

        <div className="px-5 py-2 gap-3 flex flex-col rounded-lg border">
          <p className="text-lg">New Fund</p>
          <button
            onClick={() => {
              setPaymentTypePopup(true);
            }}
            className="px-5 py-1 rounded-lg bg-main text-white"
          >
            Add Fund
          </button>
        </div>
      </div>
      <p className="font-light py-2 mt-10 text-lg">
        Your previous fund history.
      </p>
      <div class="relative w-full overflow-x-auto mt-2 overflow-y-auto h-[300px]">
        <table class="w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-3 py-3">
                No
              </th>
              <th scope="col" class="px-3 py-3">
                Amount
              </th>
              <th scope="col" class="px-3 py-3">
                Date
              </th>
              <th scope="col" class="px-3 py-3">
                Payment Method
              </th>
              <th scope="col" class="px-3 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory && paymentHistory?.data?.length > 0 ? (
              paymentHistory?.data?.map((e, i) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      class="px-3 py-4 w-3  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </td>
                    <td class="px-3 w-52  py-4">{e?.amount}</td>
                    <td class="px-3 w-52  py-4">{format(e?.createdAt)}</td>
                    <td class="px-3 w-28 py-4">{e?.paymentMethod}</td>
                    <td class="px-3 py-4">{e.status}</td>
                  </tr>
                );
              })
            ) : (paymentHistory && paymentHistory?.message) ||
              paymentHistory?.data?.length === 0 ? (
              <div>There is no fund history.</div>
            ) : null}
          </tbody>
        </table>
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

      {onlinePopup && onlineComponent()}

      {bankPopup && (
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
              tranRef.length < 1 ? (
                <button
                  onClick={() => {
                    if (
                      bankName.length < 1 ||
                      yourName.length < 1 ||
                      accountNumber.length < 1 ||
                      bankAmount.length < 1 ||
                      bankDate.length < 1 ||
                      tranRef.length < 1
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
                  pending={fundPending}
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

      {checkPopup && (
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
              checkDate.length < 1 ? (
                <button
                  onClick={() => {
                    if (
                      checkBankName.length < 1 ||
                      checkYourName.length < 1 ||
                      checkNumber.length < 1 ||
                      checkAmount.length < 1 ||
                      checkDate.length < 1
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
                  pending={fundPending}
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
    </div>
  );
};

export default Billing;
