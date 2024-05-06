import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Loading from "../../../components/loading/Loading";
import List from "../../../components/List";

const UpdatePrices = () => {
  const location = useLocation()?.search?.split("?")[1];
  const {
    data: subscriptions,
    isFetching,
    isError,
  } = useReadQuery({
    url: `/user/subscriptions/${location}`,
    tag: ["subscriptions"],
  });

  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [For, setFor] = useState("");
  const [duration, setDuration] = useState(0);

  const addServices = () => {
    if (service.length > 0 && !services.includes(service)) {
      setServices([...services, service]);
      setService("");
    }
  };

  const updateHandler = () => {
    updateData({
      type,
      description,
      amount,
      features: services,
      For,
      duration,
      url: `/user/subscriptions?id=${location}`,
      tag: ["subscriptions"],
    });
  };

  useEffect(() => {
    if (subscriptions?.data) {
      const data = subscriptions?.data[0];
      setType(data?.type ? data?.type : type);
      setDescription(data?.description ? data?.description : description);
      setAmount(data?.amount ? data?.amount : amount);
      setServices(data?.features ? data?.features : features);
      setFor(data?.For ? data?.For : For);
      setDuration(data?.duration ? data?.duration : duration);
    }
  }, [subscriptions]);

  console.log(subscriptions, "news");
  return (
    <div className="w-full min-h-[85vh] h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading news data</p>}
      {subscriptions && subscriptions?.data ? (
        <div className="  w-full  rounded-lg p-4 border border-gray-300">
          <div className="mb-5 w-full">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <input
              onChange={(e) => setType(e.target.value)}
              value={type}
              type="text"
              id="name"
              class="border bg-white bg-dark border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Basic, Advanced or Premium"
              required
            />
          </div>
          <div className="mb-5 flex justify-between items-center w-full">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Amount
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                type="number"
                id="name"
                class="border bg-white bg-dark border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="5000"
                required
                min={1}
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                For
              </label>
              <select
                onChange={(e) => setFor(e.target.value)}
                value={For}
                name=""
                id=""
              >
                <option selected value="month">
                  Month
                </option>
                <option value="year">Year</option>
              </select>
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Duration
              </label>
              <input
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                type="number"
                id="name"
                class="border bg-white bg-dark border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="5000"
                required
                min={1}
              />
            </div>
          </div>
          <div className="mb-5 w-full">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="Little description about your company"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
          <List
            list={service}
            setList={setService}
            lists={services}
            setLists={setServices}
            addLists={addServices}
            title="Main Features"
          />{" "}
          <div className="flex items-center gap-5">
            <LoadingButton
              pending={pending}
              onClick={updateHandler}
              title="Update"
              color="bg-emerald-500"
              width="w-52"
            />
            <a
              href={`/dashboard/admin/prices`}
              className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
            >
              Back
            </a>
          </div>
        </div>
      ) : (subscriptions && subscriptions?.message) ||
        subscriptions?.data?.length === 0 ? (
        <div>There is no data to display.</div>
      ) : null}
    </div>
  );
};

export default UpdatePrices;
