import Banner from "../../components/Banner";
import CompanyItemsCompany from "../../components/CompanyItemCategory";
import CompanyItems from "../../components/CompanyItems";
import Map from "../../components/Map";
import SmallBanner from "../../components/SmallBanner";

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
    <div className="w-full relative pb-6 pt-24 bg-gray-50 bg-dark h-auto">
      <div className="absolute text-lg font-bold  z-30 top-[500px] left-[2%]">
        We provide more than <br /> 245 total companies <br /> for your business
      </div>
      {/* <Map markers={[...markers]} height="82vh" /> */}
      <div className="relative z-40">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65325188.17043557!2d-19.40065217965568!3d2.1022195001665533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10a06c0a948cf5d5%3A0x108270c99e90f0b3!2sAfrica!5e0!3m2!1sen!2set!4v1710817332813!5m2!1sen!2set"
          width="1600"
          height="550"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>{" "}
      </div>
      <div className="w-full relative px-main mt-10 flex flex-col items-center justify-center h-auto">
        {/* <div className="absolute px-main z-30 w-full px-4 py-2 rounded-md hidden sm:block -mt-80 md:-mt-64 lg:-mt-52 h-32">
          <div className="w-64 text-center rounded-md h-20 bg-dark bg-gray-200">
            <div className="bg-green-400 h-2  w-full"></div>
            <p className="text-lg font-bold mt-5">Find your business here</p>
          </div>
        </div> */}
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
              // return <CompanyItemsCompany value={i} type="category" />;
              return (
                <CompanyItems type="small" value={i} phoneNo="+251954*****" />
              );
            })}
          </div>
        </div>
        <SmallBanner />
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Category;
