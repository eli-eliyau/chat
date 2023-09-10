import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
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
import { io } from "socket.io-client";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { API_SOCKET_IO } from "../apiServer/apiToServer";

const InputMessage = () => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const setListMessages = useSetRecoilState(atomDataListMessages);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileExists, setFileExists] = useState<boolean>(false);
  const [valueMessage, setValueMessage] = useState<string>();

  const sendMessageAndRoom = (data: TypeMessage) => {
    sockets.emit("send_messageAndRoom", { data, numRoom });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let message = String(data.get("message"));

    if (message.trim() !== "") {
      const newMessage = {
        text: String(data.get("message")),
        user: localStorage.getItem("idMyUser"),
        userTo: clickedUser._id,
        date: new Date().toISOString(),
      };

      sendMessageAndRoom(newMessage);
      setListMessages((prev) => [...prev, newMessage]);
      setValueMessage("");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileExists(true);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const socket = io(`${API_SOCKET_IO}`);
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileData = event.target?.result as ArrayBuffer;

        let dtatUplaod = {
          user: localStorage.getItem("idMyUser"),
          userTo: clickedUser._id,
          name: selectedFile.name,
          data: fileData,
          date: new Date().toISOString(),
        };

        socket.emit("file_upload", dtatUplaod);

        setListMessages((prev) => [...prev, dtatUplaod]);
      };

      reader.readAsArrayBuffer(selectedFile);
      setFileExists(false);
    }
  };

  const style = {
    mt: 2,
    mb: 2,
    background: 0,
    borderRadius: 5,
    "&:hover": { background: "#4CE1E1" },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="message"
        label="Message"
        name="message"
        autoComplete="message"
        autoFocus
        multiline
        // maxRows={5}
        value={valueMessage}
        sx={{ backgroundColor:"#83c1ed6c" }}
        onChange={(e) => setValueMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="label" sx={style}>
                <AttachFileIcon />
                <Input
                  type={"file"}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </IconButton>
              {fileExists ? (
                <Button variant="text" onClick={handleUpload} sx={style}>
                  <UploadFileTwoToneIcon color="action" />
                </Button>
              ) : (
                <Button type="submit" variant="text" sx={style}>
                  <SendTwoToneIcon color="action" />
                </Button>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default InputMessage;
