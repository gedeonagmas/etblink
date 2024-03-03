const Contact = () => {
  return (
    <div className="w-full flex flex-col relative bg-gray-50 bg-dark h-auto">
      <div
        style={{
          backgroundImage: "url('./lalibela.webp')",
          backgroundRepeat: false,
        }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <p className="text-2xl px-main font-bold mt-24">International contacts</p>
      <div className="w-full px-main  h-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 place-items-center gap-x-2 gap-y-5">
        {[0, 1, 2, 3, 4, 5, 6].map((e, i) => {
          return (
            <div
              key={i}
              className="flex w-full shadow-sm shadow-gray-200 p-4 bg-white bg-dark rounded-lg hover:bg-main hover:text-white flex-col items-center justify-center"
            >
              <img
                src="./teda.jpg"
                alt=""
                className="w-24 h-24 rounded-full border border-dark border-blue-300"
              />
              <p className="text-sm mt-2 font-bold">Tewodros kebede</p>
              <p className="text-sm mt-1">+251 954104637</p>
              <p className="text-sm mt-1">Ethiopia</p>
            </div>
          );
        })}
      </div>

      <div className="w-full relative p-10 rounded-sm px-main  mt-5 flex items-start flex-col md:flex-row">
        <div className="w-[65%] bg-main text-white bg-dark shadow text-dark p-5 h-full">
          <p className="text-xl font-bold ">Contact us</p>
          <p className="text-2xl mt-2 font-bold ">Get in touch</p>
          <div className="flex flex-col lg:flex-row gap-6 items-center mt-10  justify-between w-full">
            <div class="mb-5 w-full">
              <label for="email" class="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="shadow-sm bg-gray-50 border border-gray-300 "
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div class="mb-5 w-full">
              <label for="password" class="block mb-2 text-sm font-medium">
                Your password
              </label>
              <input
                type="password"
                id="password"
                class="shadow-sm bg-gray-50 border border-gray-300 "
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center mt-2  justify-between w-full">
            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium">
                Full name or Company name
              </label>
              <input
                type="text"
                id="name"
                class="shadow-sm bg-gray-50 border border-gray-300 "
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div class="mb-5">
              <label for="password" class="block mb-2 text-sm font-medium">
                Your password
              </label>
              <input
                type="password"
                id="password"
                class="shadow-sm bg-gray-50 border border-gray-300 "
                required
              />
            </div>
          </div>

          <label for="countries" class="block mb-2 mt-2 text-sm font-medium ">
            Where did you hear about us
          </label>
          <select
            id="countries"
            class="bg-gray-50 text-gray-500 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>My friend</option>
            <option>Google</option>
            <option>Social media</option>
            <option>Your website</option>
          </select>
          <label for="message" class="block mb-2 mt-5 text-sm font-medium ">
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>

          <button className="px-4 py-3 font-bold text-lg rounded-lg text-white bg-gray-700 mt-5">
            Submit
          </button>
        </div>
        <div className="w-[35%] bg-gray-200 bg-dark shadow-xl p-5 h-full">
          <p className="text-2xl font-bold">Contact info</p>
          <div className="flex mt-5 gap-3">
            <div className="p-2 bg-white rounded-full border border-gray-200">
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
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm font-bold">Ethiopia</p>
              <p className="text-sm">Bolle 22 KW bldg</p>
            </div>
          </div>

          <div className="flex mt-5 gap-3">
            <div className="p-2 bg-white rounded-full border border-gray-200">
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
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm font-bold">Ethiopia</p>
              <p className="text-sm">Bolle 22 KW bldg</p>
            </div>
          </div>

          <div className="flex mt-5 gap-3">
            <div className="p-2 bg-white rounded-full border border-gray-200">
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
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm font-bold">Ethiopia</p>
              <p className="text-sm">Bolle 22 KW bldg</p>
            </div>
          </div>

          <div className="flex mt-5 gap-3">
            <div className="p-2 bg-white rounded-full border border-gray-200">
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
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm font-bold">Ethiopia</p>
              <p className="text-sm">Bolle 22 KW bldg</p>
            </div>
          </div>

          <div className="flex mt-5 gap-3">
            <div className="p-2 bg-white rounded-full border border-gray-200">
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
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm font-bold">Ethiopia</p>
              <p className="text-sm">Bolle 22 KW bldg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
