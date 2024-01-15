import "./index.css";
import io from "socket.io-client";
import { useContext, useState } from "react";
import Chat from "./Chat";
import { UserLoginContext } from "./UserContext";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [toggle, setToggle] = useState(true);

  const { setUserLogin } = useContext(UserLoginContext);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      const userData = {
        author: username,
        room,
      };
      socket.emit("join_room", userData);
      setToggle(false);
      setUserLogin(userData.author);
    }
  };

  return toggle ? (
    <div className="flex flex-col font-mono items-center bg-cyan-700 h-screen p-60">
      <div className=" flex flex-col gap-3 bg-white p-10 rounded-2xl">
        <div className=" p-4">
          <h3 className=" text-3xl">SOCKET.IO Chat</h3>
        </div>
        <div className=" border shadow-md">
          <input
            className="w-full p-0.5"
            type="text"
            placeholder="Type your username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className=" border shadow-md">
          <input
            className="w-full p-0.5"
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
      </div>
    </div>
  ) : (
    <Chat socket={socket} username={username} room={room} />
  );
}

export default App;
