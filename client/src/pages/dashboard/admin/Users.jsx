// import React, { useEffect, useState } from "react";
// import LoadingButton from "../../../components/loading/LoadingButton";
// import {
//   useLazyReadQuery,
//   useUpdateMutation,
// } from "../../../features/api/apiSlice";
// import Response from "../../../components/Response";
// import { format } from "timeago.js";
// import Loading from "../../../components/loading/Loading";
// import Pop from "../../../components/Pop";
// import Tables from "../../../components/Tables";
// import ResponsivePagination from "react-responsive-pagination";
// import "./../../categories/pagination.css";
// import ProfilePicture from "../../../components/ProfilePicture";
// import CompanyItems from "../../../components/CompanyItems";

// const UserSales = ({ type }) => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [totalPage, setTotalPage] = useState(1);

//   const [trigger, { data: users, isFetching, isError }] = useLazyReadQuery();

//   useEffect(() => {
//     setPage(1);
//   }, []);

//   useEffect(() => {
//     setTotalPage(Math.ceil(users?.total / 10));
//   }, [users]);

//   useEffect(() => {
//     trigger({
//       url: `/user/users?role=${type}&limit=10&page=${page}&populatingType=users&populatingValue=user`,
//       tag: ["users"],
//     });
//   }, [page]);

//   useEffect(() => {
//     trigger({
//       url: `/user/users?role=${type}&limit=10&page=${page}&searchField=email&searchValue=${search}&populatingType=users&populatingValue=user`,
//       tag: ["users"],
//     });
//   }, [search]);

//   const [deleteData, deleteResponse] = useUpdateMutation();
//   const [deletePending, setDeletePending] = useState(false);
//   const [add, setAdd] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const [id, setId] = useState("");
//   const [value, setValue] = useState(true);
//   const [user, setUser] = useState();

//   const deleteHandler = () => {
//     id &&
//       deleteData({
//         isActive: value,
//         url: `/user/users?id=${id}`,
//         tag: ["users"],
//       });
//   };

//   useEffect(() => {
//     if (deleteResponse?.status === "fulfilled") {
//       setPopup(false);
//     }
//   }, [deleteResponse]);

//   const columns = [
//     {
//       name: "FULL NAME",
//       selector: (row) => row?.user?.firstName,
//       cell: (row) => (
//         <div className="">
//           {row?.user?.firstName + " " + row?.user?.lastName}
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "PROFILE",
//       cell: (row) => <ProfilePicture user={row} />,
//       sortable: true,
//     },
//     {
//       name: "EMAIL",
//       selector: (row) => row.email,
//       cell: (row) => <div className="">{row.email}</div>,
//       sortable: true,
//     },

//     {
//       name: "CREATED AT",
//       selector: (row) => row.createdAt,
//       cell: (row) => <div className="">{format(row.createdAt)}</div>,
//       sortable: true,
//     },

//     {
//       name: "STATUS",
//       selector: (row) => row.isActive,
//       cell: (row) => (
//         <div className="">{row?.isActive === true ? "Active" : "Freezed"}</div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-1 justify-between items-center">
//           <button
//             onClick={() => {
//               setPopup(true);
//               setId(row._id);
//               setValue(row?.isActive ? false : true);
//             }}
//             className="px-1 py-1 w-16 bg-main text-white rounded-lg"
//           >
//             {row?.isActive ? "Freeze" : "Activate"}
//           </button>
//           <button
//             onClick={() => {
//               setUser(row);
//               setAdd(true);
//             }}
//             className="px-1 py-1 w-14 bg-emerald-500 text-white rounded-lg"
//           >
//             Detail
//           </button>
//         </div>
//       ),
//       sortable: true,
//     },
//   ];

//   console.log(user, "users");
//   return (
//     <div className="flex min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
//       <Response response={deleteResponse} setPending={setDeletePending} />

