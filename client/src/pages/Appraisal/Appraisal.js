import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { estimateValue } from "../../redux/apiRequest";
import classNames from "classnames/bind";
import styles from "./Appraisal.module.scss";
import CONSTANTS from "../../constants";

const cx = classNames.bind(styles);

function Appraisal() {
  const [newEstate, setNewEstate] = useState({
    estate_year: "",
    estate_town: "",
    estate_type: "",
    estate_area_sqm: "",
    estate_distance: "",
    estate_rly: "",
    estate_price: 0,
  });
  const [estimatePrice, setEstimatePrice] = useState(0);
  const TOWN = CONSTANTS.TOWN;
  const [history, setHistory] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEstate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    if (!newEstate.estate_year) {
      setSnackbarMessage("Year is required.");
      setOpenSnackbar(true);
      return;
    }

    if (!newEstate.estate_town) {
      setSnackbarMessage("Town is required.");
      setOpenSnackbar(true);
      return;
    }

    if (!newEstate.estate_type) {
      setSnackbarMessage("Type is required.");
      setOpenSnackbar(true);
      return;
    }

    if (
      !newEstate.estate_area_sqm ||
      isNaN(newEstate.estate_area_sqm) ||
      newEstate.estate_area_sqm <= 0
    ) {
      setSnackbarMessage("Please enter a valid area (sqm).");
      setOpenSnackbar(true);
      return;
    }

    if (!newEstate.estate_distance) {
      setSnackbarMessage("Please enter a valid distance.");
      setOpenSnackbar(true);
      return;
    }

    if (
      !newEstate.estate_rly ||
      isNaN(newEstate.estate_rly) ||
      newEstate.estate_rly <= 0
    ) {
      setSnackbarMessage("Please enter a valid remaining lease years.");
      setOpenSnackbar(true);
      return;
    }

    const data = {
      year: newEstate.estate_year,
      town: newEstate.estate_town,
      flat_type: newEstate.estate_type,
      floor_area_sqm: newEstate.estate_area_sqm,
      remaining_lease_years: newEstate.estate_rly,
      distance_from_expressway: newEstate.estate_distance,
    };

    const value = await estimateValue(data);
    setNewEstate((prev) => ({
      ...prev,
      estate_price: value.data.estimatePrice,
    }));
    setEstimatePrice(value.data.estimatePrice);

    // Lưu lại lịch sử ước tính
    setHistory((prev) => [
      ...prev,
      { ...newEstate, estate_price: value.data.estimatePrice },
    ]);

    setNewEstate({
      estate_year: "",
      estate_town: "",
      estate_type: "",
      estate_area_sqm: "",
      estate_distance: "",
      estate_rly: "",
      estate_price: 0,
    });
  };

  return (
    <div className={cx("container")}>
      <div className={cx("img-container")}>
        <div className={cx("background-img")}></div>

        <Box
          sx={{
            position: "absolute",
            padding: "0 60px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            zIndex: "100",
            color: "white",
            width: "80%",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <h1>Home Appraisal Supporter</h1>
              <p>
                Enter the parameters below to estimate the price of your house.
                For example: [Year: 2022, Town: ANG MO, Type: 4 ROOM, Area: 60,
                Distance: 500 (meters unit), remaining_lease_years: 2]
              </p>

              <Grid container spacing={2}>
                {/* Town Select */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "white" }}>Town</InputLabel>
                    <Select
                      className="fieldset"
                      label="Town"
                      name="estate_town"
                      value={newEstate.estate_town}
                      onChange={handleChange}
                      sx={{
                        color: "white",
                        backgroundColor: "transparent",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "var(--white) !important",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--white) !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--white) !important",
                          },
                        },
                      }}
                    >
                      {TOWN.map((town, index) => (
                        <MenuItem key={index} value={town}>
                          {town}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {[
                  { label: "Year", name: "estate_year" },
                  { label: "Type", name: "estate_type" },
                  { label: "Area (sqm)", name: "estate_area_sqm" },
                  { label: "Distance", name: "estate_distance" },
                  { label: "Remaining lease years", name: "estate_rly" },
                ].map(({ label, name }, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      label={label}
                      name={name}
                      value={newEstate[name]}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ style: { color: "white" } }}
                      InputProps={{
                        style: {
                          color: "white",
                          backgroundColor: "transparent",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" },
                          "&:hover fieldset": { borderColor: "var(--white)" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth={true}
                sx={{ marginTop: 2 }}
              >
                Submit
              </Button>
            </Grid>

            {/* Result Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: 3,
                  borderRadius: 2,
                }}
              >
                <h1>Estimate Result</h1>
                <TableContainer
                  component={Paper}
                  sx={{
                    marginTop: 4,
                    backgroundColor: "transparent",
                    border: "1px solid white",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          Year
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          Town
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          Area (sqm)
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          Distance
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          RLY
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "var(--white)" }}
                        >
                          Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {history.map((h, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: "var(--white)" }}>
                            {h.estate_year}
                          </TableCell>
                          <TableCell sx={{ color: "var(--white)" }}>
                            {h.estate_town}
                          </TableCell>
                          <TableCell sx={{ color: "var(--white)" }}>
                            {h.estate_type}
                          </TableCell>
                          <TableCell sx={{ color: "var(--white)" }}>
                            {h.estate_area_sqm}
                          </TableCell>
                          <TableCell sx={{ color: "var(--white)" }}>
                            {h.estate_distance}
                          </TableCell>
                          <TableCell sx={{ color: "var(--white)" }}>
                            {h.estate_rly}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#90caf9",
                              fontWeight: "bold",
                            }}
                          >
                            S${h.estate_price.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Appraisal;
