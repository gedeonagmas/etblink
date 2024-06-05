import React, { useEffect, useState } from "react";
import LoadingButton from "../../../components/loading/LoadingButton";
import {
  useCreateMutation,
  useDeleteMutation,
  useLazyReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import { format } from "timeago.js";
import Loading from "../../../components/loading/Loading";
import Pop from "../../../components/Pop";
import Editor from "../../../components/Editor";
import Tables from "../../../components/Tables";
import { Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";

const AddJob = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: jobs, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);
  const fetchBy = user?.role === "job-admin" ? `createdBy=${user?._id}` : "";

  useEffect(() => {
    setTotalPage(Math.ceil(jobs?.total / 30));
  }, [jobs]);

  useEffect(() => {
    trigger({
      url: `/user/jobs?${fetchBy}&limit=30&page=${page}&searchField=title&searchValue=${search}`,
      tag: ["jobs"],
    });
  }, [page, search]);

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [updateData, updateResponse] = useUpdateMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [visible, setVisible] = useState();

  const addHandler = () => {
    addData({
      title,
      subTitle,
      description,
      category,
      role: user?.role,
      createdBy: user?._id,
      updatedBy: user?._id,
      url: "user/jobs",
      tag: ["jobs"],
    });
  };

  const deleteHandler = () => {
    id && deleteData({ url: `/user/jobs?id=${id}`, tag: ["jobs"] });
  };

  const updateHandler = (ids, value) => {
    updateData({
      visible: value ? false : true,
      url: `/user/jobs?id=${ids}`,
      tag: ["jobs"],
    });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

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
      name: "CATEGORY",
      selector: (row) => row.category,
      cell: (row) => <div className="">{row.category}</div>,
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
              row?.description?.length > 50
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
              updateHandler(row?._id, row?.visible);
            }}
            className="px-2 py-1 bg-blue-500 text-white rounded-lg"
          >
            {row?.visible ? <VisibilityOff /> : <Visibility fontSize="small" />}
          </button>
          <a
            href={`/dashboard/${user?.role}/job/detail?${row._id}`}
            className="py-1 px-2 rounded-lg bg-emerald-500 text-center text-white"
          >
            <Edit fontSize="small" />
          </a>
          <button
            onClick={() => {
              setPopup(true);
              setId(row._id);
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

  console.log(jobs, "jobs");
  return (
    <div className="flex min-h-[85vh] px-2 pb-5 relative bg-dark bg-white bg-dark flex-col h-auto w-full gap-5">
      <Response response={addResponse} setPending={setPending} />
      <Response response={deleteResponse} setPending={setDeletePending} />
      <Response response={updateResponse} setPending={setPending} />

      <div className="flex px-5 items-center justify-between">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />

        <button
          onClick={() => setAdd(true)}
          className="px-5 self-end rounded-lg py-2 text-white bg-main"
        >
          Add New
        </button>
      </div>
      <div className="w-full">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read boost data</p>}
        {jobs && jobs?.data?.length > 0 ? (
          <div>
            <Tables data={jobs?.data} columns={columns} title="jobs" />
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
        ) : (jobs && jobs?.message) || jobs?.data?.length === 0 ? (
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
        <div className="absolute shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
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

          <div className="mb-5 mt-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
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
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sub title"
              required
            />
          </div>

          <div className="mb-5 mt-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
            >
              <option selected disabled value="">
                Select category
              </option>
              <option value="software">Software</option>
              <option value="graphics">Graphics</option>
              <option value="software">Software</option>
            </select>
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

          <LoadingButton
            pending={pending}
            onClick={addHandler}
            title="Add"
            color="bg-main"
            width="w-52"
          />
        </div>
      )}
    </div>
  );
};

export default AddJob;
