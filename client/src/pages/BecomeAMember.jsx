import React from "react";
const BecomeAMember = () => {
  return (
    <div className="pt-24 flex bg-gray-100 bg-dark flex-col items-center justify-center py-20">
      <div
        style={{
          backgroundImage: "url('./image-4.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[55vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <div className="w-full mt-10 px-main">
        <p className="text-xl mb-3 font-bold text-gray-500">Become A Member</p>

        <div className="w-full">
          <p className="text-lg tracking-wide font-bold">
            Join our vibrant community of businesses and professionals!
          </p>
          <p className="text-gray-600 text-lg">
            As a member of our directory, you’ll enjoy exclusive benefits.
          </p>
        </div>
        <div className="w-full items-start mt-5 justify-start flex">
          <p className="text-xl text-gray-500 font-bold ">
            Here’s what you’ll get!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row mt-5 items-center justify-between">
          <div className="flex items-center text-center lg:text-start lg:items-start flex-col lg:flex-row h-auto lg:h-[40vh] flex-[50%] justify-between border shadow-sm p-4 md:p-5 lg:p-14 gap-10 bg-gray-200 bg-dark">
            <div className="p-5 rounded-full border bg-white">
              <svg
                class="w-7 h-7 text-red-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            <div className="">
              <p className="text-lg font-bold">Increased Visibility</p>
              <p className="mt-3">
                Showcase your services to potential clients actively searching
                for businesses like yours.
              </p>
            </div>
          </div>

          <div className="flex items-center text-center lg:text-start lg:items-start flex-col lg:flex-row h-auto lg:h-[40vh] flex-[50%] justify-between border shadow-sm p-4 md:p-5 lg:p-14 gap-10 bg-white bg-dark">
            <div className="p-5 rounded-full border bg-gray-200">
              <svg
                class="w-7 h-7 text-red-400"
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
                  d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
                />
              </svg>
            </div>

            <div className="">
              <p className="text-lg font-bold">Networking Opportunities</p>
              <p className="mt-3">
                Connect with other members, exchange ideas, and collaborate on
                exciting projects.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse mt-10 items-center justify-between">
          <div className="flex items-center text-center lg:text-start lg:items-start flex-col lg:flex-row h-auto lg:h-[40vh] flex-[50%] justify-between border shadow-sm p-4 md:p-5 lg:p-14 gap-10 bg-gray-200 bg-dark">
            <div className="p-5 rounded-full border bg-white">
              <svg
                class="w-7 h-7 text-red-400"
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
                  d="M6 6h12M6 18h12m-5-8h5m-5 4h5M6 9v6l3.5-3L6 9Z"
                />
              </svg>
            </div>

            <div className="">
              <p className="text-lg font-bold">Featured Listings</p>
              <p className="mt-3">
                Stand out by having your business prominently displayed on our
                platform.
              </p>
            </div>
          </div>
          <div className="flex items-center text-center lg:text-start lg:items-start flex-col lg:flex-row h-auto lg:h-[40vh] flex-[50%] justify-between border shadow-sm p-4 md:p-5 lg:p-14 gap-10 bg-white bg-dark">
            <div className="p-5 rounded-full border bg-gray-200">
              <svg
                class="w-7 h-7 text-red-400"
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
                  d="M5.005 11.19V12l6.998 4.042L19 12v-.81M5 16.15v.81L11.997 21l6.998-4.042v-.81M12.003 3 5.005 7.042l6.998 4.042L19 7.042 12.003 3Z"
                />
              </svg>
            </div>

            <div className="">
              <p className="text-lg font-bold">Access to Resources</p>
              <p className="mt-3">
                Gain valuable insights, industry updates, and marketing tips.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-10 items-center justify-between">
          <div className="flex items-center text-center lg:text-start lg:items-start flex-col lg:flex-row h-auto lg:h-[40vh] flex-[50%] justify-between border shadow-sm p-4 md:p-5 lg:p-14 gap-10 bg-gray-200 bg-dark">
            <div className="p-5 rounded-full border bg-white">
              <svg
                class="w-7 h-7 text-red-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 14h-2.722L11 20.278a5.511 5.511 0 0 1-.9.722H20a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM9 3H4a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V4a1 1 0 0 0-1-1ZM6.5 18.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM19.132 7.9 15.6 4.368a1 1 0 0 0-1.414 0L12 6.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
              </svg>
            </div>

            <div className="">
              <p className="text-lg font-bold">Event Invitations</p>
              <p className="mt-3">
                Attend exclusive events, workshops, and webinars.
              </p>
            </div>
          </div>
          <div className="flex items-center text-center lg:text-start lg:items-start flex-col lg:flex-row h-auto lg:h-[40vh] flex-[50%] justify-between border shadow-sm p-4 md:p-5 lg:p-14 gap-10 bg-white bg-dark">
            <div className="p-5 rounded-full border bg-gray-200">
              <svg
                class="w-7 h-7 text-red-400"
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
                  d="M20.283 8h-4.285m3.85 3h-3.85m4.061-6H11v11h8.27l1.715-9.847A.983.983 0 0 0 20.059 5ZM6.581 13.23h-.838A13.752 13.752 0 0 1 5.622 11c-.02-.745.02-1.49.12-2.23h1.04c.252 0 .496-.088.683-.245a.927.927 0 0 0 .329-.61l.2-1.872a.888.888 0 0 0-.045-.39.936.936 0 0 0-.212-.34 1.017 1.017 0 0 0-.341-.231A1.08 1.08 0 0 0 6.983 5h-2.06a1.27 1.27 0 0 0-.699.204 1.135 1.135 0 0 0-.442.543A15.066 15.066 0 0 0 3.007 11a15.656 15.656 0 0 0 .795 5.229c.165.462 1.342.771 1.864.771h1.116c.142 0 .283-.028.413-.082.13-.053.246-.132.341-.23a.936.936 0 0 0 .212-.34.889.889 0 0 0 .046-.391l-.201-1.873a.927.927 0 0 0-.33-.609 1.059 1.059 0 0 0-.682-.245ZM10 18v1h10v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2Z"
                />
              </svg>
            </div>

            <div className="">
              <p className="text-lg font-bold">
                You Will Get Unlimited Support.
              </p>
              <p className="mt-3">
                We are always here to help you with pleasure, without any
                fatigue. We have 24/7 customer support available to assist you.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-12 ">
          <p className="text-lg font-bold">How to Join</p>

          <div className="flex mt-2 gap-2 items-center justify-start">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"
              />
            </svg>
            <a
              href="/prices"
              className="cursor-pointer hover:text-blue-600 hover:underline"
            >
              Visit our Membership Page to learn more.
            </a>
          </div>

          <div className="flex mt-2 gap-2 items-center justify-start">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"
              />
            </svg>
            <p className="">Select the membership packages</p>
          </div>

          <div className="flex mt-2 gap-2 items-center justify-start">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"
              />
            </svg>
            <p className="">
              Start enjoying the perks of being part of our community!
            </p>
          </div>
          <p className="mt-10 border-gray-500 mb-4 p-2 rounded-lg border shadow-sm">
            Ready to boost your business? Get in touch today to discuss
            advertising options!
          </p>
          <section class="mt-6">
            <div class="text-start w-full">
              <h2 class="mb-3 text-xl font-bold">Contact us</h2>
            </div>
            <div class="flex flex-wrap">
              <div class=" w-full grid grid-cols-1 md:grid-cols-2 flex-wrap">
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto">
                  <div class="flex items-start">
                    <div class="shrink-0">
                      <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold">Technical support</p>
                      <p class="text-neutral-500 ">support@example.com</p>
                      <p class="text-neutral-500 ">+1 234-567-89</p>
                    </div>
                  </div>
                </div>
                <div class="mb-12 w-full">
                  <div class="flex items-start">
                    <div class="shrink-0">
                      <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold ">Sales questions</p>
                      <p class="text-neutral-500 ">sales@etblink.com</p>
                      <p class="text-neutral-500 ">+251 922599990</p>
                    </div>
                  </div>
                </div>
                <div class="mb-12 w-full">
                  <div class="align-start flex">
                    <div class="shrink-0">
                      <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold ">Contact</p>
                      <p class="text-neutral-500 ">contact@etblink.com</p>
                      <p class="text-neutral-500 ">+251 0900808055</p>
                    </div>
                  </div>
                </div>
                <div class="mb-12 w-full">
                  <div class="align-start flex">
                    <div class="shrink-0">
                      <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold">Bug report</p>
                      <p class="text-neutral-500 ">bugs@etblink.com</p>
                      <p class="text-neutral-500">+1 234-567-89</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BecomeAMember;
