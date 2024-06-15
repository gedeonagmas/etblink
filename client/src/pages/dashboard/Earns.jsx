import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { useLazyReadQuery, useReadQuery } from "../../features/api/apiSlice";
import ResponsivePagination from "react-responsive-pagination";
import "./../categories/pagination.css";
import Tables from "../../components/Tables";
import { format } from "timeago.js";

const Earns = () => {
  const currentUser = JSON.parse(localStorage.getItem("etblink_user"));
  const {
    data: user,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useReadQuery({
    url: `/user/users?_id[eq]=${currentUser?._id}&populatingType=users&populatingValue=user`,
    tag: ["users"],
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: companies, isFetching, isError }] =
    useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(companies?.total / 30));
  }, [companies]);

  useEffect(() => {
    trigger({
      url: `/user/companies?sales[eq]=${currentUser?.user?._id}&registeredBy[eq]=sales&limit=10&page=${page}&searchField=name&searchValue=${search}&populatingValue=sales`,
      tag: ["sales", "companies"],
    });
  }, [page, search]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const columns = [
    {
      name: "LOGO",
      width: "44px",
      cell: (row) => (
        <div className=" ">
          {row?.profilePicture?.length > 1 ? (
            <img
              class="w-9 h-9 me-4 rounded-full"
              src={row?.profilePicture}
              alt=""
            />
          ) : (
            <div className="w-9 h-9 rounded-full font-bold text-xl flex items-center justify-center border bg-main text-white">
              {row?.name && row?.name?.substring(0, 1)}
            </div>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "NAME",
      width: "200px",
      selector: (row) => row?.name,
      cell: (row) => (
        <div className=" ">
          {row?.name?.length > 21
            ? row?.name?.substring(0, 21) + "..."
            : row?.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "ADDRESS",
      width: "140px",
      selector: (row) => row?.address,
      cell: (row) => <div className=" ">{row?.address}</div>,
      sortable: true,
    },
    {
      name: "TYPE",
      width: "80px",

      selector: (row) => row?.type,
      cell: (row) => <div className="w-12 ">{row?.type}</div>,
      sortable: true,
    },
    {
      name: "IS BOOSTED",
      selector: (row) => row?.isBoosted,
      width: "120px",

      cell: (row) => (
        <div className="px-2 py-4 w-10 ">{row?.isBoosted ? "Yes" : "No"}</div>
      ),
      sortable: true,
    },

    {
      name: "IS SUBSCRIBED",
      width: "140px",
      selector: (row) => row?.isSubscribed,
      cell: (row) => (
        <div className="px-2 py-4 w-20">{row?.isSubscribed ? "Yes" : "No"}</div>
      ),
      sortable: true,
    },
    {
      name: "RATING",
      selector: (row) => row?.rating?.average,
      width: "100px",
      cell: (row) => (
        <div className="px-2 py-4 w-10 ">{row?.rating?.average}</div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <td class="px-1 w-20 text-center py-4">
          <a
            href={`/company?id=${row?._id}`}
            type="button"
            data-modal-target="editUserModal"
            data-modal-show="editUserModal"
            class="font-medium p-1 rounded-full bg-emerald-500 text-white hover:underline"
          >
            <svg
              class="w-4 h-4 text-white "
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
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
          <a
            href="/dashboard/message"
            type="button"
            data-modal-target="editUserModal"
            data-modal-show="editUserModal"
            class="font-medium p-1 rounded-full ml-3 bg-main text-white hover:underline"
          >
            <svg
              class="w-4 h-4"
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
                d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </a>
        </td>
      ),
      sortable: true,
    },
  ];
  console.log(companies);
  return (
    <div className="w-full flex h-auto pr-3 lg:pr-10 pl-3 flex-col">
      {userIsFetching && <Loading />}
      {userIsError && <p>Something went wrong unable to read the data</p>}
      <p className="mt-5 self-start text-lg font-semibold">
        Your Transaction Detail
      </p>
      <p className="py-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tempore
        debitis suscipit, voluptates maiores dignissimos. Magni rem et id
        possimus ut. Incidunt ullam at asperiores quasi tenetur quo placeat
        dolorem?
      </p>
      {user && user?.data?.length > 0 && (
        <div className="w-full items-center justify-between flex flex-col lg:flex-row gap-4">
          <div className="p-4 rounded-lg w-full border shadow-md">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-500 font-bold">Total Revenue</p>
              <div className="flex gap-2 items-center">
                <p className="text-yellow-400">
                  {(
                    (user?.data[0]?.user?.earn?.total * 100) /
                    user?.data[0]?.user?.earn?.total
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
            <div className="font-bold flex text-yellow-400 items-center justify-between w-full mt-3">
              <p>{formatNumber(user?.data[0]?.user?.earn?.total)} birr</p>

              <svg
                class="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.383 4.076a6.5 6.5 0 0 0-6.887 3.95A5 5 0 0 0 7 18h3v-4a2 2 0 0 1-1.414-3.414l2-2a2 2 0 0 1 2.828 0l2 2A2 2 0 0 1 14 14v4h4a4 4 0 0 0 .988-7.876 6.5 6.5 0 0 0-5.605-6.048Z" />
                <path d="M12.707 9.293a1 1 0 0 0-1.414 0l-2 2a1 1 0 1 0 1.414 1.414l.293-.293V19a1 1 0 1 0 2 0v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-2-2Z" />
              </svg>
            </div>
          </div>

          <div className="p-4 rounded-lg w-full border shadow-md">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-500 font-bold">Withdraw Amount</p>
              <div className="flex gap-2 items-center">
                <p className="text-red-500">
                  {(
                    (user?.data[0]?.user?.earn?.withdraw * 100) /
                    user?.data[0]?.user?.earn?.total
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>

            <div className="font-bold flex text-main items-center justify-between w-full mt-3">
              <p>{formatNumber(user?.data[0]?.user?.earn?.withdraw)} birr</p>
              <svg
                class="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 15a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm3.845-1.855a2.4 2.4 0 0 1 1.2-1.226 1 1 0 0 1 1.992-.026c.426.15.809.408 1.111.749a1 1 0 1 1-1.496 1.327.682.682 0 0 0-.36-.213.997.997 0 0 1-.113-.032.4.4 0 0 0-.394.074.93.93 0 0 0 .455.254 2.914 2.914 0 0 1 1.504.9c.373.433.669 1.092.464 1.823a.996.996 0 0 1-.046.129c-.226.519-.627.94-1.132 1.192a1 1 0 0 1-1.956.093 2.68 2.68 0 0 1-1.227-.798 1 1 0 1 1 1.506-1.315.682.682 0 0 0 .363.216c.038.009.075.02.111.032a.4.4 0 0 0 .395-.074.93.93 0 0 0-.455-.254 2.91 2.91 0 0 1-1.503-.9c-.375-.433-.666-1.089-.466-1.817a.994.994 0 0 1 .047-.134Zm1.884.573.003.008c-.003-.005-.003-.008-.003-.008Zm.55 2.613s-.002-.002-.003-.007a.032.032 0 0 1 .003.007ZM4 14a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Zm3-2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm6.5-8a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-.796l-2.341 2.049a1 1 0 0 1-1.24.06l-2.894-2.066L6.614 9.29a1 1 0 1 1-1.228-1.578l4.5-3.5a1 1 0 0 1 1.195-.025l2.856 2.04L15.34 5h-.84a1 1 0 0 1-1-1Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="p-4 rounded-lg w-full border shadow-md">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-500 font-bold">Remaining Balance</p>
              <div className="flex gap-2 items-center">
                <p className="text-emerald-500">
                  {(
                    (user?.data[0]?.user?.earn?.current * 100) /
                    user?.data[0]?.user?.earn?.total
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>

            <div className="font-bold flex text-emerald-500 items-center justify-between w-full mt-3">
              <p>{formatNumber(user?.data[0]?.user?.earn?.current)} birr</p>
              <svg
                class="w-6 h-6 "
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
                  d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <p className="mt-10 self-start font-bold">Your Companies</p>
      <div className="w-full flex items-center gap-5 lg:gap-8 mt-3 justify-between">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="rounded-md w-full px-2"
          placeholder="Search Companies"
        />
        <a
          href="/dashboard/sales/company"
          className="px-1 lg:px-3 py-2 w-32 rounded-md bg-main text-white"
        >
          See More
        </a>
      </div>

      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read users data</p>}

      <div className="mt-5 w-full">
        <Tables data={companies?.data} columns={columns} hideTitle={true} />
      </div>

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
  );
};

export default Earns;
