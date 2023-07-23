import MessageFromAnother from "./MessageFromAnother";
import YourMessage from "./YourMessage";
import { Grid } from "@mui/material";
import { socket } from "../App";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { atomDataMessageFromAnother, atomDataYourMessage } from "../atom/atom";
import MessageNwo from "./MessageNwo";

const HomeMessages = () => {
  const [messageReceive, setMessageReceive] = useState<string>();
  // const [fMessage, setFmessage] = useRecoilState(atomDataMessageFromAnother);
  const [yMessage, setYmessage] = useRecoilState(atomDataYourMessage);
  console.log("yyy", yMessage);
  // console.log("fff", fMessage);

  // useEffect(() => {
  // socket.on("receive_room", (data) => {
  // setMessageReceive(data.message);
  // });
  // }, [socket]);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        {yMessage.map(({ yourMessage }) => (
          <>
            <Grid item>
              <YourMessage message={yourMessage} />
              <br></br>
            </Grid>
            <br></br>
          </>
        ))}
        {/* {yMessage.map(({ messageFromAnother }) => (
          <>
            <Grid item>
              <br></br>
              <MessageFromAnother message={messageFromAnother} />
              <br></br>
            </Grid>
            <br></br>
          </> */}
        {/* ))} */}
        {/* <Grid item> */}
        {/* <MessageNwo message={messageReceive} /> */}
        {/* <br></br> */}
        {/* </Grid> */}
      </Grid>
    </>
  );
};

export default HomeMessages;
