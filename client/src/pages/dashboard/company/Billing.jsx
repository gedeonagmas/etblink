import React, { useState } from "react";
import { useReadQuery } from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";
import Pay from "../../Pay";
import { format } from "timeago.js";

const Billing = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [amount, setAmount] = useState(0);
  const [fundPopup, setFundPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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

  console.log(amount * 1, "amount");
  return (
    <div className="w-full  h-auto flex flex-col items-start justify-start">
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
              setFundPopup(true);
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

      {fundPopup && (
        <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
          <div className="relative rounded-lg p-5 z-30 items-center lg:ml-56 mt-20 justify-center w-[350px] md:w-[500px] h-auto bg-white bg-dark">
            <svg
              class="w-6 h-6 cursor-pointer absolute top-2 right-2 text-gray-800 hover:text-gray-600 dark:text-white"
              aria-hidden="true"
              onClick={() => {
                setFundPopup(false);
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
                    {amount < 1 && (
                      <p className="text-sm">
                        - Amount must be greater than 0.
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
              <p className="">Enter Amount(Birr)</p>
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount * 1}
                min={1}
                type="number"
                className="px-3 py-2 rounded-lg bg-white bg-dark focus:ring-0 focus:outline-none border border-gray-300"
              />
            </div>
            {amount * 1 > 0 && amount ? (
              <Pay
                company={currentCompany?.data[0]?._id}
                name={currentCompany?.data[0]?.name}
                email={user?.email}
                amount={amount}
                paymentMethod="chappa"
                title="Fund"
                type="fund"
              />
            ) : (
              <button
                onClick={() => {
                  if (amount > 1) {
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
                Fund
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
