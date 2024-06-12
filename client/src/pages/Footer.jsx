import Sponsors from "../components/Sponsors";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useReadQuery } from "../features/api/apiSlice";
import ProfilePicture from "../components/ProfilePicture";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Footer = () => {
  const {
    data: sales,
    isFetching,
    isError,
  } = useReadQuery({
    url: "/user/users?role=sales&limits=100&populatingType=users&populatingValue=user",
    tag: ["users"],
  });

  const [text, setText] = useState({
    value: "",
    copied: false,
  });

  const [id, setId] = useState("");
  let sliderRefFooter = useRef(null);
  const next = () => {
    sliderRefFooter.slickNext();
  };
  const previous = () => {
    sliderRefFooter.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
  console.log(sales, "sales");
  return (
    <div className="">
      {/* sellers */}
      {sales && sales?.data?.length > 0 && (
        <div
          style={{}}
          className="w-full px-main flex flex-col items-center justify-between h-auto mt-10"
        >
          <div className="w-full flex items-center justify-between h-auto">
            <div className="w-full items-center justify-center flex flex-col">
              <p className="text-4xl text-center font-semibold text-gray-700">
                Our <span className="text-main">Representatives</span>
              </p>
              <p className="text-[17px] mt-3 py-1 font-light text-gray-500">
                our top Representatives
              </p>
            </div>
          </div>

          <div className="relative my-5 w-full flex items-center">
            <button
              onClick={previous}
              className="absolute button shadow-2xl rounded-full  z-20 top-[90px] -left-6"
            >
              <svg
                class="w-14 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-red-500 border border-gray-300 rounded-full h-14 bg-gray-300/50"
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
                  sliderRefFooter = slider;
                }}
                {...settings}
              >
                {sales?.data?.map((user, i) => (
                  <div
                    key={user?._id}
                    className="flex w-[200px] relative flex-col items-start rounded-lg hover:bg-red-100 dark:hover:bg-gray-600  bg-dark border-dark border shadow-xl justify-start"
                  >
                    <div className="flex w-full pt-4 px-4  items-center justify-between">
                      <ProfilePicture user={user} />
                      <div className="flex items-center gap-2 justify-center flex-col">
                        <img
                          src={`${
                            i % 2 === 0 ? "./etbetio.png" : "./etbengland.png"
                          }`}
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

                    <p className="text-xl px-4 mt-4 font-bold">
                      {`${user?.user?.firstName} ${user?.user?.lastName}`}
                    </p>
                    <div class="w-[266px]s pb-4 px-4">
                      <div class="mb-2 flex justify-between items-center">
                        <label
                          for="website-url"
                          class="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Call on {user?.user?.phone}
                        </label>
                        <a href={`/sales?id=${user?.user?._id}`}>
                          <svg
                            class="w-6 h-6 hover:text-gray-500"
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

                      <div className="w-full flex gap-1 items-center justify-start">
                        <span class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
                          Link
                        </span>
                        <input
                          disabled
                          placeholder={`https://etblink.com/signup?id=${user?.user?._id}`}
                          value={`https://etblink.com/signup?id=${user?.user?._id}`}
                          className="w-full border p-2 border-gray-400 rounded-lg max-w-[530px]"
                        />

                        <CopyToClipboard
                          text={`https://etblink.com/signup?id=${user?.user?._id}`}
                          onCopy={() => {
                            setId(user?.user?.id);
                            setText({ copied: true });
                            setTimeout(() => {
                              setText({ copied: false });
                            }, 4000);
                          }}
                        >
                          {text.copied && id === user?.user?._id ? (
                            <span className="bg-emerald-200 text-sm text-emerald-500 font-bold p-1 rounded-lg border border-emerald-500">
                              Copied.
                            </span>
                          ) : (
                            <button className="px-2 py-2 rounded-lg bg-main text-white hover:bg-red-500">
                              {/* <svg
                              class="w-6 h-6"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg> */}
                              Copy
                            </button>
                          )}
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              {/* <div className="absolute -top-8 right-2 flex gap-2 items-center justify-center">
              <button className="button" onClick={previous}>
                <svg
                  class="w-4 h-4 text-gray-800 dark:text-white"
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
              <button className="button" onClick={next}>
                <svg
                  class="w-4 h-4 text-gray-800 dark:text-white"
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
            </div> */}
            </div>

            <button
              onClick={next}
              className="absolute button shadow-2xl rounded-full  z-20 top-[90px] -right-6"
            >
              <svg
                class="w-14 text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-red-500 border border-gray-300 rounded-full h-14 bg-gray-300/50"
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
        </div>
      )}

      <div className="w-full h-auto bg-black text-white px-main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col py-10 items-start justify-between">
        <div className="w-auto">
          <p className="text-xl font-bold mt-5 w-32 uppercase py-2 border-b">
            About Us
          </p>
          <ul className="mt-5 text-sm flex flex-col gap-1">
            <a href="/about" className="hover:underline">
              Company
            </a>
            <a href="/vision-mission" className="hover:underline">
              Vision & Mission
            </a>
            <a href="/social-responsibility" className="hover:underline">
              Social Responsibility
            </a>
            <a href="/prices" className="hover:underline">
              Membership Price/Package
            </a>
            <a href="/our-partners" className="hover:underline">
              Our Partners
            </a>
          </ul>
        </div>
        <div className="">
          <p className="text-xl font-bold mt-5 w-32 uppercase py-2 border-b">
            Partners
          </p>
          <ul className="mt-5 text-sm flex flex-col gap-1">
            <a href="/advert-with-us" className="hover:underline">
              Advertise with Us
            </a>
            <a href="/become-representative" className="hover:underline">
              Become Representative
            </a>
            <a href="/become-a-member" className="hover:underline">
              Become a Member
            </a>
            <a href="/work-with-us" className="hover:underline">
              Work with Us
            </a>
          </ul>
        </div>
        <div className=" ">
          <p className="text-xl font-bold mt-5 w-32 uppercase py-2 border-b">
            Contact
          </p>
          <ul className="mt-5 text-sm flex flex-col gap-1">
            <a href="#" className="hover:underline">
              Talk to Representatives
            </a>
            <a href="#" className="hover:underline">
              News Department
            </a>
            <a href="#" className="hover:underline">
              Technical Support
            </a>
            <a href="#" className="hover:underline">
              Job Department
            </a>
            <a href="#" className="hover:underline">
              Comment/Suggestion
            </a>
          </ul>
        </div>

        {/* <div className="h-52 -ml-14 border-gray-700 w-[1px] border border-dotted"></div> */}
        <div className="mt-7 ">
          <div className="flex flex-col items-center gap-4 justify-start lg:justify-center w-full">
            <div className="w-52 self-start lg:self-center px-2 py-1 cursor-pointer hover:border-gray-400 h-auto rounded-lg border">
              <img
                src="./appstores.png"
                alt=""
                className="w-full h-12 rounded-lg"
              />
            </div>
            <div className="w-52 px-2 self-start lg:self-center py-1 cursor-pointer hover:border-gray-400 h-auto rounded-lg border">
              <img
                src="./google.png"
                alt=""
                className="w-full h-12 rounded-lg"
              />
            </div>
          </div>

          <div className="flex  w-auto mt-5 h-auto lg:items-center lg:justify-center items-start justify-start gap-4">
            <a href="#" className="h-6 w-6  flex items-center justify-center">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="h-6 w-6 flex items-center justify-center">
              <svg
                className="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="h-6 w-6 flex items-center justify-center">
              <svg
                class="w-4 h-4 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.8 10.5 20.7 2h-3l-5.3 6.5L7.7 2H1l7.8 11-7.3 9h3l5.7-7 5.1 7H22l-8.2-11.5Zm-2.4 3-1.4-2-5.6-7.9h2.3l4.5 6.3 1.4 2 6 8.5h-2.3l-4.9-7Z"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="h-6 w-6 flex items-center justify-center">
              <svg
                className="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.5 8.8v1.7a3.7 3.7 0 0 1 3.3-1.7c3.5 0 4.2 2.2 4.2 5v5.7h-3.2v-5c0-1.3-.2-2.8-2.1-2.8-1.9 0-2.2 1.3-2.2 2.6v5.2H9.3V8.8h3.2ZM7.2 6.1a1.6 1.6 0 0 1-2 1.6 1.6 1.6 0 0 1-1-2.2A1.6 1.6 0 0 1 6.6 5c.3.3.5.7.5 1.1Z"
                  clipRule="evenodd"
                />
                <path d="M7.2 8.8H4v10.7h3.2V8.8Z" />
              </svg>

              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
        <div className="lg:ml-5">
          {/* <p className="text-xl font-bold mt-5 uppercase w-40 py-2 border-b">
            Contact us
          </p>
          <input
            type="text"
            placeholder="email"
            className="py-1 px-2 w-52 rounded-sm focus:outline-none bg-white text-black my-2"
          /> */}

          <img
            src="./etblogofooter.png"
            alt=""
            className="w-[200px] mt-4 lg:mt-0 h-[90px] border-2 lg:border-0 dark:bg-gray-500 rounded-sm"
          />
          <p className="mt-4 lg:mt-2 text-sm">
            We are dedicated to providing a comprehensive and user-friendly
            platform that seamlessly connects businesses and consumers.
          </p>
        </div>
      </div>

      <div className="px-main flex flex-col lg:flex-row text-white pb-4 bg-black w-full text-sm items-center justify-between">
        <div className="lg:mt-5">
          <p className="text-lg font-bold uppercase">Ethiopian business Link</p>
          {/* <p className="text-xs">
            Copyright Skylight technologies @2024 Technology share company in
            ethiopia Technology share company in ethiopia
          </p> */}
          <p className="text-xs mt-2 lg:mt-0 lg:mr-20">
            Ethiopian Business Link is a sister company of Skylight Technologies
            PLC. Skylight Technologies is a reputable technology company
            offering website design, software development, and networking
            solutions. They are known for their innovative approach and
            expertise in technology. Their commitment to quality and customer
            satisfaction sets them apart in the industry.
          </p>
        </div>
        <div className="mt-5 self-start lg:self-end">
          <img
            src="./skylight.png"
            alt=""
            className="w-[300px] h-[90px] border-2 mr-5 lg:mr-0 lg:border-0 dark:bg-gray-500 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
