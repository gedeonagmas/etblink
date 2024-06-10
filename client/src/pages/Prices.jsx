import { Done, DoneOutline, DoneRounded } from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Prices = () => {
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
      <div className="grid w-full place-items-center py-5 px-main self-center gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div className="relative flex flex-col items-center justify-center w-[370px]">
          <div className="h-6 rounded-lg rounded-b-none z-10 w-[260px] from-pink-600 to-blue-600 bg-gradient-to-tr"></div>
          <div className="flex flex-col z-20 rounded-b-none bg-white relative mt-0 w-[300px] items-start justify-start gap-2 rounded-xl shadow-xl">
            <div className="flex h-[92px] w-full flex-col items-center justify-center">
              <p className="text-4xl text-black font-extrabold uppercase">
                SILVER
              </p>
              <p className="text-xs text-gray-400 uppercase">
                price is only for 1 year
              </p>
            </div>
          </div>{" "}
          <div className="h-[72px] shadow-2xl flex flex-col items-center justify-center text-white font-extrabold text-xl rounded-lg absolute z-20 top-[116px] w-[320px] from-blue-600 to-red-600 bg-gradient-to-tr">
            <p>
              3000 birr
              <span className="ml-2 text-center align-middle text-sm">
                for Local companies
              </span>
            </p>
            <p>
              $ 100
              <span className="ml-2 text-center align-middle text-sm">
                for Global companies
              </span>
            </p>
          </div>
          <div className=" rounded-xl mt-12 flex flex-col items-center justify-center px-4 bg-blue pb-4 pt-8 w-[300px] bg-white">
            {[0, 2, 3, 4, 5].map((e) => {
              return (
                <div className="flex w-full mt-3 items-center justify-between">
                  <div className="flex items-center justify-start gap-3">
                    <div className="w-3 h-3 from-[rgb(252,45,45)] to-[hsl(241,99%,48%)] bg-gradient-to-tr rounded-full"></div>
                    <p className="text-gray-600">Full page description</p>
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

            <div className="rounded-full mt-5 cursor-pointer hover:text-gray-300 absolutes bottom-3 left-16 w-36 from-pink-600 to-blue-600 bg-gradient-to-tr text-white text-lg font-bold flex items-center justify-center uppercase py-2">
              SUBSCRIBE
            </div>
          </div>
          <div className="h-6 rounded-lg rounded-t-none z-10 w-[260px] from-pink-600 to-blue-600 bg-gradient-to-tr"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-[370px]">
          <div className="h-6 rounded-lg rounded-b-none z-10 w-[260px] to-orange-500 from-yellow-400 bg-gradient-to-tr"></div>
          <div className="flex flex-col z-20 rounded-b-none bg-white relative mt-0 w-[300px] items-start justify-start gap-2 rounded-xl shadow-xl">
            <div className="flex h-[92px] w-full flex-col items-center justify-center">
              <p className="text-4xl text-black font-extrabold uppercase">
                GOLD
              </p>
              <p className="text-xs text-gray-400 uppercase">
                price is only for 1 year
              </p>
            </div>
          </div>{" "}
          <div className="h-[72px] shadow-2xl flex flex-col items-center justify-center text-white font-extrabold text-xl rounded-lg absolute z-20 top-[116px] w-[320px] to-orange-500 from-yellow-400 bg-gradient-to-tr">
            <p>
              3000 birr
              <span className="ml-2 text-center align-middle text-sm">
                for Local companies
              </span>
            </p>
            <p>
              $ 100
              <span className="ml-2 text-center align-middle text-sm">
                for Global companies
              </span>
            </p>
          </div>
          <div className=" rounded-xl mt-12 flex flex-col items-center justify-center px-4 bg-blue pb-4 pt-8 w-[300px] bg-white">
            {[0, 2, 3, 4, 5].map((e) => {
              return (
                <div className="flex w-full mt-3 items-center justify-between">
                  <div className="flex items-center justify-start gap-3">
                    <div className="w-3 h-3 to-orange-500 from-yellow-400 bg-gradient-to-tr rounded-full"></div>
                    <p className="text-gray-600">Full page description</p>
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

            <div className="rounded-full mt-5 cursor-pointer hover:text-gray-300 absolutes bottom-3 left-16 w-36 to-orange-500 from-yellow-400 bg-gradient-to-tr text-white text-lg font-bold flex items-center justify-center uppercase py-2">
              SUBSCRIBE
            </div>
          </div>
          <div className="h-6 rounded-lg rounded-t-none z-10 w-[260px] to-orange-500 from-yellow-400 bg-gradient-to-tr"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-[370px]">
          <div className="h-6 rounded-lg rounded-b-none z-10 w-[260px] from-pink-600 to-red-600 bg-gradient-to-tr"></div>
          <div className="flex flex-col z-20 rounded-b-none bg-white relative mt-0 w-[300px] items-start justify-start gap-2 rounded-xl shadow-xl">
            <div className="flex h-[92px] w-full flex-col items-center justify-center">
              <p className="text-4xl text-black font-extrabold uppercase">
                SILVER
              </p>
              <p className="text-xs text-gray-400 uppercase">
                price is only for 1 year
              </p>
            </div>
          </div>{" "}
          <div className="h-[72px] shadow-2xl flex flex-col items-center justify-center text-white font-extrabold text-xl rounded-lg absolute z-20 top-[116px] w-[320px] from-pink-600 to-red-600 bg-gradient-to-tr">
            <p>
              3000 birr
              <span className="ml-2 text-center align-middle text-sm">
                for Local companies
              </span>
            </p>
            <p>
              $ 100
              <span className="ml-2 text-center align-middle text-sm">
                for Global companies
              </span>
            </p>
          </div>
          <div className=" rounded-xl mt-12 flex flex-col items-center justify-center px-4 bg-blue pb-4 pt-8 w-[300px] bg-white">
            {[0, 2, 3, 4, 5].map((e) => {
              return (
                <div className="flex w-full mt-3 items-center justify-between">
                  <div className="flex items-center justify-start gap-3">
                    <div className="w-3 h-3 from-red-600 to-pink-600 bg-gradient-to-tr rounded-full"></div>
                    <p className="text-gray-600">Full page description</p>
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

            <div className="rounded-full mt-5 cursor-pointer hover:text-gray-300 absolutes bottom-3 left-16 w-36 from-pink-600 to-red-600 bg-gradient-to-tr text-white text-lg font-bold flex items-center justify-center uppercase py-2">
              SUBSCRIBE
            </div>
          </div>
          <div className="h-6 rounded-lg rounded-t-none z-10 w-[260px] from-pink-600 to-red-600 bg-gradient-to-tr"></div>
        </div>
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
