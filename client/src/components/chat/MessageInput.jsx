import React, { useEffect } from "react";
import LoadingButton from "../loading/LoadingButton";

const MessageInput = ({
  popup,
  typingHandler,
  setMessage,
  pending,
  sendHandler,
  setFiles,
  setDescription,
  setMessageType,
  sendMessageResponse,
}) => {
  useEffect(() => {
    if (sendMessageResponse?.status === "fulfilled") {
      setMessage("");
    }
  }, [sendMessageResponse]);
  return (
    <div className="border-t bg-white  border-b border-dark bg-dark relative border-gray-200 shadow-sm py-1 px-1">
      <div
        id="file-send"
        className="hidden absolute bg-white z-20 flex-col items-start justify-start gap-3 bottom-0 left-0 rounded-sm w-full h-auto p-2 border shadow-xl"
      >
        <div className="flex w-full items-center justify-between p-3 md:p-5 border-b border-dark rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Send file
          </h3>
          <button
            onClick={() => {
              popup("file-send");
              setMessageType("text");
              setFiles("");
            }}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="small_size"
        >
          File input
        </label>
        <input
          onChange={(e) => setFiles(e.target.files)}
          multiple
          className="block w-full mb-5 text-gray-900 border border-dark border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="small_size"
          type="file"
        />

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          File description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-dark border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your description here..."
        ></textarea>

        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <LoadingButton
            pending={pending}
            onClick={() => {
              sendHandler();
              setMessageType("text");
              setFiles("");
            }}
            title="Send"
            color="bg-main"
            width="w-full rounded-l-none rounded-r-sm"
          />
          <button
            onClick={() => {
              popup("file-send");
              setMessageType("text");
              setFiles("");
            }}
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none border-dark bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="relative items-center justify-center flex gap-2  rounded-sm">
        <button
          onClick={() => {
            setMessageType("file");
            popup("file-send");
          }}
          type="button"
          className="inline-flex items-center p-1  justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>

        <input
          onChange={(e) => {
            typingHandler(e);
            setMessage(e.target.value);
          }}
          type="text"
          placeholder="Write your message!"
          className="w-full text-gray-600 bg-dark focus:ring-0 text-sm focus:border-none p-[2px] border-none focus:outline-none focus:rounded-sm"
        />

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>

        <LoadingButton
          pending={pending}
          onClick={() => {
            sendHandler();
            setMessageType("text");
          }}
          title="Send"
          color="bg-main"
          width="w-full rounded-l-none rounded-r-sm"
        />
        {/* <button
        onClick={sendHandler}
        type="button"
        className="inline-flex items-center justify-center rounded-lg px-4 py-1  mr-2 transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-blue-500 focus:outline-none"
      >
        <span className="font-bold">Send</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 ml-2 transform rotate-90"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button> */}
      </div>
    </div>
  );
};

export default MessageInput;
