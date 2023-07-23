import * as io from "socket.io-client";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

export const socket = io.connect("http://localhost:3001");

function App() {
  // const sendMessage = () => {
  // socket.emit("send_message", { message });
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageReceive(data.message);
  //   });

  //   socket.on("message", (userId, message) => {
  //     console.log(`Received message from user ${userId}: ${message}`);
  //     setMessageReceive(message);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });
  // }, [socket]);

  let userExist: string | null = localStorage.getItem("user");

  return (
    <>
      {userExist === null || undefined ? (
        <Routes>
          <Route path="/sign-in" element={<LogIn toUrlServer={"signIn"} />} />
          <Route path="/sign-up" element={<LogIn toUrlServer={"signUp"} />} />
          <Route path="*" element={<Navigate replace to="/sign-in" />} />
        </Routes>
      ) : userExist === "true" ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Navigate replace to="/home" />} />
        </Routes>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
