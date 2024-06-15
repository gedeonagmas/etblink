import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import ReactApexChart from "react-apexcharts";
import { MoreVert } from "@mui/icons-material";
import Promotion from "../../components/Promotion";
import { useAdminDashboardAggregationQuery } from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import { format } from "timeago.js";
import { CircularProgressbar } from "react-circular-progressbar";

const Admin = (props) => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [boostData, setBoostData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);

  const { data, isFetching, isError } = useAdminDashboardAggregationQuery({
    id: user?.user?._id,
  });

  const formatDate = (date) => {
    return new Date(date)?.toDateString()?.split(" ")?.splice(1, 4)?.join(" ");
  };

  useEffect(() => {
    const boost = [];
    const subscription = [];
    data?.boost?.map((e) => {
      boost.push([e?._id?.createdAt, e?.total]);
    });

    data?.subscription?.map((e) => {
      subscription.push([e?._id?.createdAt, e?.total]);
    });

    setBoostData(boost);
    setSubscriptionData(subscription);
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
          name: `${val === "boost" ? "Boosts" : "Subscriptions"}`,
          data: val === "boost" ? boostData : subscriptionData,
        },
      ],

      options: {
        chart: {
          type: "area",
          toolbar: { show: false },
          parentHeightOffset: 0,
        },
        colors: val === "boost" ? ["#00aeff"] : ["red"],
        dataLabels: {
          enabled: true,
        },
        markers: {
          size: 0,
        },
        title: {
          text: `Last 30 day ${val === "boost" ? "Boosts" : "Subscriptions"}`,
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
  console.log(data, "data");
  return (
    <div className="w-full pb-10 md:pr-3 lg:pr-10 md:pl-3 flex flex-col lg:flex-row gap-5">
      {isFetching && (
        <div className="w-full flex items-center justify-center py-5">
          <Loading />
        </div>
      )}
      {isError && <p>Something went wrong unable to read the data</p>}
      {data && (
        <>
          <div className="flex flex-col lg:border-r pr-4 w-full lg:flex-[68%]">
            <Promotion />
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1 my-5  items-center justify-between p-2 bg-gray-100 dark:bg-gray-600 rounded-sm">
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
                  <p className="text-sm">All Users</p>
                  <p className="text-xs ">Total {formatNumber(data?.users)}</p>
                </div>
                <a
                  href="/dashboard/admin/users"
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
                  <p className="text-sm">News</p>
                  <p className="text-xs">Total {formatNumber(data?.news)}</p>
                </div>
                <a
                  href="/dashboard/admin/news"
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
                  <p className="text-sm">Youtube</p>
                  <p className="text-xs">Total {formatNumber(data?.youtube)}</p>
                </div>
                <a
                  href="/dashboard/admin/youtube"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>

              <div className="flex p-2 w-full xl:w-[90px] relative h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-[#00aeff] rounded-sm">
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
                  <p className="text-sm">Jobs</p>
                  <p className="text-xs">Total {formatNumber(data?.job)}</p>
                </div>
                <a
                  href="/dashboard/admin/job"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
              <div className="flex p-2 w-full xl:w-[90px] relative h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-indigo-500 rounded-sm">
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
                  <p className="text-sm">Sponsor</p>
                  <p className="text-xs">Total {formatNumber(data?.sponsor)}</p>
                </div>
                <a
                  href="/dashboard/admin/sponsors"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>

              <div className="flex p-2 w-full xl:w-[90px] relative h-full bg-white bg-dark">
                <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
                  <div className="flex py-1 px-1 text-white bg-orange-500 rounded-sm">
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
                  <p className="text-sm">Blog</p>
                  <p className="text-xs">Total {formatNumber(data?.blog)}</p>
                </div>
                <a
                  href="/dashboard/admin/blog"
                  className="absolute hover:text-gray-400 cursor-pointer top-2 right-2"
                >
                  <MoreVert fontSize="small" />
                </a>
              </div>
            </div>

            <div className="flex flex-col lg:flex-rows gap-2  rounded-sm p-4s mt-5">
              <div className="flex flex-col gap-3">
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 items-start justify-between gap-2">
                  <a
                    href="/dashboard/admin/users"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Boosted Company</p>
                    <div className="text-xl flex items-center gap-4 text-[#00aeff] font-bold">
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
                          d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                        />
                      </svg>

                      <p> {formatNumber(data?.boosted)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/admin/users"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Not Boosted Company</p>
                    <div className="text-xl flex items-center gap-4 text-main font-bold">
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
                          d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
                        />
                      </svg>

                      <p>{formatNumber(data?.notBoosted)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/admin/users"
                    className="flex cursor-pointer hover:bg-gray-100 border-r rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Subscribed Company</p>
                    <div className="text-xl flex items-center gap-4 text-emerald-400 font-bold">
                      <svg
                        class="w-6 h-6"
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

                      <p> {formatNumber(data?.subscribed)}+</p>
                    </div>
                  </a>
                  <a
                    href="/dashboard/admin/users"
                    className="flex cursor-pointer hover:bg-gray-100 rounded-sm flex-col p-3 w-full h-[90px] justify-between items-start"
                  >
                    <p className="">Not Subscribed Company</p>
                    <div className="text-xl flex items-center gap-4 text-yellow-500 font-bold">
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
                          d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
                        />
                      </svg>

                      <p className="mt-[2px]">
                        {formatNumber(data?.notSubscribed)}+
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex my-4 bg-gray-100 dark:bg-gray-700 rounded-sm flex-col lg:flex-row relative -mt-20s p-3 h-auto  justify-between items-start">
                {boostData && (
                  <div id="chart" className="bg-white bg-dark w-full ">
                    <ReactApexChart
                      options={tableData("boost").options}
                      series={tableData("boost").series}
                      type="area"
                      height={200}
                    />
                  </div>
                )}
                {subscriptionData && (
                  <div id="chart" className="bg-white bg-dark w-full ">
                    <ReactApexChart
                      options={tableData("subscription").options}
                      series={tableData("subscription").series}
                      type="area"
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>

            <div class="relative sm:rounded-lg">
              <div className="flex flex-col w-full gap-4 lg:flex-row mt-2">
                <div className="w-full">
                  <div className="pb-2">Latest Boosts</div>
                  <table class="text-sm w-full text-left border shadow-lg border-gray-200 rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-emerald-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-2 text-start py-3">
                          Company
                        </th>
                        <th scope="col" class="px-2 text-start py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.boosts &&
                        data?.boosts?.map((e, i) => {
                          return (
                            <tr
                              key={e?._id}
                              class="bg-white bg-dark border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                class="flex items-center px-2 text-start py-4 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {e?.company?.profilePicture?.length > 1 ? (
                                  <img
                                    class="w-12 h-12 me-4 rounded-full"
                                    src={e?.company?.profilePicture}
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
                                    {e?.company?.name?.length > 21
                                      ? e?.company?.name?.substring(0, 20) +
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
                                  href={`/company?id=${e?.company?._id}`}
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
                  <div className="pb-2">Latest Subscriptions</div>

                  <table class="text-sm w-full text-left border shadow-lg border-gray-200 rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-red-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-2 text-start py-3">
                          Company
                        </th>
                        <th scope="col" class="px-2 text-start py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.subscribes &&
                        data?.subscribes?.map((e, i) => {
                          return (
                            <tr
                              key={e?._id}
                              class="bg-white bg-dark border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                class="flex items-center px-2 text-start py-4 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {e?.company?.profilePicture?.length > 1 ? (
                                  <img
                                    class="w-12 h-12 me-4 rounded-full"
                                    src={e?.company?.profilePicture}
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-full font-bold text-4xl flex items-start justify-start border bg-main text-white">
                                    {e?.company?.name &&
                                      e?.company?.name?.substring(0, 1)}
                                  </div>
                                )}

                                <div class="ps-3">
                                  <div class="text-base font-semibold">
                                    {e?.company?.name?.length > 21
                                      ? e?.company?.name?.substring(0, 20) +
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
                                  href={`/company?id=${e?.company?._id}`}
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
                  <p className="text-sm">Company</p>
                  <p className="text-xs">Total {formatNumber(data?.company)}</p>
                </div>
                <a
                  href="/dashboard/admin/users"
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
                  <p className="text-sm">Sales</p>
                  <p className="text-xs">Total {formatNumber(data?.sales)}</p>
                </div>
                <a
                  href="/dashboard/admin/users"
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
                  <p className="text-sm">Visitor</p>
                  <p className="text-xs">
                    Total {formatNumber(data?.visitor)}{" "}
                  </p>
                </div>
                <a
                  href="/dashboard/admin/users"
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
                <CircularProgressbar
                  value={data?.user?.profileFill}
                  className="h-16 w-16"
                />
                <div className="absolute top-[18%] text-lg font-bold text-red">
                  {data?.user?.profileFill}%
                </div>
                <a
                  href="/dashboard/admin/profile"
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

            <div className="bg-white bg-dark py-4 mt-3 border-b-2 border-gray-100">
              <p className="text-xl text-gray-400 font-bold">
                Your Current Balance
              </p>
              <div className="flex w-full lg:flex-col xl:flex-row items-center gap-2 mt-4">
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat().format(data?.user?.currentBalance)}
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
                {data?.user?.subscriptionEndDate !== 0 ? (
                  <p className="mb-1 text-emerald-500 font-bold text-sm">
                    Expired {format(data?.user?.subscriptionEndDate)}
                  </p>
                ) : (
                  <p className="mb-1 text-emerald-500 font-bold text-sm">
                    Not Subscribed Yet
                  </p>
                )}
              </div>
              <div className="">
                <p className="text-gray-400 mb-1 text-lg">Boost</p>
                {data?.user?.subscriptionEndDate !== 0 ? (
                  <p className="mb-1 text-main font-bold text-sm">
                    Expired {format(data?.user?.boostEndDate)}
                  </p>
                ) : (
                  <p className="mb-1 text-main font-bold text-sm">
                    Not Boosted Yet
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 border shadow-lg rounded-lg p-3">
              <p className="text-xl font-semibold text-gray-400">Your sales</p>
              <div className="flex w-full mt-5 flex-col items-center justify-center">
                <div class="flex flex-col gap-3 items-center mb-4">
                  {data?.user?.sales?.profilePicture ? (
                    <img
                      class="w-24 h-24 me-4 rounded-full"
                      src={data?.user?.sales?.profilePicture}
                      alt=""
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full text-4xl flex items-center justify-center border bg-main text-white">
                      {data?.user?.sales?.firstName?.substring(0, 1)}
                    </div>
                  )}
                  <div class="font-medium gap-1 flex flex-col dark:text-white">
                    <p className="text-xl font-bold">
                      {data?.user?.sales?.firstName}{" "}
                      {data?.user?.sales?.lastName}
                    </p>
                    {/* <p className="">{sales?.data[0]?.email}</p> */}
                    <p>{data?.user?.sales?.phone}</p>
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

export default Admin;
