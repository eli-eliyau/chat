import MessageFromAnother from "./MessageFromAnother";
import YourMessage from "./YourMessage";
import { Grid } from "@mui/material";
// import { socket } from "../App";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Message,
  atomDataClickedUser,
  atomDataMessageFromAnother,
  atomDataYourMessage,
} from "../atom/atom";
import { io, Socket } from "socket.io-client";

export let socket: Socket;

const HomeMessages = () => {
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const [messageReceive, setMessageReceive] = useState<string>();
  const [fMessage, setFmessage] = useRecoilState(atomDataMessageFromAnother);
  const [Message, setmessage] = useState("");
  const [yMessage, setYmessage] = useRecoilState(atomDataYourMessage);
  const socketClient = useRef<Socket>();
  useEffect(() => {
    // Establish the Socket.IO connection when the component mounts
    socketClient.current = socket = io("http://localhost:3001");
    if (socket) {
      socketClient.current.on("event-name", (data: any) => {
        // Handle the data received from the server
        console.log("Received data from server:", data);
      });
      socketClient.current.on("receive_room", (data: any) => {
        console.log("לפני", data.data);

        setFmessage((prev) => [...prev, data.data]);
        setmessage(data.data.text);
      });
    }
    // Handling events from the server

    // Clean up the socket connection when the component unmounts
    return () => {
      socketClient.current?.disconnect();
      socketClient.current = undefined;
    };
  }, [socketClient, setFmessage]);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        {yMessage.map((key: Message, index) => (
          <>
            <Grid item>
              <YourMessage message={key.text} user={key.user} />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default HomeMessages;
