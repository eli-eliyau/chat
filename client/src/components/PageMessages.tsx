import React from "react";
import InputMessage from "./inputMessage";
import { Grid } from "@mui/material";
import HomeMessages from "./HomeMessages";

const PageMessages = () => {
  return (
    <Grid
      // container
      // direction="column"
      // justifyContent="flex-start"
      // alignItems="flex-start"
      sx={{
        width: "100%",
        height: { xs: "100vh", sm: "100vh", md: "100vh", xl: "100vh" },
     }}
    >
      <Grid
        item
        overflow={"auto"}
        sx={{
          width: "100%",
          height: { xs: "60%", sm: "90%", md: "90%", xl: "90%" },
        }}
      >
        <HomeMessages />
      </Grid>
      <Grid
      
        sx={{
          width: "100%",
          height: { xs: "30%", sm: "10%", md: "10%", xl: "10%" },
        }}
      >
        <InputMessage />
      </Grid>
    </Grid>
  );
};

export default PageMessages;
