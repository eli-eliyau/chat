import { Box, Button } from "@mui/material";
import {  useEffect, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  TypeMessage,
  atomDataClickedUser,
  atomDataListMessages,
  atomNumRoom,
} from "../atom/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sockets } from "./HomeMessages";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Input } from "@mui/base";


const InputMessage = (props: { label: string; type?: string; sx?: object }) => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const setListMessages = useSetRecoilState(atomDataListMessages);
 
  const sendMessageAndRoom = (data: TypeMessage) => {
    sockets.emit("send_messageAndRoom", { data, numRoom });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let message = String(data.get("message"));

    if (message) {
      const newMessage = {
        text: String(data.get("message")),
        user: localStorage.getItem("idMyUser"),
        userTo: clickedUser._id,
        date: new Date().toISOString(),
      };

      sendMessageAndRoom(newMessage);
      setListMessages((prev) => [...prev, newMessage]);

      // apiPost(
      //   {
      //     _id_from_user: localStorage.getItem("idMyUser"),
      //     _id_to_user: clickedUser._id,
      //     _message: n,
      //   },
      //   "setMessage"
      // );J
      // setYmessage([
      // ...yMessage,
      // { yourMessage: n, messageFromAnother: fMessage },
      // ]);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="message"
        label="Message"
        name="message"
        autoComplete="message"
        autoFocus
        onChange={() => {}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="label">
                <AttachFileIcon />
                {/* <Input
                  type={"file"}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                /> */}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
        send
      </Button>
      <>
    
      </>
    </Box>
  );
};

export default InputMessage;
