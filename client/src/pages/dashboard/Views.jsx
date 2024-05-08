import React, { useEffect, useState } from "react";
import {
  useDeleteSaveMutation,
  useReadQuery,
} from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import ResponsivePagination from "react-responsive-pagination";
import "./../categories/pagination.css";
import CompanyItems from "../../components/CompanyItems";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";
import Popup from "../../components/Popup";
import Pop from "../../components/Pop";

const Views = ({ type }) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [removePending, setRemovePending] = useState(false);
  const [removeData, removeResponse] = useDeleteSaveMutation();
  const [popup, setPopup] = useState(false);
  const [company, setCompany] = useState();

  const {
    data: views,
    isFetching: viewsIsFetching,
    isError: viewsIsError,
  } = useReadQuery({
    url:
      type === "company"
        ? `/user/views?company[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=views&populatingValue=company,viewer`
        : `/user/views?viewer[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=views&populatingValue=company,viewer`,
    tag: ["view", "companies"],
  });

  useEffect(() => {
    setTotalPage(Math.ceil(views?.total / 3));
  }, [views]);

  useEffect(() => {
    if (removeResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [removeResponse]);

  //   const removeHandler = () => {
  //     company &&
  //       removeData({
  //         company: company?.company?._id,
  //         viewer: company?.saver?._id,
  //         role: user?.role,
  //         tag: ["save", "company"],
  //       });
  //     // window.location.reload();
  //   };

  console.log(views, "views");
  return (
    <div className="w-full relative pb-3 bg-gray-50 bg-dark h-auto">
      {/* <Response response={removeResponse} setPending={setRemovePending} /> */}

      {viewsIsFetching && <Loading />}
      {viewsIsError && <p>Something went wrong unable to read the data</p>}
      <div className="grid mt-5 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 w-full place-items-center gap-6">
        {views && type !== "company" && views?.data?.length > 0 ? (
          views?.data?.map((e) => {
            return (
              <div className="relative">
                <CompanyItems
                  value={e?.company?._id}
                  phoneNo={`${e?.company?.phone?.substring(0, 5)}**`}
                  type="large"
                  data={e?.company}
                  disabled={true}
                />
                {/* <div
                  onClick={() => {
                    setPopup(true);
                    setCompany(e);
                  }}
                  className="absolute cursor-pointer text-white top-4 right-4"
                >
                  <svg
                    class="text-main w-8 h-8 bg-white hover:bg-gray-200 rounded-full p-1 mb-3.5 mx-auto"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div> */}
              </div>
            );
          })
        ) : views && views?.data?.length > 0 && type === "company" ? (
          views?.data?.map((e) => {
            if (e?.role === "company") {
              return (
                <div className="relative">
                  <CompanyItems
                    value={e?.company?._id}
                    phoneNo={`${e?.company?.phone?.substring(0, 5)}**`}
                    type="large"
                    data={e?.company}
                    disabled={true}
                  />
                  {/* <div
                    onClick={() => {
                      setPopup(true);
                      setCompany(e);
                    }}
                    className="absolute cursor-pointer text-white top-4 right-4"
                  >
                    <svg
                      class="text-main w-8 h-8 bg-white hover:bg-gray-200 rounded-full p-1 mb-3.5 mx-auto"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div> */}
                </div>
              );
            } else {
              return (
                <div class="w-full mx-4  sm:mx-auto md:mx-auto min-h-[463px] lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
                  <div class="rounded-t-lg h-40 overflow-hidden">
                    <img
                      class="object-cover object-top w-full"
                      src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                      alt="Mountain"
                    />
                  </div>
                  <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    {e?.saver?.profilePicture?.length > 2 ? (
                      <img
                        class="object-cover object-center h-32"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                        alt="Woman looking front"
                      />
                    ) : (
                      <div className="w-32 text-white text-center text-2xl font-bold flex items-center justify-center h-32 rounded-full bg-main">
                        {e?.role}
                      </div>
                    )}
                  </div>
                  <div class="text-center mt-2">
                    <h2 class="font-semibold">
                      {e?.saver?.firstName} {e?.saver?.lastName}
                    </h2>
                    <p class="text-gray-500">{e?.email}</p>
                  </div>
                  <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li class="flex flex-col items-center justify-around">
                      <svg
                        class="w-7 h-7 text-yellow-400"
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
                          d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                        />
                      </svg>

                      <div>{e?.saver?.gender}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                      <svg
                        class="w-7 h-7 text-main"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <div>{e?.saver?.address}</div>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                      <svg
                        class="w-7 h-7 text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                      </svg>

                      <div>{e?.saver?.phone}</div>
                    </li>
                  </ul>
                  <div class="p-4 border-t mx-8 mt-2">
                    <p className="text-sm">{e?.saver?.bio}</p>
                  </div>
                </div>
              );
            }
          })
        ) : (views && views?.message) || views?.data?.length === 0 ? (
          <div className="w-full items-center justify-center flex">
            There is no saved companies yet!
          </div>
        ) : null}
      </div>
      {popup && (
        <Pop
          content="Are you sure you want to remove this company?"
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
    </div>
  );
};

export default Views;
