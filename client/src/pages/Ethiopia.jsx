import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CompanyItemsCompany from "../components/CompanyItemCategory";

const Ethiopia = () => {
  return (
    <div className="w-full flex flex-col relative bg-gray-50 bg-dark h-auto">
      <div
        style={{
          backgroundImage: "url('./lalibela.webp')",
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

      <div className="w-full px-main h-auto flex flex-col lg:flex-row gap-4">
        <div className="h-auto flex flex-col w-full lg:w-[80%]">
          <p className="text-2xl font-extrabold mt-24">About Ethiopia</p>
          <div class="w-full mt-10 flex items-center gap-10 flex-col md:flex-row">
            <div>
              <img class="w-[500px] h-[200px]" src="ethiopia.svg" alt="" />
            </div>
            <div className="flex max-w-[500px] flex-col gap-4">
              <p className="text-sm">
                Ethiopia is the oldest independent country in Africa and one of
                the oldest in the world. What are believed to be the oldest
                remains of a human ancestor ever found, which have been dated as
                being some five million years old, were discovered in the Awash
                Valley in Ethiopia. This beats the discovery of “Lucy”, a 3.2
                million year old skeleton, who was unearthed in the same area in
                1974. The Greek historian Herodotus, of the fifth century BC,
                describes ancient Ethiopia in his writings.
              </p>

              <div className="flex gap-2 cursor-pointer  text-start rounded-full items-center justify-start ">
                <svg
                  className="w-6 h-6"
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
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
                Read more
              </div>
            </div>
          </div>

          <div className="bg-gray-200 py-10 mt-20 bg-dark">
            <p className="px-main text-2xl self-center font-bold">
              Ethiopia is
            </p>
            <div className="grid w-full place-items-center px-main self-center gap-x-5 gap-y-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {[0, 1, 2, 3, 4, 5].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex bg-white text-center rounded-lg dark:bg-gray-600 relative w-full p-5 justify-center gap-1 flex-col items-center"
                  >
                    <svg
                      class="w-10 h-10"
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
                    <p className="font-bold text-lg mt-1">
                      Origin of human being
                    </p>
                    <p className="text-sm">
                      Ethiopia is a land of enormous diversity and has more than
                      80 languages
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div class="w-full mt-20 flex items-center gap-10 flex-col md:flex-row">
            <div>
              <img class="w-[500px] h-[200px]" src="./abiy.jpeg" alt="" />
            </div>
            <div className="flex max-w-[500px] flex-col gap-4">
              <p className="text-sm">
                Ethiopia is the oldest independent country in Africa and one of
                the oldest in the world. What are believed to be the oldest
                remains of a human ancestor ever found, which have been dated as
                being some five million years old, were discovered in the Awash
                Valley in Ethiopia. This beats the discovery of “Lucy”, a 3.2
                million year old skeleton, who was unearthed in the same area in
                1974. The Greek historian Herodotus, of the fifth century BC,
                describes ancient Ethiopia in his writings.
              </p>
            </div>
          </div>

          <p className="text-sm mt-10">
            Ethiopia is the oldest independent country in Africa and one of the
            oldest in the world. What are believed to be the oldest remains of a
            human ancestor ever found, which have been dated as being some five
            million years old, were discovered in the Awash Valley in Ethiopia.
            This beats the discovery of “Lucy”, a 3.2 million year old skeleton,
            who was unearthed in the same area in 1974. The Greek historian
            Herodotus, of the fifth century BC, describes ancient Ethiopia in
            his writings.
          </p>
          <p className="text-sm mt-10">
            The Greek historian Herodotus, of the fifth century BC, describes
            ancient Ethiopia in his writings, while the Bible’s Old Testament
            records the Queen of Sheba’s visit to Jerusalem where “she proved
            Solomon with hard questions”. Matters clearly went further than that
            because legend asserts that King Menelik – the founder of the
            Ethiopian Empire – was the son of the Queen and Solomon.
          </p>
          <p className="text-sm mt-10">
            Insurrections occurred throughout Ethiopia, particularly in the
            northern regions of Tigray and Eritrea. In 1989, the Tigrayan
            People’s Liberation front (TPLF) merged with the Amhara and Oromo
            liberation fronts (EPDM & OPDO) to form the Ethiopian Peoples’
            Revolutionary Democratic Front (EPRDF). In May 1991, the EPRDF
            forces advanced on Addis Ababa forcing Mengistu to flee to Zimbabwe.
            In 1991, the Transitional Government of Ethiopia (TGE) was set up
            from the EPRDF and other political parties in the country with an 87
            strong Council of Representatives and a transitional constitution.
          </p>
          <p className="text-sm mt-10">
            Haileselassie then reigned until 1974 when he was deposed and a
            provisional council of soldiers (the Derg, meaning committee) seized
            power and installed a government which was socialist in name and
            military in style. Fifty nine members of the Royal Family and
            ministers and generals from the Imperial Government were summarily
            executed. Haile Selassie himself was strangled in the basement of
            his palace in August 1975.
          </p>

          <p className="mt-20 text-xl font-bold">Useful Links</p>
          <div className="grid w-full place-items-center self-center gap-x-5 gap-y-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {[0, 1, 2].map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex p-2 bg-white rounded-lg dark:bg-gray-600 relative w-full justify-start gap-1 flex-col items-start"
                >
                  <p className="font-bold flex gap-2 items-center justify-start hover:underline text-sm cursor-pointer mt-1">
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
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>{" "}
                    Ethiopian embassy
                  </p>

                  <p className="font-bold flex gap-2 items-center justify-start hover:underline text-sm cursor-pointer mt-1">
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
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>{" "}
                    Ethio teleome
                  </p>
                  <p className="font-bold flex gap-2 items-center justify-start hover:underline text-sm cursor-pointer mt-1">
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
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>{" "}
                    Ethiopian airlines
                  </p>
                  <p className="font-bold flex gap-2 items-center justify-start hover:underline text-sm cursor-pointer mt-1">
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
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>{" "}
                    Ethiopian broadcasting corporation
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-[20%]">
          <div className="flex w-full mt-4 mb-1 justify-between items-center">
            <p className="font-bold">Featured</p>
            <div className="flex gap-2 items-center justify-center">
              <svg
                class="w-6 h-6 text-gray-400 dark:text-white"
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
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </div>
          </div>
          <CompanyItemsCompany />
          <CompanyItemsCompany />
          <CompanyItemsCompany />
        </div>
      </div>
    </div>
  );
};

export default Ethiopia;
