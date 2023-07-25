import MessageFromAnother from "./MessageFromAnother";
import YourMessage from "./YourMessage";
import { Grid } from "@mui/material";
import { socket } from "../App";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Message, atomDataClickedUser, atomDataMessageFromAnother, atomDataYourMessage } from "../atom/atom";



const HomeMessages = () => {
  const clickedUser = useRecoilValue(atomDataClickedUser);
  const [messageReceive, setMessageReceive] = useState<string>();
  const [fMessage, setFmessage] = useRecoilState(atomDataMessageFromAnother);
  const [Message, setmessage] = useState("");
  const [yMessage, setYmessage] = useRecoilState(atomDataYourMessage);


  useEffect(() => {
  socket.on("receive_room", (data:any) => {
    console.log("לפני",data.data)

    setFmessage((prevMessages) =>[...prevMessages, data.data])
    setmessage(data.data.text)
  });
   
  }, [socket]);
 
  
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
     
        {/* {yMessage.map((key:Message,index) => ( */}
          <>
            <Grid item>
         {/* {  key.user === localStorage.getItem('idMyUser')?  <YourMessage message={key.text} />:
           <MessageFromAnother message={fMessage[index].text} />
        } */}
        {Message}
            </Grid>
          </>
        {/* ))} */}
       
      </Grid>
    </>
  );
};

export default HomeMessages;
