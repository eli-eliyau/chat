import React, { useEffect, useState } from "react";
// import  from "@mui/material/Box";
import { Grid, Box } from "@mui/material";
import NavBarUsers from "./NavBarUsers";
import PageMessages from "./PageMessages";
import { useSetRecoilState } from "recoil";
import { atomDataListMessages } from "../atom/atom";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setListMessages = useSetRecoilState(atomDataListMessages);

  useEffect(() => {
    setListMessages([]);
  }, [isOpen, setListMessages]);

  const style = {
    backgroundColor: "#83C1ED",
    width: { xs: "100%", sm: "30%", md: "30%", xl: "30%" },
    height: { xs: "30%", sm: "100vh", md: "100vh", xl: "100vh" },
  };

  return (
    <>
      <Box 
          height='100vh'
          >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item sx={style}>
            <NavBarUsers onInOpen={setIsOpen} open={isOpen} />
          </Grid>
          <Grid
            item
            sx={{ width: { xs: "100%", sm: "70%", md: "70%", xl: "70%" },
           }}
          >
            {isOpen && <PageMessages />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
