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

const AddBoost = () => {
  const {
    data: boosts,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/boosts", tag: ["boosts"] });

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const addHandler = () => {
    addData({
      name,
      amount,
      duration,
      url: "/user/boosts",
      tag: ["boosts"],
    });
  };

  const deleteHandler = () => {
    id && deleteData({ url: `/user/boosts?id=${id}`, tag: ["boosts"] });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  console.log(boosts, "boosts");
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
        {boosts && boosts?.data?.length > 0 ? (
          boosts?.data?.map((e) => {
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
                  <p className="py-1 border-b font-bold">Date</p>
                  <p className="text-sm font-light">{format(e?.createdAt)}</p>
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
                    href={`/dashboard/admin/boost/detail?${e._id}`}
                    className="py-2 w-20 px-2 rounded-lg bg-emerald-500 text-center text-white"
                  >
                    Edit
                  </a>
                </div>
              </div>
            );
          })
        ) : (boosts && boosts?.message) || boosts?.data?.length === 0 ? (
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
        <div className="absolute shadow-xl z-30 top-2 bg-white bg-dark right-0 w-[300px] rounded-lg p-4 border border-gray-300">
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
          <div className="mb-5 mt-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
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
              type="number"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price"
              required
              min={1}
            />
          </div>

          <div className="mb-5 mt-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Duration
            </label>
            <input
              onChange={(e) => setDuration(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="2 Month"
              required
            />
          </div>

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

export default AddBoost;
