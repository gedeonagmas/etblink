import { Search } from "@mui/icons-material";
import { DarkThemeToggle } from "flowbite-react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Response from "../components/Response";
import LoadingButton from "../components/loading/LoadingButton";
import {
  useReadQuery,
  useUserLoginMutation,
  useUserLogoutMutation,
} from "../features/api/apiSlice";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const {
    data: saves,
    isFetching: savesIsFetching,
    isError: savesIsError,
  } = useReadQuery({
    url: `/user/saves?saver[eq]=${user?.user?._id}&populatingType=saves&populatingValue=company,saver`,
    tag: ["saves", "company"],
  });

  const {
    data: views,
    isFetching: viewsIsFetching,
    isError: viewsIsError,
  } = useReadQuery({
    url: `/user/views?viewer[eq]=${user?.user?._id}&populatingType=views&populatingValue=company,viewer`,
    tag: ["views", "company"],
  });

  const [loginData, loginResponse] = useUserLoginMutation();
  const [logout, logoutResponse] = useUserLogoutMutation();
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  // const divStyle = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundSize: "cover",
  //   height: "480px",
  // };
  const slideImages = ["image-1.jpg", "image-a.jpg", "image-b.jpg"];

  // const hoverHandler = (id) => {
  //   const ids = document.getElementById(id);
  //   ids?.classList?.value?.includes("hidden")
  //     ? ids?.classList?.remove("hidden")
  //     : ids?.classList?.add("hidden");
  // };
  const [currencies, setCurrencies] = useState(true);
  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 100) {
        setCurrencies(false);
      } else {
        setCurrencies(true);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  const loginHandler = () => {
    loginData({ email, password });
  };

  const logoutHandler = () => {
    logout({});
  };

  // console.log(views, "views from header");
  // console.log(saves, "saves from header");
  return (
    <div className="fixed w-full z-50 bg-white bg-dark">
      <Response response={loginResponse} setPending={setPending} type="login" />
      <Response
        response={logoutResponse}
        setPending={setPending}
        redirectTo="/"
        type="logout"
      />
      <div className="flex lg:hidden fixed top-0 left-0 z-50 flex-col items-center w-full h-auto py-10 ">
        <div className="flex bg-white bg-dark -mt-12 justify-between items-center px-2 h-full w-full">
          <img
            src="./logo.png"
            alt=""
            className="w-[80px] relative z-50 h-[65px]border-2 bg-white dark:bg-gray-500 rounded-sm"
          />
          {user ? (
            <div className="flex items-center gap-3">
              <p className="px-2 py-1 text-white rounded-xl bg-main">
                {user.email.split("@")[0]}
              </p>
              <a href={`/dashboard/${user.role}`} className="cursor-pointer">
                Dashboard
              </a>

              <a href={`/dashboard/saves`} className="cursor-pointer">
                <div className="items-center flex flex-col justify-center">
                  <button
                    type="button"
                    class="relative inline-flex items-center p-1s text-sm font-medium text-center t"
                  >
                    <svg
                      class="w-7 h-7"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>

                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs p-1 font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {saves && saves?.data ? saves?.data?.length : 0}
                    </div>
                  </button>
                </div>
              </a>

              {user?.role === "company" && (
                <a href={`/dashboard/views`} className="cursor-pointer">
                  <div className="items-center flex flex-col justify-center">
                    <button
                      type="button"
                      class="relative inline-flex items-center p-1s text-sm font-medium text-center t"
                    >
                      <svg
                        class="w-7 h-7"
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

                      <div class="absolute inline-flex items-center justify-center w-6 h-6 font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {views?.data ? views?.data?.length : 0}
                      </div>
                    </button>
                  </div>
                </a>
              )}
            </div>
          ) : (
            <div className="flex relative gap-4">
              <div className="">
                <p
                  onClick={() => setLoginForm(!loginForm)}
                  className={`cursor-pointer ${
                    loginForm ? "bg-gray-900 text-white" : ""
                  } px-3 h-[70px] absolute -top-5 hover:text-white pt-5 -left-[70px] flex `}
                  // onClick={() => setLoginForm(false)}
                >
                  Login
                  <svg
                    className="w-2.5 h-2.5 mt-1.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </p>
                {loginForm && (
                  <div
                    // onMouseLeave={() => setLoginForm(false)}
                    className="w-auto rounded-sm rounded-l text-sm rounded-tl-none p-2 flex gap-1 flex-col bg-gray-900 bg-dark text-dark absolute top-[50px] -left-[70px] z-30 text-black"
                  >
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-52  px-2 py-1 bg-white bg-dark focus:outline-none border-0 border-dark focus:ring-0"
                      placeholder="Email"
                    />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="w-52 px-2 py-1 focus:outline-none focus:ring-0"
                      placeholder="password"
                    />
                    <div className="flex py-1 items-center justify-between w-full">
                      <a
                        href="/forget"
                        className="text-xs cursor-pointer hover:text-gray-100 text-white"
                      >
                        Forget password?
                      </a>
                      <LoadingButton
                        pending={pending}
                        onClick={loginHandler}
                        title="Login"
                        color="bg-main"
                        width="w-full rounded-sm px-2 py-[2px]"
                      />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-gray-600">|</p>
              <div className="relative">
                <a href="/signup" className="cursor-pointer">
                  Register
                </a>
              </div>
            </div>
          )}

          <svg
            onClick={() => {
              const id = document.getElementById("header-mobile");
              id?.classList?.remove("hidden");
              id?.classList?.add("flex");
            }}
            class="w-10 h-10 text-gray-800 dark:text-white"
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
              stroke-width="2"
              d="M5 7h14M5 12h14M5 17h10"
            />
          </svg>
        </div>

        <div
          id="header-mobile"
          className="h-[100vh] hidden w-full bg-white bg-dark fixed top-0 left-0 z-50 items-center justify-center flex-col"
        >
          <svg
            onClick={() => {
              const id = document.getElementById("header-mobile");
              id?.classList?.add("hidden");
              id?.classList?.remove("flex");
            }}
            class="w-6 h-6 text-gray-800 dark:text-white absolute top-4 right-4 cursor-pointer"
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>

          <ul className="py-5 h-[100vh] overflow-y-scroll w-full">
            <li className="mt-10" role="presentation">
              <a
                href="/"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Home
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href="/local"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Local
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href="/global"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Global
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href="/blogs"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Event
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href="/news"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                News
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href="/job"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Jobs
              </a>
            </li>

            <li className="" role="presentation">
              <a
                href="/investment"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Investment
              </a>
            </li>

            <div id="accordion-collapse" data-accordion="collapse">
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-1"
                >
                  <span>Languages</span>
                  <svg
                    data-accordion-icon
                    class="w-3 h-3 rotate-180 shrink-0"
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
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-1"
                class="hidden"
                aria-labelledby="accordion-collapse-heading-1"
              >
                <div class="p-5 border border-b-0 border-gray-300 dark:border-gray-700">
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/news"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      English
                    </a>
                  </li>{" "}
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/news"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      Amharic
                    </a>
                  </li>{" "}
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/news"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      Affan oromo
                    </a>
                  </li>{" "}
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/news"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      Tigirignas
                    </Link>
                  </li>{" "}
                </div>
              </div>
              <h2 id="accordion-collapse-heading-2">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target="#accordion-collapse-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-2"
                >
                  <span>Resources</span>
                  <svg
                    data-accordion-icon
                    class="w-3 h-3 rotate-180 shrink-0"
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
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-2"
                class="hidden"
                aria-labelledby="accordion-collapse-heading-2"
              >
                <div class="p-5 border border-b-0 border-gray-300 dark:border-gray-700">
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/opportunity"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      Business Opportunity
                    </a>
                  </li>{" "}
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/proclamation"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      Proclamation
                    </a>
                  </li>{" "}
                  <li className="me-2 ml-2" role="presentation">
                    <a
                      href="/visa"
                      className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
                    >
                      VISA information
                    </a>
                  </li>{" "}
                </div>
              </div>
            </div>

            <div className="flex items-center hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3">
              <DarkThemeToggle /> <p>Light mode</p>
            </div>
            <li className="" role="presentation">
              <p
                onClick={logoutHandler}
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="w-full flex flex-col lg:flex-row ">
          {/* <div className="relative pl-main bg-main-black w-full lg:w-[78%]">
          <Slide
            autoplay={false}
            infinite={true}
            duration={3000}
            arrows={false}
            transitionDuration={5000}
            indicators={false}
            pauseOnHover={false}
            responsive={true}
          >
            {slideImages.map((slideImage, index) => (
              <div
                key={index}
                className=""
                // style={{ width: "100%", background: "blue" }}
              >
                <div className="place-items-center py-[6px] pr-10 gap-x-24 gap-y-2  grid grid-cols-1 xl:grid-cols-2  items-center justify-center  h-auto">
                  <div className="w-full bg-main-black text-white dark:text-gray-200 py-2 h-[86px]  flex gap-2 ">
                    <img
                      src="./ad1.jpg"
                      alt=""
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                  <div className="h-[70%] hidden lg:block w-[2px] absolute bg-blue-800"></div>
                  <div className="w-full bg-main-black text-white dark:text-gray-200 p-2 h-[86px]  flex gap-2 ">
                    <img
                      src="./ad3.jpeg"
                      alt=""
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slide>{" "}
        </div> */}

          {/* advert action button and social media */}
          {/* <div className="w-full px-main md:px-4  bg-main-black text-white dark:text-gray-200 p-2 h-auto  flex gap-2 "> */}
          {/* <div className="flex w-full py-3 lg:py-0 pl-4 pr-main bg-main-black justify-center flex-col gap-3 items-center">
          <p
            href="#"
            className="inline-flex hover:bg-yellow-400 cursor-pointer  text-white rounded-full gap-2 px-4 py-[5px] border-2 border-white mt-1 text-[14px] font-bold items-center"
          >
            Advert here
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 0 0-.8 1.6L6.6 12l-4.4 6.4A1 1 0 0 0 3 20h13.2c.3 0 .6-.2.8-.4l4.8-7a1 1 0 0 0 0-1.2l-4.8-7a1 1 0 0 0-.8-.4H3Z"
                clip-rule="evenodd"
              />
            </svg>
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4"
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
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4 "
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
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                className="w-4 h-4 "
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
        </div> */}
          {/* </div> */}
        </div>

        <div className="w-full text-sm text-white py-[5px] lg:px-[18%] bg-[rgb(5,4,4)] flex gap-4 justify-between items-center">
          {/* <img src="etblogo.jpg" alt="" className="rounded-sm h-[30px]" /> */}
          <div className="flex w-full items-center gap-2 justify-end">
            <div className="me-2" role="presentation">
              <button
                id="dropdownDelayButton"
                data-dropdown-toggle="dropdownDelay"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className={`focus:ring-0 focus:outline-none ${
                  user ? "-mr-4" : "mr-12"
                } font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
                type="button"
              >
                Languages{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownDelay"
                className="z-50 -mt-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-start text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDelayButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      English
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Amharic
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Affan oromo
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Tigirigna
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {user ? (
              <div className="flex items-center gap-5">
                <p className="px-2 py-1 rounded-xl bg-main">
                  {user.email.split("@")[0]}
                </p>
                <a href={`/dashboard/${user.role}`} className="cursor-pointer">
                  Dashboard
                </a>
                <a href={`/dashboard/saves`} className="cursor-pointer">
                  <div className="items-center flex flex-col justify-center">
                    <button
                      type="button"
                      class="relative inline-flex items-center p-1s text-sm font-medium text-center t"
                    >
                      <svg
                        class="w-7 h-7"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                      </svg>

                      <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs p-1 font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {saves && saves?.data ? saves?.data?.length : 0}
                      </div>
                    </button>
                  </div>
                </a>

                {user?.role === "company" && (
                  <a href={`/dashboard/views`} className="cursor-pointer">
                    <div className="items-center flex flex-col justify-center">
                      <button
                        type="button"
                        class="relative inline-flex items-center p-1s text-sm font-medium text-center t"
                      >
                        <svg
                          class="w-7 h-7"
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

                        <div class="absolute inline-flex items-center justify-center w-6 h-6 font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {views?.data?.length}
                        </div>
                      </button>
                    </div>
                  </a>
                )}
                <p onClick={logoutHandler} className="cursor-pointer">
                  Logout
                </p>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="relative">
                  <p
                    // onMouseOver={() => setLoginForm(true)}
                    className={`cursor-pointer ${
                      loginForm ? "bg-gray-900" : ""
                    } px-3 h-12 absolute -top-3 pt-3 -left-[70px] flex `}
                    onClick={() => setLoginForm(!loginForm)}
                  >
                    Login
                    <svg
                      className="w-2.5 h-2.5 mt-1.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </p>
                  {loginForm && (
                    <div
                      // onMouseLeave={() => setLoginForm(false)}
                      className="w-auto z-50 rounded-sm rounded-tr-none text-sm p-2 flex gap-1 flex-col bg-gray-900 bg-dark text-dark absolute top-[34px] -left-[211px] text-black"
                    >
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-52  px-2 py-1 bg-white bg-dark focus:outline-none border-0 border-dark focus:ring-0"
                        placeholder="Email"
                      />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-52 px-2 py-1 focus:outline-none focus:ring-0"
                        placeholder="password"
                      />
                      <div className="flex items-center py-1 justify-between w-full">
                        <a
                          href="/forget"
                          className="text-xs cursor-pointer hover:text-gray-100 text-white"
                        >
                          Forget password?
                        </a>
                        <LoadingButton
                          pending={pending}
                          onClick={loginHandler}
                          title="Login"
                          color="bg-main"
                          width="w-full lg:rounded-sm lg:px-2 lg:py-[2px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-gray-600">|</p>
                <div className="relative">
                  <a href="/signup" className="cursor-pointer">
                    Register
                  </a>
                </div>
              </div>
            )}
            <div className="top-2 right-2 z-50">
              <DarkThemeToggle />
            </div>
          </div>
        </div>

        {/* tabs desktop header nav */}

        <div className="border-b relative shadow-2xl  py-2 md:py-1 border-gray-200 dark:border-gray-700">
          <ul
            className="flex relative z-40  gap-1 flex-wrap items-center justify-center -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <div className="hidden xl:block">
              <div
                className={`${
                  currencies ? "block" : "hidden"
                } h-auto absolute shadow-2xl shadow-gray-500 z-20 right-[8%] -top-[20px] w-[65px]`}
              >
                <p className="absolute z-20  top-4 left-2 text-white">Today</p>
                <svg
                  id="trapezoid"
                  viewbox="0 0 100 100"
                  preserveAspectRatio="none"
                  width="100%"
                  className="absoluted -mt-2"
                >
                  <path
                    d="M0,5 L110,30 L660,65 L0,56z"
                    fill="rgb(252,45,45)"
                  ></path>
                </svg>
                <div className="bg-gray-200 bg-dark text-[13px] shadow-2xl -mt-[94px] w-full pb-2">
                  <div className="flex py-1 relative border-b border-gray-400 font-semibold w-full px-1 flex-col border-dark items-center justify-center">
                    <div className="flex  w-full gap-1 items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 17.3a5 5 0 0 0 2.6 1.7c2.2.6 4.5-.5 5-2.3.4-2-1.3-4-3.6-4.5-2.3-.6-4-2.7-3.5-4.5.5-1.9 2.7-3 5-2.3 1 .2 1.8.8 2.5 1.6m-3.9 12v2m0-18v2.2"
                        />
                      </svg>
                    </div>
                    <p className="font-normal text-[13px]">52.64</p>
                  </div>
                  <div className="flex py-1 font-semibold w-full flex-col border-b border-gray-400 border-dark items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      <svg
                        class="w-4 h-4 "
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
                          d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                        />
                      </svg>
                    </div>
                    <p className="font-normal">56.75</p>
                  </div>
                  <div className="flex text-sm font-semibold w-full py-1 flex-col border-b border-gray-400 border-dark items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      <svg
                        class="w-4 h-4 "
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
                          d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                        />
                      </svg>
                    </div>
                    <p className="font-normal">62.50</p>
                  </div>
                  <div className="flex text-sm font-semibold w-full py-1 flex-col border-b border-gray-400 border-dark items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      <svg
                        class="w-4 h-4 "
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
                          d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                        />
                      </svg>
                    </div>
                    <p className="font-normal">72.50</p>
                  </div>
                  <div className="flex text-sm font-semibold w-full py-1 flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      <svg
                        class="w-4 h-4 "
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
                          d="M6 10h9.2M6 14h9.2M18 5a6 6 0 0 0-3.4-1C11 4 7.8 7.6 7.8 12s3 8 6.8 8a6 6 0 0 0 3.4-1"
                        />
                      </svg>
                    </div>
                    <p className="font-normal">52.32</p>
                  </div>
                  <div className="absolute shadow-2xl bottom-0 w-full h-1 rounded-sm bg-[rgb(252,45,45)] "></div>
                </div>
              </div>
            </div>
            <li className="me-2">
              <div className="flex items-center justify-center gap-6">
                {/*  */}
                <div className="flex absolute z-20 shadow-sm -top-[50px] left-[8%] h-auto w-[120px] gap-3 items-center justify-center">
                  <img
                    src="./logo.png"
                    alt=""
                    className="w-[200px] h-[112px] border-2 lg:border-0 bg-white dark:bg-gray-500 rounded-sm"
                  />
                </div>
              </div>
            </li>
            <li className="me-2 ml-[20%] xl:ml-12" role="presentation">
              <a
                href="/"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Home
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href="/local"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Local
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href="/global"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Global
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href="/blogs"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Event
              </a>
            </li>{" "}
            <li className="me-2 ml-2" role="presentation">
              <a
                href="/news"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                News
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href="/job"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Jobs
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href="/investment"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Investment
              </a>
            </li>
            <li className="me-2 relative" role="presentation">
              <button
                onClick={() => {
                  const ids = document.getElementById("resource-dropdown");
                  ids?.classList?.value.includes("hidden")
                    ? ids?.classList.remove("hidden")
                    : ids?.classList?.add("hidden");
                }}
                className="focus:ring-0 focus:outline-none font-medium hover:text-[rgb(252,45,45)] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="button"
              >
                Resources{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="resource-dropdown"
                onMouseOver={() => {
                  const ids = document.getElementById("resource-dropdown");
                  ids?.classList?.remove("hidden");
                }}
                onMouseLeave={() => {
                  const ids = document.getElementById("resource-dropdown");
                  ids?.classList?.add("hidden");
                }}
                className="z-50 absolute hidden h-auto p-2 divide-y divide-gray-100 rounded-lg shadow w-auto "
              >
                <div className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-[210px] dark:bg-gray-700">
                  <ul
                    className="py-2 text-start w-full h-auto text-sm text-gray-700 dark:text-gray-200"
                    // aria-labelledby="dropdownDelayButton"
                  >
                    <li className="w-full ">
                      <a
                        href="/investment"
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Business Opportunities
                      </a>
                    </li>
                    {/* <li
                      onMouseOver={() => {
                        const ids = document.getElementById("license-dropdown");
                        ids?.classList?.remove("hidden");
                      }}
                      className="w-full"
                    >
                      <a
                        href="#"
                        className=" flex gap-2 items-center justify-start w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        License and related{" "}
                        <svg
                          className="w-[24px] h-[24px] text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m10 16 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </li> */}
                    <li className="w-full">
                      <a
                        href="/legal"
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Proclamation
                      </a>
                    </li>
                    <li className="w-full">
                      <a
                        href="/immigration"
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        VISA Information
                      </a>
                    </li>
                  </ul>
                </div>

                <div
                  id="license-dropdown"
                  onMouseLeave={() => {
                    const ids = document.getElementById("license-dropdown");
                    ids?.classList?.add("hidden");
                  }}
                  className="z-50 hidden px-4 border-none -mt-[150px] -ml-[180px] lg:ml-[200px]"
                >
                  <div className=" bg-white  rounded-lg shadow w-40 dark:bg-gray-700">
                    <ul className="py-2 text-start w-full h-auto text-sm text-gray-700 dark:text-gray-200">
                      <li className="w-full ">
                        <a
                          href="/license-register"
                          className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          New registration
                        </a>
                      </li>
                      <li className="w-full ">
                        <a
                          href="/license-renew"
                          className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Renew
                        </a>
                      </li>
                      <li className="w-full ">
                        <a
                          href="/upgrade"
                          className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Upgrade
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="me-2 ">
              <div className=" hidden xl:flex w-full relative pr-main justify-center gap-5 items-center">
                {/* <div className="flex flex-col lg:flex-row w-auto h-auto absolute -right-20 lg:-right-24 z-20 items-center justify-center gap-2"> */}
                <a
                  href="#"
                  className="h-6 w-6  flex items-center justify-center  rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
                  <svg
                    className="w-5 h-5"
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
                <a
                  href="#"
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
                  <svg
                    className="w-5 h-5 "
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
                <a
                  href="#"
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
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
                <a
                  href="#"
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-dark text-[rgb(252,45,45)]"
                >
                  <svg
                    className="w-5 h-5 "
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
                {/* </div> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
