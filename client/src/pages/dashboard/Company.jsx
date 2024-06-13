import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Charts from "../../components/Charts";
import ReactApexChart from "react-apexcharts";
import SmallChart from "../../components/SmallChart";
import { Diversity2, Message, More, MoreVert } from "@mui/icons-material";
import gedi from "../../assets/gedi.jpg";
import flag from "../../assets/etbetio.png";
import Promotion from "../../components/Promotion";
import Tables from "../../components/Tables";
import { useCompanyDashboardAggregationQuery } from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import ProfilePicture from "../../components/ProfilePicture";
import { format } from "timeago.js";

const Company = (props) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [saveData, setSaveData] = useState([]);
  const [viewData, setViewData] = useState([]);

  const { data, isFetching, isError } = useCompanyDashboardAggregationQuery({
    id: user?.user?._id,
  });

  const formatDate = (date) => {
    return new Date(date)?.toDateString()?.split(" ")?.splice(1, 4)?.join(" ");
  };

  useEffect(() => {
    const view = [];
    const save = [];
    data?.save?.map((e) => {
      save.push([e?._id?.createdAt, e?.total]);
    });

    data?.view?.map((e) => {
      view.push([e?._id?.createdAt, e?.total]);
    });

    setViewData(view);
    setSaveData(save);
  }, [data]);

  const formatNumber = (number) => {
    return number?.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      notation: "compact",
      compactDisplay: "short",
    });
  };

  const tableData = (val) => {
    return {
      series: [
        {
          name: `${val === "save" ? "Saves" : "Views"}`,
          data: val === "save" ? saveData : viewData,
        },
      ],

      options: {
        chart: {
          type: "area",
          toolbar: { show: false },
          parentHeightOffset: 0,
        },
        colors: val === "save" ? ["#00aeff"] : ["red"],
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: `Last 30 day ${val === "save" ? "Saves" : "Views"}`,
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 5, 10],
          },
        },

        yaxis: {
          tickAmount: 3,
          show: false,
          labels: {
            show: false,
            offsetX: -25,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        xaxis: {
          type: "datetime",
        },

        tooltip: {
          shared: true,
          y: {
            formatter: function (val) {
              return formatNumber(val);
            },
          },
        },
      },
    };
  };
  console.log(saveData, viewData, data, "data");
  return (
    <div className="w-full pb-10 pr-3 lg:pr-10 pl-3 flex flex-col lg:flex-row gap-5">
      {isFetching && (
        <div className="w-full flex items-center justify-center py-5">
          <Loading />
        </div>
      )}
      {isError && <p>Something went wrong unable to read boost data</p>}
      {data && (
        <>
          <div className="flex flex-col lg:border-r pr-4 w-full lg:flex-[68%]">
            <Promotion />
            <div className="flex flex-col lg:flex-rows gap-2  rounded-sm p-4s mt-5">
              <div className="flex flex-col gap-3">
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 items-start justify-between gap-2">
                  <a
                    href="/dashboard/saves"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Total Saves</p>
                    <div className="text-xl flex items-center gap-4 text-[#00aeff] font-bold">
                      <svg
                        class="w-6 h-6 text-blue-600"
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
                          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                      </svg>

                      <p> {formatNumber(data?.company?.saves?.total)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/saves"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Available Saves</p>
                    <div className="text-xl flex items-center gap-4 text-main font-bold">
                      <svg
                        class="w-6 h-6 text-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                      </svg>

                      <p>{formatNumber(data?.company?.saves?.available)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/views"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Views</p>
                    <div className="text-xl flex items-center gap-4 text-emerald-400 font-bold">
                      <svg
                        class="w-6 h-6 text-emerald-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <p> {formatNumber(data?.company?.views?.total)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/company/ratings"
                    className="flex cursor-pointer hover:bg-gray-100 rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Ratings</p>
                    <div className="text-xl flex items-center gap-4 text-yellow-500 font-bold">
                      <svg
                        class="w-6 text-yellow-400 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="m13.001 19.927 2.896 1.773c1.52.93 3.405-.442 2.992-2.179l-1.06-4.452 3.468-2.978c1.353-1.162.633-3.382-1.142-3.525L15.603 8.2l-1.754-4.226A1.973 1.973 0 0 0 13 3v16.927ZM10.999 3c-.36.205-.663.53-.848.974L8.397 8.2l-4.552.366c-1.775.143-2.495 2.363-1.142 3.525l3.468 2.978-1.06 4.452c-.413 1.737 1.472 3.11 2.992 2.178l2.896-1.773V3Z" />
                      </svg>
                      <p className="mt-[2px]">
                        {data?.company?.rating?.average}
                      </p>
                    </div>
                  </a>
                </div>

                {/* <div id="chart-line" className="p-2 bg-gray-100 dark:bg-gray-700">
              <div className="bg-white bg-dark">
                <SmallChart
                  type="line"
                  color="#000FFF"
                  height={115}
                  markers={{
                    size: 5,
                    colors: undefined,
                    strokeColors: "#fff",
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                      size: undefined,
                      sizeOffset: 3,
                    },
                  }}
                  series={[
                    {
                      name: "Latest activities",
                      data: [0, 3, 1, 5, 2, 4, 2, 6],
                    },
                  ]}
                />
              </div>
            </div> */}
              </div>

              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-sm flex-col lg:flex-row relative -mt-20s p-3 h-auto  justify-between items-start">
                {saveData && (
                  <div id="chart" className="bg-white bg-dark w-full ">
                    <ReactApexChart
                      options={tableData("save").options}
                      series={tableData("save").series}
                      type="area"
                      height={200}
                    />
                  </div>
                )}
                {viewData && (
                  <div id="chart" className="bg-white bg-dark w-full ">
                    <ReactApexChart
                      options={tableData("view").options}
                      series={tableData("view").series}
                      type="area"
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>

            <div class="relative sm:rounded-lg">
              <div class="flex items-center justify-between flex-column lg:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                {/*  <div>
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <span class="sr-only">Action button</span>
                Sort by
                <svg
                  class="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownAction"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownActionButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Name
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Age
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <label for="table-search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>*/}
              </div>

              <div className="flex flex-col w-full gap-4 lg:flex-row mt-2">
                <div className="w-full">
                  <div className="pb-2">Your Latest Saves</div>
                  <table class="text-sm w-full text-left border shadow-lg border-gray-200 rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-emerald-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-2 text-start py-3">
                          Profile
                        </th>
                        <th scope="col" class="px-2 text-start py-3">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.saves &&
                        data?.saves?.map((e, i) => {
                          return (
                            <tr
                              key={e?._id}
                              class="bg-white bg-dark border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                class="flex items-center px-2 text-start py-4 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {e?.saver?.profilePicture?.length > 1 ? (
                                  <img
                                    class="w-12 h-12 me-4 rounded-full"
                                    src={e?.saver?.profilePicture}
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-full font-bold text-4xl flex items-center justify-center border bg-main text-white">
                                    {e?.saver?.firstName
                                      ? e?.saver?.firstName?.substring(0, 1)
                                      : e?.saver?.name?.substring(0, 1)}
                                  </div>
                                )}

                                <div class="ps-3">
                                  {e?.saver?.firstName ? (
                                    <div class="text-base font-semibold">
                                      {e?.saver?.firstName} {e?.saver?.lastName}
                                    </div>
                                  ) : (
                                    <div class="text-base font-semibold">
                                      {e?.saver?.name?.length > 21
                                        ? e?.saver?.name?.substring(0, 20) +
                                          "..."
                                        : e?.saver?.name}
                                    </div>
                                  )}

                                  <div class="flex gap-1 justify-start items-center">
                                    <svg
                                      class="w-5 h-5 text-[#00aeff]"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>

                                    <p className="text-sm font-normal mt-1">
                                      {formatDate(e?.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </th>

                              <td class="px-1 w-20 text-center py-4">
                                <a
                                  href="/dashboard/saves"
                                  type="button"
                                  data-modal-target="editUserModal"
                                  data-modal-show="editUserModal"
                                  class="font-medium p-1 rounded-full bg-emerald-500 text-white hover:underline"
                                >
                                  <svg
                                    class="w-5 h-5 text-white "
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
                                  class="font-medium p-1 rounded-full ml-2 bg-main text-white hover:underline"
                                >
                                  <svg
                                    class="w-5 h-5"
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
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="w-full">
                  <div className="pb-2">Your Latest Views</div>

                  <table class="text-sm w-full text-left border shadow-lg border-gray-200 rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-red-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-2 text-start py-3">
                          Profile
                        </th>
                        <th scope="col" class="px-2 text-start py-3">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.views &&
                        data?.views?.map((e, i) => {
                          return (
                            <tr
                              key={e?._id}
                              class="bg-white bg-dark border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                class="flex items-center px-2 text-start py-4 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {e?.viewer?.profilePicture?.length > 1 ? (
                                  <img
                                    class="w-12 h-12 me-4 rounded-full"
                                    src={e?.viewer?.profilePicture}
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-full font-bold text-4xl flex items-start justify-start border bg-main text-white">
                                    {e?.viewer?.firstName
                                      ? e?.viewer?.firstName?.substring(0, 1)
                                      : e?.viewer?.name?.substring(0, 1)}
                                  </div>
                                )}

                                <div class="ps-3">
                                  {e?.viewer?.firstName ? (
                                    <div class="text-base font-semibold">
                                      {e?.viewer?.firstName}{" "}
                                      {e?.viewer?.lastName}
                                    </div>
                                  ) : (
                                    <div class="text-base font-semibold">
                                      {e?.viewer?.name?.length > 21
                                        ? e?.viewer?.name?.substring(0, 20) +
                                          "..."
                                        : e?.viewer?.name}
                                    </div>
                                  )}

                                  <div class="flex gap-1 justify-start items-center">
                                    <svg
                                      class="w-5 h-5 text-[#00aeff]"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>

                                    <p className="text-sm font-normal mt-1">
                                      {formatDate(e?.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </th>

                              <td class="px-1 w-20 text-center py-4">
                                <a
                                  href="/dashboard/views"
                                  type="button"
                                  data-modal-target="editUserModal"
                                  data-modal-show="editUserModal"
                                  class="font-medium p-1 rounded-full bg-emerald-500 text-white hover:underline"
                                >
                                  <svg
                                    class="w-5 h-5 text-white "
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
                                  class="font-medium p-1 rounded-full ml-2 bg-main text-white hover:underline"
                                >
                                  <svg
                                    class="w-5 h-5"
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
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {/* <Tables data={data?.views} columns={saveColumn} title="SAVES" />
            <Tables data={data?.views} columns={viewColumn} title="VIEWS" /> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full lg:flex-[32%]">
            <div className="flex gap-1 lg:flex-col xl:flex-row items-center justify-between p-2 bg-gray-100 dark:bg-gray-600 rounded-sm">
              <div className="flex relative w-full xl:w-[90px] p-2 h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-emerald-400 rounded-sm">
                    <svg
                      class="w-6 h-6"
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
                        d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">Deposit</p>
                  <p className="text-xs ">{data?.fund} Times</p>
                </div>
                <a
                  href="/dashboard/company/billing"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
              <div className="flex relative p-2 w-full xl:w-[90px] h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-yellow-400 rounded-sm">
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
                        d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">Subscribe</p>
                  <p className="text-xs">{data?.subscription} Times</p>
                </div>
                <a
                  href="/dashboard/company/subscription"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
              <div className="flex p-2 w-full xl:w-[90px] relative h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-main rounded-sm">
                    <svg
                      class="w-6 h-6"
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
                        d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">Boost</p>
                  <p className="text-xs">{data?.boost} Times</p>
                </div>
                <a
                  href="/dashboard/company/boosting"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
            </div>

            <div className="bg-white bg-dark py-4 mt-3 border-b-2 border-gray-100">
              <p className="text-xl text-gray-400 font-bold">
                Your Current Balance
              </p>
              <div className="flex w-full lg:flex-col xl:flex-row items-center gap-2 mt-4">
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat().format(
                    data?.company?.currentBalance
                  )}
                </p>
                <a
                  href="/dashboard/company/billing"
                  className="flex items-center gap-1 text-emerald-500 font-semibold"
                >
                  Add New Fund <span className="text-main">here</span>
                </a>
              </div>
            </div>

            <div className="w-full flex lg:flex-col xl:flex-row gap-10 lg:gap-2 mt-4 py-2">
              <div className="">
                <p className="text-gray-400 mb-1 text-lg">Subscription</p>
                {data?.company?.subscriptionEndDate !== 0 ? (
                  <p className="mb-1 text-emerald-500 font-bold text-sm">
                    Expired {format(data?.company?.subscriptionEndDate)}
                  </p>
                ) : (
                  <p className="mb-1 text-emerald-500 font-bold text-sm">
                    Not Subscribed Yet
                  </p>
                )}
              </div>
              <div className="">
                <p className="text-gray-400 mb-1 text-lg">Boost</p>
                {data?.company?.subscriptionEndDate !== 0 ? (
                  <p className="mb-1 text-main font-bold text-sm">
                    Expired {format(data?.company?.boostEndDate)}
                  </p>
                ) : (
                  <p className="mb-1 text-main font-bold text-sm">
                    Not Subscribed Yet
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 border shadow-lg rounded-lg p-3">
              <p className="text-xl font-semibold text-gray-400">Your sales</p>
              {/* <div className="flex mt-5 w-full flex-col items-start  hover:bg-red-100 bg-white bg-dark border-dark border p-4 justify-start">
            <div className="flex w-full items-center justify-between">
              <img
                src={gedi}
                alt=""
                className="w-28 h-28 rounded-full border border-dark border-gray-200"
              />
              <div className="flex items-center gap-2 justify-center flex-col">
                <img
                  src={flag}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-dark border-gray-200"
                />
                <p className="px-4 py-1 text-sm rounded-full text-white bg-emerald-500">
                  Active
                </p>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-xl mt-4 font-bold">Gedeon Agmas</p>
            <div class="w-full max-w-sm">
              <div class="mb-2 flex justify-between items-center">
                <label
                  for="website-url"
                  class="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Call on +2510954104637
                </label>
              </div>
              <div class="flex mt-4 items-center">
                <span class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
                  KEY
                </span>
                <div class="relative w-full">
                  <input
                    id="website-url"
                    type="text"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value="2345712546375XCD7645"
                    readonly
                    disabled
                  />
                </div>
                <button
                  data-tooltip-target="tooltip-website-url"
                  data-copy-to-clipboard-target="website-url"
                  class="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
                  type="button"
                >
                  <span id="default-icon">
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  </span>
                  <span
                    id="success-icon"
                    class="hidden inline-flex items-center"
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id="tooltip-website-url"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  <span id="default-tooltip-message">Copy link</span>
                  <span id="success-tooltip-message" class="hidden">
                    Copied!
                  </span>
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
            </div>
          </div> */}
              <div className="flex w-full mt-5 flex-col items-center justify-center">
                <div class="flex flex-col gap-3 items-center mb-4">
                  {data?.company?.sales?.profilePicture ? (
                    <img
                      class="w-24 h-24 me-4 rounded-full"
                      src={data?.company?.sales?.profilePicture}
                      alt=""
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full text-4xl flex items-center justify-center border bg-main text-white">
                      {data?.company?.sales?.firstName?.substring(0, 1)}
                    </div>
                  )}
                  <div class="font-medium gap-1 flex flex-col dark:text-white">
                    <p className="text-xl font-bold">
                      {data?.company?.sales?.firstName}{" "}
                      {data?.company?.sales?.lastName}
                    </p>
                    {/* <p className="">{sales?.data[0]?.email}</p> */}
                    <p>{data?.company?.sales?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-400 font-bold mt-5">
              Your Latest messages
            </p>
            <div className="gap-1 flex flex-col">
              {data &&
                data?.messages &&
                data?.messages?.map((e, i) => {
                  return (
                    <a
                      key={e?._id}
                      href="/dashboard/message"
                      className="flex relative md:flex-col xl:flex-row cursor-pointer hover:bg-gray-200 justify-center w-full bg-gray-100 dark:bg-gray-700 p-2 items-center rounded-xl gap-3 mt-3"
                    >
                      <p className="text-xl self-start h-10 w-10 xl:w-12 rounded-full text-center bg-main text-white relative">
                        {e?.sender?.email?.substring(0, 1)}
                      </p>

                      <div className="flex w-full flex-col">
                        <p className="block lg:hidden xl:block">
                          {e?.sender?.email}
                        </p>
                        <p className="text-xs">{e?.message?.content}</p>
                        <p className="text-xs self-end">
                          {format(e?.createdAt)}
                        </p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Company;
