import "./index.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="flex flex-col  items-center bg-cyan-700 h-screen p-60">
      <div className=" flex flex-col gap-3 bg-white p-10">
        <div className=" p-4">
          <h3 className=" text-3xl">Join A Chat</h3>
        </div>
        <div className=" border shadow-md">
          <input
            type="text"
            placeholder="Type your username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className=" border shadow-md">
          <input
            type="text"
            placeholder="Type your room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
        <button
          className=" bg-slate-500 p-3 text-white font-semibold m-5 "
          onClick={joinRoom}
        >
          Join a room
        </button>
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}

export default App;
