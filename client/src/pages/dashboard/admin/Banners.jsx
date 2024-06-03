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

const Banners = () => {
  const {
    data: banners,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/banners", tag: ["banners"] });

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [type, setType] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const addHandler = () => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("bannerImage", bannerImage);
    formData.append("url", "/user/banners");
    formData.append("tag", ["banners"]);
    addData(formData);
  };

  const deleteHandler = () => {
    id && deleteData({ url: `/user/banners?id=${id}`, tag: ["banners"] });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  console.log(banners, "banners");
  return (
    <div className="flex px-main min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={addResponse} setPending={setPending} />
      <Response response={deleteResponse} setPending={setDeletePending} />

      <button
        onClick={() => setAdd(true)}
        className="px-5 self-end rounded-lg py-2 text-white bg-main"
      >
        Add New
      </button>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read boost data</p>}
        {banners && banners?.data?.length > 0 ? (
          banners?.data?.map((e) => {
            return (
              <div
                key={e?._id}
                className="flex w-full border px-4 border-dark rounded-lg relative justify-start py-4 gap-1 flex-col items-enter"
              >
                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Type</p>
                  <p>{e?.type}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Sponsor Image</p>
                  <img
                    src={e?.bannerImage}
                    alt="sponsor image"
                    className="w-full h-32 rounded-lg border"
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-3">
                  <p>{format(e?.createdAt)}</p>
                  <button
                    onClick={() => {
                      setPopup(true);
                      setId(e?._id);
                    }}
                    className="px-2 w-20 self-end py-2 bg-main text-white rounded-lg"
                  >
                    Delete
                  </button>{" "}
                </div>
              </div>
            );
          })
        ) : (banners && banners?.message) || banners?.data?.length === 0 ? (
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
        <div className="absolute shadow-xl z-30 top-2 bg-white bg-dark right-0 w-[400px] rounded-lg p-4 border border-gray-300">
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

          <div className="flex mt-5 flex-col gap-1">
            <p className=" py-1">Type</p>

            <select
              onChange={(e) => setType(e.target.value)}
              name=""
              id=""
              className="w-full bg-white bg-dark h-10 rounded-lg"
            >
              <option value="home-small">Home small</option>
              <option value="home-large">Home large</option>
              <option value="home-bottom">Home bottom</option>
            </select>
          </div>
          <div className="mb-5 mt-5">
            <label class="block text-sm font-medium">banners Image</label>
            <div
              // style={{ backgroundImage: `url(${user?.user?.logo})` }}
              class={`mt-4  flex justify-center object-fill object-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
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
                      onChange={(e) => setBannerImage(e.target.files[0])}
                      // value={logo}
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

          <LoadingButton
            pending={pending}
            onClick={addHandler}
            title="Add"
            color="bg-main"
            width="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Banners;
