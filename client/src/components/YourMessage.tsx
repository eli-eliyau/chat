import React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  message: string | undefined;
}

const YourMessage = ({ message }: Props) => {
  return (
    <div>
      <Typography align={"left"}>{message}</Typography>
    </div>
  );
};

export default YourMessage;
