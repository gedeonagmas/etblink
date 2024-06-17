import React from "react";
// import customerImage from "../../assets/images/customers/customer-i.jpg";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";

const ChatHeader = ({
  sender,
  receiver,
  setDisplayVideo,
  type,
  calling,
  setCalling,
  caller,
  callRequest,
  callFlag,
  setCallFlag,
  callRejected,
  setCallRejected,
  ringingMessage,
  callRejectedHandler,
  rejectedMessage,
  setRejectedMessage,
  user,
  callAcceptHandler,
}) => {
  // const user = JSON.parse(localStorage.getItem("etblink_user"));
  // console.log(user, "user list from header");
  return (
    <div className="w-full relative py-[2px] bg-gray-200 bg-dark flex border-b border-dark justify-between items-center">
      <div
        onClick={() => {
          const id = document.getElementById("user_list_container");
          id?.classList?.value?.includes("hidden")
            ? id?.classList?.remove("hidden")
            : id?.classList?.add("hidden");
        }}
        className="flex items-center space-x-4 rtl:space-x-reverse"
      >
        <a
          href="#"
          id="menu"
          className="flex flex-col md:hidden ml-2 items-center p-2 border-gray-400 border-dark text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </a>
        <ProfilePicture user={user} />
        <div className="flex-1 min-w-0">
          <p className=" font-medium text-gray-900 truncate dark:text-white">
            {user?.role === "company"
              ? user?.user?.name
              : ` ${user?.user?.firstName} ${user?.user?.lastName} `}
          </p>

          <p className=" mt-[2px] text-gray-500 truncate dark:text-gray-400">
            last seen recently
          </p>
        </div>
      </div>
      {/* {callFlag && <p className="p-2  italic">Ringing...</p>} */}
      {type !== "small" && calling ? (
        <div className="flex  py-1 mr-3 gap-1 bg-mains text-white rounded-lg px-2 flex-col items-center.justify-center">
          {/* {caller} is calling... */}
          <p className=" text-blue-500 font-bold">
            Gedeon <span className="text-gray-500">is calling...</span>{" "}
          </p>
          <div className="flex w-full items-center justify-between">
            <button
              onClick={() => {
                setDisplayVideo(true);
                callAcceptHandler();
              }}
              className="px-2 py-1 rounded-md bg-emerald-500"
            >
              Accept
            </button>
            <button
              onClick={() => {
                setCalling(false);
                callRejectedHandler();
              }}
              className="px-2 py-1 rounded-md bg-red-500"
            >
              Reject
            </button>
          </div>
        </div>
      ) : callFlag ? (
        <p className="p-2 mr-3  italic">{rejectedMessage}</p>
      ) : callRejected ? (
        <p className="p-2 mr-3  italic">Gedeon is not answering</p>
      ) : (
        <div
          className={`flex items-center ${
            sender && receiver ? "text-gray-600" : "text-gray-400"
          }  mr-4 gap-2 space-x-2`}
        >
          <button
            type="button"
            // onClick={() => setCaller()}
            onClick={callRequest}
            disabled={sender && receiver ? false : true}
            className="inline-flex items-center justify-center rounded-lg h-10 w-10 transition duration-500 ease-in-out  focus:outline-none"
          >
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
                d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z"
              />
            </svg>
          </button>
          <button
            type="button"
            disabled={sender && receiver ? false : true}
            className="inline-flex items-center justify-center rounded-lg h-10 w-10 transition duration-500 ease-in-out focus:outline-none"
          >
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
                d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
