import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import NavBarUsers from "./NavBarUsers";
import Messages from "./Messages";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <>
      <Box maxWidth={"1400px"} maxHeight={"1200px"}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <NavBarUsers onInOpen={setIsOpen} />
          </Grid>
          <Grid item xs={8} height={"1200px"}>
            {isOpen && <Messages />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
