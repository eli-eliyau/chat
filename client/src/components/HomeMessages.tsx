import { Box, Grid, Slide } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { TypeMessage, atomDataListMessages } from "../atom/atom";
import { io, Socket } from "socket.io-client";
import Message from "./Message";
import FileDownloaded from "./FileDownloaded";
import imgMessage from "../img/imgMessage.png";

export let sockets: Socket;

type Direction = "left" | "right" | "up" | "down";

const HomeMessages = () => {
  const [listMessages, setListMessages] = useRecoilState(atomDataListMessages);
  const socketClient = useRef<Socket>();
  const messagesEndRef = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(true);
  const [direction, setDirection] = useState<Direction>("left");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessages]);

  useEffect(() => {
    socketClient.current = sockets = io("http://localhost:3001");

    if (sockets) {
      socketClient.current.on("event-name", (data: any) => {
        console.log("Received data from server:", data);
      });
      socketClient.current.on("receive_room", (data: any) => {
        setListMessages((prev) => [...prev, data.data]);
      });
    }

    socketClient.current.on("download_file", (file) => {
      const blob = new Blob([file.data], { type: "application/octet-stream" });
      const downloadUrl = URL.createObjectURL(blob);

      setListMessages((prev) => [
        ...prev,
        {
          user: file.user,
          userTo: file.userTo,
          file: { name: file.name, url: downloadUrl, date: file.date },
        },
      ]);
    });

    return () => {
      socketClient.current?.disconnect();
      socketClient.current = undefined;
    };
  }, [socketClient, setListMessages]);
  

  useEffect(() => {
    const directions: Direction[] = ["left", "right", "up", "down"];

    const interval = setInterval(() => {
      setVisible(false);

      const randomIndex = Math.floor(Math.random() * directions.length);
      setDirection(directions[randomIndex]);

      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }, 1000 * 8);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Slide direction={direction} in={visible} timeout={1000}>
          <img
            src={imgMessage}
            style={{
              // backgroundImage:"none"
              position: "fixed",
              zIndex: -1,
              right: "20%",
              // top: '50%',
              transform: "translateY(-50%)",
              // width: 200,
              // height: '100vh'
            }}
          />
        </Slide>

        {listMessages.map((key: TypeMessage, index) => (
          <>
            {key.user === localStorage.getItem("idMyUser") ? (
              <Grid item>
                {key.file ? (
                  <FileDownloaded file={key.file} left="left" />
                ) : key.text ? (
                  <Message data={key} key={index} left="left" />
                ) : (
                  ""
                )}
              </Grid>
            ) : (
              <Grid item sx={{ direction: "rtl" }}>
                {key.file ? (
                  <FileDownloaded file={key.file} right="right" />
                ) : (
                  <Message data={key} key={index} right="right" />
                )}
              </Grid>
            )}
            <Box ref={messagesEndRef} />
          </>
        ))}
      </Grid>
    </>
  );
};

export default HomeMessages;
