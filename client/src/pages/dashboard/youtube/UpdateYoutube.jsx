import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Loading from "../../../components/loading/Loading";

const UpdateYoutube = () => {
  const location = useLocation()?.search?.split("?")[1];
  const {
    data: youtubes,
    isFetching,
    isError,
  } = useReadQuery({ url: `/user/youtubes/${location}`, tag: ["youtubes"] });

  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");

  const updateHandler = () => {
    updateData({
      videoId,
      title,
      subtitle,
      category,
      url: `/user/youtubes?id=${location}`,
      tag: ["youtubes"],
    });
  };

  useEffect(() => {
    if (youtubes?.data) {
      const data = youtubes?.data[0];
      setVideoId(data?.videoId ? data?.videoId : videoId);
      setTitle(data?.title ? data?.title : title);
      setSubtitle(data?.subtitle ? data?.subtitle : subtitle);
      setCategory(data?.category ? data?.category : category);
    }
  }, [youtubes]);

  console.log(youtubes, "news");
  return (
    <div className="w-full min-h-[85vh] h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading news data</p>}
      <div className="  w-full  rounded-lg p-4 border border-gray-300">
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Video ID
          </label>
          <input
            onChange={(e) => setVideoId(e.target.value)}
            value={videoId}
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
            Subtitle
          </label>
          <input
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
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
            value={category}
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
        <div className="flex items-center gap-5">
          <LoadingButton
            pending={pending}
            onClick={updateHandler}
            title="Update"
            color="bg-emerald-500"
            width="w-52"
          />
          <a
            href={`/dashboard/admin/youtube`}
            className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpdateYoutube;
