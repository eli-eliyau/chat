import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { TypeMessage, atomDataListMessages } from "../atom/atom";
import { io, Socket } from "socket.io-client";
import Message from "./Message";
import FileDownloaded from "./FileDownloaded";
import { API_SOCKET_IO } from "../apiServer/apiToServer";

export let sockets: Socket;

const HomeMessages = () => {
  const [listMessages, setListMessages] = useRecoilState(atomDataListMessages);
  const socketClient = useRef<Socket>();
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessages]);

  useEffect(() => {
    socketClient.current = sockets = io(`${API_SOCKET_IO}`);

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

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {listMessages.map((key: TypeMessage, index) => (
          <>
            {key.user === localStorage.getItem("chatIdMyUser") ? (
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
