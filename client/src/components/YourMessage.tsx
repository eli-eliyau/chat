import React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  message: FormDataEntryValue | null;
}

const YourMessage = ({ message }: Props) => {
  return (
    <div>
      <Typography  align={"left"}>{message?.toString()}</Typography>
    </div>
  );
};

export default YourMessage;
