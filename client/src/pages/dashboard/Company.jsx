import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Charts from "../../components/Charts";
import ReactApexChart from "react-apexcharts";
import SmallChart from "../../components/SmallChart";
import { More, MoreVert } from "@mui/icons-material";
import gedi from "../../assets/gedi.jpg";
import flag from "../../assets/etbetio.png";
import Promotion from "../../components/Promotion";

const Company = (props) => {
  const dates = [
    [1327359600000, 30.95],
    [1327446000000, 31.34],
    [1327532400000, 31.18],
    [1327618800000, 31.05],
    [1327878000000, 31.0],
    [1327964400000, 30.95],
    [1328050800000, 31.24],
    [1328137200000, 31.29],
    [1328223600000, 31.85],
    [1328482800000, 31.86],
    [1328569200000, 32.28],
    [1328655600000, 32.1],
    [1328742000000, 32.65],
    [1328828400000, 32.21],
    [1329087600000, 32.35],
    [1329174000000, 32.44],
    [1329260400000, 32.46],
    [1329346800000, 32.86],
    [1329433200000, 32.75],
    [1329778800000, 32.54],
    [1329865200000, 32.33],
    [1329951600000, 32.97],
    [1330038000000, 33.41],
    [1330297200000, 33.27],
    [1331679600000, 33.77],
    [1331766000000, 34.17],
    [1331852400000, 33.82],
    [1332111600000, 34.51],
    [1332198000000, 33.16],
    [1332284400000, 33.56],
    [1332370800000, 33.71],
    [1332457200000, 33.81],
    [1332712800000, 34.4],
    [1332799200000, 34.63],
    [1332885600000, 34.46],
    [1332972000000, 34.48],
    [1333058400000, 34.31],
    [1333317600000, 34.7],
    [1333404000000, 34.31],
    [1333490400000, 33.46],
    [1333576800000, 33.59],
    [1333922400000, 33.22],
    [1334008800000, 32.61],
    [1334095200000, 33.01],
    [1334181600000, 33.55],
    [1334268000000, 33.18],
    [1334527200000, 32.84],
    [1334613600000, 33.84],
    [1334700000000, 33.39],
    [1334786400000, 32.91],
    [1334872800000, 33.06],
    [1335132000000, 32.62],
    [1335218400000, 32.4],
    [1335304800000, 33.13],
    [1335391200000, 33.26],
    [1335477600000, 33.58],
    [1335736800000, 33.55],
    [1335823200000, 33.77],
    [1335909600000, 33.76],
    [1335996000000, 33.32],
    [1336082400000, 32.61],
    [1336341600000, 32.52],
    [1336428000000, 32.67],
    [1336514400000, 32.52],
    [1336600800000, 31.92],
    [1336687200000, 32.2],
    [1336946400000, 32.23],
    [1337032800000, 32.33],
    [1337119200000, 32.36],
    [1337205600000, 32.01],
    [1337292000000, 31.31],
    [1337551200000, 32.01],
    [1337637600000, 32.01],
    [1337724000000, 32.18],
    [1337810400000, 31.54],
    [1337896800000, 31.6],
    [1338242400000, 32.05],
    [1338328800000, 31.29],
    [1338415200000, 31.05],
    [1338501600000, 29.82],
    [1338760800000, 30.31],
    [1338847200000, 30.7],
    [1338933600000, 31.69],
    [1339020000000, 31.32],
    [1339106400000, 31.65],
    [1339365600000, 31.13],
    [1339452000000, 31.77],
    [1339538400000, 31.79],
    [1339624800000, 31.67],
    [1339711200000, 32.39],
    [1339970400000, 32.63],
    [1340056800000, 32.89],
    [1340143200000, 31.99],
    [1340229600000, 31.23],
    [1340316000000, 31.57],
    [1340575200000, 30.84],
    [1340661600000, 31.07],
    [1340748000000, 31.41],
    [1340834400000, 31.17],
    [1340920800000, 32.37],
    [1341180000000, 32.19],
    [1341266400000, 32.51],
    [1341439200000, 32.53],
    [1341525600000, 31.37],
    [1341784800000, 30.43],
    [1341871200000, 30.44],
    [1341957600000, 30.2],
    [1342044000000, 30.14],
    [1342130400000, 30.65],
    [1342389600000, 30.4],
    [1342476000000, 30.65],
    [1342562400000, 31.43],
    [1342648800000, 31.89],
    [1342735200000, 31.38],
    [1342994400000, 30.64],
    [1343080800000, 30.02],
    [1343167200000, 30.33],
    [1343253600000, 30.95],
    [1343340000000, 31.89],
    [1343599200000, 31.01],
    [1343685600000, 30.88],
    [1343772000000, 30.69],
    [1343858400000, 30.58],
    [1343944800000, 32.02],
    [1344204000000, 32.14],
    [1344290400000, 32.37],
    [1344376800000, 32.51],
    [1344463200000, 32.65],
    [1344549600000, 32.64],
    [1344808800000, 32.27],
    [1344895200000, 32.1],
    [1344981600000, 32.91],
    [1345068000000, 33.65],
    [1345154400000, 33.8],
    [1345413600000, 33.92],
    [1345500000000, 33.75],
    [1345586400000, 33.84],
    [1345672800000, 33.5],
    [1345759200000, 32.26],
    [1346018400000, 32.32],
    [1346104800000, 32.06],
    [1346191200000, 31.96],
    [1346277600000, 31.46],
    [1346364000000, 31.27],
    [1346709600000, 31.43],
    [1346796000000, 32.26],
    [1346882400000, 32.79],
    [1346968800000, 32.46],
    [1347228000000, 32.13],
    [1347314400000, 32.43],
    [1347400800000, 32.42],
    [1347487200000, 32.81],
    [1347573600000, 33.34],
    [1347832800000, 33.41],
    [1347919200000, 32.57],
    [1348005600000, 33.12],
    [1348092000000, 34.53],
    [1348178400000, 33.83],
    [1348437600000, 33.41],
    [1348524000000, 32.9],
    [1348610400000, 32.53],
    [1348696800000, 32.8],
    [1348783200000, 32.44],
    [1349042400000, 32.62],
    [1349128800000, 32.57],
    [1349215200000, 32.6],
    [1349301600000, 32.68],
    [1349388000000, 32.47],
    [1349647200000, 32.23],
    [1349733600000, 31.68],
    [1349820000000, 31.51],
    [1349906400000, 31.78],
    [1349992800000, 31.94],
    [1350252000000, 32.33],
    [1350338400000, 33.24],
    [1350424800000, 33.44],
    [1350511200000, 33.48],
    [1350597600000, 33.24],
    [1350856800000, 33.49],
    [1350943200000, 33.31],
    [1351029600000, 33.36],
    [1351116000000, 33.4],
    [1351202400000, 34.01],
    [1351638000000, 34.02],
    [1351724400000, 34.36],
    [1351810800000, 34.39],
    [1352070000000, 34.24],
    [1352156400000, 34.39],
    [1352242800000, 33.47],
  ];
  const state = {
    series: [
      {
        name: "XYZ MOTORS",
        data: dates,
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: "Price",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
    },
  };

  const lineState = {
    series: [
      {
        data: [1, 5, 2, 4, 7, 3, 6, 1, 5],
      },
    ],
    options: {
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        height: 160,
      },
      colors: ["#008FFB"],
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
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  return (
    <div className="w-full pr-10 flex flex-col lg:flex-row gap-5">
      <div className="flex flex-col border-r pr-4 w-full lg:flex-[70%]">
        <Promotion />
        <div className="flex flex-col lg:flex-row gap-2  rounded-sm p-4 mt-5">
          <div className="flex flex-col gap-3">
            <div className="w-full flex gap-2">
              <div className="flex border-r rounded-sm flex-col p-3 w-auto h-[90px] justify-between items-start">
                <p className="">Total</p>
                <p className="text-xl font-bold">298.401</p>
              </div>
              <div className="flex border-r rounded-sm flex-col p-3 w-auto h-[90px] justify-between items-start">
                <p className="">Net</p>
                <p className="text-xl font-bold">298.401</p>
              </div>
              <div className="flex relative rounded-sm flex-col p-3 h-auto w-24 justify-between items-start">
                <CircularProgressbar
                  value={70}
                  text={`${70}%`}
                  styles={buildStyles({
                    textColor: "red",
                    pathColor: "turquoise",
                    trailColor: "gold",
                  })}
                />
              </div>
            </div>

            <div id="chart-line" className="p-2 bg-gray-100 dark:bg-gray-700">
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
            </div>
          </div>

          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-sm flex-col relative -mt-20s p-3 h-auto  justify-between items-start">
            {/* <SmallChart
          type="area"
          color="#0000FF"
          height={300}
          series={[
            {
              name: "Latest activities",
              data: data,
            },
          ]}
        /> */}
            <div id="chart" className="bg-white bg-dark w-full ">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height={200}
              />
            </div>
          </div>
        </div>

        <div class="relative  shadow-md sm:rounded-lg">
          <div class="flex items-center justify-between flex-column lg:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            <div>
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
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row mt-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  {/* <th scope="col" class="px-6 py-3">
                    Position
                  </th> */}
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((e, i) => {
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          class="w-10 h-10 rounded-full"
                          src={gedi}
                          alt="Jese image"
                        />
                        <div class="ps-3">
                          <div class="text-base font-semibold">Neil Sims</div>
                          <div class="font-normal text-gray-500">
                            skylight@.com
                          </div>
                        </div>
                      </th>
                      {/* <td class="px-6 py-4">React Developer</td> */}
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Online
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          type="button"
                          data-modal-target="editUserModal"
                          data-modal-show="editUserModal"
                          class="font-medium px-2 py-1 rounded-full bg-main text-white hover:underline"
                        >
                          Edit user
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  {/* <th scope="col" class="px-6 py-3">
                    Position
                  </th> */}
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((e, i) => {
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          class="w-10 h-10 rounded-full"
                          src={gedi}
                          alt="Jese image"
                        />
                        <div class="ps-3">
                          <div class="text-base font-semibold">Neil Sims</div>
                          <div class="font-normal text-gray-500">
                            skylight@.com
                          </div>
                        </div>
                      </th>
                      {/* <td class="px-6 py-4">React Developer</td> */}
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Online
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          type="button"
                          data-modal-target="editUserModal"
                          data-modal-show="editUserModal"
                          class="font-medium px-2 py-1 rounded-full bg-main text-white hover:underline"
                        >
                          Edit user
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

      <div className="flex flex-col w-full lg:flex-[30%]">
        <div className="flex gap-2 items-center justify-between p-2 bg-gray-100 dark:bg-gray-600 rounded-sm">
          <div className="flex p-2 h-full bg-white bg-dark">
            <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
              <div className="flex py-1 px-1 text-white bg-emerald-400 rounded-sm">
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
                    d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm">Income</p>
              <p className=" font-bold">$35.9k</p>
            </div>
            <div className="flex flex-col h-full items-start justify-between">
              <MoreVert fontSize="small" />
            </div>
          </div>
          <div className="flex p-2 h-full bg-white bg-dark">
            <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
              <div className="flex py-1 px-1 text-white bg-yellow-400 rounded-sm">
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
                    d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm">Income</p>
              <p className=" font-bold">$35.9k</p>
            </div>
            <div className="flex flex-col h-full items-start justify-between">
              <MoreVert fontSize="small" />
            </div>
          </div>
          <div className="flex p-2 h-full bg-white bg-dark">
            <div className=" rounded-lg gap-1 flex flex-col items-start justify-start">
              <div className="flex py-1 px-1 text-white bg-main rounded-sm">
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
                    d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm">Income</p>
              <p className=" font-bold">$35.9k</p>
            </div>
            <div className="flex flex-col h-full items-center justify-between">
              <MoreVert fontSize="small" />
            </div>
          </div>
        </div>

        <div className="bg-white bg-dark py-4 px-2 mt-3 border-b-2 border-gray-100">
          <p className="text-xl text-gray-400 font-bold">Your Balance</p>
          <div className="flex w-full items-center justify-between mt-4">
            <p className="text-xl font-bold">$2190.19</p>
            <div className="flex items-center gap-1 text-emerald-500 text-lg font-semibold">
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
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
              9.14%
            </div>
            <div className="flex items-center gap-1 text-main text-lg font-semibold">
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
                  d="M12 19V5m0 14-4-4m4 4 4-4"
                />
              </svg>
              9.14%
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-4 p-2">
          <div className="">
            <p className="text-gray-400 mb-1 text-lg">Currency</p>
            <p className="mb-1 text-lg">USD/Birr</p>
          </div>
          <div className="">
            <p className="text-gray-400 mb-1 text-lg">Status</p>
            <p className="mb-1 text-lg">Active</p>
          </div>
          <div className="">
            <p className="text-gray-400 mb-1 text-lg">Expired on</p>
            <p className="mb-1 text-lg">
              Jan 24,2024{" "}
              {/* <span className="ml-2 text-main text-sm">2 days left</span> */}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xl font-semibold text-gray-400">Your saller</p>
          <div className="flex mt-5 w-full flex-col items-start  hover:bg-red-100 bg-white bg-dark border-dark border p-4 justify-start">
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
          </div>
        </div>

        <p className="text-xl text-gray-400 font-bold mt-5">Your messages</p>
        <div className="gap-1 flex flex-col">
          {[1, 2, 3, 4, 5, 6].map((e, i) => {
            return (
              <div className="flex relative w-full bg-gray-100 dark:bg-gray-700 p-2 items-center rounded-xl gap-3 mt-3">
                <div className="w-[14%] relative">
                  <img src={gedi} alt="" className="w-10 h-10 rounded-full" />
                </div>

                <div className="flex w-[86%] flex-col">
                  <p className="font-bold">Gedion</p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consecte adipisicing elit.
                  </p>
                  <p className="text-xs self-end">jan 21,2024</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Company;
