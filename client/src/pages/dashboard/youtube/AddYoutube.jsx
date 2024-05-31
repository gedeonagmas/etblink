import React, { useEffect, useState } from "react";
import LoadingButton from "../../../components/loading/LoadingButton";
import {
  useCreateMutation,
  useDeleteMutation,
  useLazyReadQuery,
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import { format } from "timeago.js";
import Loading from "../../../components/loading/Loading";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import Pop from "../../../components/Pop";

const AddYoutube = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: youtubes, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(youtubes?.total / 6));
  }, [youtubes]);

  useEffect(() => {
    trigger({
      url: `/user/youtubes?limit=6&page=${page}`,
      tag: ["youtubes"],
    });
  }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/youtubes?limit=6&page=${page}&searchField=title&searchValue=${search}`,
      tag: ["youtubes"],
    });
  }, [search]);

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);

  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");

  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const addHandler = () => {
    addData({
      videoId,
      title,
      subtitle,
      category,
      url: "/user/youtubes",
      tag: ["youtubes"],
    });
  };

  const deleteHandler = () => {
    id && deleteData({ url: `/user/youtubes?id=${id}`, tag: ["youtubes"] });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  console.log(youtubes, "youtubes");
  return (
    <div className="flex min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={addResponse} setPending={setPending} />
      <Response response={deleteResponse} setPending={setDeletePending} />

      <div className="flex px-5 items-center justify-between">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />

        <button
          onClick={() => setAdd(true)}
          className="px-5 self-end rounded-lg py-2 text-white bg-main"
        >
          Add New
        </button>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong for reading video data</p>}
        {youtubes && youtubes?.data?.length > 0 ? (
          youtubes?.data?.map((e) => {
            return (
              <div
                key={e?._id}
                className="flex w-full border px-4 border-dark rounded-lg relative justify-start py-4 gap-1 flex-col items-enter"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${e}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Title</p>
                  <p className="flex items-center justify-start gap-1">
                    {e?.title}
                  </p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">Subtitle</p>
                  <p className="">{e?.subtitle}</p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1 border-b font-bold">Category</p>
                  <p className="">{e?.category}</p>
                </div>
                <p className="text-sm self-end font-light">{format(e?.date)}</p>
                <div className="flex w-full gap-3 items-center justify-between">
                  <button
                    onClick={() => {
                      setPopup(true);
                      setId(e?._id);
                    }}
                    className="py-2 w-32 rounded-lg bg-main text-white"
                  >
                    Delete
                  </button>
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
      <div className="py-10">
        <ResponsivePagination
          total={totalPage}
          current={page}
          onPageChange={(currentPage) => setPage(currentPage)}
          previousLabel="Previous"
          previousClassName="w-24"
          nextClassName="w-24"
          nextLabel="Next"
        />
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
        <div className="absolute  z-30 top-2 bg-white bg-dark right-0 w-[300px] rounded-lg p-4 border border-gray-300">
          <div className="relative">
            <svg
              class="w-6 absolute cursor-pointer top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
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

          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              name=""
              id=""
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="business" selected>
                Business
              </option>
              <option value="life-experience" selected>
                Life Experience
              </option>
              <option value="interview" selected>
                Interview
              </option>
              <option value="how-it-made" selected>
                How it made
              </option>
            </select>
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
