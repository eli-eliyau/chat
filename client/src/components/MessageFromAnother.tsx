import React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  message: string | undefined;
}

const MessageFromAnother = ({ message }: Props) => {
  return (
    <div>
      <Typography sx={{ pt: 5 }}>{message}</Typography>
    </div>
  );
};

export default MessageFromAnother;
