import { useEffect, useRef, useState } from "react";
import Banner from "../../components/Banner";
import CompanyItemsCompany from "../../components/CompanyItemCategory";
import CompanyItems from "../../components/CompanyItems";
import Map from "../../components/Map";
import SmallBanner from "../../components/SmallBanner";
import {
  useCompanyAggregateQuery,
  useLazyReadQuery,
  useReadQuery,
} from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import ResponsivePagination from "react-responsive-pagination";
import "./pagination.css";
import { categoryData, cityData, countryData } from "../categoryData";
import Marquee from "react-fast-marquee";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

const Category = ({ type }) => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState("");
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const {
    data: aggregateData,
    isFetching: aggregateIsFetching,
    isError: aggregateIsError,
  } = useCompanyAggregateQuery();

  console.log(aggregateData?.data, "aggregate");
  const [
    trigger,
    { data: company, isFetching: companyFetching, isError: companyError },
  ] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(company?.total / 15));
    if (company?.message) {
      setLastPage(company?.message);
    } else {
      setLastPage("");
    }
  }, [company]);

  useEffect(() => {
    const cats = categoryData.filter((e) => e.category === category);
    setSubCategoryData(cats[0]?.subCategory);
    category?.length < 1 && setSubCategory("");

    const cityKeyword = city
      ? `&city=${city.toString().replaceAll("&", "and")}`
      : "";
    const countryKeyword = country
      ? `&country=${country.toString().replaceAll("&", "and")}`
      : "";
    const categoryKeyword = category
      ? `&category=${category.toString().replaceAll("&", "and")}`
      : "";
    const subCategoryKeyword = subCategory
      ? `&subCategory=${subCategory.toString().replaceAll("&", "and")}`
      : "";
    const searchKeyword = search
      ? `&searchField=name&searchValue=${search
          .toString()
          .replaceAll("&", "and")}`
      : "";

    trigger({
      url: `/user/companies?limit=15&page=${page}${cityKeyword}${countryKeyword}${categoryKeyword}${subCategoryKeyword}${searchKeyword}`,
      tag: ["companies"],
    });
  }, [city, country, category, subCategory, search, page]);

  //################## slider ##########################
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // console.log(subCategoryData, "company");
  return (
    <div className="w-full relative pb-6 pt-24 bg-gray-50 bg-dark h-auto">
      {/* {companyFetching && <Loading />} */}
      {companyError && <p>Something went wrong unable to fetch the data!</p>}
      {/* <div className="absolute text-lg font-bold  z-30 top-[500px] left-[2%]">
        We provide more than <br /> 245 total companies <br /> for your business
      </div> */}
      {/* <Map markers={[...markers]} height="82vh" /> */}
      {/* <div className="relative z-40">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65325188.17043557!2d-19.40065217965568!3d2.1022195001665533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10a06c0a948cf5d5%3A0x108270c99e90f0b3!2sAfrica!5e0!3m2!1sen!2set!4v1710817332813!5m2!1sen!2set"
          width="1600"
          height="550"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>{" "}
      </div> */}
      <div className="w-full h-[250px]">
        <img
          src="./image-a.jpg"
          alt=""
          className="w-full h-full object cover"
        />
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
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                id="default-search"
                class="block w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
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
            onChange={(e) =>
              type === "local"
                ? setCity(e.target.value)
                : setCountry(e.target.value)
            }
            name=""
            id=""
            className="w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" defaultChecked>
              Filter by {type === "local" ? "City" : "Country"}
            </option>
            <option value="">All</option>
            {type === "local"
              ? cityData?.map((cit) => {
                  return <option value={cit}>{cit}</option>;
                })
              : countryData?.map((cot) => {
                  return <option value={cot}>{cot}</option>;
                })}
          </select>

          <select
            onChange={(e) => setCategory(e.target.value)}
            name=""
            id=""
            className="w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" defaultChecked>
              Filter by Category
            </option>
            <option value="">All</option>
            {categoryData?.map((cat) => {
              return <option value={cat?.category}>{cat?.category}</option>;
            })}
          </select>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            name=""
            id=""
            className="w-full px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" defaultChecked>
              Filter by Sub Category
            </option>
            <option value="">All</option>
            {subCategoryData?.map((sub) => {
              return <option value={sub}>{sub}</option>;
            })}
          </select>
        </div>

        <div className="relative my-7 w-full flex items-center">
          <button
            onClick={previous}
            className="absolute button shadow-2xl rounded-full  z-20 top-[10px] -left-2"
          >
            <svg
              class="w-7 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-gray-500 border border-gray-300 rounded-full h-7 bg-gray-300/50"
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
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>
          <div className="w-full slider-container relative">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {aggregateData?.data?.map((e) => {
                if (e?._id !== null)
                  return (
                    <li
                      onClick={() => {
                        setCategory(e?._id);
                        setSubCategory("");
                      }}
                      class=" hover:bg-gray-100  cursor-pointer px-3 border-r border-dark border-gray-300 focus:ring-0"
                    >
                      <div class="flex items-center ps-3">
                        <p className="font-bold">{e?.total}</p>
                        <p
                          for="vue-checkbox-list"
                          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {e?._id}
                        </p>
                      </div>
                    </li>
                  );
              })}
              {aggregateData?.data?.map((e) => {
                if (e?._id !== null)
                  return (
                    <li
                      onClick={() => {
                        setCategory(e?._id);
                        setSubCategory("");
                      }}
                      class="  hover:bg-gray-100  cursor-pointer px-3 border-r border-dark border-gray-300 focus:ring-0"
                    >
                      <div class="flex items-center ps-3">
                        <p className="font-bold">{e?.total}</p>
                        <p
                          for="vue-checkbox-list"
                          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {e?._id}
                        </p>
                      </div>
                    </li>
                  );
              })}
              {aggregateData?.data?.map((e) => {
                if (e?._id !== null)
                  return (
                    <li
                      onClick={() => {
                        setCategory(e?._id);
                        setSubCategory("");
                      }}
                      class=" hover:bg-gray-100  cursor-pointer px-3 border-r border-dark border-gray-300 focus:ring-0"
                    >
                      <div class="flex items-center ps-3">
                        <p className="font-bold">{e?.total}</p>
                        <p
                          for="vue-checkbox-list"
                          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {e?._id}
                        </p>
                      </div>
                    </li>
                  );
              })}
            </Slider>
          </div>

          <button
            onClick={next}
            className="absolute button shadow-2xl rounded-full  z-20 top-[10px] -right-2"
          >
            <svg
              class="w-7 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-gray-500 border border-gray-300 rounded-full h-7 bg-gray-300/50"
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
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* <ul class="items-start mt-4 mb-5 w-full gap-4 text-sm font-medium  rounded-sm grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {aggregateData?.data?.map((e) => {
            if (e?._id !== null)
              return (
                <li
                  onClick={() => {
                    setCategory(e?._id);
                    setSubCategory("");
                  }}
                  class="w-full hover:bg-gray-200 cursor-pointer px-3 border-r border-dark border-gray-300 focus:ring-0"
                >
                  <div class="flex items-center ps-3">
                    <p className="font-bold">{e?.total}</p>
                    <p
                      for="vue-checkbox-list"
                      class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {e?._id}
                    </p>
                  </div>
                </li>
              );
          })}
        </ul> */}
      </div>
      <div className="w-full px-main h-auto bg-red-500f flex flex-col lg:flex-row gap-8">
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

          <div className="flex flex-col gap-10">
            <div className="grid mt-5 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-full place-items-center gap-6">
              {companyFetching ? (
                <Loading />
              ) : lastPage?.length > 0 ? (
                <p>{lastPage}</p>
              ) : companyError ? (
                <p>Something went error unable to read the data.</p>
              ) : company?.data?.length > 0 ? (
                company?.data?.map((e, i) => {
                  return (
                    <CompanyItems
                      value={e._id}
                      phoneNo={`${e?.phone?.substring(0, 5)}**`}
                      type="small"
                      data={e}
                    />
                  );
                })
              ) : (
                <p>There is no data to display</p>
              )}
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
        </div>
        <SmallBanner />
      </div>
    </div>
  );
};

export default Category;
