import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateRateMutation, useReadQuery } from "../features/api/apiSlice";
import Response from "../components/Response";
import Loading from "../components/loading/Loading";
import { Rating } from "flowbite-react";
import LoadingButton from "../components/loading/LoadingButton";
import { format } from "timeago.js";

const SalesDetail = () => {
  const location = useLocation();
  const salesId = location?.search?.split("?id=")[1];
  const currentUser = JSON.parse(localStorage.getItem("etblink_user"));
  const [sales, setSales] = useState("");
  const { data, isFetching, isError } = useReadQuery({
    url: `/user/users?user[eq]=${salesId}&populatingType=users&populatingValue=user`,
    tag: ["companies", "users"],
  });
  const {
    data: rates,
    isFetching: ratedIsFetching,
    isError: isErr,
  } = useReadQuery({
    url: `/user/rates?accepter[eq]=${salesId}&populatingType=rates&populatingValue=rater`,
    tag: ["companies", "users"],
  });
  const [rateData, rateResponse] = useCreateRateMutation();
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState("3.5");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (data?.data) {
      setSales(data?.data[0]?.user);
    }
  }, [data]);

  const rateHandler = () => {
    rateData({
      fullName,
      rater: currentUser?.user?._id,
      message,
      type: "sales",
      accepter: data?.data[0]?.user?._id,
      value: rating,
      role: currentUser?.role,
      for: "sales",
      tag: ["sales", "rates"],
    });
  };

  console.log(salesId, data, "location");
  return (
    <div className="w-full px-main z-20 h-[100vh]s pt-32 flex flex-col items-center justify-center">
      <Response response={rateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong unable to read the data</p>}
      {sales && (
        <div class="w-full mx-4  sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
          <p className="text-lg py-4 font">Personnel information</p>
          <div class="rounded-t-lg h-40 overflow-hidden">
            <img
              class="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            {sales?.profilePicture?.length > 2 ? (
              <img
                class="object-cover object-center h-32"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Woman looking front"
              />
            ) : (
              <div className="w-32 text-white text-center text-2xl font-bold flex items-center justify-center h-32 rounded-full bg-main">
                {data?.data[0]?.email?.substring(0, 1)}
              </div>
            )}
          </div>
          <div class="text-center mt-2">
            <h2 class="font-semibold">
              {sales?.firstName + " " + sales?.lastName}
            </h2>
            <p class="text-gray-500">{data?.data[0]?.email}</p>
          </div>
          <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li class="flex flex-col items-center justify-around">
              <svg
                class="w-7 fill-current text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <div>{sales?.rating?.average}</div>
            </li>
            <li class="flex flex-col items-center justify-between">
              <svg
                class="w-7 h-7 text-main"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                  clip-rule="evenodd"
                />
              </svg>

              <div>{sales?.address}</div>
            </li>
            <li class="flex flex-col items-center justify-around">
              <svg
                class="w-7 h-7 text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
              </svg>

              <div>{sales?.phone}</div>
            </li>
          </ul>
          <div class="p-4 border-t mx-8 mt-2">
            <p className="text-sm">{sales?.bio}</p>
          </div>
        </div>
      )}
      {/* ratings */}
      <div className="w-full">
        <p className="text-xl mt-10 font-bold">Add Review and Rating</p>
        <p className="text-lg mt-7 font-bold">Rate us</p>

        <div>
          <div className="flex my-4 items-center gap-2 w-full">
            <label className="w-[300px] gap-2 flex items-center" for="file">
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

        {rates?.data &&
          rates?.data?.map((e) => {
            return (
              <div className="mt-10">
                <div class="flex items-center mb-4">
                  <img
                    class="w-10 h-10 me-4 rounded-full"
                    src="./gedi.jpg"
                    alt=""
                  />
                  <div class="font-medium dark:text-white">
                    <p>
                      {e?.fullName}
                      <time
                        datetime="2014-08-16 19:00"
                        class="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        {format(e?.createdAt)}
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
                  <p>{e?.value}</p>
                </div>
                <p className="mt-1 ml-14">{e?.message}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SalesDetail;
