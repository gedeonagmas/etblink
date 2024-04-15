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

const Saves = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(3);
  const [removePending, setRemovePending] = useState(false);
  const [removeData, removeResponse] = useDeleteSaveMutation();
  const [popup, setPopup] = useState(false);

  const {
    data: saves,
    isFetching: savesIsFetching,
    isError: savesIsError,
  } = useReadQuery({
    url:
      user?.role === "company"
        ? `/user/saves?company[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=saves&populatingValue=company,saver`
        : `/user/saves?saver[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=saves&populatingValue=company,saver`,
    tag: ["saves", "company"],
  });

  useEffect(() => {
    setTotalPage(Math.ceil(saves?.data?.length / 3));
  }, [saves]);

  const removeHandler = (data) => {
    removeData({
      company: data?.company?._id,
      saver: data?.saver?._id,
      role: user?.role,
    });
  };

  console.log(saves, "saves");
  return (
    <div className="w-full relative pb-3 bg-gray-50 bg-dark h-auto">
      <Response response={removeResponse} setPending={setRemovePending} />

      {savesIsFetching && <Loading />}
      {savesIsError && <p>Something went wrong unable to read the data</p>}
      <div className="grid mt-5 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-full place-items-center gap-6">
        {saves && saves?.data?.length > 0 ? (
          saves?.data?.map((e) => {
            return (
              <div className="relative">
                <CompanyItems
                  value={e?.company?._id}
                  phoneNo={`${e?.company?.phone?.substring(0, 5)}**`}
                  type="small"
                  data={e?.company}
                />
                <div
                  onClick={() => setPopup(true)}
                  className="absolute text-white cursor-pointer top-4 right-4"
                >
                  Remove
                  {/* <LoadingButton
                    pending={removePending}
                    onClick={() => removeHandler(e)}
                    title="Remove"
                    color="bg-main"
                    width="w-36 sm:rounded-full sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
                  /> */}
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full items-center justify-center flex">
            There is no saved companies yet!
          </div>
        )}
      </div>
      {popup && <Popup content="delete" trigger={() => console.log("popup")} />}
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

export default Saves;
