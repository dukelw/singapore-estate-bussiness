import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import EstateTable from "../../components/EstateTable"
import PropertyStats from "../../components/PropertyStats";
import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

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
          {/* Dashboard Content */}
          <Paper>
            <h1 className={cx("title")}>Dashboard</h1>
          </Paper>

          <Grid container spacing={3}>
            {/* Stats Section */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <PropertyStats />
              </Paper>
            </Grid>

            {/* Recent Properties Section */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <EstateTable pagination={5}/>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
