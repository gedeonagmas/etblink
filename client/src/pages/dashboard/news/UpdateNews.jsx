import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Loading from "../../../components/loading/Loading";

const NewsDetailAdmin = () => {
  const location = useLocation()?.search?.split("?")[1];
  const {
    data: news,
    isFetching,
    isError,
  } = useReadQuery({ url: `/user/news/${location}`, tag: ["news"] });

  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateHandler = () => {
    const formData = new FormData();
    formData.append("newsPhoto", photo);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url", `/user/news?id=${location}`);
    formData.append("tag", ["news"]);
    updateData(formData);
  };

  useEffect(() => {
    if (news?.data) {
      const data = news?.data[0];
      setPhoto(data?.newsPhoto ? data?.newsPhoto : photo);
      setTitle(data?.title ? data?.title : title);
      setDescription(data?.description ? data?.description : description);
    }
  }, [news]);

  console.log(news, "news");
  return (
    <div className="w-full h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading news data</p>}
      <div className="  w-full  rounded-lg p-4 border border-gray-300">
        <div className="relative w-64">
          <img
            src={news?.data[0]?.newsPhoto}
            alt=""
            className="h-40 w-64 rounded-sm"
          />
          <div className=" absolute  text-white p-2 rounded-full w-10 h-10 bg-emerald-500 top-[126px] right-2">
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
        <div className="mb-5 mt-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name=""
            id=""
            cols="30"
            rows="8"
            placeholder="Description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
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
            href={`/dashboard/admin/news`}
            className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailAdmin;
