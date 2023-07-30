import React from "react";
import Typography from "@mui/material/Typography";
import {Box} from '@mui/material'
import Moment from "react-moment";

interface Props {
  message: string | null;
  user : string | null;
}

const YourMessage = ({ message ,user}: Props) => {
  return (
    <Box >
      {user === localStorage.getItem('idMyUser') ? (
      <Box sx={{background:"#7CFC00" , mt:2}} >
        <Typography  align={"left"}>{message}</Typography> 
      <Moment format="h:mm:ss DD/MM/YYYY">{Date.now()}</Moment>
      </Box>)
      : (
        <Box textAlign={"right"} sx={{background:"#F0F8FF" ,mt:2}}>
      <Typography  align={"right"}>{message}</Typography>
      <Moment  format="h:mm:ss DD/MM/YYYY">{Date.now()}</Moment>
      </Box>
      )}
    </Box>
  );
};

export default YourMessage;
