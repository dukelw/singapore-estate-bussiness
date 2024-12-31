import React from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const StatsCard = () => {
  const trafficData = {
    title: "Traffic",
    value: "350,897",
    percentage: "+3.48%",
    icon: <ArrowUpward />,
    iconColor: "green",
  };

  const engagementData = {
    title: "Engagement",
    value: "2,356",
    percentage: "+4.48%",
    icon: <ArrowUpward />,
    iconColor: "green",
  };

  const salesData = {
    title: "Sales",
    value: "924",
    percentage: "-1.10%",
    icon: <ArrowDownward />,
    iconColor: "red",
  };

  const performanceData = {
    title: "Performance",
    value: "49,65%",
    percentage: "+12%",
    icon: <ArrowUpward />,
    iconColor: "green",
  };

  const data = [trafficData, engagementData, salesData, performanceData];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={12} key={index}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {item.value}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                  <Typography variant="body1" color={item.iconColor}>
                    {item.percentage}
                  </Typography>
                  {item.icon && (
                    <Box
                      sx={{
                        marginLeft: 1,
                        color: item.iconColor,
                      }}
                    >
                      {item.icon}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsCard;
