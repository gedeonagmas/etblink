import React, { useEffect, useState } from "react";
import {
  useDeleteMutation,
  useLazyReadQuery,
} from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import LoadingButton from "../../../components/loading/LoadingButton";
import Response from "../../../components/Response";
import Pop from "../../../components/Pop";
import { Close, Delete } from "@mui/icons-material";
import { format } from "timeago.js";
import { Rating } from "flowbite-react";

const Ratings = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [removeData, removeResponse] = useDeleteMutation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [popup, setPopup] = useState(false);
  const [detailPopup, setDetailPopup] = useState(false);
  const [removePending, setRemovePending] = useState(false);
  const [detail, setDetail] = useState("");
  const [ids, setIds] = useState("");

  const [trigger, { data: rates, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(rates?.total / 9));
  }, [rates]);

  useEffect(() => {
    trigger({
      url: `/user/rates?accepter=${user?.user?._id}&limit=9&page=${page}&searchField=fullName&searchValue=${search}&populatingValue=rater`,
      tag: ["rates"],
    });
  }, [page, search]);

  const removeHandler = () => {
    detail &&
      removeData({
        url: `/user/rates?id=${detail?._id}`,
        tag: ["rates"],
      });
  };

  useEffect(() => {
    if (removeResponse.status === "fulfilled") {
      setPopup(false);
      setDetailPopup(false);
    }
  }, [removeResponse]);

  console.log(rates, "rates");
  return (
    <div className="w-full relative px-5 pb-3 bg-gray-50 bg-dark h-auto">
      <Response response={removeResponse} setPending={setRemovePending} />
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        id="default-search"
        class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        required
      />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read the data</p>}
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
        {rates && rates?.data?.length > 0 ? (
          rates?.data?.map((e) => {
            return (
              <div className="h-52 relative border rounded-lg shadow-lg p-3">
                <div class="flex items-center gap-2 mb-4">
                  {/* <ProfilePicture user={e?.rater} /> */}
                  {e?.rater?.logo ? (
                    <img
                      src={e?.rater?.logo}
                      className="w-10 h-10 rounded-full border"
                    />
                  ) : e?.rater?.profilePicture ? (
                    <img
                      src={e?.rater?.profilePicture}
                      className="w-10 h-10 rounded-full border"
                    />
                  ) : (
                    <div className="w-10 h-10 text-center flex items-center justify-center text-xl font-bold rounded-full bg-main text-white">
                      {e?.fullName?.substring(0, 1)}
                    </div>
                  )}
                  <div class="font-medium dark:text-white">
                    <p>
                      {e?.fullName}
                      <p class="block text-sm text-gray-500 dark:text-gray-400">
                        {format(e?.updatedAt)}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="w-full ml-14 flex justify-start gap-3 items-center">
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                  <p>{e?.value}</p>
                </div>
                <div className="relative mt-1">
                  {e?.message?.length > 40 ? (
                    <p
                      onClick={() => setIds(e?._id)}
                      className="cursor-pointer"
                    >
                      {e?.message?.substring(0, 40) + "..."}
                    </p>
                  ) : (
                    <p>{e?.message}</p>
                  )}
                  {ids === e?._id && (
                    <p className="w-full pt-6 h-auto absolute top-0 bg-white border rounded-lg z-20 px-3 pb-2">
                      <svg
                        onClick={() => setIds("")}
                        class="w-6 absolute cursor-pointer top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
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
                          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      {e?.message}
                    </p>
                  )}
                </div>
                <div className="absolute items-center justify-center flex w-full bottom-0 left-0">
                  <button
                    onClick={() => {
                      setDetail(e);
                      setPopup(true);
                    }}
                    className="self-end w-[90%] py-1 mb-2 text-white bg-main mt-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (rates && rates?.message) || rates?.data?.length === 0 ? (
          <div className="w-full items-center justify-center flex">
            There is no rates!
          </div>
        ) : null}
      </div>

      {popup && (
        <Pop
          content="Are you sure you want to remove this notification?"
          cancel={setPopup}
          trigger={
            <LoadingButton
              pending={removePending}
              onClick={removeHandler}
              title="Yes, I'm Sure"
              color="bg-main"
              width="w-36 sm:rounded-full sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
            />
          }
        />
      )}

      <div className="flex flex-col gap-10">
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
      </div>

      {detailPopup && detail && (
        <div className="w-full">
          <div
            onClick={() => {
              setDetailPopup(false);
            }}
            className="w-full h-[100vh] fixed top-0 left-0 z-10 brightness-[.2] bg-gray-800/50"
          ></div>
          <div className="rounded-lg z-20 bg-white bg-dark p-5 max-w-xl border absolute top-20 right-[30%]">
            <div
              onClick={() => {
                setDetailPopup(false);
              }}
              className="absolute cursor-pointer top-2 right-2"
            >
              <Close />
            </div>
            <p className="mt-5">{detail?.message}</p>
            <p className="self-end text-sm py-2">{format(detail?.createdAt)}</p>
            <div
              onClick={() => {
                setPopup(true);
              }}
              className="p-2 w-24 flex items-center gap-1 rounded-lg self-end cursor-pointer bg-main text-white"
            >
              <Delete /> Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ratings;
