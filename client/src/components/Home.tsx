import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import NavBarUsers from "./NavBarUsers";
import PageMessages from "./PageMessages";
import { useSetRecoilState } from "recoil";
import { atomDataListMessages } from "../atom/atom";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const  setListMessages = useSetRecoilState(atomDataListMessages);

useEffect(()=>{
  setListMessages([])

},[isOpen,setListMessages])

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
            <NavBarUsers onInOpen={setIsOpen} open={isOpen} />
          </Grid>
          <Grid item xs={8} height={"1200px"}>
            {isOpen && <PageMessages />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
