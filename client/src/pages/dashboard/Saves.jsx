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

const Saves = ({ type }) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [removePending, setRemovePending] = useState(false);
  const [removeData, removeResponse] = useDeleteSaveMutation();
  const [popup, setPopup] = useState(false);
  const [company, setCompany] = useState();

  const {
    data: saves,
    isFetching: savesIsFetching,
    isError: savesIsError,
  } = useReadQuery({
    url:
      type === "company"
        ? `/user/saves?company[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=saves&populatingValue=company,saver`
        : `/user/saves?saver[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=saves&populatingValue=company,saver`,
    tag: ["save", "companies"],
  });

  //`/user/saves?company[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=saves&populatingValue=company,saver`
  useEffect(() => {
    setTotalPage(Math.ceil(saves?.total / 3));
  }, [saves]);

  useEffect(() => {
    if (removeResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [removeResponse]);

  const removeHandler = () => {
    company &&
      removeData({
        company: company?.company?._id,
        saver: company?.saver?._id,
        role: user?.role,
        tag: ["save", "company"],
      });
  };

  console.log(saves, "saves");
  return (
    <div className="w-full relative pb-3 bg-gray-50 bg-dark h-auto">
      <Response response={removeResponse} setPending={setRemovePending} />

      {savesIsFetching && <Loading />}
      {savesIsError && <p>Something went wrong unable to read the data</p>}
      <div className="grid mt-5 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 w-full place-items-center gap-6">
        {saves && saves?.data?.length > 0 ? (
          saves?.data?.map((e) => {
            return (
              <div className="relative">
                <CompanyItems
                  value={e?.company?._id}
                  phoneNo={`${e?.company?.phone?.substring(0, 5)}**`}
                  type="large"
                  data={e?.company}
                />
                <div
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
                </div>
              </div>
            );
          })
        ) : saves && saves?.message ? (
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

export default Saves;
