import { DarkThemeToggle } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  useCreateMutation,
  useLazyReadChatQuery,
  useReadQuery,
} from "../features/api/apiSlice";
import Response from "../components/Response";
import LoadingButton from "../components/loading/LoadingButton";
import Loading from "../components/loading/Loading";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import customerImage from "../../../../assets/images/customers/customer-i.jpg";
import Peer from "peerjs";
import { PushPinOutlined } from "@mui/icons-material";
import Messages from "../components/chat/Messages";
import MessageInput from "../components/chat/MessageInput";
import ChatHeader from "../components/chat/ChatHeader";
import UserList from "../components/chat/UserList";
import Video from "../components/chat/Video";
// import "./scroll.css";

const Message = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  //   const [currentUser, setCurrentUser] = useState();
  const currentUser = JSON.parse(localStorage.getItem("etblink_user"));

  const [sendMessageData, sendMessageResponse] = useCreateMutation();
  const [sender, setSenderId] = useState("");
  const [receiver, setReceiverId] = useState("");
  //   console.log(user, "users current");
  //   useEffect(() => {
  //     user &&
  //       setCurrentUser({
  //         _id: user?._id,
  //         email: user?.email,
  //       });
  //   }, [user]);

  const [onlineUsers, setOnlineUsers] = useState();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [texts, setTexts] = useState();
  const [typing, setTyping] = useState(false);
  const [chatId, setChatId] = useState("");
  const [files, setFiles] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [description, setDescription] = useState("");
  const refer = useRef(null);
  const [cases, setCases] = useState([
    {
      name: "Civil",
      description: "civil description",
      category: [
        {
          name: "Family",
          description: "family description",
          category: [
            { name: "Maintenance", description: "maintenance description" },
            { name: "Adoption", description: "adoption description" },
            { name: "Divorce", description: "divorce description" },
          ],
        },
        {
          name: "Contract",
          description: "contract description",
          category: [
            {
              name: "Contract of special movables",
              description: "Contract of special movables",
            },
            {
              name: "Sale or lease of buildings",
              description: "Sale or lease of buildings description",
            },
          ],
        },
      ],
    },
  ]);

  const [trigger, { data: messageData, isLoading, isError }] =
    useLazyReadChatQuery({ refetchOnFocus: false });

  useEffect(() => {
    if (receiver && sender) {
      trigger({
        url: `/chat/${sender}.${receiver}`,
        tag: ["chats"],
      });
    }
  }, [receiver, sender]);

  const {
    data: userData,
    isLoading: userIsFetching,
    isError: userIsError,
  } = useReadQuery({
    url: `/user/users`,
    tag: ["users"],
  });

  // useEffect(() => {
  //   const hash = location.hash.split("#").splice(1, 2);
  //   // console.log(hash, "locations now");
  //   if (location?.hash) {
  //     setCurrentUser({ _id: location._id, email: location.email });
  //   }
  // }, []);
  const focusHandler = (id) => {
    ["group", "private", "manager", "lawyer", "all"].map((e) => {
      const ids = document.getElementById(e);
      ids?.classList?.remove(
        // "border-b",
        // "bg-gray-200",
        // "border-blue-600",
        "font-extrabold",
        "text-blue-600"
      );
      if (id === e) {
        ids?.classList?.add(
          // "border-b",
          // "bg-gray-200",
          // "border-blue-600",
          "font-extrabold",
          "text-blue-600"
        );
      }
    });
  };

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);

  //   useEffect(() => {
  //     socket?.emit("connect-user", currentUser?.email);
  //     socket?.on("aaa", (val) => {
  //       setOnlineUsers(val);
  //     });
  //   }, [socket, currentUser]);
  useEffect(() => {
    socket?.emit("connect-user", currentUser?.email);
    socket?.on("aaa", (val) => {
      setOnlineUsers(val);
    });
  }, [socket]);

  const sendHandler = () => {
    files && console.log(files, "files");
    if (sender && receiver) {
      const formData = new FormData();
      formData.append("sender", sender);
      formData.append("receiver", receiver);
      formData.append("message", message);
      formData.append("messageType", messageType);
      formData.append("description", description);
      formData.append("url", "/chat");
      formData.append("tag", ["chats"]);
      files?.length > 0
        ? [...files].forEach((file) => {
            formData.append("chatFile", file);
          })
        : formData.append("chatFile", files);
      sendMessageData(formData);
    }

    // sender &&
    //   receiver &&
    //   sendMessageData({
    //     chatId,
    //     sender: sender,
    //     receiver: receiver,
    //     message: {
    //       content: message,
    //     },
    //     messageType: type,
    //     chatType: "private",
    //     url: `/chat`,
    //     tag: ["chats"],
    //   });
  };

  useEffect(() => {
    if (messageData !== undefined) {
      setChatId(messageData?.data[0]?.chatId);
      setTexts(messageData?.data);
      socket?.emit("aa", messageData?.data, messageData?.data[0]?.chatId);
      socket?.on("bb", (text) => {
        setTexts(text);
      });
    }
  }, [messageData]);

  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [texts]);

  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [typing]);

  const createRoomHandler = (id) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((e) => {
      const ids = document.getElementById(e);
      ids?.classList?.remove("bg-gray-200");
      if (id === e) {
        ids?.classList?.add("bg-gray-200");
      }
    });
  };

  const closeLists = () => {
    const i = document.getElementById("user_lists");
    const ii = document.getElementById("user_list_container");
    ii.classList?.remove("md:flex-[25%]");
    i?.classList?.value?.includes("hidden")
      ? (i.classList?.remove("hidden"),
        i.classList?.add("flex"),
        ii.classList?.add("md:flex-[25%]"))
      : (i.classList?.remove("flex"),
        i.classList?.add("hidden"),
        ii.classList?.remove("md:flex-[25%]"));
  };

  const popup = (id) => {
    const i = document.getElementById(id);
    i?.classList?.value?.includes("hidden")
      ? (i.classList?.remove("hidden"), i.classList?.add("flex"))
      : (i.classList?.remove("flex"), i.classList?.add("hidden"));
  };

  // typing handler
  const typingHandler = (e) => {
    if (e.target.value.length > 0) {
      socket?.emit("typing t", true, chatId);
      socket?.on("typing true", (bool) => {
        setTyping(bool);
      });
    } else {
      socket?.emit("typing f", false, chatId);
      socket?.on("typing false", (bool) => {
        setTyping(bool);
      });
    }
  };

  useEffect(() => {
    console.log(message);
    if (message.length > 0) {
      socket?.emit("typing t", true, chatId);
      socket?.on("typing true", (bool) => {
        setTyping(bool);
      });
    } else {
      socket?.emit("typing f", false, chatId);
      socket?.on("typing false", (bool) => {
        setTyping(bool);
      });
    }
  }, [message]);

  //##########################################################################
  const [displayVideo, setDisplayVideo] = useState(false);
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

  const callAcceptHandler = () => {
    socket?.emit("call-accepted", chatId, true, peerId);
    // socket?.emit("call-accepted-peerIdSend", chatId, peerId);
  };

  socket?.on("call-accepted-response", (bool, peerId) => {
    setDisplayVideo(bool);
    // call(peerId);
    setCallFlag(false);
  });

  // socket?.on("call-accepted-peerId", (pid) => {
  //   console.log(pid, "peer id incomming");
  //   setRemotePeerIdValue(pid);
  //   call(remotePeerIdValue);
  // });

  const callRequest = () => {
    setCallFlag(true);
    setRejectedMessage("Calling...");
    socket?.emit("call-request-send", chatId, currentUser._id);
  };

  socket?.on("call-request-received", (bool, name) => {
    setCalling(bool);
    setCaller(name);
  });

  const callRejectedHandler = () => {
    socket?.emit("call-rejected", chatId, false, "Gedi is not answering");
  };

  socket?.on("call-rejected-response", (bool, msg) => {
    setRejectedMessage(msg);
    setTimeout(() => {
      setCallFlag(bool);
      setRejectedMessage("");
    }, 4000);
  });

  // console.log(peerId, "peer id");
  return (
    <div className="flex text-xs  -ml-3 -mt-2">
      <Response response={sendMessageResponse} setPending={setPending} />

      {/* video */}
      {displayVideo ? (
        <div className="absolute z-20 pl-[220px] top-0 left-0 bg-white flex gap-5 items-center p-5 w-full h-[100vh]">
          <Video
            setRemotePeerIdValue={setRemotePeerIdValue}
            remotePeerIdValue={remotePeerIdValue}
            remoteVideoRef={remoteVideoRef}
            currentUserVideoRef={currentUserVideoRef}
            peerId={peerId}
            call={call}
            setDisplayVideo={setDisplayVideo}
            socket={socket}
            chatId={chatId}
          />

          <div className="flex flex-col items-start justify-start h-[63vh] w-[25%] bg-blue-500 border shadow-2xl rounded-sm">
            <ChatHeader sender={sender} receiver={receiver} type="small" />
            <Messages
              isLoading={isLoading}
              isError={isError}
              receiver={receiver}
              sender={sender}
              texts={texts}
              currentUser={currentUser}
            />
            <MessageInput
              popup={popup}
              typingHandler={typingHandler}
              setMessage={setMessage}
              pending={pending}
              sendHandler={sendHandler}
              setFiles={setFiles}
              setDescription={setDescription}
              setMessageType={setMessageType}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex h-[82.3vh]">
          <div id="user_list_container" className="w-[25%]">
            <UserList
              userIsFetching={userIsFetching}
              userIsError={userIsError}
              userData={userData}
              currentUser={currentUser}
              createRoomHandler={createRoomHandler}
              setReceiverId={setReceiverId}
              setSenderId={setSenderId}
              onlineUsers={onlineUsers}
            />
          </div>

          <div className="flex w-[76%] bg-yellow-500 h-[85vh] flex-col border-r">
            <ChatHeader
              sender={sender}
              receiver={receiver}
              setDisplayVideo={setDisplayVideo}
              displayVideo={displayVideo}
              calling={calling}
              caller={caller}
              callRequest={callRequest}
              callFlag={callFlag}
              setCallFlag={setCallFlag}
              callRejected={callRejected}
              callRejectedHandler={callRejectedHandler}
              setCalling={setCalling}
              rejectedMessage={rejectedMessage}
              setRejectedMessage={setRejectedMessage}
              callAcceptHandler={callAcceptHandler}
            />

            <Messages
              isLoading={isLoading}
              isError={isError}
              receiver={receiver}
              sender={sender}
              texts={texts}
              currentUser={currentUser}
            />
            {/* <div className="mt-4"> */}
            <MessageInput
              popup={popup}
              typingHandler={typingHandler}
              setMessage={setMessage}
              pending={pending}
              sendHandler={sendHandler}
              setFiles={setFiles}
              setDescription={setDescription}
              setMessageType={setMessageType}
            />
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
