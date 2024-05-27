import React, { useEffect, useState } from "react";
import { useLazyReadQuery } from "../../../features/api/apiSlice";
import { format } from "timeago.js";
import Tables from "../../../components/Tables";
import { Delete, Edit } from "@mui/icons-material";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import Loading from "../../../components/loading/Loading";
import LoadingButton from "../../../components/loading/LoadingButton";

const Bills = () => {
  const [getHistory, { data, isFetching, isError }] = useLazyReadQuery();
  const [type, setType] = useState("");

  useEffect(() => {
    getHistory({
      url: `/user/boosthistories?approved=false`,
      tag: ["boosts"],
    });
  }, []);

  useEffect(() => {
    type &&
      getHistory({
        url: `/user/${
          type === "boost"
            ? "boosthistories"
            : type === "subscription"
            ? "subscriptionhistories"
            : "payments"
        }?approved=false`,
        tag: ["boosts"],
      });
  }, [type]);

  const columns = [
    {
      name: "TITLE",
      selector: (row) => row.title,
      cell: (row) => <div className="">{row.title}</div>,
      sortable: true,
    },
    {
      name: "SUB TITLE",
      selector: (row) => row.subTitle,
      cell: (row) => <div className="">{row.subTitle}</div>,
      sortable: true,
    },
    {
      name: "IMAGE",
      cell: (row) => (
        <img src={row.blogImage} className="w-20 border h-10 rounded-sm" />
      ),
      sortable: true,
    },

    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      cell: (row) => (
        <div
          className="ql-editors"
          dangerouslySetInnerHTML={{
            __html:
              row?.description?.length > 100
                ? row?.description?.substring(0, 50) + "..."
                : row?.description,
          }}
        ></div>
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
      name: "UPDATED AT",
      selector: (row) => row.updatedAt,
      cell: (row) => <div className="">{format(row.updatedAt)}</div>,
      sortable: true,
    },
    {
      name: "VISIBILITY",
      selector: (row) => row.updatedAt,
      cell: (row) => (
        <div className="">{row.visible ? "Visible" : "Hidden"}</div>
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
              setId(row._id);
            }}
            className="px-2 py-1 bg-main text-white rounded-lg"
          >
            <Delete fontSize="small" />
          </button>
          <a
            href={`/dashboard/${user?.role}/blog/detail?${row._id}`}
            className="py-1 px-2 rounded-lg bg-emerald-500 text-center text-white"
          >
            <Edit fontSize="small" />
          </a>
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
  console.log(type, "type");
  return (
    <div>
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
      <p className="font-light py-2 mt-10 text-lg">
        Your previous fund history.
      </p>
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
    </div>
  );
};

export default Bills;
