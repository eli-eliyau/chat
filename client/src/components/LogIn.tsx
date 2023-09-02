import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API_SERVER, apiPost } from "../apiServer/apiToServer";
import { useNavigate } from "react-router-dom";

interface IProps {
  toUrlServer: string;
}

const theme = createTheme();

const LogIn = ({ toUrlServer }: IProps) => {
  const [messeage, setMessage] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataUserToForm = {
      _fullName: data.get("fullName"),
      _email: data.get("email"),
      _password: data.get("password"),
    };

    if (toUrlServer === "signIn" || toUrlServer === "signUp") {
      apiPost(dataUserToForm, toUrlServer)
        .then((res) => {
          if (res) {
            localStorage.setItem("user", "true");
            localStorage.setItem("idMyUser", res._id);
            localStorage.setItem("userName", res._fullName);
            navigate(0);
          } else {
            setMessage("User does not exist in the system");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {toUrlServer === "signIn" ? "Sign in" : "Sign up"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {toUrlServer === "signUp" && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="full name"
                  name="fullName"
                  autoComplete="fullName"
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {toUrlServer === "signIn" ? "Sign in" : "Sign up"}
              </Button>
              <Grid container>
                <Grid item>
                  {toUrlServer === "signIn" && (
                    <Link href={`${API_SERVER}/sign-up`} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  )}
                </Grid>
                {messeage && <Typography color={"red"}>{messeage}</Typography>}
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LogIn;
