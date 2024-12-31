import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { signup } from "../../redux/apiRequest";
import { Checkbox, Divider, FormControlLabel, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoginWithFacebook from "../Auth/LoginWithFacebook";
import LoginWithGoogle from "../Auth/LoginWithGoogle";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      setOpenSnackbar(true);
      return;
    }

    if (rememberMe) {
      Cookies.set("email", email, { expires: 7 });
      Cookies.set("password", password, { expires: 7 });
    }

    const user = { name, email, password };
    const result = await signup(user, dispatch, navigate);

    if (result === false) {
      setErrorMessage("Signup failed. Please try again.");
      setOpenSnackbar(true); // Open snackbar if signup fails
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <h1 style={{ color: "var(--black)" }}>SIGN UP</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box mb={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!name && openSnackbar}
            helperText={!name && openSnackbar ? "Name is required" : ""}
            sx={{
              input: { color: "var(--black)" },
              label: { color: "var(--black)" },
              "& .MuiInputLabel-root": {
                color: "var(--black)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--black)",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--black) !important" },
                "&:hover fieldset": { borderColor: "var(--black)" },
                "&.Mui-focused fieldset": { borderColor: "var(--black)" },
              },
            }}
          />
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email && openSnackbar}
            helperText={!email && openSnackbar ? "Email is required" : ""}
            sx={{
              input: { color: "var(--black)" },
              label: { color: "var(--black)" },
              "& .MuiInputLabel-root": {
                color: "var(--black)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--black)",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--black) !important" },
                "&:hover fieldset": { borderColor: "var(--black)" },
                "&.Mui-focused fieldset": { borderColor: "var(--black)" },
              },
            }}
          />
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password && openSnackbar}
            helperText={!password && openSnackbar ? "Password is required" : ""}
            sx={{
              input: { color: "var(--black)" },
              label: { color: "var(--black)" },
              "& .MuiInputLabel-root": {
                color: "var(--black)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--black)",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--black) !important" },
                "&:hover fieldset": { borderColor: "var(--black)" },
                "&.Mui-focused fieldset": { borderColor: "var(--black)" },
              },
            }}
          />
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: "var(--black) !important",
                  "&.Mui-checked": {
                    color: "var(--black) !important",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "var(--black) !important",
                  },
                }}
              />
            }
            label="Remember me"
            sx={{
              color: "var(--black) !important",
              "& .MuiFormControlLabel-label": {
                color: "var(--black) !important",
              },
            }}
          />

          <Link
            to="/signin"
            style={{
              color: "var(--blue)",
              textDecoration: "none",
              marginLeft: "8px",
            }}
          >
            Sign in
          </Link>
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "var(--black)",
              color: "var(--white)",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--black)",
                color: "var(--white)",
                border: "2px solid var(--black)",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "20px 0",
        }}
      >
        <Divider sx={{ flex: 1, borderColor: "var(--black)" }} />
        <Typography
          variant="body1"
          sx={{ color: "var(--black)", padding: "0 10px" }}
        >
          Or
        </Typography>
        <Divider sx={{ flex: 1, borderColor: "var(--black)" }} />
      </Box>

      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* <LoginWithGoogle />
        <LoginWithFacebook /> */}
      </Box>

      <Link to="/" style={{ color: "var(--blue)", textDecoration: "none" }}>
        Go to HomePage
      </Link>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Signup;
