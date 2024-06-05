import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Prices = () => {
  return (
    <div className="w-full flex flex-col relative bg-gray-50 bg-dark h-auto">
      <div
        style={{
          backgroundImage: "url('./image-4.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <div className="w-[70%] self-center rounded-md -mt-12 py-4 z-20 relative text-2xl h-auto bg-white bg-dark border shadow-xl">
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
      </div>
      <p className="text-2xl px-main self-center mt-24 font-bold">
        Select from our price list
      </p>
      <div className="grid w-full place-items-center py-5 px-main self-center gap-x-20 gap-y-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {/* <div className="w-full hover:border-red-600 relative shadow-2xl shadow-red-400 max-w-[300px] flex flex-col text-center bg-white bg-dark border border-gray-200 border-dark rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div
            className="relative flex flex-col items-center justify-center"
            href="#"
          >
            <img class="rounded-t-lg h-32 w-full" src="image-1.jpg" alt="" />
            <div className="absolute bg-white flex items-center justify-center z-10 mt-32 w-16 h-16 p-2 rounded-full border shadow-xl">
              <svg
                class="w-8 h-8"
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
              </svg>
            </div>
          </div>

          <div class="p-5 rounded-b-lg bg-red-500/50 text-white">
            <p href="#">
              <h5 class="mb-2 mt-10 text-2xl font-bold tracking-tight ">
                Basic
              </h5>
            </p>
            <p class="mb-3 text-5xl font-bold ">$250</p>
            <p className="text-sm mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laudantium fuga deserun.
            </p>
            <p className="text-sm mb-5 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo esse
              doloremque iste qui.
            </p>
            <p
              href="#"
              class="inline-flex cursor-pointer absolute -mb-10 left-20 items-center px-5 rounded-md py-3 text-sm font-medium text-center text-white bg-red-500"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </p>
          </div>
        </div> */}
        <div className="flex w-full relative bg-gray-200 items-start justify-start gap-2 rounded-lg shadow-xl">
          <div className="h-16 z-20 rounded-sm absolute top-0 left-0 w-full from-blue-500 to-red-500 bg-gradient-to-tr"></div>
        </div>

        <div className="w-full hover:border-blue-600 relative shadow-2xl shadow-blue-400 max-w-[300px] flex flex-col text-center bg-white bg-dark border border-gray-200 border-dark rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div
            className="relative flex flex-col items-center justify-center"
            href="#"
          >
            <img class="rounded-t-lg h-32 w-full" src="image-1.jpg" alt="" />
            <div className="absolute bg-white flex items-center justify-center z-10 mt-32 w-16 h-16 p-2 rounded-full border shadow-xl">
              <svg
                class="w-8 h-8"
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
              </svg>
            </div>
          </div>

          <div class="p-5 rounded-b-lg bg-blue-500/50 text-white">
            <p href="#">
              <h5 class="mb-2 mt-10 text-2xl font-bold tracking-tight ">
                Standard
              </h5>
            </p>
            <p class="mb-3 text-5xl font-bold ">$250</p>
            <p className="text-sm mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laudantium fuga deserun.
            </p>
            <p className="text-sm mb-5 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo esse
              doloremque iste qui.
            </p>
            <p
              href="#"
              class="inline-flex cursor-pointer absolute -mb-10 left-20 items-center px-5 rounded-md py-3 text-sm font-medium text-center text-white bg-blue-500"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </p>
          </div>
        </div>

        <div className="w-full hover:border-green-600 relative shadow-2xl shadow-green-400 max-w-[300px] flex flex-col text-center bg-white bg-dark border border-gray-200 border-dark rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div
            className="relative flex flex-col items-center justify-center"
            href="#"
          >
            <img class="rounded-t-lg h-32 w-full" src="image-1.jpg" alt="" />
            <div className="absolute bg-white flex items-center justify-center z-10 mt-32 w-16 h-16 p-2 rounded-full border shadow-xl">
              <svg
                class="w-8 h-8"
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
              </svg>
            </div>
          </div>

          <div class="p-5 rounded-b-lg bg-green-500/50 text-white">
            <p href="#">
              <h5 class="mb-2 mt-10 text-2xl font-bold tracking-tight ">
                Premium
              </h5>
            </p>
            <p class="mb-3 text-5xl font-bold ">$250</p>
            <p className="text-sm mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laudantium fuga deserun.
            </p>
            <p className="text-sm mb-5 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo esse
              doloremque iste qui.
            </p>
            <p
              href="#"
              class="inline-flex cursor-pointer absolute -mb-10 left-20 items-center px-5 rounded-md py-3 text-sm font-medium text-center text-white bg-green-500"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>

      <p className="px-main text-2xl self-center mt-24 font-bold">
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
      </div>
    </div>
  );
};

export default Prices;
