import React from "react";

interface Props {
  message: string | undefined;
}

const MessageNwo = ({ message }: Props) => {
  return <div>{message}</div>;
};

export default MessageNwo;
