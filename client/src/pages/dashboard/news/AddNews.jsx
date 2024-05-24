// import React, { useEffect, useState } from "react";
// import LoadingButton from "../../../components/loading/LoadingButton";
// import {
//   useCreateMutation,
//   useDeleteMutation,
//   useLazyReadQuery,
//   useReadQuery,
//   useUpdateMutation,
// } from "../../../features/api/apiSlice";
// import Response from "../../../components/Response";
// import { format } from "timeago.js";
// import Loading from "../../../components/loading/Loading";
// import ResponsivePagination from "react-responsive-pagination";
// import "./../../categories/pagination.css";
// import Pop from "../../../components/Pop";
// import Editor from "../../../components/Editor";

// const AddNews = () => {
//   const user = JSON.parse(localStorage.getItem("etblink_user"));
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [totalPage, setTotalPage] = useState(1);

//   const [trigger, { data: news, isFetching, isError }] = useLazyReadQuery();

//   useEffect(() => {
//     setPage(1);
//   }, []);

//   useEffect(() => {
//     setTotalPage(Math.ceil(news?.total / 6));
//   }, [news]);
//   const fetchBy = user?.role === "news-admin" ? `createdBy=${user?._id}` : "";
//   useEffect(() => {
//     trigger({
//       url: `/user/news?${fetchBy}&limit=6&page=${page}`,
//       tag: ["news"],
//     });
//   }, [page]);

//   useEffect(() => {
//     trigger({
//       url: `/user/news?${fetchBy}&limit=6&page=${page}&searchField=title&searchValue=${search}`,
//       tag: ["news"],
//     });
//   }, [search]);

//   const [addData, addResponse] = useCreateMutation();
//   const [deleteData, deleteResponse] = useDeleteMutation();
//   const [pending, setPending] = useState(false);
//   const [deletePending, setDeletePending] = useState(false);
//   const [add, setAdd] = useState(false);
//   const [photo, setPhoto] = useState("");
//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const [category, setCategory] = useState("local");
//   const [description, setDescription] = useState("");

//   const addHandler = () => {
//     const formData = new FormData();
//     formData.append("newsPhoto", photo);
//     formData.append("title", title);
//     formData.append("subTitle", subTitle);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("role", user?.role);
//     formData.append("createdBy", user?._id);
//     formData.append("updatedBy", user?._id);
//     formData.append("url", `/user/news`);
//     formData.append("tag", ["news"]);
//     addData(formData);
//   };

//   const [popup, setPopup] = useState(false);
//   const [id, setId] = useState("");
//   useEffect(() => {
//     if (deleteResponse?.status === "fulfilled") {
//       setPopup(false);
//     }
//   }, [deleteResponse]);

//   const deleteHandler = () => {
//     id && deleteData({ url: `/user/news?id=${id}`, tag: ["news"] });
//   };

//   console.log(news, "news");
//   return (
//     <div className="flex pb-5 min-h-[85vh]  relative bg-dark bg-white flex-col h-auto w-full gap-5">
//       <Response response={addResponse} setPending={setPending} />
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

