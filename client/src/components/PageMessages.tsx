import React from "react";
import InputMessage from "./inputMessage";
import { Grid } from "@mui/material";
import HomeMessages from "./HomeMessages";
import imgBackground from "../img/messagePageBackground.png";
import Fade from "@mui/material/Fade";

const PageMessages = () => {
  return (
    <Fade in timeout={2000}>
      <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
        sx={{
          width: "100%",
          height: { xs: "100vh", sm: "100vh", md: "100vh", xl: "100vh" },
          backgroundImage: `url(${imgBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2rem",
        }}
      >
        <Grid
          item
          overflow={"auto"}
          sx={{
            width: "100%",
            height: { xs: "90%", sm: "90%", md: "90%", xl: "90%" },
          }}
        >
          <HomeMessages />
        </Grid>
        <Grid
        item
          sx={{
            width: "100%",
            height: { xs: "10%", sm: "10%", md: "10%", xl: "10%" },
          }}
        >
          <InputMessage />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default PageMessages;
