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
  message,
  files,
  receiver,
  sender,
}) => {
  useEffect(() => {
    if (sendMessageResponse?.status === "fulfilled") {
      setMessage("");
    }
  }, [sendMessageResponse]);

  const fileName = () => {
    for (let i = 0; i < files?.length; i++) {
      // console.log(files[i], "iiiiiii");
      if (files?.length > 1) {
        return (
          <p className="">{`${files[i]?.name} ... and ${
            files?.length - 1
          } more`}</p>
        );
      } else {
        return <p className="">{files[i]?.name}</p>;
      }
    }
  };
  return (
    <div className="border-t w-full bg-white z-10 absolute bottom-0 border-b border-dark bg-dark border-gray-200 shadow-sm py-1 px-1">
      {/* <div
        id="file-send"
        className="hiddens pb-5 px-5 absolute bg-gray-200 bg-dark z-20 flex-col items-start justify-start gap-3 bottom-0 left-0 rounded-sm w-full h-auto border border-dark shadow-xl"
      >
        <div className="flex mt-2 w-full items-center justify-between rounded-t dark:border-gray-600">
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
            className="text-gray-400 absolute top-1 right-1 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="small_size"
        >
          Select file
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
          placeholder="Write file description here..."
        ></textarea>

        <div className="flex items-center mt-4 border-gray-200 rounded-b dark:border-gray-600">
          {files?.length > 0 ? (
            <LoadingButton
              pending={pending}
              onClick={() => {
                sendHandler();
                setMessageType("file");
                setFiles("");
              }}
              title="Send"
              color="bg-main"
              width="w-full rounded-l-none rounded-r-sm"
            />
          ) : (
            <div className="w-28 text-center cursor-default py-3 px-2 text-[14px] bg-red-500 text-white rounded-lg">
              Send
            </div>
          )}
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
      </div> */}

      <div
        id="file-send"
        className="hidden pb-5 px-5 absolute bg-gray-200 bg-dark z-20 flex-col items-start justify-start gap-3 bottom-0 left-0 rounded-sm w-full h-auto border border-dark shadow-xl"
      >
        <div class="w-full bg-white bg-dark shadow-lg rounded-lg p-6 relative">
          <div class="flex items-center border-bs border-gray-200">
            <div class="flex-1">
              <h3 class="text-gray-800 text-xl font-bold">Upload File</h3>
              <p class="text-gray-600 text-lg mt-1">Upload a file</p>
            </div>

            <svg
              onClick={() => {
                popup("file-send");
                setMessageType("text");
                setFiles("");
                setDescription("");
              }}
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 ml-2 cursor-pointer mt-7 shrink-0 fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div class="rounded-lg border-2 border-gray-200 border-dashed mt-6">
            <div class="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 mb-4 fill-gray-600 inline-block"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>

              <h4 class="text-sm text-gray-600">
                Drag & Drop or{" "}
                <label for="chooseFile" class="text-main cursor-pointer">
                  Choose file
                </label>{" "}
                to upload
              </h4>
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                id="chooseFile"
                class="hidden"
                multiple
              />
              {fileName()}
            </div>
          </div>

          {/* <div class="flex flex-col bg-gray-50 bg-dark border border-dark p-4 rounded-lg mt-4">
            <div class="flex">
              <p class="text-xs text-gray-600 flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-5 mr-2 fill-current inline-block"
                >
                  <path
                    d="m433.798 106.268-96.423-91.222C327.119 5.343 313.695 0 299.577 0H116C85.673 0 61 24.673 61 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55V146.222c0-15.049-6.27-29.612-17.202-39.954zM404.661 120H330c-2.757 0-5-2.243-5-5V44.636zM396 482H116c-13.785 0-25-11.215-25-25V55c0-13.785 11.215-25 25-25h179v85c0 19.299 15.701 35 35 35h91v307c0 13.785-11.215 25-25 25z"
                    data-original="#000000"
                  />
                  <path
                    d="M363 200H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15zm0 80H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15zm-147.28 80H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h72.72c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
                    data-original="#000000"
                  />
                </svg>
                document.file <span class="ml-2">1.5 mb</span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>

            <div class="bg-gray-300 rounded-full w-full h-2 my-2">
              <div class="w-1/3 h-full rounded-full bg-blue-600 flex items-center relative">
                <span class="absolute text-xs right-0 bg-white w-2 h-2 rounded-full"></span>
              </div>
            </div>

            <p class="text-xs text-gray-600 flex-1">35% done</p>
          </div> */}

          <label
            htmlFor="message"
            className="block mb-2 mt-5 text-sm font-medium text-gray-600"
          >
            File description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-dark rounded-lg border border-dark border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write file description here..."
          ></textarea>

          <div class="border-ts w-full border-dark border-gray-200 pt-6 flex justify-between gap-4 mt-6">
            <button
              onClick={() => {
                popup("file-send");
                setMessageType("text");
                setFiles("");
                setDescription("");
              }}
              type="button"
              className="py-2.5 px-5 w-full ms-3 text-sm font-medium text-gray-900 focus:outline-none border-dark bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <div className="w-full">
              {files?.length > 0 ? (
                <LoadingButton
                  pending={pending}
                  onClick={() => {
                    sendHandler();
                  }}
                  title="Send"
                  color="bg-main"
                  width="w-full rounded-lg"
                />
              ) : (
                <div className="w-full text-center cursor-default py-3 px-2 text-[14px] bg-red-500 text-white rounded-lg">
                  Send
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative items-center justify-center flex gap-2  rounded-sm">
        {receiver && sender ? (
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
        ) : (
          <button
            type="button"
            className="inline-flex items-center p-1  justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 cursor-default focus:outline-none"
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
        )}

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

        {message?.trim()?.length > 0 ? (
          <LoadingButton
            pending={pending}
            onClick={() => {
              setMessageType("text");
              sendHandler();
            }}
            title="Send"
            color="bg-main"
            width="w-full rounded-l-none rounded-r-sm"
          />
        ) : (
          <div className="w-[100px] cursor-default text-center py-3 px-2 text-[14px] bg-red-500 text-white rounded-l-none rounded-r-sm">
            Send
          </div>
        )}
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
