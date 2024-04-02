import React, { useState } from "react";
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
import YouTube from "react-youtube";

const AddYoutube = () => {
  const {
    data: youtubes,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/youtubes", tag: ["youtubes"] });

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const addHandler = () => {
    addData({
      videoId,
      title,
      subtitle,
      url: "/user/youtubes",
      tag: ["youtubes"],
    });
  };

  const deleteHandler = (id) => {
    deleteData({ url: `/user/youtubes?id=${id}`, tag: ["youtubes"] });
  };

  const opts = {
    width: "97%",
    height: "180px",
    borderRadius: "2rem",
    playerVars: { autoplay: 1 },
  };

  const videoReady = (event) => {
    event.target.pauseVideo();
  };

  console.log(youtubes, "youtubes");
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
        {isError && <p>Something went wrong for reading video data</p>}
        {youtubes && youtubes?.data?.length > 0 ? (
          youtubes?.data?.map((e) => {
            return (
              <div
                key={e._id}
                className="flex w-full border px-4 border-dark rounded-lg relative justify-start py-4 gap-1 flex-col items-enter"
              >
                <YouTube videoId={e.videoId} opts={opts} onReady={videoReady} />
                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Title</p>
                  <p className="font-bold flex items-center justify-start gap-2 text-sm">
                    {e.title}
                  </p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">Subtitle</p>
                  <p className="">{e.subtitle}</p>
                </div>
                <p className="text-sm self-end font-light">{format(e?.date)}</p>
                <div className="flex w-full items-center justify-between">
                  <LoadingButton
                    pending={deletePending}
                    onClick={() => deleteHandler(e._id)}
                    title="Delete"
                    color="bg-main"
                    width="w-32"
                  />
                  <a
                    href={`/dashboard/admin/youtube/detail?${e._id}`}
                    className="py-2 w-36 rounded-lg bg-emerald-500 text-center text-white"
                  >
                    Detail
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div>There is no data to display.</div>
        )}
      </div>
      {add && (
        <div className="absolute  z-30 top-2 bg-white bg-dark right-0 w-[300px] rounded-lg p-4 border border-gray-300">
          <div className="relative">
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
              Video ID
            </label>
            <input
              onChange={(e) => setVideoId(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Video id"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subtitle
            </label>
            <input
              onChange={(e) => setSubtitle(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Subtitle"
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

export default AddYoutube;
