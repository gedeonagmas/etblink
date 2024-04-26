import React from "react";
import Loading from "../loading/Loading";

const UserList = ({
  userIsFetching,
  userIsError,
  userData,
  currentUser,
  createRoomHandler,
  setReceiverId,
  setSenderId,
  onlineUsers,
}) => {
  return (
    <div
      id="user_lists"
      className="flex border-r  overflow-y-hidden flex-col flex-[20%] h-[85vh]"
    >
      {/* search */}
      <div className="w-full flex flex-col py-[4px] bg-gray-100 items-center justify-start shadow-sm h-[72px] border-b">
        <div class="w-full">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-[6px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search users"
              required
            />
            {/* <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </div>

        <div className="flex w-full mt-[6px] bg-gray-300 items-center justify-start">
          <div className="flex w-full p-[2px] gap-1 bg-main text-white cursor-pointer border-r justify-center flex-cols items-center">
            <svg
              class="w-6 h-6 "
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
                d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="  ">Company</p>
          </div>

          <div className="flex w-full hover:bg-red-500 hover:text-white p-[2px] gap-1  cursor-pointer justify-center flex-cols border-r items-center">
            <svg
              class="w-6 h-6 "
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
                d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="  ">Sales</p>
          </div>

          <div className="flex w-full hover:bg-red-500 hover:text-white p-[2px] gap-1 cursor-pointer justify-center flex-cols border-r items-center">
            <svg
              class="w-6 h-6 "
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
                d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="  ">Visitor</p>
          </div>
        </div>
      </div>

      {userIsFetching && <Loading text="text-gray-500" />}
      {userIsError && <p>something went wrong unable to read the users</p>}
      {/* user list */}
      <div className="flex flex-col  mt-2 h-full overflow-y-auto">
        <ul className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
          {userData && userData?.data?.length > 0 ? (
            userData?.data?.map((user, i) => {
              if (user?._id !== currentUser?._id) {
                return (
                  <li
                    key={i}
                    id={i.toString()}
                    onClick={() => {
                      createRoomHandler(i);
                      setReceiverId(user?._id);
                      setSenderId(currentUser?._id);
                      // setChatId(`${sender}.${receiver}`);
                      // fetchUsersMessage();
                    }}
                    className="p-[6px] hover:bg-gray-200"
                  >
                    <div className="flex cursor-pointer items-center space-x-4 rtl:space-x-reverse">
                      <div className="relative">
                        {user?.role !== "company" &&
                        user?.user?.profilePicture?.length < 1 ? (
                          <div className="w-9 h-9 p-1  font-bold rounded-full flex items-center justify-center bg-main text-white text-center">
                            {user?.email?.substring(0, 1)}
                          </div>
                        ) : user?.role !== "company" &&
                          user?.user?.profilePicture?.length > 1 ? (
                          <img
                            class="w-9 h-9 rounded-full"
                            src={user?.user?.profilePicture}
                            alt="photo"
                          />
                        ) : user?.role === "company" &&
                          user?.user?.logo?.length > 1 ? (
                          <img
                            class="w-9 h-9 rounded-full"
                            src={
                              user?.role === "company" ? user?.user?.logo : ""
                            }
                            alt="user"
                          />
                        ) : (
                          <div className="w-9 h-9 p-1  font-bold rounded-full flex items-center justify-center bg-main text-white text-center">
                            {user?.email?.substring(0, 1)}
                          </div>
                        )}
                        <span
                          className={`top-0 left-6 absolute  w-3 h-3 ${
                            onlineUsers?.includes(user?.userName)
                              ? "bg-green-400"
                              : "bg-gray-200"
                          }  border-2 border-white dark:border-gray-800 rounded-full`}
                        ></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className=" font-medium text-gray-900 truncate dark:text-white">
                          {user?.user?.firstName
                            ? user?.user?.firstNam
                            : user?.role}
                        </p>
                        <p className=" mt-[2px] text-gray-500 truncate dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              }
            })
          ) : (
            <div className="w-full text-center">No user found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