//       <div className="flex px-5 items-center justify-between">
//         <input
//           onChange={(e) => setSearch(e.target.value)}
//           type="search"
//           id="default-search"
//           class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="Search..."
//           required
//         />
//       </div>
//       <div className="w-full">
//         {isFetching && <Loading />}
//         {isError && <p>Something went wrong unable to read boost data</p>}
//         {users && users?.data?.length > 0 ? (
//           <div>
//             <Tables data={users?.data} columns={columns} title="users" />
//             <div className="py-10">
//               <ResponsivePagination
//                 total={totalPage}
//                 current={page}
//                 onPageChange={(currentPage) => setPage(currentPage)}
//                 previousLabel="Previous"
//                 previousClassName="w-24"
//                 nextClassName="w-24"
//                 nextLabel="Next"
//               />
//             </div>
//           </div>
//         ) : (users && users?.message) || users?.data?.length === 0 ? (
//           <div>There is no data to display.</div>
//         ) : null}
//       </div>
//       {popup && (
//         <Pop
//           content="Are you sure you want to remove this price?"
//           cancel={setPopup}
//           trigger={
//             <LoadingButton
//               pending={deletePending}
//               onClick={deleteHandler}
//               title="Yes, I'm Sure"
//               color="bg-main"
//               width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
//             />
//           }
//         />
//       )}
//       {add && user && (
//         <div className="absolute flex flex-col shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
//           <div className="relative cursor-pointer">
//             <svg
//               class="w-6 absolute top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
//               aria-hidden="true"
//               onClick={() => setAdd(false)}
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M6 18 17.94 6M18 18 6.06 6"
//               />
//             </svg>
//           </div>
//           {type !== "company" && (
//             <div className="w-full flex flex-col gap-2 divide-y-2">
//               <div className="py-2 mt-7">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Profile
//                 </label>
//                 <ProfilePicture user={user} />
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Full Name
//                 </label>
//                 <p className="font-normal">
//                   {user?.user?.firstName +
//                     " " +
//                     user?.user?.middleName +
//                     " " +
//                     user?.user?.lastName}
//                 </p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Email
//                 </label>
//                 <p className="font-normal">{user?.email}</p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Gender
//                 </label>
//                 <p className="font-normal">{user?.gender}</p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Phone
//                 </label>
//                 <p className="font-normal">{user?.phone}</p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Address
//                 </label>
//                 <p className="font-normal">{user?.address}</p>
//               </div>
//               {type === "sales" && (
//                 <div className="py-2 mt-2">
//                   <label
//                     for="name"
//                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Earn
//                   </label>
//                   <p className="font-normal">{user?.earn?.total}</p>
//                 </div>
//               )}
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Profile Fill Status
//                 </label>
//                 <p className="font-normal">{user?.profileFillStatus}</p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Bio
//                 </label>
//                 <p className="font-normal">{user?.bio}</p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Account Created At
//                 </label>
//                 <p className="font-normal">{format(user?.createdAt)}</p>
//               </div>
//               <div className="py-2 mt-2">
//                 <label
//                   for="name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Account Updated At
//                 </label>
//                 <p className="font-normal">{format(user?.updatedAt)}</p>
//               </div>
//             </div>
//           )}
//           {type === "company" && (
//             <div className="py-10">
//               <CompanyItems
//                 value={user?.user?._id}
//                 phoneNo={`${user?.user?.phone?.substring(0, 5)}**`}
//                 type="small"
//                 data={user?.user}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserSales;

