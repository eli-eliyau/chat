import { Box, Button, TextField } from "@mui/material";
import React from "react";
import {
  TypeMessage,
  atomDataClickedUser,
  atomDataListMessages,
  atomNumRoom,
} from "../atom/atom";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { sockets} from "./HomeMessages";


const InputMessage = () => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const  setListMessages = useSetRecoilState(atomDataListMessages);

  const sendMessageAndRoom = (data: TypeMessage) => {
    sockets.emit("send_messageAndRoom", { data, numRoom });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let message = String(data.get("message"));
   
    if(message){
    const newMessage = {
      text:  String(data.get("message")),
      user: localStorage.getItem('idMyUser'),
      userTo:clickedUser._id,
      date: new Date().toISOString(),
    };

    sendMessageAndRoom(newMessage);
    setListMessages((prev) =>[...prev, newMessage])

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
      />
      <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
        send
      </Button>
    </Box>
  );
};

export default InputMessage;
