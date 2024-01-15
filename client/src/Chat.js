import "./index.css";
import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((currList) => [...currList, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col items-center bg-cyan-800 h-screen font-mono py-60 ">
      <div className=" flex flex-col gap-3 bg-slate-200 px-3 pt-5 rounded-2xl w-96 ">
        <div className="text-2xl text-center font-semibold mb-5">
          <p>Live Chat</p>
        </div>
        <div className=" overflow-y-auto h-72 border-gray-300 bg-white border-2 shadow-md rounded-md p-3">
          {messageList.map((messageContent, index) =>
            messageContent.author !== username ? (
              <p key={index}>{messageContent.message}</p>
            ) : (
              <p key={index} className=" text-right ">
                {messageContent.message}
              </p>
            )
          )}
        </div>
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
