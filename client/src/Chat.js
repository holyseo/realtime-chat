import React, { useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", msgData);
    }
  };

  return (
    <div>
      <div className="">
        <p>Live Chat</p>
      </div>
      <div className=""></div>
      <div className="">
        <input
          type="text"
          value={currentMsg}
          placeholder="Type your message"
          onChange={(event) => {
            setCurrentMsg(event.target.value);
          }}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
