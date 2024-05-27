import React, { useEffect, useState } from "react";
import LoadingButton from "../../../components/loading/LoadingButton";
import {
  useCreateMutation,
  useDeleteMutation,
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import { format } from "timeago.js";
import Loading from "../../../components/loading/Loading";
import Pop from "../../../components/Pop";
import List from "../../../components/List";

const AddPrices = () => {
  const {
    data: subscriptions,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/subscriptions", tag: ["subscriptions"] });

  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [For, setFor] = useState("month");
  const [duration, setDuration] = useState("");

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);

  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const addServices = () => {
    if (service.length > 0 && !services.includes(service)) {
      setServices([...services, service]);
      setService("");
    }
  };

  const addHandler = () => {
    addData({
      name: type,
      description,
      amount,
      features: services,
      duration: `${duration} ${For}`,
      url: "/user/subscriptions",
      tag: ["subscriptions"],
    });
  };

  const deleteHandler = () => {
    id &&
      deleteData({
        url: `/user/subscriptions?id=${id}`,
        tag: ["subscriptions"],
      });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  console.log(subscriptions, "subscriptions");
  return (
    <div className="flex min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={addResponse} setPending={setPending} />
      <Response response={deleteResponse} setPending={setDeletePending} />

      <button
        onClick={() => setAdd(true)}
        className="px-5 self-end rounded-lg py-2 text-white bg-main"
      >
        Add New
      </button>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read boost data</p>}
        {subscriptions && subscriptions?.data?.length > 0 ? (
          subscriptions?.data?.map((e) => {
            return (
              <div
                key={e._id}
                className="flex w-full border px-4 border-dark rounded-lg relative justify-start py-4 gap-1 flex-col items-enter"
              >
                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Name</p>
                  <p className="font-light">{e.name}</p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1  border-b font-bold">Amount</p>
                  <p className="font-light">{e.amount}</p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">Duration</p>
                  <p className="font-light">{e.duration}</p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">Services</p>
                  {e?.features?.map((s) => {
                    return <p className="font-light">- {s}</p>;
                  })}
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">Created At</p>
                  <p className="text-sm font-light">{format(e?.createdAt)}</p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">UpdatedAt</p>
                  <p className="text-sm font-light">{format(e?.updatedAt)}</p>
                </div>
                <div className="flex w-full mt-3 items-center justify-between">
                  <button
                    onClick={() => {
                      setPopup(true);
                      setId(e._id);
                    }}
                    className="px-2 w-20 py-2 bg-main text-white rounded-lg"
                  >
                    Delete
                  </button>
                  <a
                    href={`/dashboard/admin/prices/detail?${e._id}`}
                    className="py-2 w-20 px-2 rounded-lg bg-emerald-500 text-center text-white"
                  >
                    Edit
                  </a>
                </div>
              </div>
            );
          })
        ) : (subscriptions && subscriptions?.message) ||
          subscriptions?.data?.length === 0 ? (
          <div>There is no data to display.</div>
        ) : null}
      </div>
      {popup && (
        <Pop
          content="Are you sure you want to remove this price?"
          cancel={setPopup}
          trigger={
            <LoadingButton
              pending={deletePending}
              onClick={deleteHandler}
              title="Yes, I'm Sure"
              color="bg-main"
              width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
            />
          }
        />
      )}
      {add && (
        <div className="absolute shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
          <div className="relative cursor-pointer">
            <svg
              class="w-6 absolute top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              onClick={() => setAdd(false)}
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
          </div>
          <div className="mb-5 w-full">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              onChange={(e) => setType(e.target.value)}
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
                // value={website}
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
              <select onChange={(e) => setFor(e.target.value)} name="" id="">
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
              // value={description}
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
          <LoadingButton
            pending={pending}
            onClick={addHandler}
            title="Add"
            color="bg-main"
            width="w-52"
          />
        </div>
      )}
    </div>
  );
};

export default AddPrices;
