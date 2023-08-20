import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Moment from "react-moment";
import { TypeMessage } from "../atom/atom";

export const styles = {
  left: {
    background: "#7ce6eb87",
    mt: 2,
    ml: 1,
    pl: 1,
    overflowWrap: "break-word",
    borderRadius: "0px 25px 25px 25px",
    // border: "5px solid #7CE6EB",
  },
  right: {
    background: "#01919996",
    mt: 2,
    mr: 1,
    pr: 1,
    overflowWrap: "break-word",
    borderRadius: "25px 0px 25px 25px",
    // border: "5px solid #019299",
  },
};

export const getDateNow = (date?: string) => (
  <Moment format="h:mm:ss DD/MM/YYYY">{date}</Moment>
);

const Message = (props: {
  data: TypeMessage;
  left?: string;
  right?: string;
}) => {
  return (
    <Grid maxWidth={"350px"} sx={props.left ? styles.left : styles.right}>
      <Typography
        sx={{ textAlign: `${props.left ? props.left : props.right}` }}
      >
        {props.data.text}
      </Typography>
      {getDateNow(props.data.date)}
    </Grid>
  );
};

export default Message;
