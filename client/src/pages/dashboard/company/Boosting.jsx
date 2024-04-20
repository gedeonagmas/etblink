import React from "react";
import { useReadQuery } from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";

const Boosting = () => {
  const {
    data: boosts,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/boosts", tag: ["boosts"] });

  console.log(boosts, "boosts");
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
