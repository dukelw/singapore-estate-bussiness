import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Button, Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { estimateValue, getEstate } from "../../redux/apiRequest";
import { createAxios } from "../../createAxios";
import classNames from "classnames/bind";
import styles from "./Estate.module.scss";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Estate() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);

  const [estate, setEstate] = useState({});
  const { estateID } = useParams();

  const fetchData = async () => {
    const data = await getEstate(estateID, dispatch);
    setEstate(data.metadata);
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [estateID]);

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
            transform: "translate(-50%, -56%)",
            zIndex: "100",
            color: "white",
            width: "80%",
          }}
        >
          <Grid container spacing={4}>
            <h1>DETAIL ABOUT {estate?.estate_name?.toUpperCase()}</h1>
            <img
              className={cx("thumbhouse")}
              src={estate.estate_image}
              alt=""
            />
          </Grid>
          <Grid sx={{ padding: "60px 0" }} container spacing={4}>
            {/* Estate Details */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "var(--white)",
                  fontFamily: "var(--font-family)",
                }}
              >
                {estate?.estate_town} POST OFFICE
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "var(--white)",
                  fontFamily: "var(--font-family)",
                }}
              >
                {estate?.estate_name}
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: "var(--white)",
                  fontFamily: "var(--font-family)",
                }}
              >
                {estate?.estate_address || "Singapore"}
              </Typography>

              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    PRICE
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    ${estate?.estate_price?.toLocaleString()} USD
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    AREA
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    {estate?.estate_area_sqm} Sq. M
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    TYPE
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    {estate?.estate_type}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    YEAR
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    {estate?.estate_year}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Agent Information */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--black)",
                  padding: 2,
                  borderRadius: 2,
                  color: "var(--white)",
                  fontFamily: "var(--font-family)",
                }}
              >
                <Avatar
                  alt="Agent"
                  src="https://pbs.twimg.com/profile_images/1752515582665068544/3UsnVSp5_400x400.jpg"
                  sx={{ width: 60, height: 60, marginRight: 2 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    Lewis Luther
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: 1,
                      color: "var(--white)",
                      borderColor: "var(--white)",
                      fontFamily: "var(--font-family)",
                      "&:hover": {
                        borderColor: "var(--white)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Box sx={{ padding: 4, backgroundColor: "#f9f9f9" }}>
              <Grid container spacing={4}>
                {/* Agent Information */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 3,
                    }}
                  >
                    <Avatar
                      alt="Lewis Luther"
                      src="https://pbs.twimg.com/profile_images/1752515582665068544/3UsnVSp5_400x400.jpg"
                      sx={{ width: 120, height: 120, marginRight: 3 }}
                    />
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "var(--font-family)",
                          color: "var(--black)",
                        }}
                      >
                        Lewis Luther
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "var(--font-family)",
                          color: "var(--black)",
                        }}
                      >
                        DRE# 01269495
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: 1,
                          fontFamily: "var(--font-family)",
                          color: "var(--black)",
                        }}
                      >
                        M: +1 310.968.9212
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: 1,
                          fontFamily: "var(--font-family)",
                          color: "var(--black)",
                        }}
                      >
                        luther.lewis@futureestate.realty
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      marginTop: 2,
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                    }}
                  >
                    Office
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    Future Estate's International Realty - Beverly Hills
                    Brokerage
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    9665 Wilshire Blvd, Ste 400
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    Beverly Hills, California, 90212 United States
                  </Typography>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: 3,
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                    }}
                  >
                    Let’s Get in Touch
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone number (Optional)"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message (Optional)"
                        multiline
                        rows={4}
                        defaultValue="I’m interested in the property at 1006 North Crescent Drive"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      display: "block",
                      marginTop: 2,
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    By submitting this form, you acknowledge that you accept the
                    Future Estate’s International Realty Privacy Policy and
                    Terms of Use.
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: 3,
                      padding: "10px 20px",
                      fontWeight: "bold",
                      fontFamily: "var(--font-family)",
                      color: "var(--white)",
                      backgroundColor: "var(--black)",
                    }}
                  >
                    SEND MESSAGE
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Estate;
