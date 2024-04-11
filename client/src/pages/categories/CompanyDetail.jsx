import { Visibility } from "@mui/icons-material";
import { Carousel, Rating } from "flowbite-react";
import { useState, useEffect } from "react";
import Map from "../../components/Map";
import { useLocation } from "react-router-dom";
import {
  useCreateMutation,
  useReadQuery,
  useCreateRateMutation,
  useReadRateQuery,
} from "../../features/api/apiSlice";
import Loading from "../../components/loading/Loading";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";

const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
];

const CompanyDetail = (props) => {
  const location = useLocation();

  const { data, isFetching, isError } = useReadQuery({
    url: `/user/users?user[eq]=${location?.state?.id}&populatingType=users&populatingValue=user`,
    tag: ["companies", "users"],
  });

  const {
    data: rates,
    isFetching: rateIsFetching,
    isError: rateIsError,
  } = useReadRateQuery({ id: data?.data[0]?._id });

  const [rateData, rateResponse] = useCreateRateMutation();
  const [company, setCompany] = useState({});
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState("3.5");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data?.data) {
      setCompany(data?.data[0]?.user);
    }
  }, [data]);

  const rateHandler = () => {
    rateData({
      fullName,
      rater: JSON.parse(localStorage.getItem("etblink_user"))?._id,
      message,
      type: "company",
      accepter: data?.data[0]?.user?._id,
      value: rating,
    });
  };

  console.log(company, "from detail");
  console.log(rates, "rates");
  return (
    <div className="relative overflow-hidden z-20">
      <Response response={rateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read the data</p>}
      {company ? (
        <div className="w-full h-auto">
          <div
            style={{ backgroundImage: `url(${company?.banner})` }}
            className="h-[82vh] px-main bg-center relative bg-cover w-full"
          >
            <div className="absolute px-4 shadow-lg bg-gray-500/50 bottom-0 py-4 h-auto flex items-end justify-between w-[80%] md:w-[60%]">
              <div className="w-auto gap-6 flex flex-col lg:flex-row items-end justify-center">
                <img
                  src={company?.logo}
                  alt=""
                  className="h-32 w-40 rounded-md"
                />
                <div className="flex w-full flex-col gap-2 text-white">
                  <p className="font-bold text-xl">{company?.name}</p>
                  <p className="mt-2">{company?.title}</p>
                  <p className="flex  ">
                    <svg
                      class="w-5 h-5 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z" />
                    </svg>
                    {company?.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center">
                <p className="py-2 hover:bg-red-500 hover:text-white shadow  px-3 cursor-pointer rounded-full border border-gray-200 text-white flex items-endjustify-end gap-2">
                  <svg
                    class="w-5 h-5 text-white"
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
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    />
                  </svg>{" "}
                  save
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-0">
            <div className="h-auto px-main mt-4 py-4 flex flex-col gap-10 bg-yellow-500f w-full lg:w-[67%]">
              <div className="flex flex-col lg:flex-row text-sm items-center justify-between">
                <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
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
                      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
                    />
                  </svg>
                  London
                </p>
                <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
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
                      d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  4 hours ago
                </p>
                <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  2300 views
                </p>
                <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>
                  {company?.rating?.average}
                </p>
                <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-red-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                  </svg>
                  456 saves
                </p>
                <p className="py-2  px-3 cursor-pointer rounded-sm flex items-center justify-center  gap-2">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
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
                      d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3l-2.9 2.5c-.3.3-.8.1-.8-.3V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
                    />
                  </svg>
                  chat
                </p>
              </div>

              <div className="">
                <p className="text-xl font-bold">About us</p>
                <p className="mt-5">{company?.description}</p>
              </div>

              {/* carousel */}
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                  {company?.galleries?.map((e) => {
                    return (
                      <img
                        src={e}
                        alt="..."
                        className="object-cover object-center h-full w-full"
                      />
                    );
                  })}
                </Carousel>
              </div>

              {/* services */}
              <div className="w-full">
                <p className="text-xl mt-10 font-bold">Services</p>
                <div className="grid grid-cols-1 w-full mt-7 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex flex-col gap-4 items-start justify-start">
                    {company?.services?.map((e, i) => {
                      return (
                        <div key={i} class="flex items-center">
                          <input
                            checked
                            id="checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-main bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="checked-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {e}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* videos */}
              <div className="w-full">
                <p className="text-xl mt-10 font-bold">Videos</p>
                {/* <div className="grid grid-cols-1 gap-7 w-full mt-5 sm:grid-cols-2 md:grid-cols-3"> */}
                <div className="flex w-full mt-5 rounded-lg border relative justify-start py-4 gap-1 flex-col items-enter">
                  {company?.video && (
                    <video
                      src={company?.video}
                      alt=""
                      className="w-full rounded-lg"
                      controls
                    />
                  )}
                </div>
                {/* </div> */}
              </div>

              {/* ratings */}
              <div className="w-full">
                <p className="text-xl mt-10 font-bold">Add Review and Rating</p>
                <div className="flex flex-col mt-7 gap-2">
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                  <Rating size="md">
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                  <Rating size="lg">
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                </div>
                <p className="text-lg mt-7 font-bold">Rate us</p>

                <div>
                  <div className="flex my-4 items-center gap-2 w-full">
                    <label
                      className="w-[300px] gap-2 flex items-center"
                      for="file"
                    >
                      Your rating{" "}
                      <Rating>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                      </Rating>
                    </label>
                    <input
                      value={rating}
                      className="ml-2 text-yellow-500 w-full"
                      type="range"
                      id="points"
                      min="1"
                      max="5"
                      step="0.1"
                      color="red"
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <p className="">{rating}</p>
                  </div>
                  <div className="w-full mt-3 flex gap-10 justify-between items-center">
                    <div class="mb-5 w-full">
                      <label
                        for="email"
                        class="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your full name
                      </label>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        id="text"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>
                    {/* <div class="mb-5 w-full">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                      />
                    </div> */}
                  </div>
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gra0y-50 rounded-lg border border-gray-300 focus:ring-blue-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                  <div className="mt-6">
                    <LoadingButton
                      pending={pending}
                      onClick={rateHandler}
                      title="Submit"
                      color="bg-main"
                      width="w-52"
                    />
                  </div>
                </div>
                <p className="text-lg mt-10 font-bold">Peoples who rate us</p>

                <div className="mt-10">
                  <div class="flex items-center mb-4">
                    <img
                      class="w-10 h-10 me-4 rounded-full"
                      src="./gedi.jpg"
                      alt=""
                    />
                    <div class="font-medium dark:text-white">
                      <p>
                        Jese Leos{" "}
                        <time
                          datetime="2014-08-16 19:00"
                          class="block text-sm text-gray-500 dark:text-gray-400"
                        >
                          gedeonagmas@gmail.com
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="w-full ml-14 flex justify-start gap-3 items-center">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                    <p>4.5</p>
                  </div>
                  <p className="mt-1 ml-14">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dicta, quisquam aliquam ratione omnis voluptate pariatur?
                    Nostrum amet, pariatur obcaecati debitis corporis distinctio
                    illo suscipit iusto numquam deserunt optio omnis cum!
                  </p>
                </div>

                <div className="mt-10">
                  <div class="flex items-center mb-4">
                    <img
                      class="w-10 h-10 me-4 rounded-full"
                      src="./gedi.jpg"
                      alt=""
                    />
                    <div class="font-medium dark:text-white">
                      <p>
                        Jese Leos{" "}
                        <time
                          datetime="2014-08-16 19:00"
                          class="block text-sm text-gray-500 dark:text-gray-400"
                        >
                          gedeonagmas@gmail.com
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex ml-14 justify-start gap-3 items-center">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                    <p>4.5</p>
                  </div>
                  <p className="mt-1 ml-14">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dicta, quisquam aliquam ratione omnis voluptate pariatur?
                    Nostrum amet, pariatur obcaecati debitis corporis distinctio
                    illo suscipit iusto numquam deserunt optio omnis cum!
                  </p>
                </div>

                <div className="mt-10">
                  <div class="flex items-center mb-4">
                    <img
                      class="w-10 h-10 me-4 rounded-full"
                      src="./gedi.jpg"
                      alt=""
                    />
                    <div class="font-medium dark:text-white">
                      <p>
                        Jese Leos{" "}
                        <time
                          datetime="2014-08-16 19:00"
                          class="block text-sm text-gray-500 dark:text-gray-400"
                        >
                          gedeonagmas@gmail.com
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex ml-14 justify-start gap-3 items-center">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                    <p>4.5</p>
                  </div>
                  <p className="mt-1 ml-14">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dicta, quisquam aliquam ratione omnis voluptate pariatur?
                    Nostrum amet, pariatur obcaecati debitis corporis distinctio
                    illo suscipit iusto numquam deserunt optio omnis cum!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex relative lg:-mt-52  mt-10 pl-4 py-4 pr-[7%] flex-col gap-10 w-full shadow-lg lg:w-[33%] bg-white bg-dark">
              <div className="w-full p-5 rounded-md border shadow-xl shadow-gray-300">
                <div className="flex mb-7 items-centere justify-between">
                  <p className="flex text-sm gap-1 items-center">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Business info
                  </p>

                  <p className="flex text-sm gap-1 items-center">
                    <svg
                      class="w-5 h-5 text-red-500"
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
                    Get directions
                  </p>
                </div>
                <Map markers={[...markers]} height="35vh" />

                <div className="mt-7 gap-2 flex flex-col">
                  <p className="py-2 cursor-pointer rounded-sm flex items-center justify-start  gap-2">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-white"
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
                        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
                      />
                    </svg>
                    London
                  </p>
                  <p className="py-2 cursor-pointer rounded-sm flex items-center justify-start  gap-2">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-white"
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
                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    4 hours ago
                  </p>
                  <p className="py-2 cursor-pointer rounded-sm flex items-center justify-start  gap-2">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                      />
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    2300 views
                  </p>

                  <p className="py-2 cursor-pointer rounded-sm flex items-center justify-start  gap-2">
                    <svg
                      class="w-5 h-5 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                    </svg>
                    456 saves
                  </p>
                </div>

                <p className="py-2 cursor-pointer rounded-sm flex items-center justify-start  gap-2">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  views
                </p>
                <p className="text-lg mt-7 ">Follow us</p>
                <div className="flex mt-4 items-center justify-between w-full">
                  <a href="#" className="">
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
                  <a href="#" className="">
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
                  <a href="#" className="">
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
                  </a>
                  <a href="#" className="">
                    <svg
                      className="w-5 h-5"
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
                  <a href="#" className="">
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
                  </a>
                </div>
              </div>

              <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
                <p className="flex text-sm gap-2 items-center">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Openning Hours
                </p>

                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Sunday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Monday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Tuesday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Wedensday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Thursday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Friday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
                <div className="py-2 px-3 mt-2 flex items-center justify-between border-b">
                  <p className="font-semibold">Saturday</p>
                  <p>2:00 AM - 12:00 AM</p>
                </div>
              </div>

              <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
                <p className="flex text-sm gap-2 items-center">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Contact Business
                </p>

                <div class="flex items-center mt-6 mb-4">
                  <img
                    class="w-12 h-12 me-4 rounded-full"
                    src="./gedi.jpg"
                    alt=""
                  />
                  <div class="font-medium dark:text-white">
                    <p>
                      Jese Leos{" "}
                      <time
                        datetime="2014-08-16 19:00"
                        class="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        gedeonagmas@gmail.com
                      </time>
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    for="first_name"
                    class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm mt-4 font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>

                <label
                  for="message"
                  class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>

                <button className="py-3 w-full bg-main rounded-md text-white mt-4">
                  Submit
                </button>
              </div>

              <div className="w-full text-sm p-5 rounded-md border shadow-lg shadow-gray-300">
                <p className="flex text-sm gap-2 items-center">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Sales Agent
                </p>

                <div className="flex w-full mt-5 flex-col items-center justify-center">
                  <div class="flex items-center mb-4">
                    <img
                      class="w-24 h-24 me-4 rounded-full"
                      src="./gedi.jpg"
                      alt=""
                    />
                    <div class="font-medium gap-1 flex flex-col dark:text-white">
                      <p className="text-xl font-bold">Gedeon agmas</p>
                      <p className="">gedeona..@gmail.com</p>
                      <p>+251 954304543</p>
                    </div>
                  </div>
                  <div className="flex mt-4 items-center justify-between w-full">
                    <a href="#" className="">
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
                    <a href="#" className="">
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
                    <a href="#" className="">
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
                    </a>
                    <a href="#" className="">
                      <svg
                        className="w-5 h-5"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>There is no data to display</p>
      )}
    </div>
  );
};

export default CompanyDetail;
