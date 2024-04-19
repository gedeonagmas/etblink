import React, { useEffect, useState } from "react";
import {
  useDeleteSaveMutation,
  useReadQuery,
} from "../../../features/api/apiSlice";
import Loading from "../../../components/loading/Loading";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import CompanyItems from "../../../components/CompanyItems";
import LoadingButton from "../../../components/loading/LoadingButton";
import Response from "../../../components/Response";
import Popup from "../../../components/Popup";
import Pop from "../../../components/Pop";
import { format } from "timeago.js";
import { Rating } from "flowbite-react";

const Ratings = ({ type }) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [removePending, setRemovePending] = useState(false);
  const [removeData, removeResponse] = useDeleteSaveMutation();
  const [popup, setPopup] = useState(false);
  const [company, setCompany] = useState();

  const {
    data: rates,
    isFetching: ratesIsFetching,
    isError: ratesIsError,
  } = useReadQuery({
    url: `/user/rates?accepter[eq]=${user?.user?._id}&populatingType=rates&populatingValue=rater,accepter`,
    tag: ["companies", "sales"],
  });

  //`/user/saves?company[eq]=${user?.user?._id}&limit=3&page=${page}&populatingType=saves&populatingValue=company,saver`
  useEffect(() => {
    setTotalPage(Math.ceil(rates?.total / 3));
  }, [rates]);

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

  console.log(rates, "rates");
  return (
    <div className="w-full relative pb-3 bg-gray-50 bg-dark h-auto">
      <Response response={removeResponse} setPending={setRemovePending} />

      {ratesIsFetching && <Loading />}
      {ratesIsError && <p>Something went wrong unable to read the data</p>}
      <div className="grid mt-5 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 w-full place-items-center gap-6">
        {rates && rates?.data?.length > 0 ? (
          rates?.data?.map((e) => {
            return (
              <div className="mt-10">
                <div class="flex items-center mb-4">
                  <img
                    class="w-10 h-10 me-4 rounded-full"
                    src="./gedi.jpg"
                    alt=""
                  />
                  <div class="font-medium dark:text-white">
                    <p>
                      {e?.fullName}
                      <time
                        datetime="2014-08-16 19:00"
                        class="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        {format(e?.createdAt)}
                      </time>
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
                <p className="mt-1 ml-14">{e?.message}</p>
              </div>
            );
          })
        ) : rates && rates?.message ? (
          <div className="w-full items-center justify-center flex">
            It seams no one rates you!
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

export default Ratings;
