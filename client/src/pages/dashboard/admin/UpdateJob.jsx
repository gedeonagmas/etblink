import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Loading from "../../../components/loading/Loading";
import Editor from "../../../components/Editor";

const UpdateJob = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

  const location = useLocation()?.search?.split("?")[1];
  const {
    data: jobs,
    isFetching,
    isError,
  } = useReadQuery({
    url: `/user/jobs?_id=${location}&populatingType=jobs&populatingValue=updatedBy,createdBy`,
    tag: ["jobs"],
  });

  console.log(location, "lololo");
  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const updateHandler = () => {
    updateData({
      title,
      subTitle,
      category,
      description,
      role: user?.role,
      createdBy: user?._id,
      updatedBy: user?._id,
      url: `/user/jobs?id=${location}`,
      tag: ["jobs"],
    });
  };

  useEffect(() => {
    if (jobs?.data) {
      const data = jobs?.data[0];
      setTitle(data?.title ? data?.title : title);
      setSubTitle(data?.subTitle ? data?.subTitle : subTitle);
      setCategory(data?.category ? data?.category : category);
      setDescription(data?.description ? data?.description : description);
    }
  }, [jobs]);

  console.log(jobs, "news");
  return (
    <div className="w-full min-h-[85vh] h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading news data</p>}
      {jobs && jobs?.data ? (
        <div className="  w-full  rounded-lg p-4 border border-gray-300">
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
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sub title
            </label>
            <input
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sub title"
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
            <input
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sub title"
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
            <Editor
              description={description}
              setDescription={setDescription}
              theme="snow"
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
              href={`/dashboard/${user?.role}/job`}
              className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
            >
              Back
            </a>
          </div>
        </div>
      ) : (jobs && jobs?.message) || jobs?.data?.length === 0 ? (
        <div>There is no data to display.</div>
      ) : null}
    </div>
  );
};

export default UpdateJob;
