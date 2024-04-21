import React from "react";
import { useReadQuery } from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";

const Boosting = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

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

  const {
    data: boostedCompany,
    isFetching: boostedCompanyFetching,
    isError: boostedCompanyError,
  } = useReadQuery({ url: `/user/companies?isBoosted=true`, tag: ["boosts"] });

  const {
    data: boostHistory,
    isFetching: historyFetching,
    isError: historyError,
  } = useReadQuery({
    url: `/user/boosthistories?populatingType=boosthistories&populatingValue=company,boost`,
    tag: ["boosthistories"],
  });

  console.log(boostHistory, "boosts");
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        {!currentCompany?.data[0]?.isSubscribed && (
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
        )}
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
          <div>
            Your boosting will start from{" "}
            <span className="font-bold">Jan, 12 2024</span> because for the
            moment all specs are filled by other customers.
          </div>
        </div>

        <div class="relative overflow-x-auto overflow-y-auto h-[300px]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Logo
                </th>
                <th scope="col" class="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Started Date
                </th>
                <th scope="col" class="px-6 py-3">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">$2999</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">White</td>
                <td class="px-6 py-4">Laptop PC</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">$1999</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">$99</td>
              </tr>
            </tbody>
          </table>
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
                  <a
                    href="#"
                    class="text-white w-32 py-2 px-2 rounded-lg hover:bg-red-500 bg-main "
                  >
                    Get started
                  </a>
                </div>
              );
            })
          ) : (boosts && boosts?.message) || boosts?.data?.length === 0 ? (
            <div className="w-full items-center justify-center flex">
              There is no saved companies yet!
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Boosting;
