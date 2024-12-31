import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllEstate } from "../../redux/apiRequest";
import classNames from "classnames/bind";
import styles from "./Property.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Property() {
  const dispatch = useDispatch();
  const [estates, setEstates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEstates = async (page) => {
    try {
      const response = await getAllEstate(dispatch, page, 15);
      setEstates(response.metadata.estates);
      setTotalPages(Math.ceil(response.metadata.totalEstates / 15));
    } catch (error) {
      console.error("Error fetching estates:", error);
    }
  };

  useEffect(() => {
    fetchEstates(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("img-container")}>
        <div className={cx("background-img")}></div>
        <Box
          sx={{
            marginTop: 20,
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "200",
            width: "80%",
          }}
        >
          <Grid container spacing={4}>
            {estates?.map((estate) => (
              <Grid item xs={12} sm={6} md={4} key={estate._id}>
                <Card sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={
                      estate.estate_image ||
                      "https://res.cloudinary.com/lewisshop/image/upload/v1735186891/estate_razw16.jpg"
                    }
                    alt={estate.estate_name}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "gray",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        marginBottom: 1,
                      }}
                    >
                      {estate.estate_type || "Unknown Type"}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginBottom: 1,
                      }}
                    >
                      {estate.estate_name}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        {estate.estate_address || "Address not available"}
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        Express way: {estate.estate_distance}
                      </Typography>
                    </div>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      S${estate.estate_price.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.9rem", marginTop: 2, color: "gray" }}
                    >
                      {estate.estate_bedrooms || 0} Bedrooms •{" "}
                      {estate.estate_bathrooms || 0} Bathrooms •{" "}
                      {estate.estate_size || "Unknown"} Sq. Ft.
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ textAlign: "center", paddingTop: 0 }}>
                    <Button variant="contained" color="primary" fullWidth>
                      <Link to={`/estate/${estate._id}`}>Detail</Link>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
              "& .MuiPaginationItem-root": {
                color: "#ffffff",
              },
              "& .Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default Property;
