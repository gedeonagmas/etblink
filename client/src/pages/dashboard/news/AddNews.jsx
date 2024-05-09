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

const AddNews = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: news, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(news?.total / 6));
  }, [news]);

  useEffect(() => {
    trigger({
      url: `/user/news?limit=6&page=${page}`,
      tag: ["news"],
    });
  }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/news?limit=6&page=${page}&searchField=title&searchValue=${search}`,
      tag: ["news"],
    });
  }, [search]);

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("local");
  const [description, setDescription] = useState("");

  const addHandler = () => {
    const formData = new FormData();
    formData.append("newsPhoto", photo);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("url", `/user/news`);
    formData.append("tag", ["news"]);
    addData(formData);
  };

  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  const deleteHandler = () => {
    id && deleteData({ url: `/user/news?id=${id}`, tag: ["news"] });
  };

  console.log(news, "news");
  return (
    <div className="flex pb-5 min-h-[85vh]  relative bg-dark bg-white flex-col h-auto w-full gap-5">
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
        {isError && <p>Something went wrong for reading news data</p>}
        {news && news?.data?.length > 0 ? (
          news?.data?.map((e) => {
            return (
              <div
                key={e._id}
                className="flex flex-col gap-2 rounded-lg p-4 border border-gray-300 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={e?.newsPhoto}
                    alt=""
                    className="h-40 w-full rounded-sm"
                  />
                  <div className=" absolute  text-white top-[126px] right-2">
                    <div
                      class="block relative mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      for="file_input"
                    >
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>{" "}
                      <input
                        onChange={(e) => setPhoto(e.target.files[0])}
                        class="block z-20 opacity-0 absolute top-0 left-0 w-6 h-6 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                      />
                    </div>
                  </div>
                </div>

                <p className="font-bold">{e?.title}</p>
                <p className="text-sm">{e?.description}</p>
                <p className="text-sm self-end font-light">{format(e?.date)}</p>
                <div className="flex w-full gap-3 items-center justify-between">
                  <button
                    onClick={() => {
                      setPopup(true);
                      setId(e._id);
                    }}
                    className="py-2 w-32 rounded-lg bg-main text-white"
                  >
                    Delete
                  </button>
                  <a
                    href={`/dashboard/admin/news/detail?${e._id}`}
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
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              onChange={(e) => setPhoto(e.target.files[0])}
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company name
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Skylight Technologies"
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
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Skylight Technologies"
              required
            >
              <option selected value="local">
                Local
              </option>
              <option value="global">Global</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="3"
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
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

export default AddNews;
