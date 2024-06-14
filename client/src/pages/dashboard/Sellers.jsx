import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import ReactApexChart from "react-apexcharts";
import { CircleOutlined, MoreVert } from "@mui/icons-material";
import Promotion from "../../components/Promotion";
import { useCompanyDashboardAggregationQuery } from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import { format } from "timeago.js";
import CircularProgressBar from "../../components/CircularProgressBar";
import { CircularProgressbar } from "react-circular-progressbar";

const Sellers = (props) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [saveData, setSaveData] = useState([]);
  const [viewData, setViewData] = useState([]);

  const { data, isFetching, isError } = useCompanyDashboardAggregationQuery({
    id: user?.user?._id,
    type: "sales",
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
          enabled: true,
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
            stops: [0, 1, 2],
          },
        },

        yaxis: {
          // tickAmount: 11,
          show: true,
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
    <div className="w-full pb-10 md:pr-3 lg:pr-10 md:pl-3 flex flex-col lg:flex-row gap-5">
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
                    href="/dashboard/sales/company"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Company</p>
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

                      <p> {formatNumber(data?.company?.length)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/saves"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Saves</p>
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

                      <p>{formatNumber(data?.saves?.length)}+</p>
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

                      <p> {formatNumber(data?.views?.length)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/sales/ratings"
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
                        {data?.user?.rating?.average}{" "}
                        <span className="text-gray-400">/</span>5
                      </p>
                    </div>
                  </a>
                </div>
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

            <p className="text-lg mt-5 font-bold">Your Companies</p>
            <div className="flex bg-gray-100 mb-5 dark:bg-gray-700 flex-col gap-2 p-2 w-full">
              {data?.company?.map((e, i) => {
                return (
                  <a
                    href={`/company?id=${e?._id}`}
                    key={i}
                    className="flex flex-col lg:flex-row p-4 bg-white bg-dark border border-dark hover:border-main rounded-xl items-center justify-between"
                  >
                    {e?.logo?.length > 1 ? (
                      <img
                        class="w-12 h-12 me-4 rounded-full"
                        src={e?.logo}
                        alt=""
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full font-bold text-4xl flex items-center justify-center border bg-main text-white">
                        {e?.name && e?.name?.substring(0, 1)}
                      </div>
                    )}
                    <div className="flex flex-col gap-1 items-start">
                      <p className="text-lg font-semibold">
                        {e?.name?.length > 21
                          ? e?.name?.substring(0, 20) + "..."
                          : e?.name}
                      </p>
                      <p className="text-sm">
                        {e?.title?.length > 27
                          ? e?.title?.substring(0, 27) + "..."
                          : e?.title}
                      </p>
                    </div>

                    <div className="flex text-sm flex-col gap-1 items-start">
                      <p className="font-semibold">{e?.address}</p>
                      <p className="">2 days ago</p>
                    </div>
                  </a>
                );
              })}
            </div>
            <div class="relative sm:rounded-lg">
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
                          Action
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
                                {e?.company?.logo?.length > 1 ? (
                                  <img
                                    class="w-12 h-12 me-4 rounded-full"
                                    src={e?.company?.logo}
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-full font-bold text-4xl flex items-center justify-center border bg-main text-white">
                                    {e?.company?.name &&
                                      e?.company?.name?.substring(0, 1)}
                                  </div>
                                )}

                                <div class="ps-3">
                                  <div class="text-base font-semibold">
                                    {e?.company?.name?.length > 17
                                      ? e?.company?.name?.substring(0, 17) +
                                        "..."
                                      : e?.company?.name}
                                  </div>

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
                          ACTION
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
                                {e?.company?.logo?.length > 1 ? (
                                  <img
                                    class="w-12 h-12 me-4 rounded-full"
                                    src={e?.company?.logo}
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-full font-bold text-4xl flex items-center justify-center border bg-main text-white">
                                    {e?.company?.name &&
                                      e?.company?.name?.substring(0, 1)}
                                  </div>
                                )}

                                <div class="ps-3">
                                  <div class="text-base font-semibold">
                                    {e?.company?.name?.length > 17
                                      ? e?.company?.name?.substring(0, 17) +
                                        "..."
                                      : e?.company?.name}
                                  </div>

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
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full pr-4 lg:flex-[32%]">
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
                  <p className="text-sm">Total earn</p>
                  <p className="text-xs ">{data?.user?.earn?.total} birr</p>
                </div>
                <a
                  href="/dashboard/sales/earns"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
              <div className="flex relative p-2 w-full xl:w-[90px] h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-main rounded-sm">
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
                  <p className="text-sm">Withdraw</p>
                  <p className="text-xs">{data?.user?.earn?.withdraw} birr</p>
                </div>
                <a
                  href="/dashboard/sales/earns"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
              <div className="flex p-2 w-full xl:w-[90px] relative h-full bg-white bg-dark">
                <div className="rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-yellow-400 rounded-sm">
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
                  <p className="text-sm">Remaining</p>
                  <p className="text-xs">{data?.user?.earn?.current} birr</p>
                </div>
                <a
                  href="/dashboard/sales/earns"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
            </div>
            <div className="bg-white bg-dark py-4 mt-3 border-b-2 border-gray-100">
              <p className="text-lg text-gray-400 font-bold">
                Profile Fill Status
              </p>
              <div className="flex relative w-full flex-col items-center justify-center gap-2 mt-4">
                <CircularProgressbar value={30} className="h-28 w-28" />
                <div className="absolute top-[25%] text-3xl font-bold text-red">
                  {data?.user?.profileFill}%
                </div>
                <a
                  href="/dashboard/visitor/profile"
                  className="flex py-1 text-sm px-3 w-full text-center items-center justify-center hover:text-white hover:bg-emerald-500 rounded-sm mt-2 text-emerald-500 border gap-1 border-emerald-500 font-semibold"
                >
                  Edit your profile
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
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-lg text-gray-400 font-bold mt-5">
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

export default Sellers;
