import { Box, Button, Paper } from "@mui/material";
import  { useCallback, useEffect, useRef, useState } from "react";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import {
  TypeMessage,
  atomDataClickedUser,
  atomDataListMessages,
  atomNumRoom,
} from "../atom/atom";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { sockets} from "./HomeMessages";
import FileUploadComponent from "./InputFile";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Input } from "@mui/base";
import { Socket } from "engine.io-client";
import { io } from "socket.io-client";


const InputMessage = (props:{label:string,type?:string,sx?:object}) => {
  const numRoom = useRecoilValue(atomNumRoom);
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const  setListMessages = useSetRecoilState(atomDataListMessages);
  const [selectedFile, setSelectedFile] = useState< File >();
  const [file,setfile]=useState()
  const [message, setMessage] = useState('');
  const sendMessageAndRoom = (data: TypeMessage) => {
    sockets.emit("send_messageAndRoom", { data, numRoom });
  };
  const [socket,setsocke] = useState<Socket>();
  const url = selectedFile &&  URL.createObjectURL(selectedFile );

  // useEffect(()=>{
  //   const soc = io("http://localhost:3001");
  //   soc.on('file_download',(data)=>{
  //     setfile(data)
  //   })
  // },[soc])


  const download = () => {
    const url =selectedFile ? URL.createObjectURL(selectedFile):'err'
    const link = document.createElement('a');
      link.href =  url;
    link.download = selectedFile ? selectedFile.name:'err'
    link.click();
    // ...
  }

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      sockets.emit('file', event.target.files![0]);
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
        onChange={()=>{}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="label">
                <AttachFileIcon />
                <Input type={"file"}  style={{ display: 'none' }} onChange={handleFileChange}/>
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
      {selectedFile && <div>{selectedFile.name}</div>}
      <button onClick={download}>Download</button> 
    </div>
      {selectedFile && <TextField 
          value={`${selectedFile.name} (${selectedFile.size} bytes) הועלה`}
        />}
      </>
    </Box>
  );
};

export default InputMessage;
