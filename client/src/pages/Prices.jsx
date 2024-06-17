import { Done, DoneOutline, DoneRounded } from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useReadQuery } from "../features/api/apiSlice";
import Loading from "../components/loading/Loading";

const Prices = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

  const {
    data: subscriptions,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/subscriptions", tag: ["subscriptions"] });

  // <button
  //   disabled={currentCompany?.data[0]?.profileFill < 90 ? true : false}
  //   onClick={() => {
  //     setSubscriptionInfo(e);
  //     setPaymentTypePopup(true);
  //   }}
  //   className={`text-white w-32 py-2 px-2 ${
  //     currentCompany?.data[0]?.profileFill < 90
  //       ? "bg-red-400 "
  //       : "bg-main hover:bg-red-500"
  //   } rounded-lg `}
  // >
  //   Get Started
  // </button>;
  return (
    <div className="w-full flex flex-col relative bg-gray-200 bg-dark h-auto">
      {/* <div
        style={{
          backgroundImage: "url('./image-4.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div> */}
      {/* <div className="w-[70%] self-center rounded-md -mt-12 py-4 z-20 relative text-2xl h-auto bg-white bg-dark border shadow-xl">
        <div className="grid px-5 w-full place-items-center gap-y-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="text-sm">
            <p className="">we provide a flexible</p>
            <p className="">price for your</p>
            <p className="">ultimate business.</p>
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar
              className="text-red-500"
              value={70}
              text={`${70}%`}
            />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
        </div>
      </div> */}
      <p className="text-2xl px-main self-center mt-32 font-bold">
        Select from our price list
      </p>
      {isFetching && <Loading text="text-gray-500" />}
      {isError && <p>something went wrong unable to read the prices</p>}

      <div className="grid w-full place-items-center py-5 px-main self-center gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {subscriptions && subscriptions?.data?.length > 0 ? (
          subscriptions?.data?.map((e, i) => {
            return (
              <div className="relative flex flex-col items-center justify-center w-[370px]">
                <div
                  className={`h-6 rounded-lg rounded-b-none z-10 w-[260px] ${
                    i === 0
                      ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                      : i === 1
                      ? "to-orange-500 from-yellow-400"
                      : i === 2
                      ? "from-pink-600 to-red-600"
                      : "from-emerald-600 to-pink-600"
                  } bg-gradient-to-tr`}
                ></div>
                <div className="flex flex-col z-20 rounded-b-none bg-white relative mt-0 w-[300px] items-start justify-start gap-2 rounded-xl shadow-xl">
                  <div className="flex h-[92px] w-full flex-col items-center justify-center">
                    <p className="text-4xl text-black font-extrabold uppercase">
                      {e?.name}
                    </p>
                    <p className="text-xs text-gray-400 uppercase">
                      price is only for {e?.duration}
                    </p>
                  </div>
                </div>{" "}
                <div
                  className={`h-[72px] shadow-2xl flex flex-col items-center justify-center text-white font-extrabold text-xl rounded-lg absolute z-20 top-[116px] w-[320px] ${
                    i === 0
                      ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                      : i === 1
                      ? "to-orange-500 from-yellow-400"
                      : i === 2
                      ? "from-pink-600 to-red-600"
                      : "from-emerald-600 to-pink-600"
                  } bg-gradient-to-tr`}
                >
                  <p>
                    {e?.amount} birr
                    <span className="ml-2 text-center align-middle text-sm">
                      for Local companies
                    </span>
                  </p>
                  <p>
                    $ {e?.amount}
                    <span className="ml-2 text-center align-middle text-sm">
                      for Global companies
                    </span>
                  </p>
                </div>
                <div className=" rounded-xl mt-12 flex flex-col items-center justify-center px-4 bg-blue pb-4 pt-8 w-[300px] bg-white">
                  {e?.features?.map((f) => {
                    return (
                      <div className="flex w-full mt-3 items-center justify-between">
                        <div className="flex items-center justify-start gap-3">
                          <div
                            className={`w-3 h-3 ${
                              i === 0
                                ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                                : i === 1
                                ? "to-orange-500 from-yellow-400"
                                : i === 2
                                ? "from-pink-600 to-red-600"
                                : "from-emerald-600 to-pink-600"
                            }  bg-gradient-to-tr rounded-full`}
                          ></div>
                          <p className="text-gray-600">{f}</p>
                        </div>
                        <div>
                          <DoneRounded
                            fontSize="small"
                            className="text-emerald-500"
                          />
                        </div>
                      </div>
                    );
                  })}

                  <a
                    href={
                      user?.role === "company"
                        ? "/dashboard/company/subscription"
                        : "#"
                    }
                    className={`rounded-full mt-5 cursor-pointer ${
                      i === 0
                        ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                        : i === 1
                        ? "to-orange-500 from-yellow-400"
                        : i === 2
                        ? "from-pink-600 to-red-600"
                        : "from-emerald-600 to-pink-600"
                    } hover:text-gray-300 absolutes bottom-3 left-16 w-36 bg-gradient-to-tr text-white text-lg font-bold flex items-center justify-center uppercase py-2`}
                  >
                    SUBSCRIBE
                  </a>
                </div>
                <div
                  className={`h-6 rounded-lg rounded-t-none z-10 w-[260px] ${
                    i === 0
                      ? "from-[rgb(252,45,45)] to-[hsl(241,99%,48%)]"
                      : i === 1
                      ? "to-orange-500 from-yellow-400"
                      : i === 2
                      ? "from-pink-600 to-red-600"
                      : "from-emerald-600 to-pink-600"
                  } bg-gradient-to-tr`}
                ></div>
              </div>
            );
          })
        ) : (subscriptions && subscriptions?.message) ||
          subscriptions?.data?.length === 0 ? (
          <div className="w-full items-center justify-center flex">
            There is no subscription history!
          </div>
        ) : null}
      </div>

      {/* <p className="px-main text-2xl self-center mt-24 font-bold">
        Lets take a close look at our pricing plan
      </p>
      <div className="grid w-full place-items-center py-5 px-main self-center gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((e, i) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <p className="font-bold text-lg">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit, ametes dodu consectetur adipisicing elit.
                Omnis temporibus officia velit, distinctio eos veritatis elit
                omnis.
              </p>
            </div>
          );
        })}
      </div>

      <div class="w-full px-main mt-24 flex items-center gap-10 flex-col md:flex-row">
        <div>
          <img class="w-[500px] h-[300px]" src="image-1.jpg" alt="" />
        </div>
        <div className="flex max-w-[500px] flex-col gap-4">
          <p className="font-bold text-lg">
            Lorem ipsum dolor sit officia <br />
            amet consectetur.
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit, ametes dodu consectetur adipisicing elit.
            Omnis temporibus officia velit, distinctio eos veritatis elit omnis.
          </p>

          <p className="text-sm mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
            corrupti hic adipisci voluptatum nesciunt in maxime cumque, fugiat
            eligendi aliquam numquam placeat voluptates! Amet ipsa veritatis
            animi illum ea veniam!
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Prices;