//         <button
//           onClick={() => setAdd(true)}
//           className="px-5 self-end rounded-lg py-2 text-white bg-main"
//         >
//           Add New
//         </button>
//       </div>
//       <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
//         {isFetching && <Loading />}
//         {isError && <p>Something went wrong for reading news data</p>}
//         {news && news?.data?.length > 0 ? (
//           news?.data?.map((e) => {
//             return (
//               <div
//                 key={e._id}
//                 className="flex flex-col gap-2 rounded-lg p-4 border border-gray-300 shadow-lg"
//               >
//                 <div className="relative">
//                   <img
//                     src={e?.newsPhoto}
//                     alt=""
//                     className="h-40 w-full rounded-sm"
//                   />
//                   <div className=" absolute  text-white top-[126px] right-2">
//                     <div
//                       class="block relative mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       for="file_input"
//                     >
//                       <svg
//                         class="w-6 h-6 text-gray-800 dark:text-white"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linejoin="round"
//                           stroke-width="2"
//                           d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
//                         />
//                         <path
//                           stroke="currentColor"
//                           stroke-linejoin="round"
//                           stroke-width="2"
//                           d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                         />
//                       </svg>{" "}
//                       <input
//                         onChange={(e) => setPhoto(e.target.files[0])}
//                         class="block z-20 opacity-0 absolute top-0 left-0 w-6 h-6 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                         id="file_input"
//                         type="file"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <p className="font-bold">{e?.title}</p>
//                 <p className="font-bold">{e?.subTitle}</p>
//                 <div
//                   className="ql-editor"
//                   dangerouslySetInnerHTML={{ __html: e?.description }}
//                 ></div>
//                 <p className="text-sm self-end font-light">{format(e?.createdAt)}</p>
//                 <div className="flex w-full gap-3 items-center justify-between">
//                   <button
//                     onClick={() => {
//                       setPopup(true);
//                       setId(e._id);
//                     }}
//                     className="py-2 w-32 rounded-lg bg-main text-white"
//                   >
//                     Delete
//                   </button>
//                   <a
//                     href={`/dashboard/${user?.role}/news/detail?${e._id}`}
//                     className="py-2 w-36 rounded-lg bg-emerald-500 text-center text-white"
//                   >
//                     Detail
//                   </a>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div>There is no data to display.</div>
//         )}
//       </div>
//       <div className="py-10">
//         <ResponsivePagination
//           total={totalPage}
//           current={page}
//           onPageChange={(currentPage) => setPage(currentPage)}
//           previousLabel="Previous"
//           previousClassName="w-24"
//           nextClassName="w-24"
//           nextLabel="Next"
//         />
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
//       {add && (
//         <div className="absolute  z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
//           <div className="relative">
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
//           <div className="mb-5 mt-5">
//             <label
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               for="file_input"
//             >
//               Upload file
//             </label>
//             <input
//               onChange={(e) => setPhoto(e.target.files[0])}
//               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//               id="file_input"
//               type="file"
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               for="name"
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Title
//             </label>
//             <input
//               onChange={(e) => setTitle(e.target.value)}
//               type="text"
//               id="name"
//               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Skylight Technologies"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               for="name"
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Sub Title
//             </label>
//             <input
//               onChange={(e) => setSubTitle(e.target.value)}
//               type="text"
//               id="name"
//               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Skylight Technologies"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               for="name"
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Category
//             </label>
//             <select
//               onChange={(e) => setCategory(e.target.value)}
//               type="text"
//               id="name"
//               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Skylight Technologies"
//               required
//             >
//               <option selected value="local">
//                 Local
//               </option>
//               <option value="global">Global</option>
//             </select>
//           </div>
//           <div className="mb-5">
//             <label
//               for="name"
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Description
//             </label>

//             <Editor
//               description={description}
//               setDescription={setDescription}
//               theme="snow"
//             />
//           </div>
//           <LoadingButton
//             pending={pending}
//             onClick={addHandler}
//             title="Add"
//             color="bg-main"
//             width="w-52"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddNews;

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
import { Delete, Edit } from "@mui/icons-material";
import ResponsivePagination from "react-responsive-pagination";
import "./../../categories/pagination.css";

const AddNews = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: news, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);
  const fetchBy = user?.role === "news-admin" ? `createdBy=${user?._id}` : "";

  useEffect(() => {
    setTotalPage(Math.ceil(news?.total / 30));
  }, [news]);

  useEffect(() => {
    trigger({
      url: `/user/news?${fetchBy}&limit=30&page=${page}`,
      tag: ["news"],
    });
  }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/news?${fetchBy}&limit=30&page=${page}&searchField=title&searchValue=${search}`,
      tag: ["news"],
    });
  }, [search]);

  const [addData, addResponse] = useCreateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [updateData, updateResponse] = useUpdateMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [newsPhoto, setNewsPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [visible, setVisible] = useState();

  const addHandler = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("newsPhoto", newsPhoto);
    formData.append("description", description);
    formData.append("role", user?.role);
    formData.append("createdBy", user?._id);
    formData.append("updatedBy", user?._id);
    formData.append("url", `/user/news`);
    formData.append("tag", ["news"]);
    addData(formData);
  };

  const deleteHandler = () => {
    id && deleteData({ url: `/user/news?id=${id}`, tag: ["news"] });
  };

  const updateHandler = (ids, value) => {
    updateData({
      visible: value ? false : true,
      url: `/user/news?id=${ids}`,
      tag: ["news"],
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
      name: "IMAGE",
      cell: (row) => (
        <img src={row.newsPhoto} className="w-20 border h-10 rounded-sm" />
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
            href={`/dashboard/${user?.role}/news/detail?${row._id}`}
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

  console.log(news, "news");
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
        {news && news?.data?.length > 0 ? (
          <div>
            <Tables data={news?.data} columns={columns} title="news" />
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
        ) : (news && news?.message) || news?.data?.length === 0 ? (
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

          <div className="mb-5">
            <label class="block text-sm font-medium">Image</label>
            <div
              class={`mt-4  flex justify-center object-fill object-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto text-main h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload1"
                    class="relative cursor-pointer rounded-md font-medium text-main hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span class="">Upload an image</span>
                    <input
                      onChange={(e) => setNewsPhoto(e.target.files[0])}
                      id="file-upload1"
                      name="file-upload1"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">res 120 x 120 pixels</p>
                </div>
                <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
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

export default AddNews;
