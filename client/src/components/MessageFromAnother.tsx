import React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  message: FormDataEntryValue | null;
}

const MessageFromAnother = ({ message }: Props) => {
  return (
    <div>
      <Typography align="right" sx={{ pt: 5 }}>{message?.toString()}</Typography>
    </div>
  );
};

export default MessageFromAnother;
