import React from "react";
import InputMessage from "./inputMessage";
import { Grid } from "@mui/material";
import HomeMessages from "./HomeMessages";

const Messages = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        item
        width={"100%"}
        sx={{
          height: {
            xs: "92vh", //0
            sm: "92vh", //600
            md: "92vh", //900
            lg: "92vh", //1200
            xl: "92vh", //1536
          },
          overflow: "auto",
          background: "red",
        }}
      >
        <HomeMessages />
      </Grid>
      <Grid width={"100%"}>
        <InputMessage />
      </Grid>
    </Grid>
  );
};

export default Messages;
