import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Loading from "../../../components/loading/Loading";

const UpdateBoost = () => {
  const location = useLocation()?.search?.split("?")[1];
  const {
    data: boosts,
    isFetching,
    isError,
  } = useReadQuery({ url: `/user/boosts/${location}`, tag: ["boosts"] });

  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  const updateHandler = () => {
    updateData({
      name,
      amount,
      duration,
      url: `/user/boosts?id=${location}`,
      tag: ["boosts"],
    });
  };

  useEffect(() => {
    if (boosts?.data) {
      const data = boosts?.data[0];
      setName(data?.name ? data?.name : name);
      setAmount(data?.amount ? data?.amount : amount);
      setDuration(data?.duration ? data?.duration : duration);
    }
  }, [boosts]);

  console.log(boosts, "news");
  return (
    <div className="w-full min-h-[85vh] h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading news data</p>}
      {boosts && boosts?.data ? (
        <div className="  w-full  rounded-lg p-4 border border-gray-300">
          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price"
              required
            />
          </div>

          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Duration
            </label>
            <input
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Duration"
              required
            />
          </div>
          <div className="flex items-center gap-5">
            <LoadingButton
              pending={pending}
              onClick={updateHandler}
              title="Update"
              color="bg-emerald-500"
              width="w-52"
            />
            <a
              href={`/dashboard/admin/boost`}
              className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
            >
              Back
            </a>
          </div>
        </div>
      ) : (boosts && boosts?.message) || boosts?.data?.length === 0 ? (
        <div>There is no data to display.</div>
      ) : null}
    </div>
  );
};

export default UpdateBoost;
