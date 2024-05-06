import React, { useEffect, useState } from "react";
import LoadingButton from "../../../components/loading/LoadingButton";
import {
  useLazyReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import { format } from "timeago.js";
import Loading from "../../../components/loading/Loading";
import Pop from "../../../components/Pop";
import Tables from "../../../components/Tables";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import ProfilePicture from "../../../components/ProfilePicture";
import CompanyItems from "../../../components/CompanyItems";

const UserSales = ({ type }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: users, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(users?.total / 10));
  }, [users]);

  useEffect(() => {
    trigger({
      url: `/user/users?role=${type}&limit=10&page=${page}&populatingType=users&populatingValue=user`,
      tag: ["users"],
    });
  }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/users?role=${type}&limit=10&page=${page}&searchField=email&searchValue=${search}&populatingType=users&populatingValue=user`,
      tag: ["users"],
    });
  }, [search]);

  const [deleteData, deleteResponse] = useUpdateMutation();
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [value, setValue] = useState(true);
  const [user, setUser] = useState();

  const deleteHandler = () => {
    id &&
      deleteData({
        isActive: value,
        url: `/user/users?id=${id}`,
        tag: ["users"],
      });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  const columns = [
    {
      name: "FULL NAME",
      selector: (row) => row?.user?.firstName,
      cell: (row) => (
        <div className="">
          {row?.user?.firstName + " " + row?.user?.lastName}
        </div>
      ),
      sortable: true,
    },
    {
      name: "PROFILE",
      cell: (row) => <ProfilePicture user={row} />,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      cell: (row) => <div className="">{row.email}</div>,
      sortable: true,
    },

    {
      name: "CREATED AT",
      selector: (row) => row.createdAt,
      cell: (row) => <div className="">{format(row.createdAt)}</div>,
      sortable: true,
    },

    {
      name: "STATUS",
      selector: (row) => row.isActive,
      cell: (row) => (
        <div className="">{row?.isActive === true ? "Active" : "Freezed"}</div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-1 justify-between items-center">
          <button
            onClick={() => {
              setPopup(true);
              setId(row._id);
              setValue(row?.isActive ? false : true);
            }}
            className="px-1 py-1 w-16 bg-main text-white rounded-lg"
          >
            {row?.isActive ? "Freeze" : "Activate"}
          </button>
          <button
            onClick={() => {
              setUser(row);
              setAdd(true);
            }}
            className="px-1 py-1 w-14 bg-emerald-500 text-white rounded-lg"
          >
            Detail
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  console.log(user, "users");
  return (
    <div className="flex min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={deleteResponse} setPending={setDeletePending} />

      <div className="flex px-5 items-center justify-between">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />
      </div>
      <div className="w-full">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read boost data</p>}
        {users && users?.data?.length > 0 ? (
          <div>
            <Tables data={users?.data} columns={columns} title="users" />
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
        ) : (users && users?.message) || users?.data?.length === 0 ? (
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
      {add && user && (
        <div className="absolute flex flex-col shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
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
          {type !== "company" && (
            <div className="w-full flex flex-col gap-2 divide-y-2">
              <div className="py-2 mt-7">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile
                </label>
                <ProfilePicture user={user} />
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <p className="font-normal">
                  {user?.user?.firstName +
                    " " +
                    user?.user?.middleName +
                    " " +
                    user?.user?.lastName}
                </p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <p className="font-normal">{user?.email}</p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <p className="font-normal">{user?.gender}</p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <p className="font-normal">{user?.phone}</p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <p className="font-normal">{user?.address}</p>
              </div>
              {type === "sales" && (
                <div className="py-2 mt-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Earn
                  </label>
                  <p className="font-normal">{user?.earn?.total}</p>
                </div>
              )}
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Fill Status
                </label>
                <p className="font-normal">{user?.profileFillStatus}</p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bio
                </label>
                <p className="font-normal">{user?.bio}</p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Account Created At
                </label>
                <p className="font-normal">{format(user?.createdAt)}</p>
              </div>
              <div className="py-2 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Account Updated At
                </label>
                <p className="font-normal">{format(user?.updatedAt)}</p>
              </div>
            </div>
          )}
          {type === "company" && (
            <div className="py-10">
              <CompanyItems
                value={user?.user?._id}
                phoneNo={`${user?.user?.phone?.substring(0, 5)}**`}
                type="small"
                data={user?.user}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSales;
