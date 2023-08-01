import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { TypeMessage, atomDataListMessages } from "../atom/atom";
import { io, Socket } from "socket.io-client";
import Message from "./Message";

export let socket: Socket;

const HomeMessages = () => {
  const [listMessages, setListMessages] = useRecoilState(atomDataListMessages);
  const socketClient = useRef<Socket>();

  useEffect(() => {
    socketClient.current = socket = io("http://localhost:3001");

    if (socket) {
      socketClient.current.on("event-name", (data: any) => {
        console.log("Received data from server:", data);
      });
      socketClient.current.on("receive_room", (data: any) => {
        setListMessages((prev) => [...prev, data.data]);
      });
    }

    return () => {
      socketClient.current?.disconnect();
      socketClient.current = undefined;
    };
  }, [socketClient, setListMessages]);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        {listMessages.map((key: TypeMessage, index) => (
          <>
          {key.user === localStorage.getItem("idMyUser") ?
          <Grid item>
          <Message data={key} key={index} />
          </Grid>
          :  <Grid item sx={{direction:"rtl"}}>
          <Message data={key} key={index} />
          </Grid>

        }
          </>
        ))}
      </Grid>
    </>
  );
};

export default HomeMessages;
