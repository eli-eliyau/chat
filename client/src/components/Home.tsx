import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Slide,
  useMediaQuery,
  Drawer,
  AppBar,
  IconButton,
  Typography,
} from "@mui/material";
import NavBarUsers from "./NavBarUsers";
import PageMessages from "./PageMessages";
import { useSetRecoilState } from "recoil";
import { atomDataListMessages } from "../atom/atom";
import imgMessage from "../img/imgMessage.png";
import axios from "axios";
import { API_SERVER } from "../apiServer/apiToServer";
import MenuIcon from "@mui/icons-material/Menu";

type Direction = "left" | "right" | "up" | "down";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setListMessages = useSetRecoilState(atomDataListMessages);
  const [visible, setVisible] = useState<boolean>(true);
  const [direction, setDirection] = useState<Direction>("left");
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const directions: Direction[] = ["left", "right", "up", "down"];
    const interval = setInterval(() => {
      setVisible(false);
      const randomIndex = Math.floor(Math.random() * directions.length);
      setDirection(directions[randomIndex]);
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }, 1000 * 8);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setListMessages([]);
    // לקוח
  }, [isOpen, setListMessages]);

  const style = {
    background:
      "linear-gradient(0deg, rgba(131,193,237,1) 31%, rgba(6,98,163,1) 100%)",
    width: { xs: "100%", sm: "30%", md: "30%", xl: "30%" },
    height: { xs: "100%", sm: "100vh", md: "100vh", xl: "100vh" },
    boxShadow: "20",
  };
  
  return (
    <>
      <Box height="100vh" width={"100%"}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {isSmallScreen ? (
            <>
              <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="left"
              >
                <Grid item sx={style}>
                  <NavBarUsers onInOpen={setIsOpen} open={isOpen} />
                </Grid>
              </Drawer>
              <Grid item sx={{ position: "fixed" }}>
                <IconButton
                  sx={{ color: "#643434" }}
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <MenuIcon />
                </IconButton>
                {/* <Typography align="right">
              {localStorage.getItem("chatUserName")}
              </Typography> */}
              
              </Grid>
            </>
          ) : (
            <Grid item sx={style}>
           <>
              <NavBarUsers onInOpen={setIsOpen} open={isOpen} />
   
                </>
            </Grid>
          )}
          <Grid
            item
            sx={{ width: { xs: "100%", sm: "70%", md: "70%", xl: "70%" } }}
          >
            {isOpen ? (
              <PageMessages />
            ) : (
              <>
                <Slide direction={direction} in={visible} timeout={1000}>
                  <img
                    src={imgMessage}
                    style={{
                      position: "fixed",
                      zIndex: -1,
                      right: "8%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </Slide>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
