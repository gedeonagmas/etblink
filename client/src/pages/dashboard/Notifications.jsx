import React, { useEffect, useState } from "react";
import {
  useDeleteMutation,
  useLazyReadQuery,
} from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import ResponsivePagination from "react-responsive-pagination";
import "./../categories/pagination.css";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";
import Pop from "../../components/Pop";
import { format } from "timeago.js";
import { Close, Delete, MoreHoriz } from "@mui/icons-material";

const Notifications = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [removeData, removeResponse] = useDeleteMutation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [popup, setPopup] = useState(false);
  const [detailPopup, setDetailPopup] = useState(false);
  const [removePending, setRemovePending] = useState(false);
  const [detail, setDetail] = useState("");

  const [trigger, { data: notifications, isFetching, isError }] =
    useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(notifications?.total / 9));
  }, [notifications]);

  useEffect(() => {
    trigger({
      url: `/user/notifications?receiver=${user?.user?._id}&limit=9&page=${page}`,
      tag: ["notifications"],
    });
  }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/notifications?receiver=${user?.user?._id}&limit=9&page=${page}&searchField=message&searchValue=${search}`,
      tag: ["notifications"],
    });
  }, [search]);

  const removeHandler = () => {
    detail &&
      removeData({
        url: `/user/notifications?id=${detail?._id}`,
        tag: ["notifications"],
      });
  };

  useEffect(() => {
    if (removeResponse.status === "fulfilled") {
      setPopup(false);
      setDetailPopup(false);
    }
  }, [removeResponse]);
  console.log(notifications, "notifications");
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
        {notifications && notifications?.data?.length > 0 ? (
          notifications?.data?.map((e) => {
            return (
              <div className="relative p-5 w-full md:w-[350px] lg:w-[240px] xl:w-[270px] h-[136px] flex flex-col gap-1 rounded-lg border shadow-md bg-white bg-dark">
                <p>
                  {e?.message?.substring(0, 100)}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setDetail(e);
                      setDetailPopup(true);
                    }}
                  >
                    <MoreHoriz />
                  </span>
                </p>
                <p className="self-end text-sm py-2">{format(e?.createdAt)}</p>
              </div>
            );
          })
        ) : (notifications && notifications?.message) ||
          notifications?.data?.length === 0 ? (
          <div className="w-full items-center justify-center flex">
            There is no notifications!
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

export default Notifications;
