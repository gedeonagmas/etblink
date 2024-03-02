import Banner from "../../components/Banner";
import CompanyItemsCompany from "../../components/CompanyItemCategory";
import CompanyItems from "../../components/CompanyItems";
import Map from "../../components/Map";

const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
  {
    id: 2,
    name: "Sumqayit",
    position: { lat: 20.5788843, lng: 34.5485073 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 16.3947365, lng: 54.6898045 },
  },
  {
    id: 4,
    name: "ethiopia",
    position: { lat: 65.3947365, lng: 4.6898045 },
  },
  {
    id: 5,
    name: "london",
    position: { lat: -16.3947365, lng: -10.6898045 },
  },
];

const Category = () => {
  return (
    <div className="w-full relative bg-gray-200 bg-dark h-auto">
      <div className="absolute text-lg font-bold  z-50 top-[100px] left-[10%]">
        We provide more than <br /> 245 total companies <br /> for your business
      </div>
      <Map markers={[...markers]} height='82vh'/>
      <div className="w-full relative px-main mt-10 flex flex-col items-center justify-center h-auto">
        <div className="absolute px-main z-30 w-full px-4 py-2 rounded-md hidden sm:block -mt-80 md:-mt-64 lg:-mt-52 h-32">
          <div className="w-64 text-center rounded-md h-20 bg-dark bg-gray-200">
            <div className="bg-green-400 h-2  w-full"></div>
            <p className="text-lg font-bold mt-5">Find your business here</p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center">
          <form class="rounded-sm h-12 w-full bg-white bg-dark mx-auto">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                type="search"
                id="default-search"
                class="block w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              {/* <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button> */}
            </div>
          </form>

          <select
            name=""
            id=""
            className="w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultChecked>Filter by country</option>
            <option value="">Europe</option>
            <option value="">Europe</option>
            <option value="">Europe</option>
          </select>

          <select
            name=""
            id=""
            className="w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultChecked>Filter by country</option>
            <option value="">Europe</option>
            <option value="">Europe</option>
            <option value="">Europe</option>
          </select>

          <button className="w-full bg-black text-white px-4 h-12 ps-10 text-sm  border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Search
          </button>
        </div>

        <ul class="items-start mt-4 w-full gap-4 text-sm font-medium  rounded-sm sm:flex ">
          <li class="w-full md:w-44 border-r border-dark border-gray-300 focus:ring-0">
            <div class="flex items-center ps-3">
              <input
                id="vue-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-0 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox-list"
                class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Business
              </label>
            </div>
          </li>
          <li class="w-44 border-r border-dark border-gray-300 focus:ring-0">
            <div class="flex items-center ps-3">
              <input
                id="react-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-0 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="react-checkbox-list"
                class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Hotels
              </label>
            </div>
          </li>
          <li class="w-44 border-r border-dark border-gray-300 focus:ring-0">
            <div class="flex items-center ps-3">
              <input
                id="angular-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-yellow-600 bg-white border-gray-300 rounded focus:ring-0 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox-list"
                class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Importing
              </label>
            </div>
          </li>
          <li class="w-44 dark:border-gray-600">
            <div class="flex items-center ps-3">
              <input
                id="laravel-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-0 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="laravel-checkbox-list"
                class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Exporting
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full px-main h-auto bg-red-500f flex flex-col lg:flex-row gap-4">
        <div className="h-auto flex flex-col bg-yellow-500f w-full lg:w-[80%]">
          <Banner />
          <div className="py-2 mt-3 flex items-center justify-between flex-col lg:flex-row gap-2">
            <p className="font-bold">
              245 Total companies{" "}
              <span className="font-normal ml-2">22 local | 45 global</span>
            </p>
            <p className="font-bold">
              Price
              <span className="font-normal ml-2">Low | High</span>
            </p>
            <p className="flex font-bold">
              Sort by
              <span className="text-red-500 flex items-center justify-center ml-2">
                Name{" "}
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m8 10 4 4 4-4"
                  />
                </svg>
              </span>
            </p>
          </div>
          <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full place-items-centers gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
              return <CompanyItemsCompany value={i} type="category" />;
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[20%] bg-green-500f">
          <div className="flex w-full mt-4 mb-1 justify-between items-center">
            <p className="font-bold">Featured</p>
            <div className="flex gap-2 items-center justify-center">
              <svg
                class="w-6 h-6 text-gray-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
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
            </div>
          </div>
          <CompanyItemsCompany />
          <CompanyItemsCompany />
          <CompanyItemsCompany />
        </div>
      </div>
    </div>
  );
};

export default Category;
