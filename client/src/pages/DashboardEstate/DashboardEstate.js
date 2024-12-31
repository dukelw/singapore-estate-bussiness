import React from "react";
import { Grid, Paper, Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import EstateTable from "../../components/EstateTable";
import styles from "./DashboardEstate.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function DashboardEstate() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar defaultTab="Estate" />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "var(--dark-grey)",
        }}
      >
        {/* Navbar */}
        <Navbar />

        <Box
          sx={{ marginLeft: "20px", marginTop: "20px", padding: "0 20px 0 0" }}
        >
          <Paper>
            <h1 className={cx("title")}>Estate</h1>
          </Paper>

          <Grid container>
            <Paper elevation={3} sx={{ width: "100%" }}>
              <EstateTable />
            </Paper>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardEstate;
