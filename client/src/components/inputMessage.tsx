import { Box, Button, Paper } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  TypeMessage,
  atomDataClickedUser,
  atomDataListMessages,
  atomNumRoom,
} from "../atom/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sockets } from "./HomeMessages";
import FileUploadComponent from "./InputFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Input } from "@mui/base";
import { Socket } from "engine.io-client";
import { io } from "socket.io-client";


const InputMessage = (props: { label: string; type?: string; sx?: object }) => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const setListMessages = useSetRecoilState(atomDataListMessages);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [receivedFile, setReceivedFile] = useState<Blob | null>(null);

  // const [file,setfile]=useState< File | null >(null)
  const [message, setMessage] = useState("");
  const sendMessageAndRoom = (data: TypeMessage) => {
    sockets.emit("send_messageAndRoom", { data, numRoom });
  };

  useEffect(() => {
    sockets.on('file', (data) => {
      const fileData = new Uint8Array(data.fileData);
      const blob = new Blob([fileData]);

      setReceivedFile(blob);
    });
  }, [receivedFile,selectedFile]);

  const sendFile = () => {
    if (selectedFile) {
      
      const reader = new FileReader();

      reader.onload = (event) => {

        if (event.target?.result) {

          const fileData = event.target.result;
          sockets.emit('file', {
            fileName: selectedFile.name,
            fileData,
          });
          setSelectedFile(null);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleDownload = () => {
    if (receivedFile && selectedFile) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(receivedFile);
      downloadLink.download = selectedFile.name;
      downloadLink.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // Handle file upload logic here
    // setSelectedFile(files)
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      // formData.append('file', selectedFile);

      // try {
      //   await axios.post('/api/upload', formData); // Adjust the API endpoint
      //   // Handle success or display a message to the user.
      // } catch (error) {
      //   // Handle error or display an error message to the user.
      // }
    }
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
      <div>
      <Input type="file" onChange={handleFileChange} />
      <button onClick={sendFile}>Send File</button>
      {receivedFile && (
        <div>
          <h2>Received File:</h2>
          <p>File Name: {selectedFile?.name || 'N/A'}</p>
          <a
            href={URL.createObjectURL(receivedFile)}
            download={selectedFile?.name || 'received-file'}
          >
            Download Received File
          </a>
        </div>
      )}
    </div>
      </>
    </Box>
  );
};

export default InputMessage;
