import { PushPinOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const Video = ({ chatId, setDisplayVideo, socket }) => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const ids = [];
  const [calling, setCalling] = useState(false);
  const [callIndicator, setCallIndicator] = useState(false);
  const [caller, setCaller] = useState("");
  const [callFlag, setCallFlag] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [rejectedMessage, setRejectedMessage] = useState("");

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      ids.push(id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: false }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: false }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  useEffect(() => {
    socket?.emit("call-accepted", chatId, true, peerId);
    socket?.on("call-accepted-response", (bool, peerIds) => {
      //  setDisplayVideo(bool);
      console.log(peerIds, "peer ids new from socket io");

      setRemotePeerIdValue(peerIds); // setTimeout(() => {
      //  call(peerIds);
      // }, 10000);

      //  setCallFlag(false);
    });
  }, [peerId]);

  return (
    <div className="flex relative flex-col items-start gap-2 justify-start p-4 h-[100vh] w-[70%] bg-white">
      {/* <h1>Current user id is {peerId}</h1>
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        />
        <button onClick={() => call(remotePeerIdValue)}>Call</button>
        <div>
          <video ref={currentUserVideoRef} />
        </div>
        <div>
          <video ref={remoteVideoRef} />
        </div> */}
      <div onClick={() => call(remotePeerIdValue)} className="flex gap-2 items-center">
        {/* <p
          onClick={() => setDisplayVideo(false)}
          className="text-sm absolute left-1 top-1 px-2 hover:text-gray-600"
        >
          back
        </p> */}
        {/* <h1>Current user id is {peerId}</h1>
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        /> */}
        {/* <div className="p-2 flex gap-3 items-center text-xs bg-yellow-200 rounded-md">
          Your camera and microphone will be share{" "}
          <button
            onClick={() => call(remotePeerIdValue)}
            className="px-4 py-[2px] bg-emerald-500 text-white rounded-full"
          >
            Ok
          </button>
          <button className="px-4 py-[2px] bg-red-500 text-white rounded-full">
            cancel
          </button>
        </div> */}
        start
      </div>
      <div className="relative w-full">
        <video
          ref={remoteVideoRef}
          alt=""
          controls
          muted
          className="h-[440px] object-cover object-center border border-gray-300 rounded-xl w-full"
        />

        <PushPinOutlined
          fontSize="small"
          className="absolute text-blue-500 cursor-pointer rotate-45 top-1 left-1"
        />
        <div className="absolute top-1 right-1 w-24 h-16">
          <video
            ref={currentUserVideoRef}
            muted
            className=" border w-full object-cover object-center h-full border-gray-300  rounded-md "
          />

          <PushPinOutlined
            fontSize="small"
            className="absolute cursor-pointer rotate-45 top-1 right-1"
          />
        </div>
      </div>

      <div className="flex gap-5 w-full items-center mt-4 justify-center">
        <div className="p-2 hover:bg-gray-500/50 cursor-pointer  rounded-full bg-gray-400/50">
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
              d="M19 9v3a5.006 5.006 0 0 1-5 5h-4a5.006 5.006 0 0 1-5-5V9m7 9v3m-3 0h6M11 3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
            />
          </svg>
        </div>
        <button
          onClick={() => setDisplayVideo(false)}
          className="px-7 py-3 rounded-full bg-red-500 text-white hover:bg-red-400"
        >
          End call
        </button>
        <div className="p-2 hover:bg-gray-500/50 cursor-pointer rounded-full bg-gray-400/50">
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
              d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Video;
