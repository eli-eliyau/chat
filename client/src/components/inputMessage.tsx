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
import { apiPost } from "../apiServer/apiToServer";

const InputMessage = () => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const [yMessage, setYmessage] = useRecoilState(atomDataYourMessage);
  // const [messageReceive, setMessageReceive] = React.useState<string>();
  // const [fMessage, setFmessage] = useRecoilState(atomDataMessageFromAnother);
  const [fMessage, setFmessage] = React.useState<string | undefined>();

  const sendMessageAndRoom = (message: any) => {
    socket.emit("send_messageAndRoom", { message, numRoom });
  };

  React.useEffect(() => {
    socket.on("receive_room", (data) => {
      // setMessageReceive(data.message);
      // setFmessage([...fMessage, { messageFromAnother: data.message }]);
      setFmessage(data.message);
    });
  }, [socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    sendMessageAndRoom(data.get("message"));
    let n = String(data.get("message"));

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
