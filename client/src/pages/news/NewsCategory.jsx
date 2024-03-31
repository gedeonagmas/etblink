import Banner from "../../components/Banner";
import CompanyItemsCompany from "../../components/CompanyItemCategory";
import SmallBanner from "../../components/SmallBanner";
import NewsItem from "./NewsItem";

const NewsCategory = () => {
  return (
    <div className="w-full relative bg-gray-50 bg-dark h-auto">
      <div
        style={{ backgroundImage: "url('./image-1.jpg')" }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <div className="w-full px-main h-auto py-4 bg-red-500f flex flex-col lg:flex-row gap-4">
        <div className="h-auto flex flex-col bg-yellow-500f w-full lg:w-[80%]">
          <Banner />
          <div className="py-2 mt-3 flex items-center justify-between flex-col lg:flex-row gap-2">
            <p className="font-bold">
              245 Total news{" "}
              <span className="font-normal ml-2">
                22 local | 45 international
              </span>
            </p>
            <select
              name=""
              id=""
              className="w-auto px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultChecked>Filter by country</option>
              <option value="">Europe</option>
              <option value="">Europe</option>
              <option value="">Europe</option>
            </select>
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
              return <NewsItem value={i} type="category" />;
            })}
          </div>
        </div>
        <SmallBanner />
      </div>
    </div>
  );
};

export default NewsCategory;
