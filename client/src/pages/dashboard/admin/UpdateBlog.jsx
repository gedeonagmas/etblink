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

const UpdateBlog = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

  const location = useLocation()?.search?.split("?")[1];
  const {
    data: blogs,
    isFetching,
    isError,
  } = useReadQuery({
    url: `/user/blogs?_id=${location}&populatingType=blogs&populatingValue=updatedBy,createdBy`,
    tag: ["blogs"],
  });

  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [description, setDescription] = useState("");

  const updateHandler = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("blogImage", blogImage);
    formData.append("description", description);
    formData.append("url", `/user/blogs?id=${location}`);
    formData.append("tag", ["blogs"]);
    updateData(formData);
  };

  useEffect(() => {
    if (blogs?.data) {
      const data = blogs?.data[0];
      setTitle(data?.title ? data?.title : title);
      setSubTitle(data?.subTitle ? data?.subTitle : subTitle);
      setBlogImage(data?.blogImage ? data?.blogImage : blogImage);
      setDescription(data?.description ? data?.description : description);
    }
  }, [blogs]);

  console.log(blogs, "news");
  return (
    <div className="w-full min-h-[85vh] h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading news data</p>}
      {blogs && blogs?.data ? (
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
            <label class="block text-sm font-medium">Image</label>
            <div
              style={{ backgroundImage: `url(${blogImage})` }}
              class={`mt-4 h-[500px] flex justify-center bg-cover px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto text-main h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload1"
                    class="relative cursor-pointer rounded-md font-medium text-main hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span class="">Upload an image</span>
                    <input
                      onChange={(e) => setBlogImage(e.target.files[0])}
                      //   value={blogImage}
                      id="file-upload1"
                      name="file-upload1"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">res 120 x 120 pixels</p>
                </div>
                <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
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
              href={`/dashboard/${user?.role}/blog`}
              className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
            >
              Back
            </a>
          </div>
        </div>
      ) : (blogs && blogs?.message) || blogs?.data?.length === 0 ? (
        <div>There is no data to display.</div>
      ) : null}
    </div>
  );
};

export default UpdateBlog;
