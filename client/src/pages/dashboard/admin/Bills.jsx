import React, { useEffect, useState } from "react";
import {
  useCreateBoostMutation,
  useLazyReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import { format } from "timeago.js";
import Tables from "../../../components/Tables";
import { Close, Delete, Details, Edit } from "@mui/icons-material";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import Loading from "../../../components/loading/Loading";
import LoadingButton from "../../../components/loading/LoadingButton";
import Response from "../../../components/Response";

const Bills = () => {
  const [getHistory, { data, isFetching, isError }] = useLazyReadQuery();
  const [approveData, approveResponse] = useCreateBoostMutation();

  const [approvePending, setApprovePending] = useState(false);

  const [type, setType] = useState("boost");
  const [detail, setDetail] = useState("");
  const [popup, setPopup] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  const fetchBy = `/user/${
    type === "boost"
      ? "boosthistories"
      : type === "subscription"
      ? "subscriptionhistories"
      : "payments"
  }?populatingType=companies&populatingValue=company`;

  useEffect(() => {
    type &&
      getHistory({
        url: fetchBy,
        tag: ["boosts"],
      });
  }, [type]);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.total / 30));
  }, [data]);

  useEffect(() => {
    getHistory({
      url: `${fetchBy}&limit=30&page=${page}`,
      tag: ["boosthistories", "transactionhistories", "payments"],
    });
  }, [page, type]);

  useEffect(() => {
    getHistory({
      url: `${fetchBy}&limit=30&page=${page}&searchField=payFrom&searchValue=${search}`,
      tag: ["boosthistories", "transactionhistories", "payments"],
    });
  }, [search, type]);

  const approveHandler = (ids, value) => {
    approveData({
      value,
      id: ids,
      serviceType: "approve",
      approvalType:
        type === "boost"
          ? "boosting"
          : type === "subscription"
          ? "subscription"
          : "fund",
    });
  };

  const columns = [
    {
      name: "COMPANY",
      selector: (row) => row?.company?.name,
      cell: (row) => <div className="">{row?.company?.name}</div>,
      sortable: true,
    },
    {
      name: "TYPE",
      selector: (row) => row?.payFrom,
      cell: (row) => <div className="">{row?.payFrom}</div>,
      sortable: true,
    },
    {
      name: "START DATE",
      selector: (row) => row?.startDate,
      cell: (row) => <div className="">{row?.startDate}</div>,
      sortable: true,
    },
    {
      name: `BANK NAME`,
      selector: (row) => row?.payFrom,
      cell: (row) => (
        <div className="">
          {row?.payFrom === "check"
            ? row?.checkDetail?.checkBankName
            : row?.bankDetail?.bankName}
        </div>
      ),
      sortable: true,
    },
    {
      name: `NUMBER`,
      selector: (row) => row?.payFrom,
      cell: (row) => (
        <div className="">
          {row?.payFrom === "check"
            ? row?.checkDetail?.checkNumber
            : row?.bankDetail?.bankName}
        </div>
      ),
      sortable: true,
    },

    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      cell: (row) => (
        <div className="">
          {row?.payFrom === "check"
            ? row?.checkDetail?.checkAmount
            : row?.bankDetail?.bankAmount}
        </div>
      ),
      sortable: true,
    },
    {
      name: "CREATED AT",
      selector: (row) => row.createdAt,
      cell: (row) => <div className="">{format(row.createdAt)}</div>,
      sortable: true,
    },

    {
      name: "APPROVED",
      selector: (row) => row.updatedAt,
      cell: (row) => (
        <div className="">{row.approved ? "APPROVED" : "NOT APPROVED"}</div>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex w-20 gap-1 justify-between items-center">
          <button
            onClick={() => {
              setPopup(true);
              setDetail(row);
            }}
            className="px-2 py-1 bg-main text-white rounded-lg"
          >
            <Details fontSize="small" />
          </button>

          <button
            onClick={() => {
              updateHandler(row?._id, row?.visible);
            }}
            className="px-2 py-1 bg-main text-white rounded-lg"
          >
            <Delete fontSize="small" />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  console.log(data, totalPage, "type");
  return (
    <div className="relative">
      <Response response={approveResponse} setPending={setApprovePending} />
      <select
        onChange={(e) => setType(e.target.value)}
        name=""
        id=""
        className="my-4"
      >
        <option selected value="boost">
          Boost
        </option>
        <option value="subscription">Subscription</option>
        <option value="fund">Fund</option>
      </select>

      <div className="w-full">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read boost data</p>}
        {data && data?.data?.length > 0 ? (
          <div>
            <Tables data={data?.data} columns={columns} title="Transactions" />
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
        ) : (data && data?.message) || data?.data?.length === 0 ? (
          <div>There is no data to display.</div>
        ) : null}
      </div>
      {popup && detail && (
        <div className="max-w-xl w-full bg-gray-100 shadow-lg bg-dark z-20 h-[430px] p-5 rounded-lg border flex flex-col items-start justify-start absolute right-5 top-20 ">
          <div
            onClick={() => setPopup(false)}
            className="cursor-pointer absolute right-1 top-1"
          >
            <Close />
          </div>

          <p className="font-bold">Company Name</p>
          <p>{detail.company.name}</p>

          <p className="font-bold">Phone</p>
          <p>{detail.company.phone}</p>

          <p className="font-bold">Bank Name</p>
          <p>
            {detail.payFrom === "check"
              ? detail.checkDetail.checkBankName
              : detail.bankDetail.bankName}
          </p>

          <p className="font-bold">Account(Check) Number</p>
          <p>
            {detail.payFrom === "check"
              ? detail.checkDetail.checkNumber
              : detail.bankDetail.accountNumber}
          </p>

          <p className="font-bold">Customer full name</p>
          <p>
            {detail.payFrom === "check"
              ? detail.checkDetail.checkYourName
              : detail.bankDetail.yourName}
          </p>

          <p className="font-bold">Amount</p>
          <p>
            {detail.payFrom === "check"
              ? detail.checkDetail.checkAmount
              : detail.bankDetail.bankAmount}
          </p>

          <p className="font-bold">Date</p>
          <p>
            {detail.payFrom === "check"
              ? detail.checkDetail.checkDate
              : detail.bankDetail.bankDate}
          </p>

          <div className="flex gap-5 justify-end mt-3">
            <button
              onClick={() => setPopup(false)}
              className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <LoadingButton
              pending={approvePending}
              onClick={() =>
                approveHandler(detail._id, detail?.approved ? false : true)
              }
              title={detail?.approved ? "Reject" : "Approve"}
              color="bg-main"
              width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
