import Banner from "../../components/Banner";
import CompanyItemsCompany from "../../components/CompanyItemCategory";
import SmallBanner from "../../components/SmallBanner";
import NewsItem from "./NewsItem";
import ResponsivePagination from "react-responsive-pagination";
import "./../categories/pagination.css";
import { useEffect, useState } from "react";
import { useLazyReadQuery, useReadQuery } from "../../features/api/apiSlice";

const NewsCategory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [
    trigger,
    { data: news, isFetching: newsFetching, isError: newsError },
  ] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(news?.total / 6));
  }, [news]);

  const {
    data: banners,
    isFetching: bannersIsFetching,
    isError: bannersIsError,
  } = useReadQuery({
    url: `/user/banners`,
    tag: ["banners"],
  });

  // useEffect(() => {
  //   trigger({
  //     url: `/user/news?visible=true&limit=6&page=${page}`,
  //     tag: ["news"],
  //   });
  // }, [page]);

  useEffect(() => {
    trigger({
      url: `/user/news?visible=true&limit=6&page=${page}&searchField=title&searchValue=${search}`,
      tag: ["news"],
    });
  }, [search, page]);

  return (
    <div className="w-full relative bg-gray-50 bg-dark h-auto">
      <div
        style={{ backgroundImage: "url('./image-1.jpg')" }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <div className="w-full px-main h-auto py-4 bg-red-500f flex flex-col lg:flex-row gap-4">
        <div className="h-auto flex flex-col bg-yellow-500f w-full lg:w-[80%]">
          {banners && banners?.data && (
            <Banner
              slideImages={banners?.data
                ?.filter((e) => e?.type === "category-one")
                ?.map((c) => c?.bannerImage)}
              duration={200}
              arrows={false}
              indicators={false}
              width="w-full"
              height="h-[110px]"
            />
          )}
          <div className="py-2 mt-3 flex items-center justify-between flex-col lg:flex-row gap-2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              id="default-search"
              class="block w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            {/* <select
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
            </p> */}
          </div>
          <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full place-items-centers gap-6">
            {news && news?.data?.length > 0 ? (
              news?.data?.map((e, i) => {
                return <NewsItem data={e} type="category" />;
              })
            ) : (news && news?.message) || news?.data?.length === 0 ? (
              <div className="w-full items-center justify-center flex">
                There is no boost history!
              </div>
            ) : null}
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
        <div className="flex flex-col gap-4 w-full lg:w-[20%]">
          <div className="flex w-full mb-1 justify-between items-center">
            <p className="font-bold">Featured Products</p>
          </div>
          {banners && banners?.data && (
            <Banner
              slideImages={banners?.data
                ?.filter((e) => e?.type === "category-one")
                ?.map((c) => c?.bannerImage)}
              duration={200}
              arrows={true}
              indicators={false}
              width="w-full"
              height="h-[500px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCategory;