import React, { useEffect, useState } from "react";
import LoadingButton from "../../../components/loading/LoadingButton";
import {
  useCreateMutation,
  useLazyReadQuery,
  useReadQuery,
  useUpdateMutation,
  useUserRegisterMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import { format } from "timeago.js";
import Loading from "../../../components/loading/Loading";
import Pop from "../../../components/Pop";
import Tables from "../../../components/Tables";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";
import ProfilePicture from "../../../components/ProfilePicture";

const UserSales = ({ type }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [userType, setUserType] = useState("visitor");
  const [commission, setCommission] = useState(0);

  const [trigger, { data: users, isFetching, isError }] = useLazyReadQuery();
  const {
    data: commissionData,
    isFetching: commissionIsFetching,
    isError: commissionIsErr,
  } = useReadQuery({ url: "/user/commissions", tag: ["commissions"] });

  useEffect(() => {
    if (commissionData?.data) {
      setCommission(
        commissionData?.data[0]?.value
          ? commissionData?.data[0]?.value
          : commission
      );
    }
  }, [commissionData]);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(users?.total / 10));
  }, [users]);

  useEffect(() => {
    trigger({
      url: `/user/users?role=${userType}&limit=10&page=${page}&searchField=email&searchValue=${search}&populatingType=users&populatingValue=user`,
      tag: ["users"],
    });
  }, [page, search, userType]);

  const [deleteData, deleteResponse] = useUpdateMutation();
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [value, setValue] = useState(true);
  const [user, setUser] = useState();

  const [addAdmin, setAddAdmin] = useState(false);

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
          <a
            href={
              userType === "company"
                ? `/dashboard/admin/companies/manage?id=${row?._id}`
                : `/dashboard/admin/users/manage?user=${userType}&id=${row?._id}`
            }
            className="px-1 py-1 w-11 bg-emerald-500 text-white rounded-lg"
          >
            More
          </a>
          {/* <button
            onClick={() => {
              setUser(row);
              setAdd(true);
            }}
            className="px-1 py-1 w-14 bg-emerald-500 text-white rounded-lg"
          >
            Detail
          </button> */}
        </div>
      ),
      sortable: true,
    },
  ];

  //register new admin
  const [signupData, signupResponse] = useUserRegisterMutation();
  const [commissionUpdateData, commissionUpdateResponse] = useUpdateMutation();
  const [commissionCreateData, commissionCreateResponse] = useCreateMutation();
  const [commissionPending, setCommissionPending] = useState(false);
  const [signupPending, setSignupPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = () => {
    signupData({
      role: userType,
      email,
      signupType: "other",
      password,
      confirmPassword,
    });
  };
  useEffect(() => {
    if (signupResponse?.status === "fulfilled") {
      window.location.reload();
    }
  }, [signupResponse]);

  const commissionHandler = () => {
    if (commissionData?.data?.length > 0) {
      commissionUpdateData({
        value: commission,
        url: `/user/commissions?id=${commissionData?.data[0]?._id}`,
        tag: ["commissions"],
      });
    } else {
      commissionCreateData({
        value: commission,
        url: `/user/commissions`,
        tag: ["commissions"],
      });
    }
  };

  console.log(user, "users");
  return (
    <div className="flex px-[4%] min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={deleteResponse} setPending={setDeletePending} />
      <Response
        response={commissionCreateResponse}
        setPending={setCommissionPending}
      />
      <Response
        response={commissionUpdateResponse}
        setPending={setCommissionPending}
      />

      <select
        onChange={(e) => setUserType(e.target.value)}
        name=""
        id=""
        className="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected value="visitor">
          Visitor
        </option>
        <option value="sales">Sales</option>
        <option value="company">Company</option>
        <option value="news-admin">News Admin</option>
        <option value="blog-admin">Blog Admin</option>
        <option value="youtube-admin">Youtube Admin</option>
        <option value="job-admin">Job Admin</option>
      </select>

      <div className="flex items-center gap-5 justify-between">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />
        {userType === "sales" && (
          <div className="w-full flex items-center gap-3">
            <div className="flex flex-col gap-2 ">
              <p>Sales commission</p>{" "}
              <input
                onChange={(e) => setCommission(e.target.value)}
                value={commission}
                type="number"
                class="block w-full max-w-md px-2 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                min={0}
                required
              />
            </div>

            <LoadingButton
              pending={commissionPending}
              onClick={commissionHandler}
              title="Change"
              color="bg-main"
              width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
            />
          </div>
        )}
        {userType === "blog-admin" ||
        userType === "news-admin" ||
        userType === "youtube-admin" ||
        userType === "job-admin" ? (
          <button
            onClick={() => {
              setAddAdmin(true);
            }}
            className="px-2 py-2 bg-main text-white rounded-lg"
          >
            Add new admin
          </button>
        ) : null}
      </div>
      <div className="w-full">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read users data</p>}
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
      {/* {add && user && (
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
      )} */}

      {addAdmin && (
        <div className="absolute flex flex-col shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
          <div className="relative cursor-pointer">
            <svg
              class="w-6 absolute top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              onClick={() => setAddAdmin(false)}
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
          <div className="py-5">
            <Response response={signupResponse} setPending={setSignupPending} />
            <div class="max-w-sm px-12 py-8 rounded-lg border shadow-lg mx-auto">
              {/* <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Register
                </label>

                <select
                  name=""
                  id=""
                  className="w-full border-gray-300 border rounded-lg p-3"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="blog-admin">Blog Admin</option>
                  <option value="news-admin">News Admin</option>
                </select>
              </div> */}
              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="repeat-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="repeat-password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>

              <LoadingButton
                pending={signupPending}
                onClick={signupHandler}
                title="Create account"
                color="bg-main"
                width="w-48"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSales;
