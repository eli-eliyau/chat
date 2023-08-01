import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Moment from "react-moment";
import { TypeMessage } from "../atom/atom";



const Message = (props:{data:TypeMessage ,left?:string,right?:string}) => {


  const getDateNow = (date:string) => (
    <Moment format="h:mm:ss DD/MM/YYYY">{date}</Moment>
  );

  return (
    <Box maxWidth={250} 
    >
      {/* {props.data.user === localStorage.getItem("idMyUser") ? ( */}
        <Box
        borderRadius={3}
        
          sx={{
            background: "#7CFC00",
            mt: 2,
            ml: 1,
            pl:1,
            overflowWrap: "break-word",
          }}
        >
          <Typography sx={{textAlign:`${props.left ?props.left :props.right }`}}>{props.data.text}</Typography>
          {/* {getDateNow(props.data.timestamp)} */}
        </Box>
   
    </Box>
  );
};

export default Message;
