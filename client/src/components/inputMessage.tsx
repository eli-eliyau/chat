import { Box, Button, TextField } from "@mui/material";
import React from "react";
import {
  atomDataClickedUser,
  atomDataMessageFromAnother,
  atomDataYourMessage,
  atomNumRoom,
} from "../atom/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { socket } from "../App";
interface Message{
  text: string ,
  user: string | null,  
  userTo:string | null
  timestamp:  string,
}
const InputMessage = () => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const [yMessage, setYmessage] = useRecoilState(atomDataYourMessage);
  const [fMessage, setFmessage] = useRecoilState(atomDataMessageFromAnother);

  const sendMessageAndRoom = (data: Message) => {
    socket.emit("send_messageAndRoom", { data, numRoom });
    
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let n = String(data.get("message"));

    const newMessage = {
      text:  String(data.get("message")),
      user: localStorage.getItem('idMyUser'),
      userTo:clickedUser._id,
      timestamp: new Date().toISOString(),
    };

    sendMessageAndRoom(newMessage);
    setYmessage((prevMessages) =>[...prevMessages, newMessage])

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
