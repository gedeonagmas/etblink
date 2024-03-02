import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
const NewsDetail = () => {
  return (
    <div className="w-full relative bg-gray-50 bg-dark h-auto">
      <div
        style={{
          backgroundImage: "url('./image-1.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[70vh] relative z-20 w-full"
      >
        <div className="absolute bottom-0 text-2xl h-auto px-4 w-full bg-black text-white">
          <Ticker show={true} isNewsTicker={true} slideSpeed={30}>
            <NewsTicker
              id="1"
              title="Blue passports to be issued to Brits for the first time in decades next month decades next month decades next month decades next month Blue passports to be issued to Brits for the first time in decades next month Blue passports to be issued to Brits for the first time in decades next month"
              url=" https://metro.co.uk/2020/02/22/blue-passports-issued-brits-first-time-decades-next-months-12281012/?ito=newsnow-feed"
              meta="11:10:20"
            />
            <NewsTicker
              id="2"
              title="Blue passports to be issued to Brits for the first time in decades next month decades next month decades next month decades next month Blue passports to be issued to Brits for the first time in decades next month Blue passports to be issued to Brits for the first time in decades next month"
              url=" https://metro.co.uk/2020/02/22/blue-passports-issued-brits-first-time-decades-next-months-12281012/?ito=newsnow-feed"
              meta="11:10:20"
            />
            <NewsTicker
              id="3"
              title="Blue passports to be issued to Brits for the first time in decades next month decades next month decades next month decades next month Blue passports to be issued to Brits for the first time in decades next month Blue passports to be issued to Brits for the first time in decades next month"
              url=" https://metro.co.uk/2020/02/22/blue-passports-issued-brits-first-time-decades-next-months-12281012/?ito=newsnow-feed"
              meta="11:10:20"
            />
          </Ticker>
        </div>
      </div>

      <div className="w-full px-main h-auto flex flex-col lg:flex-row gap-10">
        <div className="h-auto flex flex-col gap-4 w-full lg:w-[65%]">
          <div className="flex w-full mt-6 items-center justify-between">
            <p className="flex items-center justify-center gap-2 w-auto py-2  rounded-lg">
              <svg
                class="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                  clip-rule="evenodd"
                />
              </svg>
              jan 22 2024
            </p>

            <div className="flex items-center pr-3 justify-between w-auto gap-10">
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

          <p className="font-bold mt-2 text-lg">
            Ethiopian business link is made a deal with global companies.
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ratione aspernatur dolorem accusantium quos asperiores
            facere.
          </p>

          <img
            src="./image-1.jpg"
            alt=""
            className="h-[500px] w-full mt-2 rounded-sm"
          />
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ratione aspernatur dolorem accusantium quos asperiores
            facere.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ratione aspernatur dolorem accusantium quos asperiores
            facere.
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            officia assumenda similique sit libero. Officia architecto quisquam
            doloremque, consequatur voluptate quae, itaque animi in sapiente
            dicta assumenda? Consequatur, quae architecto?
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ratione aspernatur dolorem accusantium quos asperiores
            facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quidem veniam adipisci repellat rerum ab sit recusandae distinctio
            quae expedita dolore quas labore, consequuntur magni velit
            consectetur itaque? Ipsum, soluta adipisci.
          </p>

          <p className="font-bold mt-10 text-lg">Read More</p>
          <div className="w-full grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {[0, 1, 2, 3].map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-3 items-center justify-between w-full h-auto"
                >
                  <img
                    src="./image-2.jpg"
                    alt=""
                    className="h-32 w-full rounded-sm"
                  />
                  <p className="">Ethiopoan business link is made a deal.</p>
                </div>
              );
            })}
          </div>

          <button className="bg-main px-4 w-44 mt-2 text-white py-2 rounded-md">
            Load more
          </button>
        </div>

        <div className="flex flex-col gap-4 pr-[7%] w-full lg:w-[35%]">
          <p className="text-lg mt-6 font-bold py-2 border-b-2">Local news</p>
          <div className="flex flex-col gap-6">
            {[0, 1, 2, 3].map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex border-b-2 py-3 items-center justify-between w-full h-auto"
                >
                  <p className="">Ethiopian business link is made a deal.</p>
                  <img
                    src="./image-2.jpg"
                    alt=""
                    className="h-12 w-32 rounded-sm"
                  />
                </div>
              );
            })}
          </div>

          <p className="text-lg mt-6 font-bold py-2 border-b-2">
            International news
          </p>
          <div className="flex flex-col gap-6">
            {[0, 1, 2, 3].map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex border-b-2 py-3 items-center justify-between w-full h-auto"
                >
                  <p className="">Ethiopian business link is made a deal.</p>
                  <img
                    src="./image-2.jpg"
                    alt=""
                    className="h-12 w-32 rounded-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
