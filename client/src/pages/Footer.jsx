

const Footer = () => {
  return (
    <>
      {/* sellers */}
      <div className="w-full px-main flex flex-col items-center justify-between h-auto mt-20">
          <div className="w-full flex items-center justify-between h-auto">
            <p className="text-lg font-bold">Our top sellers</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-xs px-4 py-2 rounded-sm cursor-pointer flex items-center justify-center">
                Visit all{" "}
                <svg
                  className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                  />
                </svg>
              </p>
              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
                  d="m15 19-7-7 7-7"
                />
              </svg>

              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </div>
          </div>

          <div className="w-full h-auto py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 place-items-center gap-x-2 gap-y-5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex w-full flex-col items-center justify-center"
                >
                  <img
                    src="./gedi.jpg"
                    alt=""
                    className="w-24 h-24 rounded-full border border-dark border-gray-200"
                  />
                  <p className="text-xl mt-2 font-bold">Gedeon</p>
                  <p className="text-xl font-bold -mt-1">Agmas</p>
                  <p className="text-sm mt-1">22 companies</p>
                </div>
              );
            })}
          </div>
      </div>
      
    <div className="flex px-main flex-col gap-2 w-full mt-10 bg-gray-600 py-10 text-white">
      <p className="text-lg">
        ETBLINK <span className="text-sm">ethiopian business link</span>
      </p>
      <div className="w-full   grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 h-auto">
        {[0, 1, 2, 3].map((e) => {
          return (
            <div
              key={e}
              className="rounded-lg relative mt-20 hover:bg-gray-500 flex flex-col items-center justify-center"
            >
              <div className="absolute -top-20 left-2 w-24 h-24 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center p-2  mt-5">
                About us
              </div>
              <div className="rounded-lg w-full p-4 relative mt-5 hover:bg-gray-500 flex flex-col items-start justify-start">
                <p>
                  Ehiopian business link we are here to full fill your business.
                </p>
                <ul className="mt-4 flex flex-col gap-1">
                  <li>
                    Promotion <span className="ml-2 text-sm"> business</span>
                  </li>
                  <li>
                    Consulting <span className="ml-2 text-sm">every where</span>
                  </li>
                  <li>
                    Branding <span className="ml-2 text-sm">every where</span>
                  </li>
                  <li>Software development</li>
                  <li>Maintenance service</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div></>
  );
};

export default Footer;
