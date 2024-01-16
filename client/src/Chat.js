import "./index.css";
import React, { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserLoginContext } from "./UserContext";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [party, setParty] = useState("");

  const { userLogin } = useContext(UserLoginContext);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((currList) => [...currList, messageData]);
    }
    setCurrentMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((currList) => {
        return [...currList, data];
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setParty(data.author);
    });
  }, [socket]);

  return (
    <div className="flex flex-col items-center bg-cyan-800 h-screen font-mono py-60 ">
      <div className=" flex flex-col gap-3 bg-slate-50 px-3 pt-5 rounded-2xl w-96 ">
        <div className="text-lg text-center font-semibold mb-5">
          <p className=" pb-3">Welcome, {userLogin}.</p>
          {!party ? (
            <p className="text-xs">You are the only one in this chat.</p>
          ) : (
            <p className="text-xs">Chat started with: {party}</p>
          )}
        </div>
        <ScrollToBottom className=" flex flex-col end overflow-y-auto h-96 border-gray-300 bg-white border-2 shadow-md rounded-md p-2">
          {messageList.map((messageContent, index) =>
            messageContent.author !== username ? (
              <div key={index} className="mr-auto flex flex-col">
                <span className=" bg-gray-100 rounded-3xl px-5 py-1 max-w-56 mt-5 mr-auto break-words">
                  {messageContent.message}
                </span>
                <span className=" pl-1 mt-1 text-xs mr-auto">
                  {messageContent.time}
                </span>
              </div>
            ) : (
              <div key={index} className="ml-auto flex flex-col pr-2">
                <span
                  key={index}
                  className=" bg-blue-300 rounded-3xl px-5 py-1 max-w-56 mt-5 text-right ml-auto break-words"
                >
                  {messageContent.message}
                </span>
                <span className=" pl-1 mt-1 text-xs ml-auto">
                  {messageContent.time}
                </span>
              </div>
            )
          )}
        </ScrollToBottom>
        <div className="flex mb-3 justify-between border-gray-600 border-2 rounded-md mt-5 p-1">
          <div className="flex-1 ">
            <input
              className="w-full p-0.5"
              type="text"
              value={currentMessage}
              placeholder="Type your message"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
          </div>
          <div className="text-indigo-900 text-xl font-serif hover:bg-indigo-300 hover:text-white transition duration-200 px-2">
            <button className="" onClick={sendMessage}>
              &#9658;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
