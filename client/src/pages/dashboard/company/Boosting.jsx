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

const Boosting = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [boostData, boostResponse] = useCreateBoostMutation();
  const [boostPending, setBoostPending] = useState(false);
  const [boostPopup, setBoostPopup] = useState(false);

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
      url: `/user/companies?isBoosted=true&isSubscribed=true&boostStartDate[lt]=${Date.now()}&subscriptionEndDate[gt]=${Date.now()}`,
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

  const formatDate = (e) => {
    return new Date(e).toString().split("GMT")[0];
  };

  const boostHandler = (boostId) => {
    boostData({
      company: currentCompany?._id,
      boostId,
      boostStartDate: startDate,
      boostEndDate: endDate,
    });
  };

  console.log(boostedCompany, "boosts");
  return (
    <section class="bg-white dark:bg-gray-900 relative">
      <Response response={boostResponse} setPending={setBoostPending} />
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
                href="/dashboard/company/billing"
                className="mx-2 font-bold hover:text-blue-500 underline text-blue-600"
              >
                Pay now
              </a>
              then come back to boost.
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
          {boostedCompany?.data?.length <= 6 ? (
            <div>
              Your can start your boosting from
              <span className="font-bold px-2">Now</span>
            </div>
          ) : (
            <div>
              Your boosting will start from
              <span className="font-bold px-2">{formatDate(Date.now())}</span>
              because for the movement our space are filled by other companies.
            </div>
          )}
        </div>

        <p className="font-light py-2 text-lg">
          Companies in our boosted list.
        </p>
        <div class="relative overflow-x-auto overflow-y-auto h-[300px]">
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
                        {formatDate(e?.company?.boostStartDate)}
                      </td>
                      <td class="px-3 py-4">
                        {formatDate(e?.company?.boostEndDate)}
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
                  <LoadingButton
                    pending={boostPending}
                    onClick={() => {
                      boostHandler(e?._id);
                      setBoostPopup(true);
                    }}
                    title="Get Started"
                    color="bg-main"
                    width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
                  />
                  {/* <a
                    href="#"
                    class="text-white w-32 py-2 px-2 rounded-lg hover:bg-red-500 bg-main "
                  >
                    Get started
                  </a> */}
                </div>
              );
            })
          ) : (boosts && boosts?.message) || boosts?.data?.length === 0 ? (
            <div className="w-full items-center justify-center flex">
              There is no boost history!
            </div>
          ) : null}
        </div>
      </div>
      <div className="fixed top-0 left-0 items-center justify-center flex flex-col w-full h-[100vh] bg-black/50">
        <div className="relative rounded-lg p-5 z-30 items-center lg:ml-56 lg:mt-20 justify-center w-[350px] lg:w-[500px] h-[400px] bg-red-400">
          {/* <div className="flex items-start justify-start w-full h-full"> */}
          <svg
            class="w-6 h-6 text-gray-800 hover:text-gray-700 dark:text-white"
            aria-hidden="true"
            onClick={() => setBoostPopup(false)}
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

          <Datepicker
            minDate={new Date(2023, 0, 1)}
            maxDate={new Date(2024, 2, 30)}
            labelTodayButton="Today"
            labelClearButton="Cancel"
          />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Boosting;
