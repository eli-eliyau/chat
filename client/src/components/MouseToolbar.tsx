import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface MouseToolbarProps {
  userName: string | undefined; // Assuming an array of connected mouse names
}

const MouseToolbar: React.FC<MouseToolbarProps> = ({ userName }) => {
  return (
    <AppBar position="static" sx={{backgroundColor:"#0662A3" ,borderRadius:"0px 0px 24px 0px"}}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Welcome:
        </Typography>
        <Typography variant="subtitle1" component="div" sx={{ marginLeft: 2 }}>
          {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MouseToolbar;
