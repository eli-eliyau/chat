import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Moment from "react-moment";
import { TypeMessage } from "../atom/atom";

export const styles = {
  left: {
    background: "#7ce6ebbb",
    mt: 2,
    ml: 1,
    pl: 1,
    overflowWrap: "break-word",
    borderRadius: "0px 25px 25px 25px",
  },
  right: {
    background: "#01919996",
    mt: 2,
    mr: 1,
    pr: 1,
    overflowWrap: "break-word",
    borderRadius: "25px 0px 25px 25px",
  },
};

export const getDateNow = (date?: string) => (
  <Typography variant="caption">
  <Moment format="h:mm DD/MM/YYYY">{date}</Moment>
  </Typography>
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
